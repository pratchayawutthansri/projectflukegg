import type { Language, Transaction } from '../types';

export const EXPENSE_CATEGORIES = [
  { id: 'food_clean', name: 'อาหาร & คลีนฟู้ด', nameEn: 'Food & Clean Eating', icon: 'utensils' },
  { id: 'supplements', name: 'เวย์โปรตีน & อาหารเสริม', nameEn: 'Whey & Supplements', icon: 'package' },
  { id: 'gym_membership', name: 'สมาชิก Gym Gym Gym', nameEn: 'Gym Membership', icon: 'dumbbell' },
  { id: 'gear', name: 'อุปกรณ์กีฬา & เสื้อผ้า', nameEn: 'Sports Gear & Apparel', icon: 'shirt' },
  { id: 'transport', name: 'เดินทาง & ค่าน้ำมัน', nameEn: 'Transport & Fuel', icon: 'car' },
  { id: 'coffee', name: 'กาแฟ & คาเฟ่', nameEn: 'Coffee & Cafe', icon: 'coffee' },
  { id: 'general', name: 'ค่าใช้จ่ายทั่วไป', nameEn: 'General Expenses', icon: 'receipt' },
];

export const INCOME_CATEGORIES = [
  { id: 'salary', name: 'เงินเดือน / ค่าจ้าง', nameEn: 'Salary / Wages', icon: 'wallet' },
  { id: 'freelance', name: 'งานเสริม / ฟรีแลนซ์', nameEn: 'Freelance / Side Gig', icon: 'trending-up' },
  { id: 'business', name: 'ธุรกิจส่วนตัว', nameEn: 'Personal Business', icon: 'building' },
  { id: 'other_income', name: 'รายรับอื่นๆ', nameEn: 'Other Income', icon: 'coins' },
];

export function getCategoryName(categoryNameOrId: string, lang: Language = 'th'): string {
  if (lang !== 'en') return categoryNameOrId;
  const exp = EXPENSE_CATEGORIES.find((c) => c.name === categoryNameOrId || c.id === categoryNameOrId);
  if (exp) return exp.nameEn;
  const inc = INCOME_CATEGORIES.find((c) => c.name === categoryNameOrId || c.id === categoryNameOrId);
  if (inc) return inc.nameEn;
  return categoryNameOrId;
}

export interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  todayExpense: number;
  categoryBreakdown: { category: string; amount: number; percentage: number; icon: string }[];
}

export function calculateFinanceSummary(
  transactions: Transaction[],
  selectedDate: string
): FinanceSummary {
  let totalIncome = 0;
  let totalExpense = 0;
  let todayExpense = 0;
  const categoryTotals: Record<string, number> = {};

  transactions.forEach(t => {
    if (t.type === 'income') {
      totalIncome += t.amount;
    } else {
      totalExpense += t.amount;
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
      if (t.date === selectedDate) {
        todayExpense += t.amount;
      }
    }
  });

  const netBalance = totalIncome - totalExpense;

  const categoryBreakdown = Object.entries(categoryTotals).map(([cat, amount]) => {
    const foundExp = EXPENSE_CATEGORIES.find(c => c.name === cat);
    return {
      category: cat,
      amount,
      percentage: totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0,
      icon: foundExp ? foundExp.icon : 'tag'
    };
  }).sort((a, b) => b.amount - a.amount);

  return {
    totalIncome,
    totalExpense,
    netBalance,
    todayExpense,
    categoryBreakdown
  };
}

export function formatBaht(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0
  }).format(amount);
}
