import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Calendar,
  Clock,
  Flame,
  Dumbbell,
  ChevronRight,
  Check,
  Play,
  Navigation,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  Layers,
  Zap,
  Target,
  BicepsFlexed,
  Activity,
} from 'lucide-react';
import { EXERCISE_LIBRARY } from '../utils/workoutEngine';
import type { MuscleGroup, RoutineExercise, ScheduledPlan, UserProfile } from '../types';

interface SmartSchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePlan: (plan: ScheduledPlan) => void;
  userProfile: UserProfile;
  initialDate?: string;
}

const MUSCLE_OPTIONS: {
  id: MuscleGroup;
  label: string;
  en: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
}[] = [
  { id: 'chest', label: 'อก', en: 'Chest', Icon: Dumbbell },
  { id: 'back', label: 'หลัง', en: 'Back', Icon: Layers },
  { id: 'legs', label: 'ขา', en: 'Legs', Icon: Zap },
  { id: 'shoulders', label: 'ไหล่', en: 'Shoulders', Icon: Target },
  { id: 'arms', label: 'แขน', en: 'Arms', Icon: BicepsFlexed },
  { id: 'abs', label: 'หน้าท้อง', en: 'Abs', Icon: Activity },
];

const DURATION_PRESETS = [
  { hours: 0.5, label: '30 นาที' },
  { hours: 0.75, label: '45 นาที' },
  { hours: 1.0, label: '1 ชม.' },
  { hours: 1.5, label: '1.5 ชม.' },
  { hours: 2.0, label: '2 ชม.' },
];

const RUNNING_OPTIONS = [
  { km: 0, label: 'ไม่วิ่ง' },
  { km: 2, label: '2 โล' },
  { km: 5, label: '5 โล' },
  { km: 10, label: '10 โล' },
];

const TIME_PRESETS = [
  { time: '07:00', label: 'เช้า (07:00)' },
  { time: '12:00', label: 'กลางวัน (12:00)' },
  { time: '17:30', label: 'เย็น (17:30)' },
  { time: '19:30', label: 'ค่ำ (19:30)' },
];

const PRESETS = [
  { label: 'อก + แขน 1.5 ชม.', muscles: ['chest', 'arms'] as MuscleGroup[], hours: 1.5, running: 0 },
  { label: 'หลัง + แขน 1 ชม.', muscles: ['back', 'arms'] as MuscleGroup[], hours: 1.0, running: 0 },
  { label: 'ขา + ท้อง 1 ชม.', muscles: ['legs', 'abs'] as MuscleGroup[], hours: 1.0, running: 0 },
  { label: 'วิ่ง 5 โล + อก 45 นาที', muscles: ['chest'] as MuscleGroup[], hours: 0.75, running: 5 },
  { label: 'วิ่ง 10 โล', muscles: [] as MuscleGroup[], hours: 1.0, running: 10 },
];

