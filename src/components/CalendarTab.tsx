import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  Flame,
  Dumbbell,
  Play,
  Trash2,
  Plus,
  Navigation,
  ChevronRight,
} from 'lucide-react';
import type { ScheduledPlan, UserProfile } from '../types';
import { getTranslation } from '../utils/translations';

interface CalendarTabProps {
  scheduledPlans: ScheduledPlan[];
  onOpenSchedulerWithDate: (date: string) => void;
  onStartScheduledWorkout: (plan: ScheduledPlan) => void;
  onDeletePlan: (planId: string) => void;
  userProfile: UserProfile;
}

export const CalendarTab: React.FC<CalendarTabProps> = ({
  scheduledPlans,
  onOpenSchedulerWithDate,
  onStartScheduledWorkout,
  onDeletePlan,
  userProfile,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(todayStr);
  const t = getTranslation(userProfile.language || 'th');

  // Generate 7-day strip (2 days before, today, 4 days after)
  const getDaysStrip = () => {
    const days = [];
    const base = new Date();
    for (let i = -2; i <= 4; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString(userProfile.language === 'en' ? 'en-US' : 'th-TH', { weekday: 'short' });
      const dayNum = d.getDate();
      days.push({ iso, dayName, dayNum, isToday: iso === todayStr });
    }
    return days;
  };

  const daysStrip = getDaysStrip();
  const plansForDate = scheduledPlans.filter((p) => p.date === selectedDate);

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header section with month & quick button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                color: '#71717a',
                letterSpacing: '0.5px',
              }}
            >
              {userProfile.gymName.toUpperCase()} CALENDAR &amp; SCHEDULE
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '22px',
              fontWeight: 800,
              color: '#0a0a0c',
              margin: '2px 0 0 0',
            }}
          >
            {t.calendarTitle}
          </h1>
        </div>

        <button
          onClick={() => onOpenSchedulerWithDate(selectedDate)}
          style={{
            background: 'var(--theme-card-bg, #0a0a0c)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '9999px',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
          }}
        >
          <Plus size={14} color="#ffffff" /> {t.scheduleWorkout}
        </button>
      </div>

      {/* Date Strip */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '6px',
        }}
      >
        {daysStrip.map((d) => {
          const isSelected = d.iso === selectedDate;

          return (
            <div
              key={d.iso}
              onClick={() => setSelectedDate(d.iso)}
              style={{
                flex: '0 0 auto',
                width: '56px',
                padding: '12px 6px',
                borderRadius: '18px',
                border: '1.5px solid ' + (isSelected ? '#0a0a0c' : '#e4e4e7'),
                backgroundColor: isSelected ? '#0a0a0c' : '#ffffff',
                color: isSelected ? '#ffffff' : '#0a0a0c',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                position: 'relative',
                boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  fontFamily: 'Prompt, sans-serif',
                  opacity: isSelected ? 0.9 : 0.6,
                }}
              >
                {d.dayName}
              </span>
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '18px',
                  fontWeight: 800,
                  marginTop: '2px',
                }}
              >
                {d.dayNum}
              </span>
            </div>
          );
        })}
      </div>

      {/* Selected Date Header */}
      <div
        style={{
          backgroundColor: '#fafafb',
          border: '1px solid #e4e4e7',
          borderRadius: '16px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarIcon size={16} color="#0a0a0c" />
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0a0a0c' }}>
            {t.dateLabel} {new Date(selectedDate).toLocaleDateString(userProfile.language === 'en' ? 'en-US' : 'th-TH', { dateStyle: 'full' })}
          </span>
        </div>
        <span
          style={{
            fontSize: '11px',
            backgroundColor: plansForDate.length > 0 ? '#dcfce7' : '#f4f4f5',
            color: plansForDate.length > 0 ? '#166534' : '#71717a',
            padding: '3px 8px',
            borderRadius: '9999px',
            fontWeight: 700,
          }}
        >
          {plansForDate.length > 0 ? (userProfile.language === 'en' ? `${plansForDate.length} Routine(s)` : `มีโปรแกรม ${plansForDate.length} รายการ`) : t.noRoutines}
        </span>
      </div>

      {/* Routine Cards for this Date */}
      {plansForDate.length === 0 ? (
        <div
          style={{
            backgroundColor: '#ffffff',
            border: '2px dashed #d4d4d8',
            borderRadius: '24px',
            padding: '36px 20px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: '#f4f4f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Dumbbell size={24} color="#71717a" />
          </div>
          <div>
            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 800 }}>
              {t.noRoutineForDate}
            </h3>
            <p style={{ fontSize: '13px', color: '#71717a', maxWidth: '280px', margin: '4px auto 0 auto' }}>
              {t.noRoutineDesc}
            </p>
          </div>
          <button
            onClick={() => onOpenSchedulerWithDate(selectedDate)}
            className="btn-black-pill"
            style={{ maxWidth: '260px', padding: '12px 20px', marginTop: '6px' }}
          >
            <span>{t.scheduleTodayBtn}</span>
            <Plus size={16} />
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {plansForDate.map((plan) => (
            <div
              key={plan.id}
              style={{
                backgroundColor: '#ffffff',
                border: '2px solid #0a0a0c',
                borderRadius: '24px',
                padding: '18px',
                boxShadow: '0 4px 0 #0a0a0c',
              }}
            >
              {/* Card Title & Badges */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        backgroundColor: '#ffe500',
                        color: '#0a0a0c',
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 800,
                        fontSize: '11px',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        border: '1px solid #0a0a0c',
                      }}
                    >
                      {plan.timeSlot}
                    </span>
                    <span style={{ fontSize: '11px', color: '#71717a', fontWeight: 600 }}>
                      กลุ่ม: {plan.muscleGroupText}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#0a0a0c',
                      margin: '6px 0 2px 0',
                    }}
                  >
                    {plan.title}
                  </h3>
                </div>

                <button
                  onClick={() => onDeletePlan(plan.id)}
                  title="ลบโปรแกรมนี้"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#a1a1aa',
                    cursor: 'pointer',
                    padding: '4px',
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              {/* Metric Row */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '8px',
                  margin: '14px 0',
                }}
              >
                <div
                  style={{
                    backgroundColor: '#fafafb',
                    border: '1px solid #e4e4e7',
                    padding: '8px',
                    borderRadius: '12px',
                    textAlign: 'center',
                  }}
                >
                  <Clock size={15} color="#0a0a0c" style={{ margin: '0 auto 2px auto' }} />
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '14px' }}>
                    {plan.targetHours} {userProfile.language === 'en' ? 'Hours' : 'ชั่วโมง'}
                  </div>
                  <div style={{ fontSize: '10px', color: '#71717a' }}>
                    {userProfile.language === 'en' ? 'Duration' : 'ระยะเวลาซ้อม'}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#fafafb',
                    border: '1px solid #e4e4e7',
                    padding: '8px',
                    borderRadius: '12px',
                    textAlign: 'center',
                  }}
                >
                  <Flame size={15} color="#f43f5e" style={{ margin: '0 auto 2px auto' }} />
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '14px' }}>
                    ~{plan.estimatedCalories} kcal
                  </div>
                  <div style={{ fontSize: '10px', color: '#71717a' }}>
                    {userProfile.language === 'en' ? 'Est. Calories' : 'แคลอรีประเมิน'}
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: '#fafafb',
                    border: '1px solid #e4e4e7',
                    padding: '8px',
                    borderRadius: '12px',
                    textAlign: 'center',
                  }}
                >
                  <Dumbbell size={15} color="#0a0a0c" style={{ margin: '0 auto 2px auto' }} />
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '14px' }}>
                    {plan.routineItems.length} {userProfile.language === 'en' ? 'Machines' : 'เครื่อง'}
                  </div>
                  <div style={{ fontSize: '10px', color: '#71717a' }}>
                    {userProfile.language === 'en' ? '15 Reps/Set' : 'เซ็ตละ 15 ที'}
                  </div>
                </div>
              </div>

              {/* Running distance indicator if planned */}
              {plan.runningDistanceKm && (
                <div
                  style={{
                    background: 'var(--theme-card-bg, #0a0a0c)',
                    color: '#ffffff',
                    borderRadius: '12px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Navigation size={14} color="#ffffff" />
                    <span>
                      {userProfile.language === 'en'
                        ? `Target Run: ${plan.runningDistanceKm} km`
                        : `วิ่งระยะทางเป้าหมาย: ${plan.runningDistanceKm} กิโลเมตร`}
                    </span>
                  </div>
                  <span>~{Math.round(plan.runningDistanceKm * 6)} {t.minutes}</span>
                </div>
              )}

              {/* Routine Checklist */}
              {plan.routineItems.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#71717a',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    {userProfile.language === 'en'
                      ? 'Scheduled Machines (1 Set of 15 Reps each):'
                      : 'เครื่องเล่นตามตาราง (เครื่องละ 1 เซ็ต 15 ที):'}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {plan.routineItems.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 12px',
                          backgroundColor: '#f8f8f9',
                          borderRadius: '10px',
                          border: '1px solid #eeeeef',
                          fontSize: '12px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span
                            style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              backgroundColor: '#0a0a0c',
                              color: '#ffffff',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '10px',
                              fontWeight: 700,
                              fontFamily: 'Outfit, sans-serif',
                            }}
                          >
                            {idx + 1}
                          </span>
                          <strong style={{ color: '#0a0a0c' }}>{item.exerciseName}</strong>
                        </div>
                        <div style={{ fontWeight: 700, color: '#0a0a0c' }}>
                          {userProfile.language === 'en' ? '1 Set × 15 Reps' : '1 เซ็ต × 15 ที'}
                          {item.targetWeightKg > 0 && (
                            <span style={{ color: '#ca8a04', marginLeft: '6px' }}>
                              @{item.targetWeightKg}kg
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Start Workout Button */}
              <button
                onClick={() => onStartScheduledWorkout(plan)}
                className="btn-black-pill"
                style={{ padding: '14px 20px' }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Play size={16} fill="#ffffff" color="#ffffff" />
                  {userProfile.language === 'en' ? 'Start Workout with this Routine Now' : 'โหลดเข้าโหมดซ้อม Gym Gym Gym ทันที'}
                </span>
                <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
