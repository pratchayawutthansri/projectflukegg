import React from 'react';
import {
  Dumbbell,
  Clock,
  ChevronRight,
  Play,
  Wallet,
  Navigation,
} from 'lucide-react';
import { CircularProgress } from './CircularProgress';
import type { ScheduledPlan, Transaction, UserProfile, WorkoutSession } from '../types';
import { formatBaht } from '../utils/financeEngine';

interface DashboardTabProps {
  userProfile: UserProfile;
  activeSession: WorkoutSession;
  scheduledPlans: ScheduledPlan[];
  transactions: Transaction[];
  onOpenScheduler: () => void;
  onNavigateTab: (tab: 'dashboard' | 'workout' | 'calendar' | 'finance' | 'summary' | 'settings') => void;
  onStartScheduledWorkout: (plan: ScheduledPlan) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  userProfile,
  activeSession,
  scheduledPlans,
  transactions,
  onOpenScheduler,
  onNavigateTab,
  onStartScheduledWorkout,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  // Daily calorie percentage
  const caloriePercent = Math.min(
    100,
    Math.round((activeSession.caloriesBurned / userProfile.dailyCalorieTarget) * 100)
  );

  // Today's scheduled plan
  const todayPlans = scheduledPlans.filter((p) => p.date === todayStr);
  const primaryTodayPlan = todayPlans[0];

  // Calculate Net Balance
  const netBalance = transactions.reduce((acc, t) => {
    return t.type === 'income' ? acc + t.amount : acc - t.amount;
  }, 0);

  const completedSetsCount = activeSession.exercises.reduce(
    (acc, ex) => acc + ex.sets.filter((s) => s.completed).length,
    0
  );

