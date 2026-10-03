import React, { useState } from 'react';
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
import type { Transaction, TransactionType } from '../types';
import {
  calculateFinanceSummary,
  EXPENSE_CATEGORIES,
  formatBaht,
  INCOME_CATEGORIES,
} from '../utils/financeEngine';

interface FinanceTabProps {
  transactions: Transaction[];
  onAddTransaction: (tx: Transaction) => void;
  onDeleteTransaction: (id: string) => void;
}

export const FinanceTab: React.FC<FinanceTabProps> = ({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];
  const summary = calculateFinanceSummary(transactions, todayStr);

  // Add Transaction Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [txType, setTxType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>(EXPENSE_CATEGORIES[0].name);
  const [note, setNote] = useState<string>('');
  const [date, setDate] = useState<string>(todayStr);

  // Daily Report Summary Modal State
  const [showDailyReport, setShowDailyReport] = useState(false);
  const [reportDate, setReportDate] = useState<string>(todayStr);

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
    setAmount('');
    setNote('');
  };

  const currentCategories = txType === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

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
            บัญชีรายรับ-รายจ่าย
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
            <FileText size={14} /> สรุปยอดรายวัน
          </button>

          <button
            onClick={() => {
              setCategory(EXPENSE_CATEGORIES[0].name);
              setShowAddModal(true);
            }}
            style={{
              backgroundColor: '#0a0a0c',
              color: '#ffe500',
              border: 'none',
              borderRadius: '9999px',
              padding: '8px 16px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            }}
          >
            <Plus size={15} /> บันทึกใหม่
          </button>
        </div>
      </div>

      {/* Main Net Balance HUD Card (Monochrome styling) */}
      <div
        style={{
          backgroundColor: '#0a0a0c',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '22px',
          border: '2px solid #0a0a0c',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        }}
      >
        <span style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 600 }}>ยอดเงินคงเหลือสุทธิ (Net Balance)</span>
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
            backgroundColor: '#16161b',
            padding: '12px',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#10b981',
              }}
            >
              <ArrowDownLeft size={16} />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#a1a1aa', display: 'block' }}>รายรับรวม</span>
              <strong style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: '#10b981' }}>
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
                backgroundColor: 'rgba(244, 63, 94, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f43f5e',
              }}
            >
              <ArrowUpRight size={16} />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: '#a1a1aa', display: 'block' }}>รายจ่ายรวม</span>
              <strong style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', color: '#f43f5e' }}>
                -{formatBaht(summary.totalExpense)}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Expense Category Breakdown Section */}
      {summary.categoryBreakdown.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#71717a', textTransform: 'uppercase' }}>
              สัดส่วนค่าใช้จ่ายตามหมวดหมู่:
            </span>
            <span style={{ fontSize: '11px', color: '#71717a' }}>จ่ายวันนี้ {formatBaht(summary.todayExpense)}</span>
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
                    backgroundColor: '#0a0a0c',
                    color: '#ffe500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <CategoryIconBadge icon={cat.icon} size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '11px', color: '#71717a', fontWeight: 600 }}>{cat.category}</div>
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
          ประวัติรายการล่าสุด ({transactions.length} รายการ)
        </h2>
      </div>

      {/* Transactions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {transactions.length === 0 ? (
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
            <p style={{ fontSize: '13px', color: '#71717a' }}>ยังไม่มีรายการบันทึก คลิกที่ปุ่มด้านบนเพื่อเพิ่มรายการ</p>
          </div>
        ) : (
          transactions.map((tx) => {
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
                        {tx.category}
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
                    title="ลบรายการ"
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
                    สรุปยอดรายงานประจำวัน
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
                  เลือกวันที่ต้องการดูรายงานสรุป:
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
                  ส่วนต่างสุทธิประจำวันที่ {new Date(reportDate).toLocaleDateString('th-TH')}
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
                    <span style={{ fontSize: '11px', color: '#a1a1aa' }}>รายรับวันนั้น</span>
                    <strong style={{ color: '#10b981', display: 'block', fontSize: '15px', fontFamily: 'Outfit, sans-serif' }}>
                      +{formatBaht(dailyIncome)}
                    </strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '11px', color: '#a1a1aa' }}>รายจ่ายวันนั้น</span>
                    <strong style={{ color: '#f43f5e', display: 'block', fontSize: '15px', fontFamily: 'Outfit, sans-serif' }}>
                      -{formatBaht(dailyExpense)}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Itemized Transactions on this date */}
              <div>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#71717a', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  รายการทั้งหมดของวันนี้นี้ ({dailyTransactions.length} รายการ):
                </span>

                {dailyTransactions.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f9f9fa', borderRadius: '14px', border: '1px dashed #d4d4d8' }}>
                    <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>ไม่มีรายการรับหรือจ่ายในวันที่เลือกนี้</p>
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
                          <span style={{ color: '#71717a', fontSize: '11px', display: 'block' }}>{tx.category}</span>
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
                <span>ปิดหน้ารายงานสรุป</span>
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
                  บันทึกรายการบัญชีใหม่
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
                รายจ่าย (Expense)
              </button>

              <button
                type="button"
                onClick={() => {
                  setTxType('income');
                  setCategory(INCOME_CATEGORIES[0].name);
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
                รายรับ (Income)
              </button>
            </div>

            <form onSubmit={handleSaveTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Amount */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#52525b', display: 'block', marginBottom: '6px' }}>
                  จำนวนเงิน (บาท):
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
                  หมวดหมู่:
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {currentCategories.map((c) => (
                    <button
                      type="button"
                      key={c.name}
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
                      }}
                    >
                      <CategoryIconBadge icon={c.icon} size={14} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Note / Description */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 600, color: '#52525b', display: 'block', marginBottom: '6px' }}>
                  หมายเหตุ / รายละเอียด:
                </label>
                <input
                  type="text"
                  placeholder="เช่น ข้าวกะเพรา, กาแฟ, ค่าน้ำมัน..."
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
                  วันที่:
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
                <span>บันทึกรายการทันที</span>
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
