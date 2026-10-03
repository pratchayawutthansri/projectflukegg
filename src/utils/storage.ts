import type { ScheduledPlan, Transaction, UserProfile, WorkoutSession } from '../types';

const STORAGE_KEYS = {
  USER_PROFILE: 'flukexd_gym_user_profile',
  WORKOUT_SESSIONS: 'flukexd_gym_workout_sessions',
  SCHEDULED_PLANS: 'flukexd_gym_scheduled_plans',
  TRANSACTIONS: 'flukexd_gym_transactions',
};

const getTodayString = () => new Date().toISOString().split('T')[0];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'ผู้เยี่ยมชม (Guest)',
  memberId: undefined,
  weightKg: 70,
  heightCm: 175,
  age: 25,
  dailyCalorieTarget: 650,
  gymName: 'Gym Gym Gym',
  themeMode: 'yellow',
  language: 'th',
  isRegistered: false,
  registeredDate: undefined,
};

// Clean slate: No mock workout sessions
export const INITIAL_WORKOUT_SESSIONS: WorkoutSession[] = [];

// Clean slate: No mock scheduled plans
export const INITIAL_SCHEDULED_PLANS: ScheduledPlan[] = [];

// Clean slate: No mock financial transactions
export const INITIAL_TRANSACTIONS: Transaction[] = [];

// Helper to create an empty today workout session
export const getEmptyWorkoutSession = (): WorkoutSession => ({
  id: 'ws_' + Date.now(),
  date: getTodayString(),
  title: 'บันทึกการซ้อมวันนี้',
  durationMinutes: 0,
  caloriesBurned: 0,
  exercises: [],
  runningSessions: [],
});

export function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    const parsed = JSON.parse(item);

    // Sanitize user profile
    if (key === STORAGE_KEYS.USER_PROFILE && parsed && typeof parsed === 'object') {
      if (parsed.name && typeof parsed.name === 'string') {
        parsed.name = parsed.name
          .replace(/\s*\(FLUKEXD Gym\)/gi, '')
          .replace(/FLUKEXD\s*Gym/gi, 'Gym Gym Gym')
          .trim();
      }
      if (parsed.gymName) {
        parsed.gymName = 'Gym Gym Gym';
      }
      if (parsed.name === 'ผู้เยี่ยมชม (Guest)' || !parsed.memberId) {
        parsed.isRegistered = false;
      }
    }

    // Clean out legacy mock data if present
    if (key === STORAGE_KEYS.WORKOUT_SESSIONS && Array.isArray(parsed)) {
      const cleaned = parsed.filter((s: WorkoutSession) => s.id !== 'ws_fluke_1');
      return cleaned as T;
    }

    if (key === STORAGE_KEYS.SCHEDULED_PLANS && Array.isArray(parsed)) {
      const cleaned = parsed.filter((p: ScheduledPlan) => p.id !== 'plan_today');
      return cleaned as T;
    }

    if (key === STORAGE_KEYS.TRANSACTIONS && Array.isArray(parsed)) {
      const cleaned = parsed.filter((t: Transaction) => !['tx_1', 'tx_2', 'tx_3', 'tx_4'].includes(t.id));
      return cleaned as T;
    }

    return parsed as T;
  } catch (e) {
    console.error(`Error loading key ${key}:`, e);
    return fallback;
  }
}

export function saveStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving key ${key}:`, e);
  }
}

export function clearAllData(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.WORKOUT_SESSIONS);
    localStorage.removeItem(STORAGE_KEYS.SCHEDULED_PLANS);
    localStorage.removeItem(STORAGE_KEYS.TRANSACTIONS);
    saveStorage(STORAGE_KEYS.WORKOUT_SESSIONS, []);
    saveStorage(STORAGE_KEYS.SCHEDULED_PLANS, []);
    saveStorage(STORAGE_KEYS.TRANSACTIONS, []);
  } catch (e) {
    console.error('Error clearing all data:', e);
  }
}

export { STORAGE_KEYS, getTodayString };
