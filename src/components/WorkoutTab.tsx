import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  Circle,
  Timer,
  Flame,
  Check,
  ChevronRight,
  Navigation,
  X,
} from 'lucide-react';
import type { ExerciseLog, ExerciseSet, MuscleGroup, RunningSession, UserProfile, WorkoutSession } from '../types';
import { calculateRunningDetails, calculateWorkoutCalories, RUNNING_DISTANCES } from '../utils/workoutEngine';
import { getTranslation, translateRoutineTitle } from '../utils/translations';

interface WorkoutTabProps {
  currentSession: WorkoutSession;
  onUpdateSession: (session: WorkoutSession) => void;
  onCompleteSession: (session: WorkoutSession) => void;
  userProfile: UserProfile;
}

const COMMON_MACHINES: { name: string; muscle: MuscleGroup }[] = [
  { name: 'Chest Press Machine', muscle: 'chest' },
  { name: 'Pec Deck Machine (อก)', muscle: 'chest' },
  { name: 'Incline Dumbbell Press', muscle: 'chest' },
  { name: 'Lat Pulldown Machine', muscle: 'back' },
  { name: 'Seated Cable Row (หลัง)', muscle: 'back' },
  { name: 'Leg Press 45°', muscle: 'legs' },
  { name: 'Leg Extension (ขาหน้า)', muscle: 'legs' },
  { name: 'Lying Leg Curl (ขาหลัง)', muscle: 'legs' },
  { name: 'Shoulder Press Machine', muscle: 'shoulders' },
  { name: 'Dumbbell Lateral Raise', muscle: 'shoulders' },
  { name: 'Preacher Curl Machine (หน้าแขน)', muscle: 'arms' },
  { name: 'Tricep Rope Pushdown (หลังแขน)', muscle: 'arms' },
  { name: 'Cable Crunch Machine (หน้าท้อง)', muscle: 'abs' },
];

