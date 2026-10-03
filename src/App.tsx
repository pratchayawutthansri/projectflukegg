import React, { useState, useEffect } from 'react';
import {
  Home,
  Dumbbell,
  Calendar,
  Wallet,
  FileText,
  Settings,
} from 'lucide-react';
import {
  INITIAL_SCHEDULED_PLANS,
  INITIAL_TRANSACTIONS,
  INITIAL_USER_PROFILE,
  INITIAL_WORKOUT_SESSIONS,
  loadStorage,
  saveStorage,
  STORAGE_KEYS,
  getEmptyWorkoutSession,
} from './utils/storage';
import type { ScheduledPlan, Transaction, UserProfile, WorkoutSession } from './types';
import { HeaderWave } from './components/HeaderWave';
import { DashboardTab } from './components/DashboardTab';
import { WorkoutTab } from './components/WorkoutTab';
import { CalendarTab } from './components/CalendarTab';
import { FinanceTab } from './components/FinanceTab';
import { SummaryTab } from './components/SummaryTab';
import { SettingsTab } from './components/SettingsTab';
import { SmartSchedulerModal } from './components/SmartSchedulerModal';
import { ProfileModal } from './components/ProfileModal';
import { AuthModal } from './components/AuthModal';
import {
  saveCloudProfile,
  syncScheduledPlan,
  syncTransaction,
  syncWorkoutSession,
} from './utils/supabaseSync';
import { getTheme, applyThemeToDocument } from './utils/theme';
import { getTranslation } from './utils/translations';

