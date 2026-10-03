import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Plus,
  Trash2,
  ChevronRight,
  Calendar,
  FileText,
  X,
  Utensils,
  Package,
  Dumbbell,
  Shirt,
  Car,
  Coffee,
  Receipt,
  TrendingUp,
  Building2,
  Coins,
  Pencil,
  Tag,
} from 'lucide-react';

const CategoryIconBadge: React.FC<{ icon: string; size?: number }> = ({ icon, size = 16 }) => {
  switch (icon) {
    case 'utensils':
      return <Utensils size={size} />;
    case 'package':
      return <Package size={size} />;
    case 'dumbbell':
      return <Dumbbell size={size} />;
    case 'shirt':
      return <Shirt size={size} />;
    case 'car':
      return <Car size={size} />;
    case 'coffee':
      return <Coffee size={size} />;
    case 'receipt':
      return <Receipt size={size} />;
    case 'wallet':
      return <Wallet size={size} />;
    case 'trending-up':
      return <TrendingUp size={size} />;
    case 'building':
      return <Building2 size={size} />;
    case 'coins':
      return <Coins size={size} />;
    default:
      return <Tag size={size} />;
  }
};
import type { Transaction, TransactionType, UserProfile } from '../types';
import {
  calculateFinanceSummary,
  EXPENSE_CATEGORIES,
  formatBaht,
  INCOME_CATEGORIES,
  getCategoryName,
  getAllCategories,
  addCustomCategory,
  deleteCustomCategory,
  AVAILABLE_ICONS,
  type CategoryItem,
} from '../utils/financeEngine';
import { getTranslation } from '../utils/translations';

interface FinanceTabProps {
  transactions: Transaction[];
  onAddTransaction: (tx: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
  userProfile?: UserProfile;
}

export const FinanceTab: React.FC<FinanceTabProps> = ({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
  userProfile,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const t = getTranslation(userProfile?.language || 'th');
  const summary = calculateFinanceSummary(transactions, todayStr);

  // Add Transaction Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [txType, setTxType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0].name);
  const [note, setNote] = useState<string>('');
  const [date, setDate] = useState<string>(todayStr);

  // Filter tab for transaction history: all, income only, expense only
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  // Daily Report Summary Modal State
  const [showDailyReport, setShowDailyReport] = useState(false);
  const [reportDate, setReportDate] = useState<string>(todayStr);

  // Custom Category Creation State
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatNameEn, setNewCatNameEn] = useState('');
  const [newCatIcon, setNewCatIcon] = useState('tag');
  // Force re-render when custom categories change
  const [catVersion, setCatVersion] = useState(0);

  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;

    const newTx: Transaction = {
      id: 'tx_' + Date.now(),
      date,
      type: txType,
      amount: num,
      category,
      note: note.trim() || category,
    };

    onAddTransaction(newTx);
    setShowAddModal(false);
    // Reset ALL form fields to prevent stale data leaking between views
    setAmount('');
    setNote('');
    setCategory(EXPENSE_CATEGORIES[0].name);
    setTxType('expense');
    setDate(todayStr);
    setShowAddCategory(false);
    // Focus filter on the type that was just added so user sees their record immediately
    setFilterType(txType);
  };

  // catVersion is used as a dependency trigger for re-render when custom categories change
  const currentCategories: CategoryItem[] = catVersion >= 0 ? getAllCategories(txType) : [];

  const handleAddCategory = useCallback(() => {
    if (!newCatName.trim()) return;
    const newCat = addCustomCategory(txType, newCatName.trim(), newCatNameEn.trim() || newCatName.trim(), newCatIcon);
    setCategory(newCat.name);
    setNewCatName('');
    setNewCatNameEn('');
    setNewCatIcon('tag');
    setShowAddCategory(false);
    setCatVersion((v) => v + 1);
  }, [newCatName, newCatNameEn, newCatIcon, txType]);

  const handleDeleteCategory = useCallback((catItem: CategoryItem) => {
    deleteCustomCategory(txType, catItem.id);
    // If the deleted category was selected, reset to first default
    if (category === catItem.name) {
      const defaults = txType === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
      setCategory(defaults[0].name);
    }
    setCatVersion((v) => v + 1);
  }, [txType, category]);

