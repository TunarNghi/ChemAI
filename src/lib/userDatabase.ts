import { supabase, executeWithFailover } from '@/lib/api';
import { UserProfile, isDemoAccount } from '@/components/UserAuthModal';

const LOCAL_USERS_KEY = 'chemai_registered_users';
const CURRENT_USER_KEY = 'chemai_current_user';
const DIRECTORY_CACHE_KEY = 'all_registered_users_directory';
const DELETED_USERS_KEY = 'chemai_deleted_user_ids';

export function getDeletedUserIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(DELETED_USERS_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return new Set(arr);
    }
  } catch {}
  return new Set();
}

/**
 * Save or update a user profile to Supabase database (and local cache) with smart failover
 */
export async function saveUserToDatabase(user: UserProfile): Promise<boolean> {
  if (!user || !user.id) return false;

  // 1. Update localStorage
  try {
    if (typeof window !== 'undefined') {
      const localUsers = getLocalRegisteredUsers();
      const existingIdx = localUsers.findIndex(u => 
        u.id === user.id || 
        (u.emailOrPhone && user.emailOrPhone && u.emailOrPhone.toLowerCase() === user.emailOrPhone.toLowerCase()) ||
        (u.fullName && user.fullName && u.fullName.toLowerCase().trim() === user.fullName.toLowerCase().trim() && (u.className || '').toLowerCase().trim() === (user.className || '').toLowerCase().trim())
      );
      if (existingIdx >= 0) {
        localUsers[existingIdx] = { 
          ...localUsers[existingIdx], 
          ...user,
          kahootExp: Math.max(localUsers[existingIdx].kahootExp || 0, user.kahootExp || 0),
          kahootStreak: user.kahootStreak !== undefined ? user.kahootStreak : (localUsers[existingIdx].kahootStreak || 0),
          totalKahootQuestions: Math.max(localUsers[existingIdx].totalKahootQuestions || 0, user.totalKahootQuestions || 0),
          correctKahootQuestions: Math.max(localUsers[existingIdx].correctKahootQuestions || 0, user.correctKahootQuestions || 0),
        };
      } else {
        localUsers.push(user);
      }
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(localUsers));

      // Also update current active user if matches
      const currentStored = localStorage.getItem(CURRENT_USER_KEY);
      if (currentStored) {
        try {
          const parsed = JSON.parse(currentStored);
          if (parsed && (parsed.id === user.id || (parsed.emailOrPhone && parsed.emailOrPhone.toLowerCase() === user.emailOrPhone?.toLowerCase()))) {
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ ...parsed, ...user }));
          }
        } catch {}
      }
    }
  } catch (e) {
    console.warn('Local storage save error:', e);
  }

  // 1.1. TÀI KHOẢN MẶC ĐỊNH / THỬ NGHIỆM (Học Sinh A, Giáo Viên A):
  // Chỉ lưu tạm thời vào LocalStorage / Memory, TUYỆT ĐỐI KHÔNG ghi đè vào Supabase Database
  if (isDemoAccount(user)) {
    return true;
  }

  // 2. Lưu trực tiếp vào bảng chuẩn `user_profiles` (có Smart Failover sang Backup)
  try {
    await executeWithFailover(async (client) => {
      return await client.from('user_profiles').upsert({
        user_id: user.id,
        full_name: user.fullName,
        auth_type: user.authType || 'email',
        email_or_phone: user.emailOrPhone || '',
        role: user.role || 'student',
        class_name: user.className || '10A1',
        school: user.school || '',
        location: user.location || '',
        kahoot_exp: user.kahootExp || 0,
        kahoot_streak: user.kahootStreak || 0,
        login_streak: user.loginStreak || 1,
        nickname: user.nickname || '',
        total_questions: user.totalKahootQuestions || 0,
        correct_questions: user.correctKahootQuestions || 0,
        teacher_evaluation: user.teacherEvaluation || '',
        last_active_date: user.lastActiveDate || new Date().toISOString().split('T')[0],
        created_at: user.createdAt || new Date().toISOString(),
      });
    });
  } catch (err) {
    console.warn('Supabase user_profiles save error:', err);
  }

  // 3. Cập nhật Directory Cache cho tra cứu nhanh
  try {
    await updateDirectoryIndex(user);
  } catch (err) {
    console.warn('Supabase directory cache save warning:', err);
  }

  // Khôi phục tài khoản nếu trước đó từng nằm trong danh sách đã xóa
  try {
    if (typeof window !== 'undefined') {
      const deleted = getDeletedUserIds();
      if (deleted.has(user.id)) {
        deleted.delete(user.id);
        localStorage.setItem(DELETED_USERS_KEY, JSON.stringify(Array.from(deleted)));
      }
    }
  } catch {}

  return true;
}

