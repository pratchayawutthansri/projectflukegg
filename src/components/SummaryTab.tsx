import React, { useState } from 'react';
import {
  FileText,
  Calendar,
  Flame,
  Navigation,
  Wallet,
  Dumbbell,
  Check,
  CircleDot,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { ScheduledPlan, Transaction, UserProfile, WorkoutSession } from '../types';
import { formatBaht } from '../utils/financeEngine';

interface SummaryTabProps {
  userProfile: UserProfile;
  activeSession: WorkoutSession;
  scheduledPlans: ScheduledPlan[];
  transactions: Transaction[];
  onNavigateTab: (tab: 'dashboard' | 'workout' | 'calendar' | 'finance' | 'summary' | 'settings') => void;
}

export const SummaryTab: React.FC<SummaryTabProps> = ({
  userProfile,
  activeSession,
  transactions,
  onNavigateTab,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  const cleanName = (userProfile.name || 'Fluke')
    .replace(/\s*\(FLUKEXD Gym\)/gi, '')
    .replace(/\s*\(.*?\)/g, '')
    .trim() || 'Fluke';

  const changeDateByDays = (days: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  // Filter financial transactions for the selected day
  const dailyTransactions = transactions.filter((t) => t.date === selectedDate);
  const dailyIncome = dailyTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  const dailyExpense = dailyTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
  const dailyNet = dailyIncome - dailyExpense;

  // Workout summary for selected date
  const isToday = selectedDate === todayStr;
  const session = isToday ? activeSession : null;

  const totalExercises = session ? session.exercises.length : 0;
  const completedSets = session
    ? session.exercises.reduce(
        (acc, ex) => acc + ex.sets.filter((s) => s.completed).length,
        0
      )
    : 0;
  const totalReps = session
    ? session.exercises.reduce(
        (acc, ex) =>
          acc +
          ex.sets
            .filter((s) => s.completed)
            .reduce((sAcc, s) => sAcc + s.reps, 0),
        0
      )
    : 0;
  const runningSessions = (session && session.runningSessions) ? session.runningSessions : [];
  const totalRunKm = runningSessions.reduce((acc, r) => acc + r.distanceKm, 0);
  const totalCalories = session ? session.caloriesBurned : 0;
  const workoutMinutes = session ? session.durationMinutes : 0;

  // Category breakdown for expense
  const expenseByCategory: Record<string, number> = {};
  dailyTransactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      expenseByCategory[t.category] = (expenseByCategory[t.category] || 0) + t.amount;
    });

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Tab Header */}
      <div>
        <span
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '11px',
            fontWeight: 700,
            color: '#71717a',
            letterSpacing: '0.5px',
          }}
        >
          DAILY REPORT & ANALYTICS
        </span>
        <h1
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '22px',
            fontWeight: 800,
            color: '#0a0a0c',
            margin: '2px 0 0 0',
          }}
        >
          สรุปยอดรายงานประจำวัน
        </h1>
      </div>

      {/* Mobile-Optimized Date Stepper & Picker Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1.5px solid #0a0a0c',
          padding: '6px 8px',
          boxShadow: '0 2px 0 #0a0a0c',
          gap: '8px',
        }}
      >
        {/* Previous Day Button */}
        <button
          type="button"
          onClick={() => changeDateByDays(-1)}
          title="วันก่อนหน้า"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: '#f4f4f5',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#0a0a0c',
            flexShrink: 0,
          }}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Center: Tap to pick date */}
        <label
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            cursor: 'pointer',
            padding: '4px 6px',
            position: 'relative',
          }}
        >
          <Calendar size={15} color="#0a0a0c" />
          <span
            style={{
              fontFamily: 'Prompt, sans-serif',
              fontWeight: 700,
              fontSize: '13px',
              color: '#0a0a0c',
            }}
          >
            {new Date(selectedDate).toLocaleDateString('th-TH', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
          {/* Native date input overlay with 0 opacity for smooth native picker */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0,
              cursor: 'pointer',
            }}
          />
        </label>

        {/* Next Day Button & Today quick button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
          {!isToday && (
            <button
              type="button"
              onClick={() => setSelectedDate(todayStr)}
              style={{
                backgroundColor: '#0a0a0c',
                color: '#ffe500',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 10px',
                fontSize: '11px',
                fontWeight: 700,
                fontFamily: 'Prompt, sans-serif',
                cursor: 'pointer',
              }}
            >
              วันนี้
            </button>
          )}
          <button
            type="button"
            onClick={() => changeDateByDays(1)}
            title="วันถัดไป"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              backgroundColor: '#f4f4f5',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#0a0a0c',
            }}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Hero Overview Card: Workout & Finance Combined */}
      <div
        style={{
          backgroundColor: '#0a0a0c',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '20px',
          border: '2px solid #0a0a0c',
          boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Eagle Logo Watermark */}
        <div
          style={{
            position: 'absolute',
            right: '-10px',
            top: '-10px',
            width: '120px',
            height: '120px',
            opacity: 0.12,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <img
            src="/flukexd-logo.png"
            alt="Gym Gym Gym"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
          <div>
            <span style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 600 }}>
              สรุปภาพรวมวันที่ {new Date(selectedDate).toLocaleDateString('th-TH', { dateStyle: 'medium' })}
            </span>
            <div
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '26px',
                fontWeight: 800,
                color: userProfile.themeMode === 'yellow' ? '#ffe500' : '#ffffff',
                marginTop: '2px',
              }}
            >
              {cleanName}
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              padding: '6px 12px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#d4d4d8',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {isToday ? (
              <>
                <CircleDot size={12} color="#10b981" />
                <span>วันนี้ (Active)</span>
              </>
            ) : (
              <>
                <Calendar size={12} color="#a1a1aa" />
                <span>ประวัติย้อนหลัง</span>
              </>
            )}
          </div>
        </div>

        {/* 2 Big Stat Columns: Gym Burn vs Net Cashflow */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {/* Gym Stat Box */}
          <div
            style={{
              backgroundColor: '#16161b',
              padding: '14px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#f43f5e', fontSize: '11px', fontWeight: 700 }}>
              <Flame size={14} /> เผาผลาญรวม
            </div>
            <div
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '22px',
                fontWeight: 800,
                color: '#ffffff',
                margin: '4px 0 2px 0',
              }}
            >
              {totalCalories} <span style={{ fontSize: '12px', fontWeight: 500, color: '#a1a1aa' }}>kcal</span>
            </div>
            <span style={{ fontSize: '10px', color: '#a1a1aa' }}>
              เป้าหมาย: {userProfile.dailyCalorieTarget} kcal ({Math.min(100, Math.round((totalCalories / userProfile.dailyCalorieTarget) * 100))}%)
            </span>
          </div>

          {/* Cashflow Stat Box */}
          <div
            style={{
              backgroundColor: '#16161b',
              padding: '14px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              minWidth: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10b981', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap' }}>
              <Wallet size={14} /> เงินคงเหลือสุทธิ
            </div>
            <div
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '20px',
                fontWeight: 800,
                color: dailyNet >= 0 ? '#10b981' : '#f43f5e',
                margin: '4px 0 2px 0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {dailyNet >= 0 ? '+' : ''}{formatBaht(dailyNet)}
            </div>
            <span style={{ fontSize: '10px', color: '#a1a1aa', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              รับ +{formatBaht(dailyIncome)} | จ่าย -{formatBaht(dailyExpense)}
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 1: DETAILED WORKOUT SUMMARY */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '22px',
          border: '2px solid #0a0a0c',
          padding: '16px',
          boxShadow: '0 3px 0 #0a0a0c',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                backgroundColor: '#0a0a0c',
                color: '#ffe500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Dumbbell size={16} />
            </div>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0a0a0c', margin: 0 }}>
                สรุปการออกกำลังกาย & เครื่องเล่น
              </h2>
              <span style={{ fontSize: '11px', color: '#71717a' }}>
                รวมเวลา {workoutMinutes} นาที · ยกไป {totalReps} ที · {completedSets} เซ็ต
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('workout')}
            style={{
              backgroundColor: '#f4f4f5',
              border: '1px solid #d4d4d8',
              borderRadius: '9999px',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              color: '#0a0a0c',
            }}
          >
            ไปที่บันทึกซ้อม
          </button>
        </div>

        {/* 3 Quick Workout Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            backgroundColor: '#f8f8f9',
            padding: '10px',
            borderRadius: '14px',
            marginBottom: '14px',
            textAlign: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 600 }}>เครื่องเล่น</span>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 800, color: '#0a0a0c' }}>
              {totalExercises} ชนิด
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #e4e4e7', borderRight: '1px solid #e4e4e7' }}>
            <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 600 }}>วิ่งสะสม</span>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 800, color: '#0a0a0c' }}>
              {totalRunKm} โล
            </div>
          </div>
          <div>
            <span style={{ fontSize: '10px', color: '#71717a', fontWeight: 600 }}>ยกสำเร็จ</span>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 800, color: '#16a34a' }}>
              {totalReps} ที
            </div>
          </div>
        </div>

        {/* Itemized Machines list */}
        {session && session.exercises.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#71717a', textTransform: 'uppercase' }}>
              รายการเครื่องเล่นที่บันทึก:
            </span>
            {session.exercises.map((ex, idx) => {
              const exReps = ex.sets.reduce((acc, s) => acc + (s.completed ? s.reps : 0), 0);
              const maxWeight = Math.max(0, ...ex.sets.map((s) => s.weightKg));
              return (
                <div
                  key={ex.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    backgroundColor: '#fafafa',
                    border: '1px solid #eeeeef',
                    fontSize: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#a1a1aa' }}>
                      #{idx + 1}
                    </span>
                    <div>
                      <strong style={{ color: '#0a0a0c' }}>{ex.name}</strong>
                      <span style={{ color: '#71717a', fontSize: '11px', display: 'block' }}>
                        {ex.sets.length} เซ็ต · สูงสุด {maxWeight} kg
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, color: '#0a0a0c' }}>
                      {exReps} ที
                    </span>
                    <span style={{ fontSize: '10px', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '3px', fontWeight: 600 }}>
                      <Check size={12} /> {ex.sets.filter((s) => s.completed).length}/{ex.sets.length} เซ็ต
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f9f9fa', borderRadius: '12px' }}>
            <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>ไม่มีรายการยกเวทในวันนี้</p>
          </div>
        )}

        {/* Running list */}
        {runningSessions.length > 0 && (
          <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#71717a', textTransform: 'uppercase' }}>
              รอบการวิ่ง (Cardio):
            </span>
            {runningSessions.map((r) => (
              <div
                key={r.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  backgroundColor: '#fff7ed',
                  border: '1px solid #fed7aa',
                  fontSize: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Navigation size={13} color="#ea580c" />
                  <strong>วิ่งระยะ {r.distanceKm} โล</strong>
                  <span style={{ color: '#71717a' }}>({r.durationMinutes} นาที)</span>
                </div>
                <strong style={{ color: '#f43f5e', fontFamily: 'Outfit, sans-serif' }}>
                  +{r.caloriesBurned} kcal
                </strong>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 2: DETAILED FINANCE SUMMARY */}
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '22px',
          border: '2px solid #0a0a0c',
          padding: '16px',
          boxShadow: '0 3px 0 #0a0a0c',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                backgroundColor: '#0a0a0c',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FileText size={16} />
            </div>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0a0a0c', margin: 0 }}>
                สรุปยอดเงินรายรับ-รายจ่าย
              </h2>
              <span style={{ fontSize: '11px', color: '#71717a' }}>
                รวมทั้งหมด {dailyTransactions.length} รายการ
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('finance')}
            style={{
              backgroundColor: '#f4f4f5',
              border: '1px solid #d4d4d8',
              borderRadius: '9999px',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              color: '#0a0a0c',
            }}
          >
            ไปที่บัญชีเงิน
          </button>
        </div>

        {/* 2 Cashflow Metric Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
          <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', padding: '10px 12px', borderRadius: '12px' }}>
            <span style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>รายรับรวม</span>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 800, color: '#15803d' }}>
              +{formatBaht(dailyIncome)}
            </div>
          </div>
          <div style={{ backgroundColor: '#fff1f2', border: '1px solid #fecdd3', padding: '10px 12px', borderRadius: '12px' }}>
            <span style={{ fontSize: '11px', color: '#9f1239', fontWeight: 600 }}>รายจ่ายรวม</span>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '16px', fontWeight: 800, color: '#be123c' }}>
              -{formatBaht(dailyExpense)}
            </div>
          </div>
        </div>

        {/* Expense Category Breakdown */}
        {Object.keys(expenseByCategory).length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
              หมวดหมู่รายจ่ายในวันนี้:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {Object.entries(expenseByCategory).map(([cat, amt]) => (
                <div
                  key={cat}
                  style={{
                    backgroundColor: '#f4f4f5',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '11px',
                    color: '#0a0a0c',
                    fontWeight: 600,
                  }}
                >
                  {cat}: <strong style={{ color: '#be123c' }}>-{formatBaht(amt)}</strong>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Itemized Transactions */}
        {dailyTransactions.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#71717a', textTransform: 'uppercase' }}>
              รายการทั้งหมด:
            </span>
            {dailyTransactions.map((tx) => (
              <div
                key={tx.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  backgroundColor: '#f8f8f9',
                  borderRadius: '10px',
                  fontSize: '12px',
                  border: '1px solid #eeeeef',
                }}
              >
                <div>
                  <strong style={{ color: '#0a0a0c' }}>{tx.note}</strong>
                  <span style={{ color: '#71717a', fontSize: '11px', display: 'block' }}>{tx.category}</span>
                </div>
                <strong
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '13px',
                    color: tx.type === 'income' ? '#15803d' : '#0a0a0c',
                  }}
                >
                  {tx.type === 'income' ? '+' : '-'}{formatBaht(tx.amount)}
                </strong>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f9f9fa', borderRadius: '12px' }}>
            <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>ไม่มีรายการรับจ่ายในวันที่เลือก</p>
          </div>
        )}
      </div>
    </div>
  );
};
