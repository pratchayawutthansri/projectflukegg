export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'abs' | 'cardio' | 'fullbody';

export interface ExerciseSet {
  id: string;
  setNumber: number;
  weightKg: number;
  reps: number;
  completed: boolean;
}

export interface ExerciseLog {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  sets: ExerciseSet[];
}

export interface RunningSession {
  id: string;
  date: string;
  distanceKm: number; // 1, 2, 5, 10, 15, 20
  durationMinutes: number;
  caloriesBurned: number;
}

export interface WorkoutSession {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  durationMinutes: number;
  caloriesBurned: number;
  exercises: ExerciseLog[];
  runningSessions?: RunningSession[];
  completedAt?: string;
}

export interface RoutineExercise {
  exerciseName: string;
  muscleGroup: MuscleGroup;
  sets: number;
  reps: string; // Defaults to "15 ที"
  restSec: number;
  targetWeightKg: number;
}

export interface ScheduledPlan {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  muscleGroupText: string;
  targetHours: number;
  estimatedCalories: number;
  status: 'pending' | 'completed';
  timeSlot: string;
  routineItems: RoutineExercise[];
  runningDistanceKm?: number;
  notes?: string;
}

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string; // YYYY-MM-DD
  type: TransactionType;
  amount: number;
  category: string;
  note: string;
}

export type ThemeMode = 'yellow' | 'green' | 'cyan' | 'orange' | 'purple' | 'monochrome';
export type Language = 'th' | 'en';

export interface UserProfile {
  name: string;
  memberId?: string; // Optional auto-assigned ID e.g. "FX-007"
  weightKg: number;
  heightCm?: number;
  age?: number;
  dailyCalorieTarget: number;
  gymName: string;
  themeMode: ThemeMode;
  language?: Language;
  isRegistered?: boolean;
  registeredDate?: string;
}