export const SmartSchedulerModal: React.FC<SmartSchedulerModalProps> = ({
  isOpen,
  onClose,
  onSavePlan,
  userProfile,
  initialDate = new Date().toISOString().split('T')[0],
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedMuscles, setSelectedMuscles] = useState<MuscleGroup[]>(['chest', 'arms']);
  const [targetHours, setTargetHours] = useState<number>(1.5);
  const [runningKm, setRunningKm] = useState<number>(0);
  const [startTime, setStartTime] = useState<string>('17:30');
  const [routineItems, setRoutineItems] = useState<RoutineExercise[]>([]);
  const [showAddSelector, setShowAddSelector] = useState(false);
  const [addSelectedCategory, setAddSelectedCategory] = useState<MuscleGroup>('chest');
  const [isSuccess, setIsSuccess] = useState(false);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const handleOpenTimePicker = () => {
    if (timeInputRef.current) {
      if ('showPicker' in HTMLInputElement.prototype) {
        try {
          timeInputRef.current.showPicker();
        } catch {
          timeInputRef.current.focus();
        }
      } else {
        timeInputRef.current.focus();
      }
    }
  };

  const handleAdjustStartTime = (deltaMinutes: number) => {
    const [h, m] = (startTime || '17:30').split(':').map((v) => parseInt(v, 10));
    let mins = (isNaN(h) ? 17 : h) * 60 + (isNaN(m) ? 30 : m) + deltaMinutes;
    if (mins < 0) mins += 24 * 60;
    mins = mins % (24 * 60);
    const newH = Math.floor(mins / 60).toString().padStart(2, '0');
    const newM = (mins % 60).toString().padStart(2, '0');
    setStartTime(`${newH}:${newM}`);
  };

  // Sync date when modal opens with initialDate
  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate]);

  // Helper to generate routine items based on selected muscles and duration
  const generateRoutine = (muscles: MuscleGroup[], hours: number) => {
    const durationMinutes = Math.round(hours * 60);
    const numExercises = Math.max(2, Math.min(8, Math.round(durationMinutes / 12)));
    const newItems: RoutineExercise[] = [];
    const groups = muscles.length > 0 ? muscles : (['chest', 'arms'] as MuscleGroup[]);
    const perGroup = Math.ceil(numExercises / groups.length);

    groups.forEach((group) => {
      const lib = EXERCISE_LIBRARY[group] || EXERCISE_LIBRARY.chest;
      const count = Math.min(perGroup, lib.length);
      for (let i = 0; i < count; i++) {
        if (newItems.length < numExercises) {
          const item = lib[i % lib.length];
          newItems.push({
            exerciseName: item.name,
            muscleGroup: group,
            sets: 1,
            reps: '15 ที',
            restSec: item.restSec,
            targetWeightKg: item.baseWeight,
          });
        }
      }
    });

    return newItems;
  };

  // Initial population or when muscles/hours change
  useEffect(() => {
    if (routineItems.length === 0) {
      setRoutineItems(generateRoutine(selectedMuscles, targetHours));
    }
  }, []);

  if (!isOpen) return null;

  // Toggle muscle selection
  const handleToggleMuscle = (muscle: MuscleGroup) => {
    let updated: MuscleGroup[];
    if (selectedMuscles.includes(muscle)) {
      if (selectedMuscles.length === 1 && runningKm === 0) {
        return;
      }
      updated = selectedMuscles.filter((m) => m !== muscle);
    } else {
      updated = [...selectedMuscles, muscle];
    }
    setSelectedMuscles(updated);
    setRoutineItems(generateRoutine(updated, targetHours));
  };

  // Change duration
  const handleChangeDuration = (hours: number) => {
    const rounded = Math.round(hours * 100) / 100;
    setTargetHours(rounded);
    setRoutineItems(generateRoutine(selectedMuscles, rounded));
  };

  // Select a preset template
  const handleApplyPreset = (preset: typeof PRESETS[0]) => {
    setSelectedMuscles(preset.muscles);
    setTargetHours(preset.hours);
    setRunningKm(preset.running);
    setRoutineItems(generateRoutine(preset.muscles, preset.hours));
  };

  // Remove an exercise
  const handleDeleteExercise = (index: number) => {
    setRoutineItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Adjust weight
  const handleAdjustWeight = (index: number, delta: number) => {
    setRoutineItems((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const newWeight = Math.max(0, item.targetWeightKg + delta);
        return { ...item, targetWeightKg: newWeight };
      })
    );
  };

  // Add custom machine from library
  const handleAddExerciseFromLibrary = (exercise: { name: string; baseWeight: number; restSec: number }) => {
    const newItem: RoutineExercise = {
      exerciseName: exercise.name,
      muscleGroup: addSelectedCategory,
      sets: 1,
      reps: '15 ที',
      restSec: exercise.restSec,
      targetWeightKg: exercise.baseWeight,
    };
    setRoutineItems((prev) => [...prev, newItem]);
    setShowAddSelector(false);
  };

  // Calculate calories
  const durationMinutes = Math.round(targetHours * 60);
  let estimatedCalories = Math.round(
    (5.5 * 3.5 * userProfile.weightKg / 200) * durationMinutes * 1.1
  );
  if (runningKm > 0) {
    estimatedCalories += Math.round(runningKm * userProfile.weightKg * 1.036);
  }

  // Calculate end time
  const [hStr, mStr] = (startTime || '17:30').split(':');
  const validHours = parseInt(hStr || '17', 10);
  const validMins = parseInt(mStr || '30', 10);
  const totalMins = validHours * 60 + validMins + durationMinutes;
  const endHours = Math.floor(totalMins / 60) % 24;
  const endMins = totalMins % 60;
  const timeSlotStr = `${startTime || '17:30'} - ${endHours.toString().padStart(2, '0')}:${endMins.toString().padStart(2, '0')}`;

  // Title
  const muscleLabels: Record<MuscleGroup, string> = {
    chest: 'อก',
    back: 'หลัง',
    legs: 'ขา',
    shoulders: 'ไหล่',
    arms: 'แขน',
    abs: 'ท้อง',
    cardio: 'คาร์ดิโอ',
    fullbody: 'ทั่วร่าง',
  };
  const muscleTitle = selectedMuscles.map((m) => muscleLabels[m]).join(' + ') || 'คาร์ดิโอ';
  const planTitle = runningKm > 0
    ? `โปรแกรม ${muscleTitle} + วิ่ง ${runningKm} โล (${targetHours} ชม.)`
    : `โปรแกรม ${muscleTitle} (${targetHours} ชม.)`;

  // Save to calendar
  const handleSaveToCalendar = () => {
    const finalPlan: ScheduledPlan = {
      id: 'plan_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      date: selectedDate,
      title: planTitle,
      muscleGroupText: muscleTitle,
      targetHours,
      estimatedCalories,
      status: 'pending',
      timeSlot: timeSlotStr,
      routineItems,
      runningDistanceKm: runningKm > 0 ? runningKm : undefined,
      notes: `Gym Gym Gym: เครื่องละ 1 เซ็ต 15 ที รวม ${routineItems.length} เครื่อง` + (runningKm > 0 ? ` + วิ่ง ${runningKm} กม.` : ''),
    };

    onSavePlan(finalPlan);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 900);
  };

  // Quick date pickers
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowObj = new Date();
  tomorrowObj.setDate(tomorrowObj.getDate() + 1);
  const tomorrowStr = tomorrowObj.toISOString().split('T')[0];

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 10, 12, 0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '480px',
          maxHeight: '90vh',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          paddingBottom: 'max(36px, env(safe-area-inset-bottom, 36px))',
        }}
      >
        {/* Modal Handle */}
        <div
          style={{
            width: '44px',
            height: '5px',
            backgroundColor: '#d4d4d8',
            borderRadius: '9999px',
            margin: '12px auto 6px auto',
          }}
        />

        {/* Modal Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 20px 14px 20px',
            borderBottom: '1.5px solid #f4f4f5',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontSize: '11px',
                  backgroundColor: '#0a0a0c',
                  color: '#ffe500',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontFamily: 'Outfit, sans-serif',
                }}
              >
                GYM GYM GYM
              </span>
              <span style={{ fontSize: '12px', color: '#71717a', fontWeight: 600 }}>
                เครื่องเล่นเซ็ตละ 15 ที & คาร์ดิโอ
              </span>
            </div>
            <h2
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '20px',
                fontWeight: 800,
                color: '#0a0a0c',
                margin: '2px 0 0 0',
              }}
            >
              จัดตารางและปรับแต่งท่าซ้อม
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#f4f4f5',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#0a0a0c',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content */}
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* STEP 1: DATE SELECTION */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Calendar size={15} /> วันที่ต้องการลงตาราง
            </label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1.5px solid #0a0a0c',
                  borderRadius: '14px',
                  padding: '10px 14px',
                  backgroundColor: '#fafafa',
                }}
              >
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    border: 'none',
                    background: 'none',
                    outline: 'none',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'Outfit, Prompt, sans-serif',
                    width: '100%',
                    color: '#0a0a0c',
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => setSelectedDate(todayStr)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '14px',
                  border: selectedDate === todayStr ? '1.5px solid #0a0a0c' : '1px solid #d4d4d8',
                  backgroundColor: selectedDate === todayStr ? '#0a0a0c' : '#ffffff',
                  color: selectedDate === todayStr ? '#ffffff' : '#27272a',
                  fontFamily: 'Prompt, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                วันนี้
              </button>
              <button
                type="button"
                onClick={() => setSelectedDate(tomorrowStr)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '14px',
                  border: selectedDate === tomorrowStr ? '1.5px solid #0a0a0c' : '1px solid #d4d4d8',
                  backgroundColor: selectedDate === tomorrowStr ? '#0a0a0c' : '#ffffff',
                  color: selectedDate === tomorrowStr ? '#ffffff' : '#27272a',
                  fontFamily: 'Prompt, sans-serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                พรุ่งนี้
              </button>
            </div>
          </div>

          {/* STEP 2: MUSCLE GROUP TOGGLES (ICONS ONLY, NO EMOJIS) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Dumbbell size={15} /> 1. เลือกส่วนกล้ามเนื้อ (กดเลือกได้หลายส่วน)
              </label>
              <span style={{ fontSize: '11px', color: '#71717a' }}>เลือกแล้ว {selectedMuscles.length} ส่วน</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {MUSCLE_OPTIONS.map((m) => {
                const isSelected = selectedMuscles.includes(m.id);
                const MuscleIcon = m.Icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleToggleMuscle(m.id)}
                    style={{
                      padding: '12px 8px',
                      borderRadius: '14px',
                      border: isSelected ? '2px solid #0a0a0c' : '1.5px solid #e4e4e7',
                      backgroundColor: isSelected ? '#0a0a0c' : '#ffffff',
                      color: isSelected ? '#ffffff' : '#0a0a0c',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px',
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.18)' : 'none',
                      transition: 'all 0.15s ease',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '10px',
                        backgroundColor: isSelected ? '#1e1e24' : '#f4f4f5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isSelected ? '#ffe500' : '#0a0a0c',
                      }}
                    >
                      <MuscleIcon size={18} />
                    </div>
                    <span style={{ fontFamily: 'Prompt, sans-serif', fontSize: '13px', fontWeight: 700 }}>
                      {m.label}
                    </span>
                    <span style={{ fontSize: '10px', color: isSelected ? '#ffe500' : '#71717a', fontWeight: 600 }}>
                      {m.en}
                    </span>
                    {isSelected && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          backgroundColor: '#ffe500',
                          color: '#0a0a0c',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Check size={10} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: DURATION SELECTION (WITH PRESETS + CUSTOM ADJUSTER) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={15} /> 2. เลือกระยะเวลาซ้อม
              </label>
              <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 700 }}>
                {targetHours} ชม. ({Math.round(targetHours * 60)} นาที)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px', marginBottom: '8px' }}>
              {DURATION_PRESETS.map((d) => {
                const isSelected = targetHours === d.hours;
                return (
                  <button
                    key={d.hours}
                    type="button"
                    onClick={() => handleChangeDuration(d.hours)}
                    style={{
                      padding: '10px 4px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #0a0a0c' : '1.5px solid #e4e4e7',
                      backgroundColor: isSelected ? '#0a0a0c' : '#f8f8f9',
                      color: isSelected ? '#ffe500' : '#27272a',
                      fontFamily: 'Prompt, sans-serif',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Duration Stepper */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                backgroundColor: '#f8f8f9',
                borderRadius: '12px',
                border: '1px solid #e4e4e7',
              }}
            >
              <span style={{ fontSize: '12px', color: '#52525b', fontWeight: 600 }}>
                ปรับเวลาละเอียด (+/- ทีละ 15 นาที):
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleChangeDuration(Math.max(0.25, targetHours - 0.25))}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    border: '1.5px solid #0a0a0c',
                    backgroundColor: '#ffffff',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  -
                </button>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: 800, minWidth: '60px', textAlign: 'center' }}>
                  {Math.round(targetHours * 60)} นาที
                </span>
                <button
                  type="button"
                  onClick={() => handleChangeDuration(Math.min(4.0, targetHours + 0.25))}
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '8px',
                    border: '1.5px solid #0a0a0c',
                    backgroundColor: '#ffffff',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* STEP 4: RUNNING DISTANCE */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Navigation size={15} /> 3. วิ่งเก็บระยะ (ลู่วิ่ง / สวนสาธารณะ)
              </label>
              {runningKm > 0 && (
                <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600 }}>
                  +~{Math.round(runningKm * 6)} นาที (~{Math.round(runningKm * userProfile.weightKg * 1.036)} kcal)
                </span>
              )}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {RUNNING_OPTIONS.map((r) => {
                const isSelected = runningKm === r.km;
                return (
                  <button
                    key={r.km}
                    type="button"
                    onClick={() => setRunningKm(r.km)}
                    style={{
                      padding: '10px 4px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #0a0a0c' : '1.5px solid #e4e4e7',
                      backgroundColor: isSelected ? '#0a0a0c' : '#f8f8f9',
                      color: isSelected ? '#ffe500' : '#27272a',
                      fontFamily: 'Prompt, sans-serif',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                    }}
                  >
                    {r.km > 0 && <Navigation size={12} />}
                    <span>{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 5: TIME SLOT (PRESETS + CUSTOM INPUT) */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={15} /> 4. ช่วงเวลาเริ่มซ้อม
              </label>
              <span style={{ fontSize: '11px', color: '#71717a', fontWeight: 600 }}>
                ช่วงเวลา: {timeSlotStr}
              </span>
            </div>

            {/* Quick time buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '8px' }}>
              {TIME_PRESETS.map((slot) => {
                const isSelected = startTime === slot.time;
                return (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setStartTime(slot.time)}
                    style={{
                      padding: '8px 4px',
                      borderRadius: '12px',
                      border: isSelected ? '2px solid #0a0a0c' : '1.5px solid #e4e4e7',
                      backgroundColor: isSelected ? '#0a0a0c' : '#f8f8f9',
                      color: isSelected ? '#ffffff' : '#27272a',
                      fontFamily: 'Prompt, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Time Selector Input - Clickable anywhere on the box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1.5px solid #0a0a0c',
                boxShadow: '0 2px 0 #0a0a0c',
              }}
            >
              <div
                onClick={handleOpenTimePicker}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
              >
                <Clock size={16} color="#0a0a0c" />
                <span style={{ fontSize: '13px', color: '#0a0a0c', fontWeight: 700 }}>
                  กำหนดเวลาเริ่มเอง:
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => handleAdjustStartTime(-15)}
                  title="ลด 15 นาที"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '9px',
                    border: '1.5px solid #d4d4d8',
                    backgroundColor: '#f4f4f5',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0a0a0c',
                    transition: 'all 0.1s ease',
                  }}
                >
                  -
                </button>

                {/* Click-Anywhere Time Pill */}
                <div
                  className="time-picker-full-cover"
                  onClick={handleOpenTimePicker}
                  title="กดเพื่อเลือกเวลาเริ่มซ้อม"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#0a0a0c',
                    color: '#ffe500',
                    borderRadius: '10px',
                    padding: '6px 12px',
                    border: '1.5px solid #0a0a0c',
                    position: 'relative',
                    cursor: 'pointer',
                    minWidth: '95px',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                  }}
                >
                  <input
                    ref={timeInputRef}
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    aria-label="เลือกเวลาเริ่มซ้อม"
                  />
                  <Clock size={14} color="#ffe500" />
                  <span
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '14px',
                      fontWeight: 800,
                      color: '#ffe500',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {startTime} น.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAdjustStartTime(15)}
                  title="เพิ่ม 15 นาที"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '9px',
                    border: '1.5px solid #d4d4d8',
                    backgroundColor: '#f4f4f5',
                    fontSize: '16px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0a0a0c',
                    transition: 'all 0.1s ease',
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* QUICK PRESETS */}
          <div style={{ backgroundColor: '#fafafa', borderRadius: '16px', padding: '12px', border: '1px solid #e4e4e7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Sparkles size={14} color="#eab308" />
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#52525b' }}>
                หรือเลือกโปรแกรมยอดนิยม 1 คลิก:
              </span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1.5px solid #d4d4d8',
                    borderRadius: '9999px',
                    padding: '5px 12px',
                    fontSize: '11px',
                    fontFamily: 'Prompt, sans-serif',
                    fontWeight: 600,
                    color: '#0a0a0c',
                    cursor: 'pointer',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* STEP 6: EDITABLE ROUTINE ITEMS LIST */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '2px solid #0a0a0c',
              borderRadius: '20px',
              padding: '16px',
              boxShadow: '0 4px 0 #0a0a0c',
            }}
          >
            {/* Header of Routine List */}
            <div
              style={{
                paddingBottom: '12px',
                borderBottom: '1.5px solid #f4f4f5',
                marginBottom: '12px',
              }}
            >
              {/* Row 1: Title and Count Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Dumbbell size={16} color="#0a0a0c" />
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#0a0a0c' }}>
                    เครื่องเล่นที่ระบบจัดให้
                  </span>
                </div>

                <span
                  style={{
                    backgroundColor: '#0a0a0c',
                    color: '#ffe500',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '9999px',
                    fontFamily: 'Outfit, sans-serif',
                  }}
                >
                  {routineItems.length} ท่า
                </span>
              </div>

              {/* Row 2: Action Buttons - 2 Columns (50% each), fully spacious and never wraps */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  marginBottom: '8px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setRoutineItems(generateRoutine(selectedMuscles, targetHours))}
                  title="สุ่มจัดท่าใหม่"
                  style={{
                    backgroundColor: '#f4f4f5',
                    color: '#0a0a0c',
                    border: '1.5px solid #d4d4d8',
                    borderRadius: '12px',
                    padding: '10px 8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    fontFamily: 'Prompt, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 0 rgba(0,0,0,0.04)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <RotateCcw size={15} />
                  <span>สุ่มจัดท่าใหม่</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowAddSelector(!showAddSelector)}
                  style={{
                    backgroundColor: showAddSelector ? '#ef4444' : '#0a0a0c',
                    color: showAddSelector ? '#ffffff' : '#ffe500',
                    border: showAddSelector ? '1.5px solid #ef4444' : '1.5px solid #0a0a0c',
                    borderRadius: '12px',
                    padding: '10px 8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    fontFamily: 'Prompt, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 0 rgba(0,0,0,0.15)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {showAddSelector ? <X size={15} /> : <Plus size={15} />}
                  <span>{showAddSelector ? 'ปิดเมนู' : '+ เพิ่มท่าเล่น'}</span>
                </button>
              </div>

              {/* Row 3: Helper Subtitle */}
              <span style={{ fontSize: '11px', color: '#71717a', lineHeight: 1.4, display: 'block' }}>
                เครื่องละ 1 เซ็ต 15 ที · ปรับน้ำหนัก [-] [+] ลบท่า [🗑️] หรือกดเพิ่มท่าเล่นได้ตามใจ
              </span>
            </div>

            {/* Add Machine Drawer / Selector */}
            {showAddSelector && (
              <div
                style={{
                  backgroundColor: '#f8f8f9',
                  borderRadius: '14px',
                  padding: '12px',
                  marginBottom: '12px',
                  border: '1.5px dashed #0a0a0c',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c' }}>
                    เลือกท่าที่จะเพิ่มเข้าตาราง:
                  </span>
                  <select
                    value={addSelectedCategory}
                    onChange={(e) => setAddSelectedCategory(e.target.value as MuscleGroup)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '8px',
                      border: '1px solid #0a0a0c',
                      fontSize: '11px',
                      fontWeight: 600,
                      fontFamily: 'Prompt, sans-serif',
                      backgroundColor: '#ffffff',
                    }}
                  >
                    <option value="chest">อก (Chest)</option>
                    <option value="back">หลัง (Back)</option>
                    <option value="legs">ขา (Legs)</option>
                    <option value="shoulders">ไหล่ (Shoulders)</option>
                    <option value="arms">แขน (Arms)</option>
                    <option value="abs">หน้าท้อง (Abs)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '160px', overflowY: 'auto' }}>
                  {(EXERCISE_LIBRARY[addSelectedCategory] || []).map((ex) => (
                    <div
                      key={ex.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 10px',
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        border: '1px solid #e4e4e7',
                      }}
                    >
                      <div>
                        <strong style={{ fontSize: '12px', color: '#0a0a0c' }}>{ex.name}</strong>
                        <span style={{ fontSize: '10px', color: '#71717a', marginLeft: '6px' }}>
                          เริ่มต้น @{ex.baseWeight}kg · 15 ที
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddExerciseFromLibrary(ex)}
                        style={{
                          backgroundColor: '#0a0a0c',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        + เพิ่ม
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* List of routine items */}
            {routineItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: '#71717a', fontSize: '13px' }}>
                ยังไม่มีเครื่องเล่นในตาราง กดปุ่ม <strong>+ เพิ่มท่า</strong> ด้านบนเพื่อเลือกเครื่องเล่น
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {routineItems.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      backgroundColor: '#f8f8f9',
                      borderRadius: '12px',
                      border: '1px solid #e4e4e7',
                    }}
                  >
                    {/* Left: Index & Name */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          backgroundColor: '#0a0a0c',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontFamily: 'Outfit, sans-serif',
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {idx + 1}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <strong
                          style={{
                            color: '#0a0a0c',
                            fontSize: '12px',
                            display: 'block',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.exerciseName}
                        </strong>
                        <span style={{ fontSize: '10px', color: '#71717a' }}>
                          {item.sets} เซ็ต × {item.reps}
                        </span>
                      </div>
                    </div>

                    {/* Right: Weight Adjuster & Delete */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                      {/* Weight Stepper */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#ffffff',
                          border: '1px solid #d4d4d8',
                          borderRadius: '8px',
                          overflow: 'hidden',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleAdjustWeight(idx, -2.5)}
                          style={{
                            padding: '3px 7px',
                            border: 'none',
                            background: 'none',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            color: '#52525b',
                          }}
                        >
                          -
                        </button>
                        <span
                          style={{
                            padding: '3px 4px',
                            fontSize: '11px',
                            fontWeight: 700,
                            fontFamily: 'Outfit, sans-serif',
                            minWidth: '38px',
                            textAlign: 'center',
                            color: '#0a0a0c',
                          }}
                        >
                          {item.targetWeightKg}kg
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAdjustWeight(idx, 2.5)}
                          style={{
                            padding: '3px 7px',
                            border: 'none',
                            background: 'none',
                            fontSize: '13px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            color: '#52525b',
                          }}
                        >
                          +
                        </button>
                      </div>

                      {/* Delete Exercise Button */}
                      <button
                        type="button"
                        onClick={() => handleDeleteExercise(idx)}
                        title="ลบท่านี้"
                        style={{
                          backgroundColor: '#fee2e2',
                          color: '#ef4444',
                          border: 'none',
                          borderRadius: '8px',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* LIVE SUMMARY STAT BOXES */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}
          >
            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '10px 8px',
                borderRadius: '14px',
                textAlign: 'center',
                border: '1.5px solid #0a0a0c',
                boxShadow: '0 2px 0 #0a0a0c',
              }}
            >
              <Clock size={16} color="#0a0a0c" style={{ margin: '0 auto 2px auto' }} />
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '15px' }}>
                {targetHours} ชม.
              </div>
              <div style={{ fontSize: '10px', color: '#71717a' }}>{timeSlotStr}</div>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '10px 8px',
                borderRadius: '14px',
                textAlign: 'center',
                border: '1.5px solid #0a0a0c',
                boxShadow: '0 2px 0 #0a0a0c',
              }}
            >
              <Flame size={16} color="#f43f5e" style={{ margin: '0 auto 2px auto' }} />
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '15px', color: '#f43f5e' }}>
                ~{estimatedCalories}
              </div>
              <div style={{ fontSize: '10px', color: '#71717a' }}>แคลอรีที่เผาผลาญ</div>
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                padding: '10px 8px',
                borderRadius: '14px',
                textAlign: 'center',
                border: '1.5px solid #0a0a0c',
                boxShadow: '0 2px 0 #0a0a0c',
              }}
            >
              <Dumbbell size={16} color="#0a0a0c" style={{ margin: '0 auto 2px auto' }} />
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '15px' }}>
                {routineItems.length} เครื่อง
              </div>
              <div style={{ fontSize: '10px', color: '#71717a' }}>
                {runningKm > 0 ? `+ วิ่ง ${runningKm} โล` : 'เซ็ตละ 15 ที'}
              </div>
            </div>
          </div>

          {/* ACTION BUTTON: SAVE TO CALENDAR */}
          <button
            type="button"
            onClick={handleSaveToCalendar}
            disabled={isSuccess || routineItems.length === 0}
            className="btn-black-pill"
            style={{
              padding: '16px 20px',
              backgroundColor: isSuccess ? '#10b981' : '#0a0a0c',
              borderColor: isSuccess ? '#10b981' : '#0a0a0c',
              color: '#ffffff',
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isSuccess ? <Check size={18} /> : <Play size={16} fill="currentColor" />}
              {isSuccess ? 'จัดลงตารางเรียบร้อยแล้ว!' : 'ยืนยันและนำไปใส่ตารางซ้อมทันที'}
            </span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
