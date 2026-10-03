import type { Language, Transaction, TransactionType } from '../types';

export interface CategoryItem {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  isCustom?: boolean;
}

export const EXPENSE_CATEGORIES: CategoryItem[] = [
  { id: 'food_clean', name: 'อาหาร & คลีนฟู้ด', nameEn: 'Food & Clean Eating', icon: 'utensils' },
  { id: 'supplements', name: 'เวย์โปรตีน & อาหารเสริม', nameEn: 'Whey & Supplements', icon: 'package' },
  { id: 'gym_membership', name: 'สมาชิกยิม / ค่าฟิตเนส', nameEn: 'Gym Membership', icon: 'dumbbell' },
  { id: 'gear', name: 'อุปกรณ์กีฬา & เสื้อผ้า', nameEn: 'Sports Gear & Apparel', icon: 'shirt' },
  { id: 'transport', name: 'เดินทาง & ค่าน้ำมัน', nameEn: 'Transport & Fuel', icon: 'car' },
  { id: 'coffee', name: 'กาแฟ & คาเฟ่', nameEn: 'Coffee & Cafe', icon: 'coffee' },
  { id: 'general', name: 'ค่าใช้จ่ายทั่วไป', nameEn: 'General Expenses', icon: 'receipt' },
];

export const INCOME_CATEGORIES: CategoryItem[] = [
  { id: 'salary', name: 'เงินเดือน / ค่าจ้าง', nameEn: 'Salary / Wages', icon: 'wallet' },
  { id: 'freelance', name: 'งานเสริม / ฟรีแลนซ์', nameEn: 'Freelance / Side Gig', icon: 'trending-up' },
  { id: 'business', name: 'ธุรกิจส่วนตัว', nameEn: 'Personal Business', icon: 'building' },
  { id: 'other_income', name: 'รายรับอื่นๆ', nameEn: 'Other Income', icon: 'coins' },
];

// Available icons for custom categories
export const AVAILABLE_ICONS = [
  'tag', 'wallet', 'coins', 'receipt', 'package', 'coffee',
  'car', 'dumbbell', 'shirt', 'utensils', 'trending-up', 'building',
];

const CUSTOM_CATEGORIES_KEY = 'flukexd_gym_custom_categories';

export function loadCustomCategories(): { expense: CategoryItem[]; income: CategoryItem[] } {
  try {
    const raw = localStorage.getItem(CUSTOM_CATEGORIES_KEY);
    if (!raw) return { expense: [], income: [] };
    return JSON.parse(raw);
  } catch {
    return { expense: [], income: [] };
  }
}

export function saveCustomCategories(data: { expense: CategoryItem[]; income: CategoryItem[] }): void {
  localStorage.setItem(CUSTOM_CATEGORIES_KEY, JSON.stringify(data));
}

export function addCustomCategory(
  type: TransactionType,
  name: string,
  nameEn: string,
  icon: string
): CategoryItem {
  const custom = loadCustomCategories();
  const newCat: CategoryItem = {
    id: 'custom_' + Date.now(),
    name,
    nameEn: nameEn || name,
    icon,
    isCustom: true,
  };
  if (type === 'expense') {
    custom.expense.push(newCat);
  } else {
    custom.income.push(newCat);
  }
  saveCustomCategories(custom);
  return newCat;
}

export function deleteCustomCategory(type: TransactionType, id: string): void {
  const custom = loadCustomCategories();
  if (type === 'expense') {
    custom.expense = custom.expense.filter((c) => c.id !== id);
  } else {
    custom.income = custom.income.filter((c) => c.id !== id);
  }
  saveCustomCategories(custom);
}

export function getAllCategories(type: TransactionType): CategoryItem[] {
  const builtIn = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  const custom = loadCustomCategories();
  const customList = type === 'expense' ? custom.expense : custom.income;
  return [...builtIn, ...customList];
}

export function getCategoryName(categoryNameOrId: string, lang: Language = 'th'): string {
  if (lang !== 'en') return categoryNameOrId;
  const exp = EXPENSE_CATEGORIES.find((c) => c.name === categoryNameOrId || c.id === categoryNameOrId);
  if (exp) return exp.nameEn;
  const inc = INCOME_CATEGORIES.find((c) => c.name === categoryNameOrId || c.id === categoryNameOrId);
  if (inc) return inc.nameEn;
  // Search custom categories too
  const custom = loadCustomCategories();
  const allCustom = [...custom.expense, ...custom.income];
  const cust = allCustom.find((c) => c.name === categoryNameOrId || c.id === categoryNameOrId);
  if (cust) return cust.nameEn;
  return categoryNameOrId;
}

export interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  todayExpense: number;
  todayIncome: number;
  categoryBreakdown: { category: string; amount: number; percentage: number; icon: string }[];
  incomeBreakdown: { category: string; amount: number; percentage: number; icon: string }[];
}

export function calculateFinanceSummary(
  transactions: Transaction[],
  selectedDate: string
): FinanceSummary {
  let totalIncome = 0;
  let totalExpense = 0;
  let todayExpense = 0;
  let todayIncome = 0;
  const expenseCategoryTotals: Record<string, number> = {};
  const incomeCategoryTotals: Record<string, number> = {};

  transactions.forEach(t => {
    if (t.type === 'income') {
      totalIncome += t.amount;
      incomeCategoryTotals[t.category] = (incomeCategoryTotals[t.category] || 0) + t.amount;
      if (t.date === selectedDate) {
        todayIncome += t.amount;
      }
    } else if (t.type === 'expense') {
      totalExpense += t.amount;
      expenseCategoryTotals[t.category] = (expenseCategoryTotals[t.category] || 0) + t.amount;
      if (t.date === selectedDate) {
        todayExpense += t.amount;
      }
    }
  });

  const netBalance = totalIncome - totalExpense;

  const custom = loadCustomCategories();

  const categoryBreakdown = Object.entries(expenseCategoryTotals).map(([cat, amount]) => {
    const foundExp = EXPENSE_CATEGORIES.find(c => c.name === cat)
      || custom.expense.find(c => c.name === cat);
    return {
      category: cat,
      amount,
      percentage: totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0,
      icon: foundExp ? foundExp.icon : 'tag'
    };
  }).sort((a, b) => b.amount - a.amount);

  const incomeBreakdown = Object.entries(incomeCategoryTotals).map(([cat, amount]) => {
    const foundInc = INCOME_CATEGORIES.find(c => c.name === cat)
      || custom.income.find(c => c.name === cat);
    return {
      category: cat,
      amount,
      percentage: totalIncome > 0 ? Math.round((amount / totalIncome) * 100) : 0,
      icon: foundInc ? foundInc.icon : 'coins'
    };
  }).sort((a, b) => b.amount - a.amount);

  return {
    totalIncome,
    totalExpense,
    netBalance,
    todayExpense,
    todayIncome,
    categoryBreakdown,
    incomeBreakdown
  };
}

export function formatBaht(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    maximumFractionDigits: 0
  }).format(amount);
}