  // Filter transactions for daily report
  const dailyTransactions = transactions.filter((t) => t.date === reportDate);
  const dailyIncome = dailyTransactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  const dailyExpense = dailyTransactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
  const dailyNet = dailyIncome - dailyExpense;

  // Category breakdown for selected day
  const dailyCategoryMap: Record<string, number> = {};
  dailyTransactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      dailyCategoryMap[t.category] = (dailyCategoryMap[t.category] || 0) + t.amount;
    });

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Title & Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
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
              DAILY LIFE FINANCE & CASHFLOW
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
            {t.financeTitle}
          </h1>
        </div>

        {/* 2 Buttons: Daily Report & Add New */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowDailyReport(true)}
            style={{
              backgroundColor: '#ffffff',
              color: '#0a0a0c',
              border: '1.5px solid #0a0a0c',
              borderRadius: '9999px',
              padding: '8px 14px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 2px 0 #0a0a0c',
            }}
          >
            <FileText size={14} /> {t.dailyReport}
          </button>

          <button
            onClick={() => {
              setTxType('expense');
              setCategory(EXPENSE_CATEGORIES[0].name);
              setAmount('');
              setNote('');
              setDate(todayStr);
              setShowAddModal(true);
            }}
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
            <Plus size={15} color="#ffffff" /> {t.newTransaction}
          </button>
        </div>
      </div>

      {/* Main Net Balance HUD Card (Monochrome styling) */}
      <div
        style={{
          background: 'var(--theme-card-bg, #0a0a0c)',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '22px',
          border: '2px solid var(--theme-card-border, #0a0a0c)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        }}
      >
        <span style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.85)', fontWeight: 600 }}>{t.netBalance}</span>
        <div
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '32px',
            fontWeight: 800,
            color: '#ffffff',
            margin: '4px 0 16px 0',
            letterSpacing: '-1px',
          }}
        >
          {formatBaht(summary.netBalance)}
        </div>

        {/* 2 Sub Boxes: Total Income & Total Expense */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.22)',
            backdropFilter: 'blur(8px)',
            padding: '12px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <ArrowDownLeft size={16} color="#ffffff" />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.85)', display: 'block' }}>{t.totalIncome}</span>
              <strong style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: '#ffffff' }}>
                +{formatBaht(summary.totalIncome)}
              </strong>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
              }}
            >
              <ArrowUpRight size={16} color="#ffffff" />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.85)', display: 'block' }}>{t.totalExpense}</span>
              <strong style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: '#ffffff' }}>
                {summary.totalExpense > 0 ? `-${formatBaht(summary.totalExpense)}` : formatBaht(0)}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Income Category Breakdown Section (shows when looking at all or income) */}
      {(filterType === 'all' || filterType === 'income') && summary.incomeBreakdown && summary.incomeBreakdown.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#166534', textTransform: 'uppercase' }}>
              {userProfile?.language === 'en' ? 'Income by Category:' : 'สัดส่วนรายรับตามหมวดหมู่:'}
            </span>
            <span style={{ fontSize: '11px', color: '#15803d', fontWeight: 600 }}>
              {userProfile?.language === 'en' ? `Today's Income +${formatBaht(summary.todayIncome)}` : `รับวันนี้ +${formatBaht(summary.todayIncome)}`}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {summary.incomeBreakdown.slice(0, 4).map((cat) => (
              <div
                key={cat.category}
                style={{
                  flex: '0 0 auto',
                  backgroundColor: '#f0fdf4',
                  border: '1.5px solid #86efac',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 0 #15803d',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: '#15803d',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CategoryIconBadge icon={cat.icon} size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#166534', fontWeight: 600 }}>{getCategoryName(cat.category, userProfile?.language || 'th')}</div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '13px', color: '#15803d' }}>
                    +{formatBaht(cat.amount)}{' '}
                    <span style={{ fontSize: '10px', color: '#166534', fontWeight: 600 }}>({cat.percentage}%)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expense Category Breakdown Section (shows when looking at all or expense) */}
      {(filterType === 'all' || filterType === 'expense') && summary.categoryBreakdown.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#71717a', textTransform: 'uppercase' }}>
              {userProfile?.language === 'en' ? 'Expense by Category:' : 'สัดส่วนค่าใช้จ่ายตามหมวดหมู่:'}
            </span>
            <span style={{ fontSize: '11px', color: '#71717a' }}>
              {userProfile?.language === 'en' ? `Today's Spent ${formatBaht(summary.todayExpense)}` : `จ่ายวันนี้ ${formatBaht(summary.todayExpense)}`}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {summary.categoryBreakdown.slice(0, 4).map((cat) => (
              <div
                key={cat.category}
                style={{
                  flex: '0 0 auto',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #0a0a0c',
                  borderRadius: '16px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 0 #0a0a0c',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'var(--theme-card-bg, #0a0a0c)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CategoryIconBadge icon={cat.icon} size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#71717a', fontWeight: 600 }}>{getCategoryName(cat.category, userProfile?.language || 'th')}</div>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '13px' }}>
                    {formatBaht(cat.amount)}{' '}
                    <span style={{ fontSize: '10px', color: '#a1a1aa', fontWeight: 600 }}>({cat.percentage}%)</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3 View Tabs: All, Income Only, Expense Only */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '6px',
          backgroundColor: '#f4f4f5',
          padding: '4px',
          borderRadius: '14px',
        }}
      >
        <button
          type="button"
          onClick={() => setFilterType('all')}
          style={{
            padding: '8px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: filterType === 'all' ? '#0a0a0c' : 'transparent',
            color: filterType === 'all' ? '#ffffff' : '#71717a',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Prompt, sans-serif',
            transition: 'all 0.15s ease',
          }}
        >
          {userProfile?.language === 'en' ? 'All' : 'ทั้งหมด'} ({transactions.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterType('income')}
          style={{
            padding: '8px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: filterType === 'income' ? '#0a0a0c' : 'transparent',
            color: filterType === 'income' ? '#10b981' : '#71717a',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Prompt, sans-serif',
            transition: 'all 0.15s ease',
          }}
        >
          {userProfile?.language === 'en' ? 'Income' : 'รายรับ'} ({transactions.filter(t => t.type === 'income').length})
        </button>
        <button
          type="button"
          onClick={() => setFilterType('expense')}
          style={{
            padding: '8px',
            borderRadius: '10px',
            border: 'none',
            backgroundColor: filterType === 'expense' ? '#0a0a0c' : 'transparent',
            color: filterType === 'expense' ? '#f43f5e' : '#71717a',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'Prompt, sans-serif',
            transition: 'all 0.15s ease',
          }}
        >
          {userProfile?.language === 'en' ? 'Expense' : 'รายจ่าย'} ({transactions.filter(t => t.type === 'expense').length})
        </button>
      </div>

      {/* Transactions History Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '17px',
            fontWeight: 800,
            color: '#0a0a0c',
          }}
        >
          {filterType === 'income'
            ? (userProfile?.language === 'en' ? 'Income Records' : 'เฉพาะรายการรายรับ')
            : filterType === 'expense'
            ? (userProfile?.language === 'en' ? 'Expense Records' : 'เฉพาะรายการรายจ่าย')
            : (userProfile?.language === 'en' ? `Transaction History (${transactions.length})` : `ประวัติรายการล่าสุด (${transactions.length} รายการ)`)}
        </h2>
      </div>

      {/* Transactions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {transactions.filter(t => filterType === 'all' || t.type === filterType).length === 0 ? (
          <div
            style={{
              padding: '30px',
              textAlign: 'center',
              backgroundColor: '#fafafa',
              borderRadius: '20px',
              border: '1.5px dashed #d4d4d8',
            }}
          >
            <Wallet size={28} color="#a1a1aa" style={{ margin: '0 auto 6px auto' }} />
            <p style={{ fontSize: '13px', color: '#71717a' }}>
              {filterType === 'income'
                ? (userProfile?.language === 'en' ? 'No income records found' : 'ยังไม่มีรายการรายรับ')
                : filterType === 'expense'
                ? (userProfile?.language === 'en' ? 'No expense records found' : 'ยังไม่มีรายการรายจ่าย')
                : t.noTransactions}
            </p>
          </div>
        ) : (
          transactions
            .filter(t => filterType === 'all' || t.type === filterType)
            .map((tx) => {
            const isIncome = tx.type === 'income';
            return (
              <div
                key={tx.id}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #0a0a0c',
                  borderRadius: '18px',
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  boxShadow: '0 2px 0 #0a0a0c',
                  transition: 'transform 0.15s ease',
                }}
              >
                {/* Left: Icon & Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      backgroundColor: '#0a0a0c',
                      color: isIncome ? '#10b981' : '#ffe500',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isIncome ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                  </div>

                  <div>
                    <h3
                      style={{
                        fontFamily: 'Prompt, sans-serif',
                        fontSize: '14px',
                        fontWeight: 700,
                        color: '#0a0a0c',
                        margin: 0,
                      }}
                    >
                      {tx.note}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                      <span
                        style={{
                          fontSize: '10px',
                          backgroundColor: '#f4f4f5',
                          color: '#71717a',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          fontWeight: 600,
                        }}
                      >
                        {getCategoryName(tx.category, userProfile?.language || 'th')}
                      </span>
                      <span style={{ fontSize: '10px', color: '#a1a1aa' }}>{tx.date}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Amount & Delete */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '16px',
                      fontWeight: 800,
                      color: isIncome ? '#10b981' : '#0a0a0c',
                    }}
                  >
                    {isIncome ? '+' : '-'}
                    {formatBaht(tx.amount)}
                  </span>
                  <button
                    onClick={() => onDeleteTransaction(tx.id)}
                    title={userProfile?.language === 'en' ? 'Delete transaction' : 'ลบรายการ'}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#d4d4d8',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* DEDICATED MODAL: DAILY SUMMARY REPORT (สรุปยอดรายงานประจำวัน) */}
      {showDailyReport &&
        createPortal(
          <div
            onClick={() => setShowDailyReport(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
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
                borderTopLeftRadius: '28px',
                borderTopRightRadius: '28px',
                padding: '20px 20px',
                paddingBottom: 'max(36px, env(safe-area-inset-bottom, 36px))',
                maxHeight: '88vh',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
                boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
              }}
            >
              {/* Modal Drag Pill Handle */}
              <div
                style={{
                  width: '40px',
                  height: '4px',
                  backgroundColor: '#e4e4e7',
                  borderRadius: '9999px',
                  margin: '0 auto 12px auto',
                }}
              />

              {/* Modal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
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
                    DAILY CASHFLOW REPORT
                  </span>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '20px', fontWeight: 800, margin: '4px 0 0 0' }}>
                    {userProfile?.language === 'en' ? 'Daily Cash Flow Report' : 'สรุปยอดรายงานประจำวัน'}
                  </h3>
                </div>
                <button
                  onClick={() => setShowDailyReport(false)}
                  style={{ background: '#f4f4f5', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Date Selector for Report */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#52525b', display: 'block', marginBottom: '6px' }}>
                  {userProfile?.language === 'en' ? 'Select Date for Report:' : 'เลือกวันที่ต้องการดูรายงานสรุป:'}
                </label>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1.5px solid #0a0a0c',
                    borderRadius: '14px',
                    padding: '10px 14px',
                    backgroundColor: '#fafafa',
                  }}
                >
                  <Calendar size={18} color="#0a0a0c" />
                  <input
                    type="date"
                    value={reportDate}
                    onChange={(e) => setReportDate(e.target.value)}
                    style={{
                      border: 'none',
                      background: 'none',
                      fontSize: '14px',
                      fontWeight: 700,
                      fontFamily: 'Outfit, Prompt, sans-serif',
                      width: '100%',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Daily Net Summary Card */}
              <div
                style={{
                  backgroundColor: '#0a0a0c',
                  color: '#ffffff',
                  borderRadius: '20px',
                  padding: '18px',
                  marginBottom: '16px',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                }}
              >
                <span style={{ fontSize: '11px', color: '#a1a1aa', fontWeight: 600 }}>
                  {userProfile?.language === 'en'
                    ? `Net Balance on ${new Date(reportDate).toLocaleDateString('en-US')}`
                    : `ส่วนต่างสุทธิประจำวันที่ ${new Date(reportDate).toLocaleDateString('th-TH')}`}
                </span>
                <div
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '28px',
                    fontWeight: 800,
                    color: dailyNet >= 0 ? '#10b981' : '#f43f5e',
                    margin: '4px 0 12px 0',
                  }}
                >
                  {dailyNet >= 0 ? '+' : ''}
                  {formatBaht(dailyNet)}
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px',
                    paddingTop: '10px',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '11px', color: '#a1a1aa' }}>
                      {userProfile?.language === 'en' ? 'Daily Income' : 'รายรับวันนั้น'}
                    </span>
                    <strong style={{ color: '#10b981', display: 'block', fontSize: '15px', fontFamily: 'Outfit, sans-serif' }}>
                      +{formatBaht(dailyIncome)}
                    </strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#a1a1aa' }}>
                      {userProfile?.language === 'en' ? 'Daily Expense' : 'รายจ่ายวันนั้น'}
                    </span>
                    <strong style={{ color: '#f43f5e', display: 'block', fontSize: '15px', fontFamily: 'Outfit, sans-serif' }}>
                      -{formatBaht(dailyExpense)}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Itemized Transactions on this date */}
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  {userProfile?.language === 'en' ? `Transactions on this date (${dailyTransactions.length}):` : `รายการทั้งหมดของวันนี้นี้ (${dailyTransactions.length} รายการ):`}
                </span>

                {dailyTransactions.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f9f9fa', borderRadius: '14px', border: '1px dashed #d4d4d8' }}>
                    <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>
                      {userProfile?.language === 'en' ? 'No transactions on this date.' : 'ไม่มีรายการรับหรือจ่ายในวันที่เลือกนี้'}
                    </p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {dailyTransactions.map((tx) => (
                      <div
                        key={tx.id}
                        style={{
                          padding: '10px 12px',
                          backgroundColor: '#f8f8f9',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '13px',
                          border: '1px solid #eeeeef',
                        }}
                      >
                        <div>
                          <strong style={{ color: '#0a0a0c' }}>{tx.note}</strong>
                          <span style={{ color: '#71717a', fontSize: '11px', display: 'block' }}>{getCategoryName(tx.category, userProfile?.language || 'th')}</span>
                        </div>
                        <span
                          style={{
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: 800,
                            fontSize: '14px',
                            color: tx.type === 'income' ? '#10b981' : '#0a0a0c',
                          }}
                        >
                          {tx.type === 'income' ? '+' : '-'}
                          {formatBaht(tx.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setShowDailyReport(false)}
                className="btn-black-pill"
                style={{ padding: '14px', marginTop: '16px' }}
              >
                <span>{userProfile?.language === 'en' ? 'Close Report' : 'ปิดหน้ารายงานสรุป'}</span>
                <X size={16} />
              </button>
            </div>
          </div>,
          document.body
        )}

      {/* Add Transaction Modal */}
      {showAddModal &&
        createPortal(
          <div
            onClick={() => setShowAddModal(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.7)',
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
                borderTopLeftRadius: '28px',
                borderTopRightRadius: '28px',
                padding: '20px 20px',
                paddingBottom: 'max(36px, env(safe-area-inset-bottom, 36px))',
                maxHeight: '88vh',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
                boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
              }}
            >
              {/* Modal Drag Pill Handle */}
              <div
                style={{
                  width: '40px',
                  height: '4px',
                  backgroundColor: '#e4e4e7',
                  borderRadius: '9999px',
                  margin: '0 auto 12px auto',
                }}
              />

              {/* Modal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '18px', fontWeight: 800 }}>
                  {t.addModalTitle}
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  style={{ background: '#f4f4f5', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Income / Expense Switcher */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  backgroundColor: '#f4f4f5',
                  padding: '4px',
                  borderRadius: '16px',
                  marginBottom: '16px',
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setTxType('expense');
                    setCategory(EXPENSE_CATEGORIES[0].name);
                    setAmount('');
                    setNote('');
                  }}
                  style={{
                    padding: '10px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: txType === 'expense' ? '#0a0a0c' : 'transparent',
                    color: txType === 'expense' ? '#ffffff' : '#71717a',
                    fontFamily: 'Prompt, sans-serif',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {t.expense}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setTxType('income');
                    setCategory(INCOME_CATEGORIES[0].name);
                    setAmount('');
                    setNote('');
                  }}
                  style={{
                    padding: '10px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: txType === 'income' ? '#0a0a0c' : 'transparent',
                    color: txType === 'income' ? '#ffffff' : '#71717a',
                    fontFamily: 'Prompt, sans-serif',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {t.income}
                </button>
              </div>

              <form onSubmit={handleSaveTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Amount */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#52525b', display: 'block', marginBottom: '6px' }}>
                    {t.amount}:
                  </label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      autoFocus
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      style={{
                        width: '100%',
                        border: '1.5px solid #0a0a0c',
                        borderRadius: '14px',
                        padding: '14px 16px',
                        fontSize: '22px',
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 800,
                        outline: 'none',
                      }}
                    />
                    <span style={{ position: 'absolute', right: '16px', fontWeight: 700, color: '#71717a' }}>฿</span>
                  </div>
                </div>

                {/* Category Picker */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#52525b', display: 'block', marginBottom: '6px' }}>
                    {t.category}:
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {currentCategories.map((c) => (
                      <div key={c.id || c.name} style={{ position: 'relative', display: 'inline-flex' }}>
                        <button
                          type="button"
                          onClick={() => setCategory(c.name)}
                          style={{
                            padding: '8px 12px',
                            borderRadius: '10px',
                            border: '1px solid ' + (category === c.name ? '#0a0a0c' : '#e4e4e7'),
                            backgroundColor: category === c.name ? '#0a0a0c' : '#fafafa',
                            color: category === c.name ? '#ffe500' : '#0a0a0c',
                            fontSize: '12px',
                            fontWeight: 600,
                            fontFamily: 'Prompt, sans-serif',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            paddingRight: c.isCustom ? '28px' : '12px',
                          }}
                        >
                          <CategoryIconBadge icon={c.icon} size={14} />
                          <span>{userProfile?.language === 'en' ? (c.nameEn || c.name) : c.name}</span>
                        </button>
                        {c.isCustom && (
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleDeleteCategory(c); }}
                            title={userProfile?.language === 'en' ? 'Remove category' : 'ลบหมวดหมู่'}
                            style={{
                              position: 'absolute',
                              top: '-4px',
                              right: '-4px',
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              backgroundColor: '#f43f5e',
                              color: '#ffffff',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '11px',
                              fontWeight: 800,
                              lineHeight: 1,
                              padding: 0,
                              boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                            }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}

                    {/* + Add Category Button */}
                    <button
                      type="button"
                      onClick={() => setShowAddCategory(!showAddCategory)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '10px',
                        border: '1.5px dashed #a1a1aa',
                        backgroundColor: showAddCategory ? '#0a0a0c' : 'transparent',
                        color: showAddCategory ? '#ffe500' : '#71717a',
                        fontSize: '12px',
                        fontWeight: 700,
                        fontFamily: 'Prompt, sans-serif',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <Plus size={14} />
                      <span>{userProfile?.language === 'en' ? 'Add' : 'เพิ่ม'}</span>
                    </button>
                  </div>

                  {/* Inline Add Category Form */}
                  {showAddCategory && (
                    <div
                      style={{
                        marginTop: '10px',
                        padding: '14px',
                        borderRadius: '14px',
                        border: '1.5px solid #0a0a0c',
                        backgroundColor: '#fafafa',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        boxShadow: '0 2px 0 #0a0a0c',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                        <Pencil size={14} color="#0a0a0c" />
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c' }}>
                          {userProfile?.language === 'en' ? 'Create New Category' : 'สร้างหมวดหมู่ใหม่'}
                        </span>
                      </div>

                      <input
                        type="text"
                        placeholder={userProfile?.language === 'en' ? 'Category name (TH)' : 'ชื่อหมวดหมู่ (ภาษาไทย)'}
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        style={{
                          width: '100%',
                          border: '1px solid #d4d4d8',
                          borderRadius: '10px',
                          padding: '10px 12px',
                          fontSize: '13px',
                          fontFamily: 'Prompt, sans-serif',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />

                      <input
                        type="text"
                        placeholder={userProfile?.language === 'en' ? 'Category name (EN) - optional' : 'ชื่อภาษาอังกฤษ (ไม่ต้องก็ได้)'}
                        value={newCatNameEn}
                        onChange={(e) => setNewCatNameEn(e.target.value)}
                        style={{
                          width: '100%',
                          border: '1px solid #d4d4d8',
                          borderRadius: '10px',
                          padding: '10px 12px',
                          fontSize: '13px',
                          fontFamily: 'Prompt, sans-serif',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />

                      {/* Icon Picker */}
                      <div>
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#71717a', display: 'block', marginBottom: '4px' }}>
                          {userProfile?.language === 'en' ? 'Choose Icon:' : 'เลือกไอคอน:'}
                        </span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {AVAILABLE_ICONS.map((iconName) => (
                            <button
                              type="button"
                              key={iconName}
                              onClick={() => setNewCatIcon(iconName)}
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '10px',
                                border: newCatIcon === iconName ? '2px solid #0a0a0c' : '1px solid #d4d4d8',
                                backgroundColor: newCatIcon === iconName ? '#0a0a0c' : '#ffffff',
                                color: newCatIcon === iconName ? '#ffe500' : '#52525b',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                transition: 'all 0.1s ease',
                              }}
                            >
                              <CategoryIconBadge icon={iconName} size={16} />
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Save / Cancel Buttons */}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          type="button"
                          onClick={handleAddCategory}
                          disabled={!newCatName.trim()}
                          style={{
                            flex: 1,
                            padding: '10px',
                            borderRadius: '10px',
                            border: 'none',
                            backgroundColor: newCatName.trim() ? '#0a0a0c' : '#d4d4d8',
                            color: newCatName.trim() ? '#ffffff' : '#a1a1aa',
                            fontSize: '12px',
                            fontWeight: 700,
                            fontFamily: 'Prompt, sans-serif',
                            cursor: newCatName.trim() ? 'pointer' : 'not-allowed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                          }}
                        >
                          <Plus size={14} />
                          {userProfile?.language === 'en' ? 'Create' : 'สร้างหมวดหมู่'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setShowAddCategory(false);
                            setNewCatName('');
                            setNewCatNameEn('');
                            setNewCatIcon('tag');
                          }}
                          style={{
                            padding: '10px 16px',
                            borderRadius: '10px',
                            border: '1px solid #d4d4d8',
                            backgroundColor: '#ffffff',
                            color: '#71717a',
                            fontSize: '12px',
                            fontWeight: 600,
                            fontFamily: 'Prompt, sans-serif',
                            cursor: 'pointer',
                          }}
                        >
                          {userProfile?.language === 'en' ? 'Cancel' : 'ยกเลิก'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Note / Description */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#52525b', display: 'block', marginBottom: '6px' }}>
                    {t.note}:
                  </label>
                  <input
                    type="text"
                    placeholder={t.notePlaceholder}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    style={{
                      width: '100%',
                      border: '1.5px solid #0a0a0c',
                      borderRadius: '14px',
                      padding: '12px 14px',
                      fontSize: '14px',
                      fontFamily: 'Prompt, sans-serif',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Date */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: '#52525b', display: 'block', marginBottom: '6px' }}>
                    {t.dateLabel || 'Date:'}
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{
                      width: '100%',
                      border: '1.5px solid #0a0a0c',
                      borderRadius: '14px',
                      padding: '12px 14px',
                      fontSize: '14px',
                      fontFamily: 'Outfit, Prompt, sans-serif',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-black-pill"
                  style={{ padding: '16px', marginTop: '10px' }}
                >
                  <span>{t.saveTransactionBtn}</span>
                  <ChevronRight size={18} />
                </button>
              </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