/**
 * Xóa hoàn toàn một học sinh / người dùng khỏi hệ thống:
 * - Xóa khỏi localStorage `chemai_registered_users`
 * - Ghi nhận vào `chemai_deleted_user_ids` (đảm bảo không bị nạp lại từ seed/default)
 * - Xóa khỏi bảng chuẩn Supabase `user_profiles` (có failover)
 * - Xóa khỏi central directory cache trong bảng `experiments`
 */
export async function deleteUserFromDatabase(userId: string): Promise<boolean> {
  if (!userId) return false;

  // 1. Cập nhật localStorage
  try {
    if (typeof window !== 'undefined') {
      const deleted = getDeletedUserIds();
      deleted.add(userId);
      localStorage.setItem(DELETED_USERS_KEY, JSON.stringify(Array.from(deleted)));

      const currentLocal = getLocalRegisteredUsers().filter(u => u.id !== userId);
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(currentLocal));

      const currentStored = localStorage.getItem(CURRENT_USER_KEY);
      if (currentStored) {
        try {
          const parsed = JSON.parse(currentStored);
          if (parsed && (parsed.id === userId || parsed.emailOrPhone === userId)) {
            localStorage.removeItem(CURRENT_USER_KEY);
          }
        } catch {}
      }
    }
  } catch (e) {
    console.warn('Local storage delete error:', e);
  }

  // 2. Xóa khỏi bảng chuẩn `user_profiles` trên Supabase (kèm Failover)
  try {
    await executeWithFailover(async (client) => {
      return await client
        .from('user_profiles')
        .delete()
        .or(`user_id.eq.${userId},id.eq.${userId},email_or_phone.eq.${userId}`);
    });
  } catch (err) {
    console.warn('Supabase delete user_profiles error:', err);
  }

  // 3. Xóa khỏi Central Directory Cache trong experiments (kèm Failover)
  try {
    await executeWithFailover(async (client) => {
      const { data } = await client
        .from('experiments')
        .select('result_json')
        .eq('cache_key', DIRECTORY_CACHE_KEY)
        .maybeSingle();

      if (data && Array.isArray(data.result_json)) {
        const updatedDirectory = (data.result_json as UserProfile[]).filter(
          u => u.id !== userId && (!u.emailOrPhone || u.emailOrPhone !== userId)
        );
        return await client.from('experiments').upsert({
          cache_key: DIRECTORY_CACHE_KEY,
          result_json: updatedDirectory,
        }, { onConflict: 'cache_key' });
      }
      return { data: null, error: null };
    });
  } catch (err) {
    console.warn('Supabase directory cache delete error:', err);
  }

  return true;
}

/**
 * Fetch a single user by Email, Phone, FullName, or ID from database with failover
 */
export async function fetchUserByIdentifierFromDatabase(identifier: string): Promise<UserProfile | null> {
  const clean = identifier.trim().toLowerCase();
  if (!clean) return null;

  const deletedIds = getDeletedUserIds();
  if (deletedIds.has(identifier) || deletedIds.has(clean)) {
    return null;
  }

  // 1. Check local cache first
  const localUsers = getLocalRegisteredUsers();
  const localMatched = localUsers.find(
    u => u.id === identifier ||
         (u.emailOrPhone && u.emailOrPhone.toLowerCase() === clean) ||
         (u.fullName && u.fullName.toLowerCase() === clean)
  );

  // 2. Query Supabase `user_profiles` table directly via Failover
  try {
    const { data: remoteUser } = await executeWithFailover(async (client) => {
        // Sanitize string to prevent PostgREST syntax injection/errors
        const safeClean = clean.replace(/[,()]/g, '');
        const safeId = identifier.replace(/[,()]/g, '');
        return await client
          .from('user_profiles')
          .select('*')
          .or(`user_id.eq.${safeId},email_or_phone.ilike.${safeClean},full_name.ilike.${safeClean}`)
        .maybeSingle();
    });

    if (remoteUser) {
      const r = remoteUser as any;
      const profile: UserProfile = {
        id: r.user_id || r.id,
        fullName: r.full_name || 'Học sinh',
        authType: r.auth_type || 'email',
        emailOrPhone: r.email_or_phone || '',
        role: r.role || 'student',
        className: r.class_name || '10A1',
        school: r.school || '',
        location: r.location || '',
        createdAt: r.created_at || new Date().toISOString(),
        kahootExp: r.kahoot_exp ?? 0,
        kahootStreak: r.kahoot_streak ?? 0,
        loginStreak: r.login_streak ?? 1,
        nickname: r.nickname || '',
        totalKahootQuestions: r.total_questions ?? 0,
        correctKahootQuestions: r.correct_questions ?? 0,
        teacherEvaluation: r.teacher_evaluation || '',
        lastActiveDate: r.last_active_date || new Date().toISOString().split('T')[0],
      };
      if (deletedIds.has(profile.id) || (profile.emailOrPhone && deletedIds.has(profile.emailOrPhone))) {
        return null;
      }
      saveLocalUser(profile);
      return profile;
    }

    // 3. Fallback sang directory cache nếu `user_profiles` chưa thấy
    const { data: dirData } = await executeWithFailover(async (client) => {
      return await client
        .from('experiments')
        .select('result_json')
        .eq('cache_key', DIRECTORY_CACHE_KEY)
        .maybeSingle();
    });

    const parsedDir = (dirData as any)?.result_json;
    if (parsedDir && Array.isArray(parsedDir)) {
      const found = (parsedDir as UserProfile[]).find(
        u => u.id === identifier ||
             (u.emailOrPhone && u.emailOrPhone.toLowerCase() === clean) ||
             (u.fullName && u.fullName.toLowerCase() === clean)
      );
      if (found) {
        saveLocalUser(found);
        return found;
      }
    }
  } catch (e) {
    console.warn('Database fetch user error:', e);
  }

  // 4. Fallback to local
  return localMatched || null;
}

