import type { ExerciseLog, MuscleGroup, RoutineExercise, RunningSession, ScheduledPlan } from '../types';

// Standard Exercise Library - Set default to 15 Reps (15 ที) as specified by user
export const EXERCISE_LIBRARY: Record<MuscleGroup, Array<{ name: string; isCompound: boolean; baseWeight: number; defaultReps: string; restSec: number }>> = {
  chest: [
    { name: 'Barbell Bench Press', isCompound: true, baseWeight: 50, defaultReps: '15 ที', restSec: 60 },
    { name: 'Incline Dumbbell Press', isCompound: true, baseWeight: 20, defaultReps: '15 ที', restSec: 60 },
    { name: 'Cable Chest Flyes', isCompound: false, baseWeight: 15, defaultReps: '15 ที', restSec: 45 },
    { name: 'Pec Deck Machine', isCompound: false, baseWeight: 35, defaultReps: '15 ที', restSec: 45 },
    { name: 'Chest Press Machine', isCompound: true, baseWeight: 40, defaultReps: '15 ที', restSec: 60 },
  ],
  back: [
    { name: 'Lat Pulldown', isCompound: true, baseWeight: 45, defaultReps: '15 ที', restSec: 60 },
    { name: 'Seated Cable Row', isCompound: false, baseWeight: 40, defaultReps: '15 ที', restSec: 45 },
    { name: 'Barbell Bent-over Row', isCompound: true, baseWeight: 40, defaultReps: '15 ที', restSec: 60 },
    { name: 'Deadlift', isCompound: true, baseWeight: 60, defaultReps: '15 ที', restSec: 90 },
    { name: 'Face Pulls', isCompound: false, baseWeight: 18, defaultReps: '15 ที', restSec: 45 },
  ],
  legs: [
    { name: 'Leg Press 45°', isCompound: true, baseWeight: 80, defaultReps: '15 ที', restSec: 60 },
    { name: 'Barbell Squat', isCompound: true, baseWeight: 50, defaultReps: '15 ที', restSec: 90 },
    { name: 'Leg Extension', isCompound: false, baseWeight: 35, defaultReps: '15 ที', restSec: 45 },
    { name: 'Lying Leg Curl', isCompound: false, baseWeight: 30, defaultReps: '15 ที', restSec: 45 },
    { name: 'Standing Calf Raise', isCompound: false, baseWeight: 40, defaultReps: '15 ที', restSec: 45 },
  ],
  shoulders: [
    { name: 'Overhead Dumbbell Press', isCompound: true, baseWeight: 16, defaultReps: '15 ที', restSec: 60 },
    { name: 'Dumbbell Lateral Raise', isCompound: false, baseWeight: 8, defaultReps: '15 ที', restSec: 45 },
    { name: 'Shoulder Press Machine', isCompound: true, baseWeight: 30, defaultReps: '15 ที', restSec: 45 },
    { name: 'Cable Lateral Raise', isCompound: false, baseWeight: 8, defaultReps: '15 ที', restSec: 45 },
    { name: 'Reverse Pec Deck Fly', isCompound: false, baseWeight: 25, defaultReps: '15 ที', restSec: 45 },
  ],
  arms: [
    { name: 'Barbell Bicep Curl', isCompound: false, baseWeight: 20, defaultReps: '15 ที', restSec: 45 },
    { name: 'Tricep Rope Pushdown', isCompound: false, baseWeight: 22, defaultReps: '15 ที', restSec: 45 },
    { name: 'Dumbbell Hammer Curl', isCompound: false, baseWeight: 12, defaultReps: '15 ที', restSec: 45 },
    { name: 'Preacher Curl Machine', isCompound: false, baseWeight: 25, defaultReps: '15 ที', restSec: 45 },
    { name: 'Tricep Overhead Extension', isCompound: false, baseWeight: 15, defaultReps: '15 ที', restSec: 45 },
  ],
  abs: [
    { name: 'Cable Crunch', isCompound: false, baseWeight: 30, defaultReps: '15 ที', restSec: 45 },
    { name: 'Hanging Leg Raise', isCompound: false, baseWeight: 0, defaultReps: '15 ที', restSec: 45 },
    { name: 'Abdominal Crunch Machine', isCompound: false, baseWeight: 35, defaultReps: '15 ที', restSec: 45 },
    { name: 'Russian Twist with Plate', isCompound: false, baseWeight: 10, defaultReps: '15 ที', restSec: 45 },
  ],
  cardio: [
    { name: 'Treadmill Interval Run', isCompound: false, baseWeight: 0, defaultReps: '15 นาที', restSec: 0 },
    { name: 'Stairmaster', isCompound: false, baseWeight: 0, defaultReps: '15 นาที', restSec: 0 },
  ],
  fullbody: [
    { name: 'Leg Press 45°', isCompound: true, baseWeight: 80, defaultReps: '15 ที', restSec: 60 },
    { name: 'Chest Press Machine', isCompound: true, baseWeight: 40, defaultReps: '15 ที', restSec: 60 },
    { name: 'Lat Pulldown', isCompound: true, baseWeight: 45, defaultReps: '15 ที', restSec: 60 },
    { name: 'Shoulder Press Machine', isCompound: true, baseWeight: 30, defaultReps: '15 ที', restSec: 45 },
    { name: 'Cable Crunch', isCompound: false, baseWeight: 30, defaultReps: '15 ที', restSec: 45 },
  ]
};