export const App: React.FC = () => {
  // State from LocalStorage
  const [userProfile, setUserProfile] = useState<UserProfile>(() =>
    loadStorage(STORAGE_KEYS.USER_PROFILE, INITIAL_USER_PROFILE)
  );

  const [activeSession, setActiveSession] = useState<WorkoutSession>(() => {
    const list = loadStorage<WorkoutSession[]>(STORAGE_KEYS.WORKOUT_SESSIONS, INITIAL_WORKOUT_SESSIONS);
    return list[0] || getEmptyWorkoutSession();
  });

  const [scheduledPlans, setScheduledPlans] = useState<ScheduledPlan[]>(() =>
    loadStorage(STORAGE_KEYS.SCHEDULED_PLANS, INITIAL_SCHEDULED_PLANS)
  );

  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    loadStorage(STORAGE_KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS)
  );

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'workout' | 'calendar' | 'finance' | 'summary' | 'settings'>('dashboard');

  // Modals state
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [schedulerTargetDate, setSchedulerTargetDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const currentTheme = getTheme(userProfile.themeMode);
  const t = getTranslation(userProfile.language || 'th');

  // Dynamically apply current theme to CSS variables
  useEffect(() => {
    applyThemeToDocument(currentTheme);
  }, [currentTheme]);

  // Toggle language handler
  const handleToggleLanguage = () => {
    const nextLang = userProfile.language === 'en' ? 'th' : 'en';
    setUserProfile((prev) => ({
      ...prev,
      language: nextLang,
    }));
  };

  // Sync to LocalStorage on changes
  useEffect(() => {
    saveStorage(STORAGE_KEYS.USER_PROFILE, userProfile);
  }, [userProfile]);


  useEffect(() => {
    saveStorage(STORAGE_KEYS.SCHEDULED_PLANS, scheduledPlans);
  }, [scheduledPlans]);

  useEffect(() => {
    saveStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
  }, [transactions]);

  // Handle saving new auto-calculated plan to calendar
  const handleSavePlan = (plan: ScheduledPlan) => {
    setScheduledPlans((prev) => {
      const filtered = prev.filter((p) => p.id !== plan.id);
      return [plan, ...filtered];
    });
    if (userProfile.memberId) {
      syncScheduledPlan(userProfile.memberId, plan);
    }
  };

  // 1-Click: Start scheduled workout directly in gym session
  const handleStartScheduledWorkout = (plan: ScheduledPlan) => {
    const newSession: WorkoutSession = {
      id: 'ws_' + Date.now(),
      date: plan.date,
      title: plan.title,
      durationMinutes: 0,
      caloriesBurned: 0,
      runningSessions: plan.runningDistanceKm
        ? [
            {
              id: 'run_' + Date.now(),
              date: plan.date,
              distanceKm: plan.runningDistanceKm,
              durationMinutes: Math.round(plan.runningDistanceKm * 6),
              caloriesBurned: Math.round(plan.runningDistanceKm * userProfile.weightKg * 1.036),
            },
          ]
        : [],
      exercises: plan.routineItems.map((item, idx) => ({
        id: 'ex_' + Date.now() + '_' + idx,
        name: item.exerciseName,
        muscleGroup: item.muscleGroup,
        sets: [
          {
            id: `s_${idx}_1`,
            setNumber: 1,
            weightKg: item.targetWeightKg || 30,
            reps: 15,
            completed: false,
          },
        ],
      })),
    };

    setActiveSession(newSession);
    setActiveTab('workout');
  };

  // Update ongoing session
  const handleUpdateSession = (updated: WorkoutSession) => {
    setActiveSession(updated);
    saveStorage(STORAGE_KEYS.WORKOUT_SESSIONS, [updated]);
  };

  // Complete gym workout session
  const handleCompleteSession = (completed: WorkoutSession) => {
    const finishedSession = {
      ...completed,
      completedAt: new Date().toISOString(),
    };
    setActiveSession(finishedSession);
    saveStorage(STORAGE_KEYS.WORKOUT_SESSIONS, [finishedSession]);

    if (userProfile.memberId) {
      syncWorkoutSession(userProfile.memberId, finishedSession);
    }

    // Mark matching scheduled plan as completed
    setScheduledPlans((prev) =>
      prev.map((p) => (p.date === completed.date ? { ...p, status: 'completed' as const } : p))
    );

    setActiveTab('dashboard');
  };

  // Transactions handlers
  const handleAddTransaction = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);
    if (userProfile.memberId) {
      syncTransaction(userProfile.memberId, newTx);
    }
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Toggle theme mode
  const handleToggleTheme = () => {
    setUserProfile((prev) => ({
      ...prev,
      themeMode: prev.themeMode === 'yellow' ? 'monochrome' : 'yellow',
    }));
  };

  // User profile update
  const handleUpdateProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    if (updated.memberId) {
      saveCloudProfile(updated.memberId, updated);
    }
  };

  // Authentication & registration success
  const handleSuccessAuth = (user: UserProfile) => {
    setUserProfile(user);
    saveStorage(STORAGE_KEYS.USER_PROFILE, user);
    if (user.memberId) {
      saveCloudProfile(user.memberId, user);
    }
    setIsAuthOpen(false);
  };

  // User logout
  const handleLogout = () => {
    const guestUser: UserProfile = {
      name: 'ผู้เยี่ยมชม (Guest)',
      memberId: undefined,
      weightKg: 70,
      heightCm: 175,
      age: 25,
      dailyCalorieTarget: 650,
      gymName: 'Gym Gym Gym',
      themeMode: 'yellow',
      isRegistered: false,
      registeredDate: undefined,
    };
    setUserProfile(guestUser);
    saveStorage(STORAGE_KEYS.USER_PROFILE, guestUser);
    setIsAuthOpen(true);
  };

  // Guard: When visiting / deployed, unauthenticated users MUST see the Login screen first
  if (!userProfile.isRegistered) {
    return (
      <div
        style={{
          width: '100%',
          minHeight: '100dvh',
          backgroundColor: '#121214',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <AuthModal
          isOpen={true}
          isGateOnly={true}
          onClose={() => {
            // Strictly no bypass - authentication required
          }}
          onSuccessAuth={handleSuccessAuth}
        />
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        {/* Fluid Organic Wave Top Header */}
        <HeaderWave
          userProfile={userProfile}
          showQuickScheduler={activeTab === 'dashboard'}
          onToggleLanguage={handleToggleLanguage}
          onOpenScheduler={() => {
            setSchedulerTargetDate(new Date().toISOString().split('T')[0]);
            setIsSchedulerOpen(true);
          }}
        />

        {/* Main Tab Content Area */}
        <main style={{ flex: 1, paddingBottom: '20px' }}>
          {activeTab === 'dashboard' && (
            <DashboardTab
              userProfile={userProfile}
              activeSession={activeSession}
              scheduledPlans={scheduledPlans}
              transactions={transactions}
              onOpenScheduler={() => {
                setSchedulerTargetDate(new Date().toISOString().split('T')[0]);
                setIsSchedulerOpen(true);
              }}
              onNavigateTab={setActiveTab}
              onStartScheduledWorkout={handleStartScheduledWorkout}
            />
          )}

          {activeTab === 'workout' && (
            <WorkoutTab
              currentSession={activeSession}
              onUpdateSession={handleUpdateSession}
              onCompleteSession={handleCompleteSession}
              userProfile={userProfile}
            />
          )}

          {activeTab === 'calendar' && (
            <CalendarTab
              scheduledPlans={scheduledPlans}
              onOpenSchedulerWithDate={(date) => {
                setSchedulerTargetDate(date);
                setIsSchedulerOpen(true);
              }}
              onStartScheduledWorkout={handleStartScheduledWorkout}
              onDeletePlan={(planId) => {
                setScheduledPlans((prev) => prev.filter((p) => p.id !== planId));
              }}
              userProfile={userProfile}
            />
          )}

          {activeTab === 'finance' && (
            <FinanceTab
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
              onDeleteTransaction={handleDeleteTransaction}
            />
          )}

          {activeTab === 'summary' && (
            <SummaryTab
              userProfile={userProfile}
              activeSession={activeSession}
              scheduledPlans={scheduledPlans}
              transactions={transactions}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
              onOpenAuth={() => setIsAuthOpen(true)}
              onToggleTheme={handleToggleTheme}
              onLogout={handleLogout}
            />
          )}
        </main>

        {/* High-Contrast Bottom Navigation Bar */}
        <nav className="bottom-nav">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            style={{
              color: activeTab === 'dashboard' ? '#0a0a0c' : '#71717a',
            }}
          >
            <div
              className="nav-icon-wrap"
              style={{
                backgroundColor: activeTab === 'dashboard' ? '#0a0a0c' : 'transparent',
                color: activeTab === 'dashboard' ? currentTheme.accent : '#71717a',
              }}
            >
              <Home size={17} />
            </div>
            <span>{t.dashboard}</span>
          </button>

          <button
            onClick={() => setActiveTab('workout')}
            className={`nav-tab-btn ${activeTab === 'workout' ? 'active' : ''}`}
            style={{
              color: activeTab === 'workout' ? '#0a0a0c' : '#71717a',
            }}
          >
            <div
              className="nav-icon-wrap"
              style={{
                backgroundColor: activeTab === 'workout' ? '#0a0a0c' : 'transparent',
                color: activeTab === 'workout' ? currentTheme.accent : '#71717a',
              }}
            >
              <Dumbbell size={17} />
            </div>
            <span>{t.workout}</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`nav-tab-btn ${activeTab === 'calendar' ? 'active' : ''}`}
            style={{
              color: activeTab === 'calendar' ? '#0a0a0c' : '#71717a',
            }}
          >
            <div
              className="nav-icon-wrap"
              style={{
                backgroundColor: activeTab === 'calendar' ? '#0a0a0c' : 'transparent',
                color: activeTab === 'calendar' ? currentTheme.accent : '#71717a',
              }}
            >
              <Calendar size={17} />
            </div>
            <span>{t.calendar}</span>
          </button>

          <button
            onClick={() => setActiveTab('finance')}
            className={`nav-tab-btn ${activeTab === 'finance' ? 'active' : ''}`}
            style={{
              color: activeTab === 'finance' ? '#0a0a0c' : '#71717a',
            }}
          >
            <div
              className="nav-icon-wrap"
              style={{
                backgroundColor: activeTab === 'finance' ? '#0a0a0c' : 'transparent',
                color: activeTab === 'finance' ? currentTheme.accent : '#71717a',
              }}
            >
              <Wallet size={17} />
            </div>
            <span>{t.finance}</span>
          </button>

          <button
            onClick={() => setActiveTab('summary')}
            className={`nav-tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
            style={{
              color: activeTab === 'summary' ? '#0a0a0c' : '#71717a',
            }}
          >
            <div
              className="nav-icon-wrap"
              style={{
                backgroundColor: activeTab === 'summary' ? '#0a0a0c' : 'transparent',
                color: activeTab === 'summary' ? currentTheme.accent : '#71717a',
              }}
            >
              <FileText size={17} />
            </div>
            <span>{t.summary}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`nav-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            style={{
              color: activeTab === 'settings' ? '#0a0a0c' : '#71717a',
            }}
          >
            <div
              className="nav-icon-wrap"
              style={{
                backgroundColor: activeTab === 'settings' ? '#0a0a0c' : 'transparent',
                color: activeTab === 'settings' ? currentTheme.accent : '#71717a',
              }}
            >
              <Settings size={17} />
            </div>
            <span>{t.settings}</span>
          </button>
        </nav>

        {/* Quick Scheduler Modal */}
        <SmartSchedulerModal
          isOpen={isSchedulerOpen}
          onClose={() => setIsSchedulerOpen(false)}
          onSavePlan={handleSavePlan}
          userProfile={userProfile}
          initialDate={schedulerTargetDate}
        />

        {/* User Profile & Member ID Modal */}
        <ProfileModal
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
          userProfile={userProfile}
          onUpdateProfile={handleUpdateProfile}
          onOpenAuth={() => {
            setIsProfileOpen(false);
            setIsAuthOpen(true);
          }}
        />

        {/* Membership Registration & Sign Up Modal */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onSuccessAuth={handleSuccessAuth}
        />
      </div>
  );
};

export default App;