/**
 * Fetch all registered users from database & local storage with deduplication
 */
export async function fetchAllUsersFromDatabase(): Promise<UserProfile[]> {
  const usersMap = new Map<string, UserProfile>();
  const deletedIds = getDeletedUserIds();

  // Helper to add or merge user into map
  const addOrMergeUser = (u: UserProfile) => {
    if (!u || (!u.id && !u.fullName)) return;
    if (isDemoAccount(u) || u.id?.startsWith('std_seed_')) return;
    if (deletedIds.has(u.id) || (u.emailOrPhone && deletedIds.has(u.emailOrPhone))) {
      return;
    }
    
    // Find existing by ID, or by email, or by (fullName + className)
    let matchedKey: string | null = null;
    if (u.id && usersMap.has(u.id)) {
      matchedKey = u.id;
    } else {
      for (const [key, existing] of usersMap.entries()) {
        if (u.emailOrPhone && existing.emailOrPhone && u.emailOrPhone.toLowerCase() === existing.emailOrPhone.toLowerCase()) {
          matchedKey = key;
          break;
        }
        if (
          u.fullName && existing.fullName &&
          u.fullName.toLowerCase().trim() === existing.fullName.toLowerCase().trim() &&
          (u.className || '').toLowerCase().trim() === (existing.className || '').toLowerCase().trim()
        ) {
          matchedKey = key;
          break;
        }
      }
    }

    if (matchedKey) {
      const existing = usersMap.get(matchedKey)!;
      usersMap.set(matchedKey, {
        ...existing,
        ...u,
        id: existing.id || u.id,
        fullName: existing.fullName || u.fullName,
        className: existing.className || u.className,
        school: existing.school || u.school,
        location: existing.location || u.location,
        kahootExp: Math.max(existing.kahootExp || 0, u.kahootExp || 0),
        kahootStreak: u.kahootStreak !== undefined ? u.kahootStreak : (existing.kahootStreak || 0),
        loginStreak: Math.max(existing.loginStreak || 1, u.loginStreak || 1),
        nickname: u.nickname || existing.nickname || '',
        totalKahootQuestions: Math.max(existing.totalKahootQuestions || 0, u.totalKahootQuestions || 0),
        correctKahootQuestions: Math.max(existing.correctKahootQuestions || 0, u.correctKahootQuestions || 0),
        teacherEvaluation: u.teacherEvaluation || existing.teacherEvaluation || '',
      });
    } else {
      usersMap.set(u.id || `user_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`, u);
    }
  };

  // Load from local storage
  const local = getLocalRegisteredUsers();
  local.forEach(u => addOrMergeUser(u));

  // 1. Tải trước từ bảng chuẩn `user_profiles` với Smart Failover
  let loadedFromProfiles = false;
  try {
    const { data: remoteProfiles } = await executeWithFailover(async (client) => {
      return await client
        .from('user_profiles')
        .select('*')
        .limit(2000);
    });

    if (remoteProfiles && Array.isArray(remoteProfiles) && remoteProfiles.length > 0) {
      loadedFromProfiles = true;
      (remoteProfiles as any[]).forEach((r: any) => {
        const uid = r.user_id || r.id;
        if (uid && !deletedIds.has(uid) && (!r.email_or_phone || !deletedIds.has(r.email_or_phone))) {
          addOrMergeUser({
            id: uid,
            fullName: r.full_name || 'Học sinh',
            authType: r.auth_type || 'email',
            emailOrPhone: r.email_or_phone || '',
            role: r.role || 'student',
            className: r.class_name || '10A1',
            school: r.school || '',
            location: r.location || '',
            createdAt: r.created_at || new Date().toISOString(),
            kahootExp: r.kahoot_exp ?? 0,
            kahootStreak: r.kahoot_streak ?? 0,
            loginStreak: r.login_streak ?? 1,
            nickname: r.nickname || '',
            totalKahootQuestions: r.total_questions ?? 0,
            correctKahootQuestions: r.correct_questions ?? 0,
            teacherEvaluation: r.teacher_evaluation || '',
            lastActiveDate: r.last_active_date || new Date().toISOString().split('T')[0],
          });
        }
      });
    }
  } catch (err) {
    console.warn('Query user_profiles failed, attempting fallback to directory cache:', err);
  }

  // 2. Chỉ fallback sang directory cache nếu `user_profiles` chưa có dữ liệu
  if (!loadedFromProfiles) {
    try {
      const { data: dirData } = await executeWithFailover(async (client) => {
        return await client
          .from('experiments')
          .select('result_json')
          .eq('cache_key', DIRECTORY_CACHE_KEY)
          .maybeSingle();
      });

      const dirList = (dirData as any)?.result_json;
      if (dirList && Array.isArray(dirList)) {
        (dirList as UserProfile[]).forEach(u => addOrMergeUser(u));
      }
    } catch (e) {
      console.warn('Supabase fetch directory warning:', e);
    }
  }

  const mergedList = Array.from(usersMap.values()).filter(
    u => u && u.id && !deletedIds.has(u.id) && (!u.emailOrPhone || !deletedIds.has(u.emailOrPhone))
  );

  // Sync deduplicated merged list back to local storage
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(mergedList));
    }
  } catch {}

  return mergedList;
}

