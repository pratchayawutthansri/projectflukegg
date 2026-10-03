import type { Language } from '../types';

export const TRANSLATIONS = {
  th: {
    // App Header
    appSub: 'FIT & FINANCE OS',
    officialMember: 'สมาชิกอย่างเป็นทางการ',
    guest: 'ผู้เยี่ยมชม (Guest)',
    welcome: 'ยินดีต้อนรับ',
    activeVip: 'ACTIVE VIP',
    login: 'เข้าสู่ระบบ',
    quickScheduler: 'จัดตารางด่วน',

    // Navigation Tabs
    dashboard: 'แดชบอร์ด',
    workout: 'ซ้อมวันนี้',
    calendar: 'ปฏิทินซ้อม',
    finance: 'บัญชีเงิน',
    summary: 'สรุปผล',
    settings: 'ตั้งค่า',

    // Dashboard
    recommendedForYou: 'แนะนำสำหรับคุณ',
    quickSchedulerBtn: 'จัดตารางด่วน',
    chestSplit: 'อก (15 ที)',
    backSplit: 'หลัง (15 ที)',
    legsSplit: 'ขา (15 ที)',
    runSplit: 'วิ่ง (1-20 โล)',
    dailyCalorieSummary: 'สรุปแคลอรีประจำวัน',
    totalWorkoutTime: 'ซ้อมรวม',
    runDistance: 'วิ่ง',
    km: 'กม.',
    lo: 'โล',
    minutes: 'นาที',
    calories: 'แคลอรี',
    burnedKcal: 'แคลอรีที่เผาผลาญ (kcal)',
    completedMachines: 'เครื่องที่ยกแล้ว (15 ที/เซ็ต)',
    openWorkoutRoom: 'เปิดห้องบันทึกการซ้อม',
    todayWorkoutRoutine: 'ตารางซ้อมวันนี้',
    viewFullCalendar: 'ดูปฏิทินทั้งหมด',
    noPlanToday: 'ยังไม่มีตารางวันนี้ คลิกที่นี่เพื่อจัดตารางซ้อมด่วน',
    hours: 'ชม.',
    machines: 'เครื่องเล่น',
    dailyCashFlowTitle: 'บัญชีรายรับ-รายจ่ายในชีวิตประจำวัน',
    viewFullLedger: 'ดูบัญชีทั้งหมด',
    netBalance: 'ยอดเงินคงเหลือสุทธิ (Net Balance)',

    // Workout Tab
    workoutTitle: 'ระบบซ้อมเข้มข้น 15 ที/เซ็ต',
    workoutSubtitle: 'THE 15-REP HYPERTROPHY PROTOCOL',
    gymLive: 'GYM GYM GYM LIVE',
    workoutDuration: 'เวลาซ้อม',
    totalBurned: 'เผาผลาญรวม',
    repsDone: 'ยกไปแล้ว',
    repsUnit: 'ที',
    restTimer: 'นาฬิกาพักเซ็ต (Rest Timer)',
    restingRemaining: 'พักเซ็ต: เหลืออีก',
    secondsRemaining: 'วินาที',
    runningCardio: 'วิ่งเก็บระยะ (Cardio Running)',
    addMachine: 'เพิ่มเครื่องเล่น',
    finishWorkout: 'เสร็จสิ้นการซ้อม',
    setNum: 'เซ็ต',
    weight: 'น้ำหนัก (กก.)',
    reps: 'จำนวนครั้ง',
    completed: 'ผ่านแล้ว',
    removeMachine: 'ลบเครื่องเล่น',
    addSet: '+ เพิ่มเซ็ต (15 ที)',
    confirmFinish: 'ยืนยันเสร็จสิ้นการซ้อม',
    emptyWorkoutPrompt: 'ยังไม่มีเครื่องเล่นในรอบนี้ กด "เพิ่มเครื่องเล่น" เพื่อเริ่มเซ็ต 15 ที',

    // Calendar Tab
    calendarTitle: 'ตารางยกและเวลาซ้อม',
    scheduleWorkout: 'จัดตารางซ้อม',
    dateLabel: 'วันที่:',
    hasRoutines: 'มีโปรแกรม',
    noRoutines: 'ยังไม่มีตารางซ้อม',
    noRoutineForDate: 'ยังไม่ได้จัดตารางวันที่นี้',
    noRoutineDesc: 'พิมพ์กลุ่มกล้ามเนื้อ หรือระบุระยะทางวิ่ง (1, 2, 5, 10, 15, 20 โล) แล้วระบบจะคำนวณลงตารางให้อัตโนมัติ',
    scheduleTodayBtn: 'จัดตารางซ้อมวันนี้',
    startFromThisPlan: 'เริ่มซ้อมตามแผนนี้',
    deletePlan: 'ลบโปรแกรม',

    // Finance Tab
    financeTitle: 'บัญชีรายรับ-รายจ่าย',
    financeSubtitle: 'DAILY LIFE FINANCE & CASHFLOW',
    dailyReport: 'สรุปยอดรายวัน',
    newTransaction: 'บันทึกใหม่',
    totalIncome: 'รายรับรวม',
    totalExpense: 'รายจ่ายรวม',
    todayExpense: 'รายจ่ายวันนี้',
    transactionHistory: 'ประวัติรายการเงิน',
    noTransactions: 'ยังไม่มีรายการเงินในระบบ',
    addIncome: 'รายรับ',
    addExpense: 'รายจ่าย',
    amount: 'จำนวนเงิน (บาท)',
    category: 'หมวดหมู่',
    note: 'หมายเหตุ / รายละเอียด',
    notePlaceholder: 'เช่น ข้าวกะเพรา, กาแฟ, ค่าน้ำมัน...',
    saveTransaction: 'บันทึกรายการ',
    saveTransactionBtn: 'บันทึกรายการทันที',
    addModalTitle: 'บันทึกรายการบัญชีใหม่',
    expense: 'รายจ่าย (Expense)',
    income: 'รายรับ (Income)',
    cancel: 'ยกเลิก',
    dailyReportTitle: 'สรุปยอดเงินรายวัน',
    dailySummaryNet: 'คงเหลือสุทธิประจำวัน',
    baht: 'บาท',

    // Summary Tab
    summaryTitle: 'สถิติและวินัยสะสม',
    summarySubtitle: 'DISCIPLINE & PERFORMANCE SUMMARY',
    dailyReportOf: 'สรุปข้อมูลประจำวัน',
    totalSetsCompleted: 'เซ็ตยกเวทรวม',
    totalDistanceRun: 'ระยะทางวิ่งรวม',
    totalCaloriesBurned: 'แคลอรีสะสม',
    disciplineScore: 'คะแนนวินัย',
    workoutReport: 'รายงานการออกกำลังกาย',
    financeReport: 'รายงานกระแสเงินสด',
    viewWorkout: 'ดูห้องซ้อม',
    viewFinance: 'ดูห้องบัญชี',

    // Settings Tab
    settingsTitle: 'ตั้งค่าข้อมูล & บัญชีสมาชิก',
    settingsSubtitle: 'USER IDENTITY & SYSTEM SETTINGS',
    heightAge: 'สูง {height} ซม. · อายุ {age} ปี',
    editProfile: 'แก้ไขรายละเอียดข้อมูลส่วนตัว',
    displayName: 'ชื่อของคุณ (Display Name)',
    weightKgLabel: 'น้ำหนัก (กก.)',
    heightCmLabel: 'ส่วนสูง (ซม.)',
    ageLabel: 'อายุ (ปี)',
    calorieTargetLabel: 'เป้าหมายเผาผลาญประจำวัน (kcal)',
    languageSelection: 'เลือกภาษา (Language)',
    themeSelection: 'เลือกธีมสีแอพ (Theme Color)',
    themeSubtitle: 'เลือกโทนสีเอกลักษณ์ประจำตัวของคุณ',
    saveSettings: 'บันทึกการตั้งค่า',
    saved: 'บันทึกเรียบร้อย!',
    installPwa: 'ติดตั้งแอพพลิเคชัน (Install App)',
    installPwaDesc: 'เปิดใช้งานเต็มหน้าจอ ไร้แถบ URL ทำงานออฟไลน์ได้ 100%',
    installBtn: 'กดติดตั้งแอปลงเครื่องทันที',
    installedBtn: 'ติดตั้งลงเครื่องเรียบร้อยแล้ว ✓',
    installGuide: 'วิธีเพิ่มลงหน้าจอโฮม (iOS / Android)',
    resetData: 'ล้างข้อมูลทดสอบทั้งหมด',
    logout: 'ออกจากระบบ',

    // Auth & Modals
    authTitle: 'gym gym gym',
    authSubtitle: 'Fit & Finance | ออกกำลัง & บัญชีเงิน',
    signUpBtn: 'Sign Up (สมัครสมาชิก)',
    logInBtn: 'Log In (เข้าสู่ระบบ)',
    guestModeBtn: 'ทดลองใช้งานทันที (Guest Mode)',
    termsNotice: 'ข้อตกลงและเงื่อนไขการใช้งาน 5 ข้อ (ฟรี • ข้อมูลเป็นความลับ)',
    termsTitle: 'ข้อตกลงและเงื่อนไขการใช้งาน 5 ข้อ',
  },
  en: {
    // App Header
    appSub: 'FIT & FINANCE OS',
    officialMember: 'Official Member',
    guest: 'Guest Athlete',
    welcome: 'Welcome back',
    activeVip: 'ACTIVE VIP',
    login: 'Log In',
    quickScheduler: 'Quick Schedule',

    // Navigation Tabs
    dashboard: 'Dashboard',
    workout: 'Workout',
    calendar: 'Calendar',
    finance: 'Finance',
    summary: 'Summary',
    settings: 'Settings',

    // Dashboard
    recommendedForYou: 'Recommended for you',
    quickSchedulerBtn: 'Quick Schedule',
    chestSplit: 'Chest (15 Reps)',
    backSplit: 'Back (15 Reps)',
    legsSplit: 'Legs (15 Reps)',
    runSplit: 'Run (1-20 km)',
    dailyCalorieSummary: 'Daily Calorie Summary',
    totalWorkoutTime: 'Workout Time',
    runDistance: 'Run',
    km: 'km',
    lo: 'km',
    minutes: 'mins',
    calories: 'cal',
    burnedKcal: 'Calories Burned (kcal)',
    completedMachines: 'Sets Completed (15 reps)',
    openWorkoutRoom: 'Open Workout Room',
    todayWorkoutRoutine: "Today's Workout Routine",
    viewFullCalendar: 'View Full Calendar',
    noPlanToday: 'No routine today. Tap here to create a quick schedule',
    hours: 'hrs',
    machines: 'machines',
    dailyCashFlowTitle: 'Daily Cash Flow & Finance',
    viewFullLedger: 'View Full Ledger',
    netBalance: 'Net Balance',

    // Workout Tab
    workoutTitle: '15-Rep Hypertrophy Protocol',
    workoutSubtitle: 'THE 15-REP HYPERTROPHY PROTOCOL',
    gymLive: 'GYM GYM GYM LIVE',
    workoutDuration: 'Workout Time',
    totalBurned: 'Burned',
    repsDone: 'Reps Done',
    repsUnit: 'reps',
    restTimer: 'Rest Timer',
    restingRemaining: 'Resting: ',
    secondsRemaining: 's left',
    runningCardio: 'Cardio Running Tracker',
    addMachine: 'Add Machine',
    finishWorkout: 'Finish Workout',
    setNum: 'Set',
    weight: 'Weight (kg)',
    reps: 'Reps',
    completed: 'Done',
    removeMachine: 'Remove Machine',
    addSet: '+ Add Set (15 reps)',
    confirmFinish: 'Finish Workout Session',
    emptyWorkoutPrompt: 'No machines added yet. Tap "Add Machine" to start your 15-rep set.',

    // Calendar Tab
    calendarTitle: 'Training Schedule & Routines',
    scheduleWorkout: 'Schedule Workout',
    dateLabel: 'Date:',
    hasRoutines: 'Routines',
    noRoutines: 'No Routine',
    noRoutineForDate: 'No routine scheduled for this date',
    noRoutineDesc: 'Select target muscle group or running distance (1-20 km) to auto-generate a routine',
    scheduleTodayBtn: 'Schedule Today Workout',
    startFromThisPlan: 'Start Routine from Plan',
    deletePlan: 'Delete Plan',

    // Finance Tab
    financeTitle: 'Cash Flow Ledger',
    financeSubtitle: 'DAILY LIFE FINANCE & CASHFLOW',
    dailyReport: 'Daily Report',
    newTransaction: 'New Entry',
    totalIncome: 'Total Income',
    totalExpense: 'Total Expense',
    todayExpense: "Today's Expense",
    transactionHistory: 'Transaction History',
    noTransactions: 'No transactions recorded yet',
    addIncome: 'Income',
    addExpense: 'Expense',
    amount: 'Amount (THB)',
    category: 'Category',
    note: 'Note / Description',
    notePlaceholder: 'e.g. Chicken rice, Coffee, Fuel...',
    saveTransaction: 'Save Transaction',
    saveTransactionBtn: 'Save Entry Now',
    addModalTitle: 'New Transaction Entry',
    expense: 'Expense',
    income: 'Income',
    cancel: 'Cancel',
    dailyReportTitle: 'Daily Finance Report',
    dailySummaryNet: 'Daily Net Balance',
    baht: 'THB',

    // Summary Tab
    summaryTitle: 'Analytics & Discipline Log',
    summarySubtitle: 'DISCIPLINE & PERFORMANCE SUMMARY',
    dailyReportOf: 'Daily Report for',
    totalSetsCompleted: 'Total Sets Completed',
    totalDistanceRun: 'Total Running Distance',
    totalCaloriesBurned: 'Total Calories Burned',
    disciplineScore: 'Discipline Score',
    workoutReport: 'Workout Report',
    financeReport: 'Cash Flow Report',
    viewWorkout: 'Go to Workout',
    viewFinance: 'Go to Finance',

    // Settings Tab
    settingsTitle: 'Settings & Member Account',
    settingsSubtitle: 'USER IDENTITY & SYSTEM SETTINGS',
    heightAge: '{height} cm · {age} yrs',
    editProfile: 'Edit Personal Information',
    displayName: 'Display Name',
    weightKgLabel: 'Weight (kg)',
    heightCmLabel: 'Height (cm)',
    ageLabel: 'Age (years)',
    calorieTargetLabel: 'Daily Calorie Target (kcal)',
    languageSelection: 'Language / ภาษา',
    themeSelection: 'Application Color Theme',
    themeSubtitle: 'Select your primary accent color & style',
    saveSettings: 'Save Settings',
    saved: 'Saved Successfully!',
    installPwa: 'Install Application (PWA)',
    installPwaDesc: 'Full screen, no URL bar, 100% offline capable',
    installBtn: 'Install App on Device Now',
    installedBtn: 'Installed on Device ✓',
    installGuide: 'How to Add to Home Screen (iOS / Android)',
    resetData: 'Reset All Demo Data',
    logout: 'Log Out',

    // Auth & Modals
    authTitle: 'gym gym gym',
    authSubtitle: 'Fit & Finance OS',
    signUpBtn: 'Sign Up (Create Account)',
    logInBtn: 'Log In',
    guestModeBtn: 'Try Now (Guest Mode)',
    termsNotice: '5 Terms of Service & Privacy (100% Free & Confidential)',
    termsTitle: '5 Terms of Service & Privacy',
  },
};

