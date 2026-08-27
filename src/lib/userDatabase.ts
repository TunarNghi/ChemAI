import { supabase } from '@/lib/api';
import { UserProfile, DEFAULT_TEACHER_ACCOUNT, DEFAULT_STUDENT_ACCOUNT } from '@/components/UserAuthModal';

const LOCAL_USERS_KEY = 'chemai_registered_users';
const CURRENT_USER_KEY = 'chemai_current_user';
const DIRECTORY_CACHE_KEY = 'all_registered_users_directory';

/**
 * Save or update a user profile to Supabase database (and local cache)
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

  // 2. Persist to Supabase `experiments` table
  try {
    // Save specific user profile
    await supabase.from('experiments').upsert({
      cache_key: `user_profile_${user.id}`,
      result_json: user,
    }, { onConflict: 'cache_key' });

    // Save auth index by email/phone
    if (user.emailOrPhone) {
      await supabase.from('experiments').upsert({
        cache_key: `user_auth_${user.emailOrPhone.toLowerCase().trim()}`,
        result_json: user,
      }, { onConflict: 'cache_key' });
    }

    // Save auth index by full name
    if (user.fullName) {
      await supabase.from('experiments').upsert({
        cache_key: `user_auth_${user.fullName.toLowerCase().trim()}`,
        result_json: user,
      }, { onConflict: 'cache_key' });
    }

    // Update the directory
    await updateDirectoryIndex(user);
  } catch (err) {
    console.warn('Supabase experiments user save warning:', err);
  }

  // 3. Optional sync to `user_profiles` table if created
  try {
    await supabase.from('user_profiles').upsert({
      user_id: user.id,
      full_name: user.fullName,
      auth_type: user.authType,
      email_or_phone: user.emailOrPhone,
      role: user.role,
      class_name: user.className,
      school: user.school,
      location: user.location,
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
  } catch {
    // Ignore if user_profiles table is not yet created
  }

  return true;
}

/**
 * Fetch a single user by Email, Phone, FullName, or ID from database
 */
export async function fetchUserByIdentifierFromDatabase(identifier: string): Promise<UserProfile | null> {
  const clean = identifier.trim().toLowerCase();
  if (!clean) return null;

  // 1. Check local cache first
  const localUsers = getLocalRegisteredUsers();
  const localMatched = localUsers.find(
    u => u.id === identifier ||
         (u.emailOrPhone && u.emailOrPhone.toLowerCase() === clean) ||
         (u.fullName && u.fullName.toLowerCase() === clean)
  );

  // 2. Query Supabase `experiments` table
  try {
    // Query by auth key
    const { data: authData } = await supabase
      .from('experiments')
      .select('result_json')
      .eq('cache_key', `user_auth_${clean}`)
      .maybeSingle();

    if (authData && authData.result_json) {
      const user = authData.result_json as UserProfile;
      saveLocalUser(user);
      return user;
    }

    // Query by profile ID key
    const { data: profileData } = await supabase
      .from('experiments')
      .select('result_json')
      .eq('cache_key', `user_profile_${clean}`)
      .maybeSingle();

    if (profileData && profileData.result_json) {
      const user = profileData.result_json as UserProfile;
      saveLocalUser(user);
      return user;
    }

    // Query directory index
    const { data: dirData } = await supabase
      .from('experiments')
      .select('result_json')
      .eq('cache_key', DIRECTORY_CACHE_KEY)
      .maybeSingle();

    if (dirData && Array.isArray(dirData.result_json)) {
      const found = (dirData.result_json as UserProfile[]).find(
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

  // 3. Fallback to local
  return localMatched || null;
}

/**
 * Fetch all registered users from database & local storage with deduplication
 */
export async function fetchAllUsersFromDatabase(): Promise<UserProfile[]> {
  const usersMap = new Map<string, UserProfile>();

  // Add default accounts
  usersMap.set(DEFAULT_TEACHER_ACCOUNT.id, DEFAULT_TEACHER_ACCOUNT);
  usersMap.set(DEFAULT_STUDENT_ACCOUNT.id, DEFAULT_STUDENT_ACCOUNT);

  // Helper to add or merge user into map
  const addOrMergeUser = (u: UserProfile) => {
    if (!u || (!u.id && !u.fullName)) return;
    
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

  // Load from Supabase `experiments` (directory cache)
  try {
    const { data: dirData } = await supabase
      .from('experiments')
      .select('result_json')
      .eq('cache_key', DIRECTORY_CACHE_KEY)
      .maybeSingle();

    if (dirData && Array.isArray(dirData.result_json)) {
      (dirData.result_json as UserProfile[]).forEach(u => addOrMergeUser(u));
    }

    // Also scan all individual user profile records (up to 2000)
    const { data: allProfiles } = await supabase
      .from('experiments')
      .select('result_json')
      .like('cache_key', 'user_profile_%')
      .limit(2000);

    if (allProfiles && allProfiles.length > 0) {
      allProfiles.forEach(row => {
        if (row.result_json && typeof row.result_json === 'object') {
          addOrMergeUser(row.result_json as UserProfile);
        }
      });
    }
  } catch (e) {
    console.warn('Supabase fetch directory warning:', e);
  }

  // Load from `user_profiles` table if available
  try {
    const { data: remoteProfiles } = await supabase
      .from('user_profiles')
      .select('*')
      .limit(2000);

    if (remoteProfiles && remoteProfiles.length > 0) {
      remoteProfiles.forEach(r => {
        const uid = r.user_id || r.id;
        if (uid) {
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
  } catch {}

  const mergedList = Array.from(usersMap.values());

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
  try {
    const { data } = await supabase
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

    await supabase.from('experiments').upsert({
      cache_key: DIRECTORY_CACHE_KEY,
      result_json: list,
    }, { onConflict: 'cache_key' });
  } catch (err) {
    console.warn('Directory update warning:', err);
  }
}

/**
 * Helper to get users from localStorage
 */
export function getLocalRegisteredUsers(): UserProfile[] {
  if (typeof window === 'undefined') return [DEFAULT_TEACHER_ACCOUNT, DEFAULT_STUDENT_ACCOUNT];
  try {
    const data = localStorage.getItem(LOCAL_USERS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  return [DEFAULT_TEACHER_ACCOUNT, DEFAULT_STUDENT_ACCOUNT];
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