/**
 * Internal helper to update central directory
 */
async function updateDirectoryIndex(newUser: UserProfile) {
  if (isDemoAccount(newUser)) return;
  try {
    await executeWithFailover(async (client) => {
      const { data } = await client
        .from('experiments')
        .select('result_json')
        .eq('cache_key', DIRECTORY_CACHE_KEY)
        .maybeSingle();

      let list: UserProfile[] = [];
      if (data && Array.isArray(data.result_json)) {
        list = data.result_json;
      }

      const idx = list.findIndex(u => 
        u.id === newUser.id || 
        (u.emailOrPhone && newUser.emailOrPhone && u.emailOrPhone.toLowerCase() === newUser.emailOrPhone.toLowerCase()) ||
        (u.fullName && newUser.fullName && u.fullName.toLowerCase().trim() === newUser.fullName.toLowerCase().trim() && (u.className || '').toLowerCase().trim() === (newUser.className || '').toLowerCase().trim())
      );

      if (idx >= 0) {
        list[idx] = { 
          ...list[idx], 
          ...newUser,
          kahootExp: Math.max(list[idx].kahootExp || 0, newUser.kahootExp || 0),
          kahootStreak: newUser.kahootStreak !== undefined ? newUser.kahootStreak : (list[idx].kahootStreak || 0),
          totalKahootQuestions: Math.max(list[idx].totalKahootQuestions || 0, newUser.totalKahootQuestions || 0),
          correctKahootQuestions: Math.max(list[idx].correctKahootQuestions || 0, newUser.correctKahootQuestions || 0),
        };
      } else {
        list.push(newUser);
      }

      return await client.from('experiments').upsert({
        cache_key: DIRECTORY_CACHE_KEY,
        result_json: list,
      }, { onConflict: 'cache_key' });
    });
  } catch (err) {
    console.warn('Directory update warning:', err);
  }
}

/**
 * Helper to get users from localStorage
 */
export function getLocalRegisteredUsers(): UserProfile[] {
  const deletedIds = getDeletedUserIds();
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(LOCAL_USERS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.filter(u => u && u.id && !deletedIds.has(u.id) && (!u.emailOrPhone || !deletedIds.has(u.emailOrPhone)) && !isDemoAccount(u) && !u.id?.startsWith('std_seed_'));
      }
    }
  } catch {}
  return [];
}

function saveLocalUser(user: UserProfile) {
  if (typeof window === 'undefined') return;
  try {
    const list = getLocalRegisteredUsers();
    const idx = list.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...user };
    } else {
      list.push(user);
    }
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(list));
  } catch {}
}
