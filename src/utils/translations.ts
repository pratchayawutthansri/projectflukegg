import type { Language } from '../types';

export const TRANSLATIONS = {
  th: {
    // App Header
    appSub: 'FIT & FINANCE OS',
    officialMember: 'สมาชิกอย่างเป็นทางการ',
    guest: 'ผู้เยี่ยมชม (Guest)',

    // Navigation Tabs
    dashboard: 'แดชบอร์ด',
    workout: 'ซ้อมวันนี้',
    calendar: 'ปฏิทินซ้อม',
    finance: 'บัญชีเงิน',
    summary: 'สรุปผล',
    settings: 'ตั้งค่า',

    // Dashboard
    dailyGoal: 'เป้าหมายวันนี้',
    targetCalorie: 'เป้าหมายแคลอรี',
    burnedCalorie: 'เผาผลาญแล้ว',
    totalDuration: 'เวลารวม',
    minutes: 'นาที',
    calories: 'แคลอรี',
    netBalance: 'เงินคงเหลือสุทธิ',
    startWorkoutToday: 'เริ่มซ้อมวันนี้',
    scheduledPlanToday: 'ตารางซ้อมวันนี้',
    noPlanToday: 'ยังไม่มีตารางวันนี้',
    quickStart: 'เริ่มซ้อมด่วน',
    calorieProgress: 'ความคืบหน้าแคลอรี',

    // Workout
    workoutTitle: 'ระบบซ้อมเข้มข้น 15 ที/เซ็ต',
    workoutSubtitle: 'THE 15-REP HYPERTROPHY PROTOCOL',
    addExercise: 'เพิ่มเครื่องเล่น',
    finishWorkout: 'เสร็จสิ้นการซ้อม',
    restTimer: 'ตัวจับเวลาพักเซ็ต',
    runningTracker: 'วิ่งเก็บระยะ',
    set: 'เซ็ต',
    reps: 'ครั้ง',
    weight: 'น้ำหนัก (กก.)',
    completed: 'ผ่านแล้ว',
    seconds: 'วินาที',

    // Calendar
    calendarTitle: 'ปฏิทินและตารางซ้อม',
    smartScheduler: 'จัดตารางอัจฉริยะ',
    startFromPlan: 'เริ่มซ้อมตามแผนนี้',

    // Finance
    financeTitle: 'วินัยกระแสเงินสด',
    addTransaction: 'เพิ่มรายการเงิน',
    income: 'รายรับ',
    expense: 'รายจ่าย',
    baht: 'บาท',

    // Summary
    summaryTitle: 'สถิติและวินัยสะสม',
    totalSets: 'เซ็ตยกเวทรวม',
    totalDistance: 'ระยะทางวิ่งรวม',
    disciplineScore: 'คะแนนวินัย',

    // Settings
    settingsTitle: 'ตั้งค่าข้อมูล & บัญชี',
    profileInfo: 'ข้อมูลโปรไฟล์ & สรีระ',
    name: 'ชื่อผู้ใช้ (Display Name)',
    weightKg: 'น้ำหนักตัว (กก.)',
    heightCm: 'ส่วนสูง (ซม.)',
    age: 'อายุ (ปี)',
    dailyCalTarget: 'เป้าหมายแคลอรีรายวัน',
    themeSelection: 'เลือกธีมสีแอพ (Theme Color)',
    languageSelection: 'เลือกภาษา (Language)',
    installApp: 'ติดตั้งแอพพลิเคชัน (Install App)',
    installed: 'ติดตั้งแล้ว',
    installButton: 'กดติดตั้งแอปลงเครื่องทันที',
    installGuide: 'วิธีเพิ่มลงหน้าจอโฮม',
    resetData: 'ล้างข้อมูลทดสอบทั้งหมด',
    logout: 'ออกจากระบบ',
    saveSettings: 'บันทึกการตั้งค่า',
    savedSuccess: 'บันทึกเรียบร้อย!',
  },
  en: {
    // App Header
    appSub: 'FIT & FINANCE OS',
    officialMember: 'Official Member',
    guest: 'Guest Athlete',

    // Navigation Tabs
    dashboard: 'Dashboard',
    workout: 'Workout',
    calendar: 'Calendar',
    finance: 'Finance',
    summary: 'Summary',
    settings: 'Settings',

    // Dashboard
    dailyGoal: 'Daily Target',
    targetCalorie: 'Calorie Goal',
    burnedCalorie: 'Burned',
    totalDuration: 'Total Time',
    minutes: 'mins',
    calories: 'cal',
    netBalance: 'Net Balance',
    startWorkoutToday: 'Start Today Workout',
    scheduledPlanToday: 'Scheduled Today',
    noPlanToday: 'No routine scheduled today',
    quickStart: 'Quick Start',
    calorieProgress: 'Calorie Ring',

    // Workout
    workoutTitle: '15-Rep Hypertrophy Protocol',
    workoutSubtitle: 'THE 15-REP HYPERTROPHY PROTOCOL',
    addExercise: 'Add Exercise',
    finishWorkout: 'Finish Workout',
    restTimer: 'Rest Interval Timer',
    runningTracker: 'Running Distance Tracker',
    set: 'Set',
    reps: 'Reps',
    weight: 'Weight (kg)',
    completed: 'Completed',
    seconds: 'sec',

    // Calendar
    calendarTitle: 'Training Calendar & Plans',
    smartScheduler: 'Smart Scheduler',
    startFromPlan: 'Start Routine from Plan',

    // Finance
    financeTitle: 'Cash Flow Discipline',
    addTransaction: 'Add Transaction',
    income: 'Income',
    expense: 'Expense',
    baht: 'THB',

    // Summary
    summaryTitle: 'Analytics & Discipline Log',
    totalSets: 'Total Sets Completed',
    totalDistance: 'Total Distance',
    disciplineScore: 'Discipline Score',

    // Settings
    settingsTitle: 'Settings & Member Account',
    profileInfo: 'User Identity & Physical Stats',
    name: 'Display Name',
    weightKg: 'Weight (kg)',
    heightCm: 'Height (cm)',
    age: 'Age (years)',
    dailyCalTarget: 'Daily Calorie Target',
    themeSelection: 'Application Color Theme',
    languageSelection: 'Language / ภาษา',
    installApp: 'Install Application',
    installed: 'Installed',
    installButton: 'Install App on Device Now',
    installGuide: 'How to Add to Home Screen',
    resetData: 'Reset Demo Data',
    logout: 'Log Out',
    saveSettings: 'Save Settings',
    savedSuccess: 'Saved Successfully!',
  },
};

export const getTranslation = (lang: Language = 'th') => {
  return TRANSLATIONS[lang] || TRANSLATIONS.th;
};