// Running Distance Presets (1, 2, 5, 10, 15, 20 km)
export const RUNNING_DISTANCES = [1, 2, 5, 10, 15, 20] as const;

export interface RunningEstimate {
  distanceKm: number;
  durationMinutes: number;
  caloriesBurned: number;
  paceStr: string;
}

/**
 * Running Calorie & Time Estimation Engine
 * Standard runner formula: Calories = Distance (km) * BodyWeight (kg) * 1.036
 */
export function calculateRunningDetails(distanceKm: number, userWeightKg: number = 70): RunningEstimate {
  // Estimated average running pace: ~6.0 min/km
  const durationMinutes = Math.round(distanceKm * 6.0);
  const caloriesBurned = Math.round(distanceKm * userWeightKg * 1.036);
  return {
    distanceKm,
    durationMinutes,
    caloriesBurned,
    paceStr: '6:00 min/km',
  };
}

/**
 * Calorie calculation for gym lifting session
 */
export function calculateWorkoutCalories(
  durationMinutes: number,
  exercises: ExerciseLog[],
  userWeightKg: number = 70
): number {
  if (durationMinutes <= 0 && exercises.length === 0) return 0;

  // Base MET for gym lifting ~ 5.5
  const baseMET = 5.5;
  const baseCalories = (baseMET * 3.5 * userWeightKg / 200) * Math.max(durationMinutes, exercises.length * 4);

  // Volume load bonus
  let totalVolumeKg = 0;
  exercises.forEach(ex => {
    ex.sets.forEach(set => {
      if (set.completed && set.reps > 0) {
        totalVolumeKg += (set.weightKg || 0) * set.reps;
      }
    });
  });

  const volumeBonusCalories = (totalVolumeKg / 1000) * 30;
  return Math.round(baseCalories + volumeBonusCalories);
}

/**
 * Total Daily Calorie Aggregator
 */
export function calculateDailyTotalCalories(
  liftingCalories: number,
  runningSessions: RunningSession[] = []
): number {
  const runningCal = runningSessions.reduce((acc, r) => acc + r.caloriesBurned, 0);
  return liftingCalories + runningCal;
}

/**
 * Smart Schedule & Routine Generator (Clean, Direct, Non-AI gimmicky)
 */