export const WorkoutTab: React.FC<WorkoutTabProps> = ({
  currentSession,
  onUpdateSession,
  onCompleteSession,
  userProfile,
}) => {
  const t = getTranslation(userProfile.language || 'th');

  // Session Timer
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [elapsedSeconds, setElapsedSeconds] = useState(currentSession.durationMinutes * 60);

  // Rest Timer
  const [restSecondsRemaining, setRestSecondsRemaining] = useState<number | null>(null);
  const [isRestActive, setIsRestActive] = useState(false);

  // Modal / Exercise selection
  const [showAddMachine, setShowAddMachine] = useState(false);
  const [customMachineName, setCustomMachineName] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup>('chest');

  // Quick inline add machine input
  const [inlineMachineName, setInlineMachineName] = useState('');
  const [inlineMuscle, setInlineMuscle] = useState<MuscleGroup>('chest');

  // Elapsed workout timer
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Periodic sync of duration & calories to session every 30 seconds
  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      const minutes = Math.floor(elapsedSeconds / 60);
      const liftingCal = calculateWorkoutCalories(minutes, currentSession.exercises, userProfile.weightKg);
      const runningCal = (currentSession.runningSessions || []).reduce((acc, r) => acc + r.caloriesBurned, 0);
      onUpdateSession({
        ...currentSession,
        durationMinutes: minutes,
        caloriesBurned: liftingCal + runningCal,
      });
    }, 30000);
    return () => clearInterval(interval);
  }, [isTimerRunning, elapsedSeconds, currentSession, userProfile.weightKg, onUpdateSession]);

  // Rest countdown timer
  useEffect(() => {
    let interval: any = null;
    if (isRestActive && restSecondsRemaining !== null && restSecondsRemaining > 0) {
      interval = setInterval(() => {
        setRestSecondsRemaining((prev) => (prev !== null && prev > 1 ? prev - 1 : 0));
      }, 1000);
    } else if (restSecondsRemaining === 0) {
      setIsRestActive(false);
    }
    return () => clearInterval(interval);
  }, [isRestActive, restSecondsRemaining]);

  const startRestTimer = (seconds: number) => {
    setRestSecondsRemaining(seconds);
    setIsRestActive(true);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Add new machine exercise: Defaults to 1 SET OF 15 REPS (15 ที)
  const handleAddMachine = (name: string, muscle: MuscleGroup) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const newEx: ExerciseLog = {
      id: 'ex_' + Date.now(),
      name: trimmed,
      muscleGroup: muscle,
      sets: [
        { id: 's_1', setNumber: 1, weightKg: 30, reps: 15, completed: false },
      ],
    };
    const updatedExercises = [...currentSession.exercises, newEx];
    const minutes = Math.max(1, Math.floor(elapsedSeconds / 60));
    const liftingCal = calculateWorkoutCalories(minutes, updatedExercises, userProfile.weightKg);
    const runningCal = (currentSession.runningSessions || []).reduce((acc, r) => acc + r.caloriesBurned, 0);

    onUpdateSession({
      ...currentSession,
      exercises: updatedExercises,
      caloriesBurned: liftingCal + runningCal,
    });
    setShowAddMachine(false);
    setCustomMachineName('');
    setInlineMachineName('');
  };

  // Update exercise name inline
  const handleUpdateExerciseName = (exerciseId: string, newName: string) => {
    const updated = currentSession.exercises.map((e) =>
      e.id === exerciseId ? { ...e, name: newName } : e
    );
    onUpdateSession({ ...currentSession, exercises: updated });
  };

  // Quick 1-tap add running distance (1, 2, 5, 10, 15, 20 km)
  const handleAddRunning = (distanceKm: number) => {
    const details = calculateRunningDetails(distanceKm, userProfile.weightKg);
    const newRun: RunningSession = {
      id: 'run_' + Date.now(),
      date: currentSession.date,
      distanceKm,
      durationMinutes: details.durationMinutes,
      caloriesBurned: details.caloriesBurned,
    };

    const currentRuns = currentSession.runningSessions || [];
    const updatedRuns = [...currentRuns, newRun];
    const minutes = Math.max(1, Math.floor(elapsedSeconds / 60));
    const liftingCal = calculateWorkoutCalories(minutes, currentSession.exercises, userProfile.weightKg);
    const totalRunningCal = updatedRuns.reduce((acc, r) => acc + r.caloriesBurned, 0);

    onUpdateSession({
      ...currentSession,
      runningSessions: updatedRuns,
      caloriesBurned: liftingCal + totalRunningCal,
    });
  };

  // Remove running session
  const handleRemoveRunning = (runId: string) => {
    const updatedRuns = (currentSession.runningSessions || []).filter(r => r.id !== runId);
    const minutes = Math.max(1, Math.floor(elapsedSeconds / 60));
    const liftingCal = calculateWorkoutCalories(minutes, currentSession.exercises, userProfile.weightKg);
    const totalRunningCal = updatedRuns.reduce((acc, r) => acc + r.caloriesBurned, 0);

    onUpdateSession({
      ...currentSession,
      runningSessions: updatedRuns,
      caloriesBurned: liftingCal + totalRunningCal,
    });
  };

  // Set toggle checkmark
  const handleToggleSet = (exerciseId: string, setId: string) => {
    const updatedExercises = currentSession.exercises.map((ex) => {
      if (ex.id !== exerciseId) return ex;
      return {
        ...ex,
        sets: ex.sets.map((s) => {
          if (s.id !== setId) return s;
          const nextCompleted = !s.completed;
          if (nextCompleted) {
            startRestTimer(45);
          }
          return { ...s, completed: nextCompleted };
        }),
      };
    });
    const minutes = Math.max(1, Math.floor(elapsedSeconds / 60));
    const liftingCal = calculateWorkoutCalories(minutes, updatedExercises, userProfile.weightKg);
    const runningCal = (currentSession.runningSessions || []).reduce((acc, r) => acc + r.caloriesBurned, 0);

    onUpdateSession({
      ...currentSession,
      exercises: updatedExercises,
      caloriesBurned: liftingCal + runningCal,
      durationMinutes: minutes,
    });
  };

  const handleUpdateSet = (
    exerciseId: string,
    setId: string,
    field: 'weightKg' | 'reps',
    val: number
  ) => {
    const updatedExercises = currentSession.exercises.map((ex) => {
      if (ex.id !== exerciseId) return ex;
      return {
        ...ex,
        sets: ex.sets.map((s) => (s.id === setId ? { ...s, [field]: Math.max(0, val) } : s)),
      };
    });
    const minutes = Math.max(1, Math.floor(elapsedSeconds / 60));
    const liftingCal = calculateWorkoutCalories(minutes, updatedExercises, userProfile.weightKg);
    const runningCal = (currentSession.runningSessions || []).reduce((acc, r) => acc + r.caloriesBurned, 0);

    onUpdateSession({
      ...currentSession,
      exercises: updatedExercises,
      caloriesBurned: liftingCal + runningCal,
    });
  };

  const handleAddSet = (exerciseId: string) => {
    const updatedExercises = currentSession.exercises.map((ex) => {
      if (ex.id !== exerciseId) return ex;
      const lastSet = ex.sets[ex.sets.length - 1];
      const newSet: ExerciseSet = {
        id: 's_' + Date.now(),
        setNumber: ex.sets.length + 1,
        weightKg: lastSet ? lastSet.weightKg : 30,
        reps: 15, // 15 reps default!
        completed: false,
      };
      return {
        ...ex,
        sets: [...ex.sets, newSet],
      };
    });
    onUpdateSession({
      ...currentSession,
      exercises: updatedExercises,
    });
  };

  const handleRemoveExercise = (exerciseId: string) => {
    const updatedExercises = currentSession.exercises.filter((e) => e.id !== exerciseId);
    const minutes = Math.max(1, Math.floor(elapsedSeconds / 60));
    const liftingCal = calculateWorkoutCalories(minutes, updatedExercises, userProfile.weightKg);
    const runningCal = (currentSession.runningSessions || []).reduce((acc, r) => acc + r.caloriesBurned, 0);

    onUpdateSession({
      ...currentSession,
      exercises: updatedExercises,
      caloriesBurned: liftingCal + runningCal,
    });
  };

  // Metrics
  const totalCompletedSets = currentSession.exercises.reduce(
    (acc, ex) => acc + ex.sets.filter((s) => s.completed).length,
    0
  );
  const totalRepsDone = currentSession.exercises.reduce(
    (acc, ex) =>
      acc + ex.sets.filter((s) => s.completed).reduce((rAcc, s) => rAcc + (s.reps || 0), 0),
    0
  );
  const totalRunningKm = (currentSession.runningSessions || []).reduce((acc, r) => acc + r.distanceKm, 0);

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Active Gym HUD Card */}
      <div
        style={{
          background: 'var(--theme-card-bg, #0a0a0c)',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '20px',
          border: '2px solid var(--theme-card-border, #0a0a0c)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  boxShadow: '0 0 8px #ffffff',
                }}
              />
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  color: '#ffffff',
                }}
              >
                {t.gymLive}
              </span>
            </div>
            <h1
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '19px',
                fontWeight: 800,
                margin: '4px 0 0 0',
                color: '#ffffff',
              }}
            >
              {translateRoutineTitle(currentSession.title, userProfile.language || 'th')}
            </h1>
          </div>

          {/* Timer Play/Pause */}
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
              border: '1.5px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '50%',
              width: '42px',
              height: '42px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
            }}
          >
            {isTimerRunning ? <Pause size={18} color="#ffffff" /> : <Play size={18} fill="#ffffff" color="#ffffff" />}
          </button>
        </div>

        {/* 3 Metric Pills */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            marginTop: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.22)',
            backdropFilter: 'blur(8px)',
            padding: '12px',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 600 }}>{t.workoutDuration}</div>
            <div
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '18px',
                fontWeight: 800,
                color: '#ffffff',
              }}
            >
              {formatTimer(elapsedSeconds)}
            </div>
          </div>

          <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255, 255, 255, 0.2)', borderRight: '1px solid rgba(255, 255, 255, 0.2)' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
              <Flame size={12} color="#ffffff" /> {t.totalBurned}
            </div>
            <div
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '18px',
                fontWeight: 800,
                color: '#ffffff',
              }}
            >
              {currentSession.caloriesBurned} <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.85)' }}>kcal</span>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 600 }}>{t.repsDone}</div>
            <div
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '18px',
                fontWeight: 800,
                color: '#ffffff',
              }}
            >
              {totalRepsDone} <span style={{ fontSize: '11px', fontWeight: 500, color: 'rgba(255, 255, 255, 0.85)' }}>{t.repsUnit}</span>
            </div>
          </div>
        </div>

        {/* Rest Timer Banner */}
        <div
          style={{
            marginTop: '12px',
            padding: '10px 14px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(8px)',
            color: '#ffffff',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Timer size={16} color="#ffffff" />
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>
              {isRestActive
                ? `${t.restingRemaining} ${restSecondsRemaining} ${t.secondsRemaining}`
                : t.restTimer}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '5px' }}>
            {[30, 45, 60].map((sec) => (
              <button
                key={sec}
                onClick={() => startRestTimer(sec)}
                style={{
                  backgroundColor: isRestActive && restSecondsRemaining === sec ? '#ffffff' : 'rgba(255, 255, 255, 0.25)',
                  color: isRestActive && restSecondsRemaining === sec ? '#0a0a0c' : '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.4)',
                  borderRadius: '8px',
                  padding: '4px 9px',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {sec}s
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION: RUNNING / CARDIO PRESETS (1, 2, 5, 10, 15, 20 โล) */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '2px solid #0a0a0c',
          borderRadius: '22px',
          padding: '16px',
          boxShadow: '0 3px 0 #0a0a0c',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                backgroundColor: '#0a0a0c',
                color: '#ffe500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Navigation size={16} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', fontWeight: 800, margin: 0 }}>
                {userProfile.language === 'en' ? 'Running Tracker (Cardio)' : 'รอบระยะเวลาวิ่ง (Running Distance)'}
              </h2>
              <span style={{ fontSize: '11px', color: '#71717a' }}>
                {userProfile.language === 'en' ? 'Tap preset to log cardio distance & auto-calculate calories' : 'กด 1 ทีเพื่อบันทึกระยะทางและคำนวณแคลอรีอัตโนมัติ'}
              </span>
            </div>
          </div>
          {totalRunningKm > 0 && (
            <span
              style={{
                backgroundColor: 'var(--theme-accent, #ffe500)',
                color: '#0a0a0c',
                fontWeight: 800,
                fontSize: '11px',
                padding: '3px 8px',
                borderRadius: '6px',
                border: '1px solid #0a0a0c',
              }}
            >
              {userProfile.language === 'en' ? `Total ${totalRunningKm} km` : `รวม ${totalRunningKm} กม.`}
            </span>
          )}
        </div>

        {/* 6 Quick Running Preset Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
          {RUNNING_DISTANCES.map((km) => {
            const details = calculateRunningDetails(km, userProfile.weightKg);
            return (
              <button
                key={km}
                onClick={() => handleAddRunning(km)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #0a0a0c',
                  borderRadius: '12px',
                  padding: '8px 2px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 2px 0 #0a0a0c',
                }}
              >
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: 800, color: '#0a0a0c' }}>
                  {km}
                </span>
                <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 600 }}>{t.km}</span>
                <span style={{ fontSize: '9px', color: '#f43f5e', fontWeight: 700, marginTop: '2px' }}>
                  ~{details.caloriesBurned}c
                </span>
              </button>
            );
          })}
        </div>

        {/* List of logged running sessions today */}
        {currentSession.runningSessions && currentSession.runningSessions.length > 0 && (
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#71717a', textTransform: 'uppercase' }}>
              {userProfile.language === 'en' ? 'Logged Cardio Today:' : 'รอบวิ่งที่บันทึกแล้ววันนี้:'}
            </span>
            {currentSession.runningSessions.map((run) => (
              <div
                key={run.id}
                style={{
                  backgroundColor: '#f8f8f9',
                  border: '1px solid #e4e4e7',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Navigation size={14} color="#0a0a0c" />
                  <strong>
                    {userProfile.language === 'en'
                      ? `Run ${run.distanceKm} km`
                      : `วิ่งระยะ ${run.distanceKm} กิโลเมตร`}
                  </strong>
                  <span style={{ color: '#71717a' }}>(~{run.durationMinutes} {t.minutes})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#f43f5e', fontWeight: 800 }}>+{run.caloriesBurned} kcal</span>
                  <button
                    onClick={() => handleRemoveRunning(run.id)}
                    style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', padding: '2px' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION: DIRECT INLINE ENTRY */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '2px solid #0a0a0c',
          borderRadius: '20px',
          padding: '14px 16px',
          boxShadow: '0 3px 0 #0a0a0c',
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c', display: 'block', marginBottom: '8px' }}>
          {userProfile.language === 'en' ? 'Add Exercise Machine (Default 1 set of 15 reps):' : 'กรอกชนิดเครื่องเล่นที่กำลังเล่น (ตั้งต้น 1 เซ็ต 15 ที):'}
        </span>
        
        {/* Muscle Selector Pills */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', marginBottom: '8px', paddingBottom: '2px' }}>
          {[
            { id: 'chest', label: userProfile.language === 'en' ? 'Chest' : 'อก' },
            { id: 'back', label: userProfile.language === 'en' ? 'Back' : 'หลัง' },
            { id: 'legs', label: userProfile.language === 'en' ? 'Legs' : 'ขา' },
            { id: 'shoulders', label: userProfile.language === 'en' ? 'Shoulders' : 'ไหล่' },
            { id: 'arms', label: userProfile.language === 'en' ? 'Arms' : 'แขน' },
            { id: 'abs', label: userProfile.language === 'en' ? 'Abs' : 'หน้าท้อง' },
          ].map((m) => (
            <button
              type="button"
              key={m.id}
              onClick={() => setInlineMuscle(m.id as MuscleGroup)}
              style={{
                padding: '4px 10px',
                borderRadius: '8px',
                border: '1px solid ' + (inlineMuscle === m.id ? '#0a0a0c' : '#e4e4e7'),
                backgroundColor: inlineMuscle === m.id ? '#0a0a0c' : '#f4f4f5',
                color: inlineMuscle === m.id ? '#ffffff' : '#0a0a0c',
                fontSize: '11px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder={userProfile.language === 'en' ? 'Type machine name e.g. Seated Row, Leg Press...' : 'พิมพ์ชื่อเครื่องเล่น เช่น Seated Row, Leg Press...'}
            value={inlineMachineName}
            onChange={(e) => setInlineMachineName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddMachine(inlineMachineName, inlineMuscle);
            }}
            style={{
              flex: 1,
              border: '1.5px solid #0a0a0c',
              borderRadius: '12px',
              padding: '10px 14px',
              fontFamily: 'Prompt, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              outline: 'none',
              backgroundColor: '#fafafa',
            }}
          />
          <button
            onClick={() => handleAddMachine(inlineMachineName, inlineMuscle)}
            style={{
              backgroundColor: '#0a0a0c',
              color: 'var(--theme-accent, #ffe500)',
              border: 'none',
              borderRadius: '12px',
              padding: '0 16px',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              whiteSpace: 'nowrap',
            }}
          >
            <Plus size={16} /> {userProfile.language === 'en' ? 'Add' : 'เพิ่ม'}
          </button>
        </div>
      </div>

      {/* SECTION: MACHINES & EXERCISES */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '17px',
              fontWeight: 800,
              color: '#0a0a0c',
            }}
          >
            {userProfile.language === 'en'
              ? `Machine Exercises (${currentSession.exercises.length})`
              : `รายการเครื่องเล่น (${currentSession.exercises.length} เครื่อง)`}
          </h2>
          <span style={{ fontSize: '12px', color: '#71717a' }}>
            {userProfile.language === 'en'
              ? `Completed ${totalCompletedSets} sets • Edit names and adjust + - anytime`
              : `สำเร็จ ${totalCompletedSets} เซ็ต • สามารถแก้ไขชื่อและกด + - ได้ทันที`}
          </span>
        </div>
        <button
          onClick={() => setShowAddMachine(true)}
          style={{
            backgroundColor: '#f4f4f5',
            color: '#0a0a0c',
            border: '1px solid #d4d4d8',
            borderRadius: '9999px',
            padding: '6px 12px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {userProfile.language === 'en' ? 'Machine Library' : 'คลังเครื่องเล่น'}
        </button>
      </div>

      {/* Exercises List Cards with + / - steppers and inline editable name */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {currentSession.exercises.map((ex, exIdx) => (
          <div
            key={ex.id}
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #0a0a0c',
              borderRadius: '20px',
              padding: '16px',
              boxShadow: '0 3px 0 #0a0a0c',
            }}
          >
            {/* Title Bar with inline editable name */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
                gap: '8px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '8px',
                    backgroundColor: '#0a0a0c',
                    color: '#ffe500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '12px',
                    fontFamily: 'Outfit, sans-serif',
                    flexShrink: 0,
                  }}
                >
                  {exIdx + 1}
                </div>
                {/* Editable Machine Name Input */}
                <input
                  type="text"
                  value={ex.name}
                  onChange={(e) => handleUpdateExerciseName(ex.id, e.target.value)}
                  style={{
                    border: '1px solid transparent',
                    background: 'transparent',
                    fontSize: '15px',
                    fontWeight: 800,
                    fontFamily: 'Outfit, Prompt, sans-serif',
                    color: '#0a0a0c',
                    padding: '2px 4px',
                    borderRadius: '6px',
                    width: '100%',
                    outline: 'none',
                    transition: 'border 0.15s ease',
                  }}
                  onFocus={(e) => (e.target.style.border = '1px solid #0a0a0c')}
                  onBlur={(e) => (e.target.style.border = '1px solid transparent')}
                  title="คลิกเพื่อแก้ไขชื่อเครื่องเล่น"
                />
              </div>

              <button
                onClick={() => handleRemoveExercise(ex.id)}
                title="ลบเครื่องนี้"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#a1a1aa',
                  cursor: 'pointer',
                  padding: '4px',
                  flexShrink: 0,
                }}
              >
                <Trash2 size={16} />
              </button>
            </div>

            {/* Sets Table with + / - Buttons for both weight and reps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '32px 1fr 1fr 40px',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#71717a',
                  padding: '0 4px',
                }}
              >
                <span>{userProfile.language === 'en' ? 'Set' : 'เซ็ต'}</span>
                <span style={{ textAlign: 'center' }}>{userProfile.language === 'en' ? 'Weight (kg) [- +]' : 'น้ำหนัก (kg) [- +]'}</span>
                <span style={{ textAlign: 'center' }}>{userProfile.language === 'en' ? 'Reps (15) [- +]' : 'จำนวน (ที) [- +]'}</span>
                <span style={{ textAlign: 'center' }}>{userProfile.language === 'en' ? 'Done' : 'เสร็จ'}</span>
              </div>

              {ex.sets.map((set) => (
                <div
                  key={set.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '32px 1fr 1fr 40px',
                    gap: '6px',
                    alignItems: 'center',
                    padding: '8px',
                    backgroundColor: set.completed ? '#f0fdf4' : '#fafafa',
                    border: '1px solid ' + (set.completed ? '#bbf7d0' : '#e4e4e7'),
                    borderRadius: '12px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontWeight: 700,
                      fontSize: '12px',
                      color: set.completed ? '#166534' : '#0a0a0c',
                      textAlign: 'center',
                    }}
                  >
                    #{set.setNumber}
                  </span>

                  {/* Weight [-] [Input] [+] */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #d4d4d8', padding: '2px' }}>
                    <button
                      onClick={() => handleUpdateSet(ex.id, set.id, 'weightKg', Math.max(0, set.weightKg - 2.5))}
                      title="ลดน้ำหนัก 2.5 kg"
                      style={{
                        backgroundColor: '#f4f4f5',
                        border: 'none',
                        borderRadius: '6px',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      <Minus size={12} />
                    </button>
                    <input
                      type="number"
                      value={set.weightKg}
                      onChange={(e) =>
                        handleUpdateSet(ex.id, set.id, 'weightKg', parseFloat(e.target.value) || 0)
                      }
                      style={{
                        width: '100%',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        textAlign: 'center',
                        fontFamily: 'Outfit, sans-serif',
                        outline: 'none',
                        padding: 0,
                      }}
                    />
                    <button
                      onClick={() => handleUpdateSet(ex.id, set.id, 'weightKg', set.weightKg + 2.5)}
                      title="เพิ่มน้ำหนัก 2.5 kg"
                      style={{
                        backgroundColor: '#f4f4f5',
                        border: 'none',
                        borderRadius: '6px',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Reps [-] [Input] [+] */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #d4d4d8', padding: '2px' }}>
                    <button
                      onClick={() => handleUpdateSet(ex.id, set.id, 'reps', Math.max(1, set.reps - 1))}
                      title="ลด 1 ที"
                      style={{
                        backgroundColor: '#f4f4f5',
                        border: 'none',
                        borderRadius: '6px',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      <Minus size={12} />
                    </button>
                    <input
                      type="number"
                      value={set.reps}
                      onChange={(e) =>
                        handleUpdateSet(ex.id, set.id, 'reps', parseInt(e.target.value, 10) || 0)
                      }
                      style={{
                        width: '100%',
                        border: 'none',
                        fontSize: '12px',
                        fontWeight: 700,
                        textAlign: 'center',
                        fontFamily: 'Outfit, sans-serif',
                        outline: 'none',
                        padding: 0,
                      }}
                    />
                    <button
                      onClick={() => handleUpdateSet(ex.id, set.id, 'reps', set.reps + 1)}
                      title="เพิ่ม 1 ที"
                      style={{
                        backgroundColor: '#f4f4f5',
                        border: 'none',
                        borderRadius: '6px',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggleSet(ex.id, set.id)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: set.completed ? '#10b981' : '#d4d4d8',
                    }}
                  >
                    {set.completed ? <CheckCircle2 size={24} fill="#10b981" color="#ffffff" /> : <Circle size={24} />}
                  </button>
                </div>
              ))}
            </div>

            {/* Add Set Button */}
            <button
              onClick={() => handleAddSet(ex.id)}
              style={{
                width: '100%',
                marginTop: '8px',
                padding: '7px',
                backgroundColor: '#ffffff',
                border: '1px dashed #0a0a0c',
                borderRadius: '10px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#0a0a0c',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Plus size={13} /> {t.addSet}
            </button>
          </div>
        ))}
      </div>

      {/* Complete Workout Button */}
      <button
        onClick={() => onCompleteSession(currentSession)}
        className="btn-black-pill"
        style={{ padding: '16px 24px', marginTop: '6px' }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Check size={18} color="var(--theme-accent, #ffe500)" /> {userProfile.language === 'en' ? 'Finish & Summary Today Workout' : 'สรุปและเสร็จสิ้นการซ้อมที่ Gym Gym Gym'}
        </span>
        <ChevronRight size={18} />
      </button>

      {/* Add Machine Modal from Library */}
      {showAddMachine && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(5px)',
            zIndex: 110,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              width: '100%',
              maxWidth: '480px',
              borderTopLeftRadius: '28px',
              borderTopRightRadius: '28px',
              padding: '24px',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '18px', fontWeight: 800 }}>
                  {userProfile.language === 'en' ? 'Select Machine (1 set of 15 reps)' : 'เลือกเครื่องเล่น (1 เซ็ต 15 ที)'}
                </h3>
              </div>
              <button
                onClick={() => setShowAddMachine(false)}
                style={{ background: '#f4f4f5', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Custom Input */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#71717a' }}>
                {userProfile.language === 'en' ? 'Or enter custom machine name:' : 'หรือพิมพ์ชื่อเครื่องเล่นเอง:'}
              </label>
              
              {/* Muscle selector chips */}
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', margin: '6px 0 8px 0' }}>
                {(['chest', 'back', 'legs', 'shoulders', 'arms', 'abs'] as MuscleGroup[]).map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setSelectedMuscle(m)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '8px',
                      border: '1px solid ' + (selectedMuscle === m ? '#0a0a0c' : '#e4e4e7'),
                      backgroundColor: selectedMuscle === m ? '#0a0a0c' : '#f4f4f5',
                      color: selectedMuscle === m ? '#ffffff' : '#0a0a0c',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'uppercase',
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                <input
                  type="text"
                  placeholder={userProfile.language === 'en' ? 'e.g. Incline Chest Press...' : 'เช่น Incline Chest Press...'}
                  value={customMachineName}
                  onChange={(e) => setCustomMachineName(e.target.value)}
                  style={{
                    flex: 1,
                    border: '1.5px solid #0a0a0c',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    fontFamily: 'Prompt, sans-serif',
                    fontSize: '14px',
                  }}
                />
                <button
                  onClick={() => {
                    if (customMachineName.trim()) {
                      handleAddMachine(customMachineName.trim(), selectedMuscle);
                    }
                  }}
                  style={{
                    backgroundColor: '#0a0a0c',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0 16px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {userProfile.language === 'en' ? 'Add' : 'เพิ่ม'}
                </button>
              </div>
            </div>

            {/* Common Machines List */}
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#71717a', textTransform: 'uppercase' }}>
              {userProfile.language === 'en' ? 'Popular Exercises:' : 'เครื่องเล่นยอดนิยม:'}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {COMMON_MACHINES.map((item) => (
                <div
                  key={item.name}
                  onClick={() => handleAddMachine(item.name, item.muscle)}
                  className="neo-card"
                  style={{ padding: '12px 16px' }}
                >
                  <div>
                    <strong style={{ color: '#0a0a0c', fontSize: '14px' }}>{item.name}</strong>
                    <span style={{ color: '#71717a', fontSize: '11px', display: 'block' }}>
                      {userProfile.language === 'en'
                        ? `Target: ${item.muscle} • Default 1 set of 15 reps`
                        : `กลุ่มกล้ามเนื้อ: ${item.muscle} • ตั้งต้น 1 เซ็ต 15 ที`}
                    </span>
                  </div>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      border: '1.5px solid #0a0a0c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Plus size={14} color="#0a0a0c" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