  const totalRunningKm = (activeSession.runningSessions || []).reduce(
    (acc, r) => acc + r.distanceKm,
    0
  );

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* SECTION 1: Quick Muscle Splits (Reference Screen 3: "Recommended for you") */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}
        >
          <span
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '16px',
              fontWeight: 800,
              color: '#0a0a0c',
            }}
          >
            Recommended for you
          </span>
          <span
            onClick={onOpenScheduler}
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#71717a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            จัดตารางด่วน <ChevronRight size={14} />
          </span>
        </div>

        {/* 4 Inverted Solid Black Tiles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {[
            { id: 'chest', label: 'อก (15 ที)', en: 'Chest', icon: Dumbbell },
            { id: 'back', label: 'หลัง (15 ที)', en: 'Back', icon: Dumbbell },
            { id: 'legs', label: 'ขา (15 ที)', en: 'Legs', icon: Dumbbell },
            { id: 'run', label: 'วิ่ง (1-20 โล)', en: 'Running', icon: Navigation },
          ].map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                onClick={onOpenScheduler}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <div
                  className="icon-tile-black"
                  style={{
                    width: '100%',
                    height: '66px',
                    borderRadius: '18px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  }}
                >
                  <IconComponent size={22} color={userProfile.themeMode === 'yellow' ? '#ffe500' : '#ffffff'} />
                  <span
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '10px',
                      fontWeight: 700,
                      marginTop: '3px',
                      letterSpacing: '0.3px',
                    }}
                  >
                    {item.en}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'Prompt, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#0a0a0c',
                    marginTop: '6px',
                    textAlign: 'center',
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Daily Calorie Summary HUD (Modeled on Reference Screen 4: "56%") */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '2px solid #0a0a0c',
          borderRadius: '26px',
          padding: '20px',
          boxShadow: '0 4px 0 #0a0a0c',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h2
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '17px',
                fontWeight: 800,
                color: '#0a0a0c',
                margin: 0,
              }}
            >
              สรุปแคลอรีประจำวัน (Daily Summary)
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
              <Clock size={13} color="#71717a" />
              <span style={{ fontSize: '12px', color: '#71717a', fontWeight: 500 }}>
                ซ้อมรวม {activeSession.durationMinutes} นาที
                {totalRunningKm > 0 && ` • วิ่ง ${totalRunningKm} โล`}
              </span>
            </div>
          </div>

          <span
            style={{
              backgroundColor: '#ffe500',
              color: '#0a0a0c',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 800,
              fontSize: '11px',
              padding: '3px 8px',
              borderRadius: '8px',
              border: '1px solid #0a0a0c',
            }}
          >
            GYM GYM GYM
          </span>
        </div>

        {/* Circular Progress Gauge */}
        <div style={{ margin: '18px 0 14px 0' }}>
          <CircularProgress
            percentage={caloriePercent}
            label={`${caloriePercent}%`}
            subLabel={`${activeSession.caloriesBurned} / ${userProfile.dailyCalorieTarget} kcal`}
            size={136}
            strokeWidth={11}
            accentColor={userProfile.themeMode === 'yellow' ? '#ffe500' : '#0a0a0c'}
          />
        </div>

        {/* Stat Boxes */}
        <div className="stat-box-container" style={{ margin: '10px 0 16px 0' }}>
          <div className="stat-box" style={{ borderRadius: '16px' }}>
            <div className="number">{activeSession.caloriesBurned}</div>
            <div className="label">แคลอรีที่เผาผลาญ (kcal)</div>
          </div>
          <div className="stat-box" style={{ borderRadius: '16px' }}>
            <div className="number">{completedSetsCount}</div>
            <div className="label">เครื่องที่ยกแล้ว (15 ที/เซ็ต)</div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onNavigateTab('workout')}
          className="btn-black-pill"
          style={{ padding: '14px 20px' }}
        >
          <span>เปิดห้องบันทึกการซ้อม Gym Gym Gym</span>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* SECTION 3: Today's Scheduled Routine (Reference Screen 3: "Last seen courses") */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <span
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '16px',
              fontWeight: 800,
              color: '#0a0a0c',
            }}
          >
            Today&apos;s Workout Routine
          </span>
          <span
            onClick={() => onNavigateTab('calendar')}
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#71717a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            ดูปฏิทินทั้งหมด <ChevronRight size={14} />
          </span>
        </div>

        {primaryTodayPlan ? (
          <div
            onClick={() => onStartScheduledWorkout(primaryTodayPlan)}
            className="neo-card"
            style={{
              borderRadius: '20px',
              padding: '16px 18px',
              boxShadow: '0 3px 0 #0a0a0c',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '14px',
                  backgroundColor: '#0a0a0c',
                  color: '#ffe500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Dumbbell size={22} />
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '15px',
                    fontWeight: 800,
                    color: '#0a0a0c',
                    margin: 0,
                  }}
                >
                  {primaryTodayPlan.title}
                </h3>
                <span style={{ fontSize: '12px', color: '#71717a', fontWeight: 500 }}>
                  {primaryTodayPlan.targetHours} ชม. • {primaryTodayPlan.routineItems.length} เครื่องเล่น • ~
                  {primaryTodayPlan.estimatedCalories} kcal
                </span>
              </div>
            </div>

            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: '1.5px solid #0a0a0c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Play size={14} color="#0a0a0c" fill="#0a0a0c" style={{ marginLeft: '2px' }} />
            </div>
          </div>
        ) : (
          <div
            onClick={onOpenScheduler}
            className="neo-card"
            style={{
              borderStyle: 'dashed',
              justifyContent: 'center',
              padding: '20px',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0a0a0c' }}>
              ยังไม่มีตารางวันนี้ คลิกที่นี่เพื่อจัดตารางซ้อมด่วน
            </span>
          </div>
        )}
      </div>

      {/* SECTION 4: Daily Life Finance Summary */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <span
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontSize: '16px',
              fontWeight: 800,
              color: '#0a0a0c',
            }}
          >
            บัญชีรายรับ-รายจ่ายในชีวิตประจำวัน
          </span>
          <span
            onClick={() => onNavigateTab('finance')}
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: '#71717a',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            ดูบัญชีทั้งหมด <ChevronRight size={14} />
          </span>
        </div>

        <div
          onClick={() => onNavigateTab('finance')}
          className="neo-card"
          style={{
            borderRadius: '20px',
            padding: '16px 18px',
            boxShadow: '0 3px 0 #0a0a0c',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '14px',
                backgroundColor: '#0a0a0c',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Wallet size={20} />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#71717a', fontWeight: 600 }}>ยอดเงินคงเหลือสุทธิ (Net Balance)</span>
              <div
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#0a0a0c',
                }}
              >
                {formatBaht(netBalance)}
              </div>
            </div>
          </div>

          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              border: '1.5px solid #0a0a0c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronRight size={16} color="#0a0a0c" />
          </div>
        </div>
      </div>
    </div>
  );
};