export function parseAndGeneratePlan(
  promptText: string,
  targetDate: string,
  userWeightKg: number = 70
): ScheduledPlan {
  const text = promptText.toLowerCase().trim();

  // 1. Detect running distance if mentioned (e.g. วิ่ง 5 โล, 10 km, etc.)
  let detectedRunningKm: number | undefined = undefined;
  for (const km of RUNNING_DISTANCES) {
    if (text.includes(`${km} โล`) || text.includes(`${km} กิโล`) || text.includes(`${km} กม`) || text.includes(`${km}km`)) {
      detectedRunningKm = km;
      break;
    }
  }

  // 2. Detect target hours / duration
  let targetHours = 1.0;
  let durationMinutes = 60;

  const hourMatch = text.match(/([0-9.]+)\s*(ชม|ชม\.|ชั่วโมง|hr|hrs|hour|hours)/);
  const minMatch = text.match(/([0-9]+)\s*(นาที|min|mins|minute|minutes)/);

  if (hourMatch && hourMatch[1]) {
    targetHours = parseFloat(hourMatch[1]);
    durationMinutes = Math.round(targetHours * 60);
  } else if (minMatch && minMatch[1]) {
    durationMinutes = parseInt(minMatch[1], 10);
    targetHours = Math.round((durationMinutes / 60) * 10) / 10;
  }

  if (targetHours < 0.3) {
    targetHours = 0.5;
    durationMinutes = 30;
  }

  // 3. Detect targeted muscle groups
  const detectedGroups: MuscleGroup[] = [];

  if (text.includes('อก') || text.includes('chest')) detectedGroups.push('chest');
  if (text.includes('หลัง') || text.includes('back')) detectedGroups.push('back');
  if (text.includes('ขา') || text.includes('leg') || text.includes('squat')) detectedGroups.push('legs');
  if (text.includes('ไหล่') || text.includes('shoulder')) detectedGroups.push('shoulders');
  if (text.includes('แขน') || text.includes('หน้าแขน') || text.includes('หลังแขน') || text.includes('arm')) detectedGroups.push('arms');
  if (text.includes('ท้อง') || text.includes('abs')) detectedGroups.push('abs');

  if (detectedGroups.length === 0 && !detectedRunningKm) {
    detectedGroups.push('chest', 'arms');
  }

  // Number of machine exercises (each 1 set of 15 reps)
  const numExercises = Math.max(3, Math.min(8, Math.round(durationMinutes / 12)));
  const routineItems: RoutineExercise[] = [];
  const exercisesPerGroup = Math.ceil(numExercises / Math.max(1, detectedGroups.length));

  detectedGroups.forEach(group => {
    const lib = EXERCISE_LIBRARY[group] || EXERCISE_LIBRARY.chest;
    const countToPick = Math.min(exercisesPerGroup, lib.length);
    for (let i = 0; i < countToPick; i++) {
      if (routineItems.length < numExercises) {
        const item = lib[i % lib.length];
        routineItems.push({
          exerciseName: item.name,
          muscleGroup: group,
          sets: 1, // 1 set per exercise as requested!
          reps: '15 ที', // 15 reps as requested!
          restSec: item.restSec,
          targetWeightKg: Math.round(item.baseWeight)
        });
      }
    }
  });

  // Calculate estimated calories
  let estimatedCalories = Math.round((5.5 * 3.5 * userWeightKg / 200) * durationMinutes * 1.1);
  if (detectedRunningKm) {
    estimatedCalories += Math.round(detectedRunningKm * userWeightKg * 1.036);
  }

  const groupLabels: Record<MuscleGroup, string> = {
    chest: 'อก',
    back: 'หลัง',
    legs: 'ขา',
    shoulders: 'ไหล่',
    arms: 'แขน',
    abs: 'หน้าท้อง',
    cardio: 'คาร์ดิโอ',
    fullbody: 'ทั่วร่าง'
  };

  const groupTitle = detectedGroups.length > 0 
    ? detectedGroups.map(g => groupLabels[g]).join(' + ')
    : 'วิ่งคาร์ดิโอ';

  const fullTitle = detectedRunningKm 
    ? `โปรแกรม ${groupTitle} + วิ่ง ${detectedRunningKm} โล (${targetHours} ชม.)`
    : `โปรแกรม ${groupTitle} (${targetHours} ชม.)`;

  return {
    id: 'plan_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    date: targetDate,
    title: fullTitle,
    muscleGroupText: groupTitle,
    targetHours,
    estimatedCalories,
    status: 'pending',
    timeSlot: '17:30 - ' + addMinutesToTimeString('17:30', durationMinutes),
    routineItems,
    runningDistanceKm: detectedRunningKm,
    notes: `Gym Gym Gym: เครื่องเล่นเซ็ตละ 15 ที รวม ${routineItems.length} เครื่องเล่น` + (detectedRunningKm ? ` + วิ่ง ${detectedRunningKm} กม.` : '')
  };
}

function addMinutesToTimeString(timeStr: string, minutesToAdd: number): string {
  const [hStr, mStr] = timeStr.split(':');
  let hours = parseInt(hStr, 10);
  let mins = parseInt(mStr, 10) + minutesToAdd;
  hours = (hours + Math.floor(mins / 60)) % 24;
  mins = mins % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}
