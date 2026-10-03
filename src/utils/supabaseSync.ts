import { supabase, isSupabaseConfigured } from './supabaseClient';
import type { ScheduledPlan, Transaction, UserProfile, WorkoutSession } from '../types';

/**
 * Supabase Data Sync Service
 * Seamlessly syncs local-first state with cloud PostgreSQL
 */

export async function fetchCloudProfile(userId: string): Promise<Partial<UserProfile> | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !data) return null;

    return {
      name: data.display_name,
      memberId: data.member_id,
      weightKg: Number(data.weight_kg) || 70,
      heightCm: Number(data.height_cm) || 175,
      age: Number(data.age) || 25,
      dailyCalorieTarget: Number(data.daily_calorie_target) || 650,
      gymName: data.gym_name || 'Gym Gym Gym',
      themeMode: data.theme_mode || 'yellow',
      isRegistered: true,
    };
  } catch (err) {
    console.error('Error fetching cloud profile:', err);
    return null;
  }
}

export async function saveCloudProfile(userId: string, profile: UserProfile): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) return false;

  try {
    const { error } = await supabase.from('profiles').upsert({
      id: userId,
      display_name: profile.name,
      member_id: profile.memberId,
      weight_kg: profile.weightKg,
      height_cm: profile.heightCm,
      age: profile.age,
      daily_calorie_target: profile.dailyCalorieTarget,
      gym_name: profile.gymName,
      theme_mode: profile.themeMode,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      console.warn('Error saving cloud profile:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Save cloud profile exception:', err);
    return false;
  }
}

export async function syncWorkoutSession(userId: string, session: WorkoutSession): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  try {
    await supabase.from('workout_sessions').upsert({
      user_id: userId,
      session_date: session.date,
      title: session.title,
      duration_minutes: session.durationMinutes,
      calories_burned: session.caloriesBurned,
    });
  } catch (err) {
    console.warn('Error syncing workout session to cloud:', err);
  }
}

export async function syncScheduledPlan(userId: string, plan: ScheduledPlan): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  try {
    await supabase.from('scheduled_plans').upsert({
      user_id: userId,
      plan_date: plan.date,
      title: plan.title,
      muscle_group: plan.muscleGroupText,
      routine_items: plan.routineItems,
      running_distance_km: plan.runningDistanceKm || 0,
    });
  } catch (err) {
    console.warn('Error syncing scheduled plan to cloud:', err);
  }
}

export async function syncTransaction(userId: string, tx: Transaction): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;

  try {
    await supabase.from('transactions').upsert({
      user_id: userId,
      tx_date: tx.date,
      title: tx.category,
      tx_type: tx.type,
      category: tx.category,
      amount: tx.amount,
      note: tx.note,
    });
  } catch (err) {
    console.warn('Error syncing transaction to cloud:', err);
  }
}
