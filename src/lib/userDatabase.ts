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
      const existingIdx = localUsers.findIndex(u => u.id === user.id || (u.emailOrPhone && u.emailOrPhone.toLowerCase() === user.emailOrPhone.toLowerCase()));
      if (existingIdx >= 0) {
        localUsers[existingIdx] = { ...localUsers[existingIdx], ...user };
      } else {
        localUsers.push(user);
      }
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(localUsers));
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
 * Fetch all registered users from database & local storage
 */
export async function fetchAllUsersFromDatabase(): Promise<UserProfile[]> {
  const usersMap = new Map<string, UserProfile>();

  // Add default accounts
  usersMap.set(DEFAULT_TEACHER_ACCOUNT.id, DEFAULT_TEACHER_ACCOUNT);
  usersMap.set(DEFAULT_STUDENT_ACCOUNT.id, DEFAULT_STUDENT_ACCOUNT);

  // Load from local storage
  const local = getLocalRegisteredUsers();
  local.forEach(u => {
    if (u && u.id) usersMap.set(u.id, u);
  });

  // Load from Supabase `experiments` (directory cache)
  try {
    const { data: dirData } = await supabase
      .from('experiments')
      .select('result_json')
      .eq('cache_key', DIRECTORY_CACHE_KEY)
      .maybeSingle();

    if (dirData && Array.isArray(dirData.result_json)) {
      (dirData.result_json as UserProfile[]).forEach(u => {
        if (u && u.id) {
          const existing = usersMap.get(u.id);
          usersMap.set(u.id, { ...existing, ...u });
        }
      });
    }

    // Also scan any individual user profile records
    const { data: allProfiles } = await supabase
      .from('experiments')
      .select('result_json')
      .like('cache_key', 'user_profile_%')
      .limit(100);

    if (allProfiles && allProfiles.length > 0) {
      allProfiles.forEach(row => {
        if (row.result_json && (row.result_json as UserProfile).id) {
          const u = row.result_json as UserProfile;
          const existing = usersMap.get(u.id);
          usersMap.set(u.id, { ...existing, ...u });
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
      .select('*');

    if (remoteProfiles && remoteProfiles.length > 0) {
      remoteProfiles.forEach(r => {
        const uid = r.user_id || r.id;
        if (uid) {
          const existing = usersMap.get(uid);
          usersMap.set(uid, {
            id: uid,
            fullName: r.full_name || existing?.fullName || 'Học sinh',
            authType: r.auth_type || existing?.authType || 'email',
            emailOrPhone: r.email_or_phone || existing?.emailOrPhone || '',
            role: r.role || existing?.role || 'student',
            className: r.class_name || existing?.className || '10A1',
            school: r.school || existing?.school || '',
            location: r.location || existing?.location || '',
            createdAt: r.created_at || existing?.createdAt || new Date().toISOString(),
            kahootExp: r.kahoot_exp ?? existing?.kahootExp ?? 0,
            kahootStreak: r.kahoot_streak ?? existing?.kahootStreak ?? 0,
            loginStreak: r.login_streak ?? existing?.loginStreak ?? 1,
            nickname: r.nickname || existing?.nickname || '',
            totalKahootQuestions: r.total_questions ?? existing?.totalKahootQuestions ?? 0,
            correctKahootQuestions: r.correct_questions ?? existing?.correctKahootQuestions ?? 0,
            teacherEvaluation: r.teacher_evaluation || existing?.teacherEvaluation || '',
            lastActiveDate: r.last_active_date || existing?.lastActiveDate || new Date().toISOString().split('T')[0],
            password: existing?.password,
          });
        }
      });
    }
  } catch {}

  const mergedList = Array.from(usersMap.values());

  // Sync back to local storage
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

    const idx = list.findIndex(u => u.id === newUser.id || (u.emailOrPhone && u.emailOrPhone.toLowerCase() === newUser.emailOrPhone.toLowerCase()));
    if (idx >= 0) {
      list[idx] = { ...list[idx], ...newUser };
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