export const getTranslation = (lang: Language = 'th') => {
  return TRANSLATIONS[lang] || TRANSLATIONS.th;
};

/**
 * Translates routine titles dynamically (e.g. from generated Thai presets to English).
 */
export function translateRoutineTitle(title?: string, lang: Language = 'th'): string {
  if (!title) return '';
  if (lang !== 'en') return title;

  let res = title;
  res = res.replace(/^โปรแกรม\s*/i, 'Routine: ');
  res = res.replace(/โปรแกรม\s*/gi, 'Routine: ');
  res = res.replace(/วิ่งคาร์ดิโอ/gi, 'Cardio Running');
  res = res.replace(/วิ่ง\s*(\d+(?:\.\d+)?)\s*(?:กม\.?|โล)/gi, '$1 km Run');
  res = res.replace(/\((\d+(?:\.\d+)?)\s*ชม\.?\)/gi, '($1 hr)');
  res = res.replace(/อก/gi, 'Chest');
  res = res.replace(/หลัง(?!\w)/gi, 'Back');
  res = res.replace(/ขา(?!\w)/gi, 'Legs');
  res = res.replace(/ไหล่/gi, 'Shoulders');
  res = res.replace(/หน้าแขน/gi, 'Biceps');
  res = res.replace(/หลังแขน/gi, 'Triceps');
  res = res.replace(/แขน(?!\w)/gi, 'Arms');
  res = res.replace(/หน้าท้อง/gi, 'Abs');
  res = res.replace(/คาร์ดิโอ/gi, 'Cardio');
  res = res.replace(/ทั่วร่าง/gi, 'Full Body');
  res = res.replace(/บันทึกการซ้อมวันนี้/gi, "Today's Workout Session");

  return res.trim();
}
