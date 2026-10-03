import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  Lock,
  User,
  Scale,
  Ruler,
  Calendar,
  UserCheck,
  ShieldAlert,
  AlertCircle,
} from 'lucide-react';
import type { UserProfile } from '../types';
import { TermsModal } from './TermsModal';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccessAuth: (user: UserProfile) => void;
  isGateOnly?: boolean;
  userProfile?: UserProfile;
}

type AuthView = 'gateway' | 'onboarding' | 'signup' | 'login';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccessAuth,
  isGateOnly = false,
  userProfile,
}) => {
  const isEn = userProfile?.language === 'en';
  const [view, setView] = useState<AuthView>('gateway');
  const [onboardingStep, setOnboardingStep] = useState(0);

  // Form State: User ID, Display Name, Weight, Height, Age, Password, Confirm Password, Terms Agreement
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [weightKg, setWeightKg] = useState('70');
  const [heightCm, setHeightCm] = useState('175');
  const [age, setAge] = useState('25');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAgreedTerms, setIsAgreedTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Log In Form State
  const [loginIdOrName, setLoginIdOrName] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Legal Terms Modal
  const [showTermsModal, setShowTermsModal] = useState(false);

  if (!isOpen) return null;

  // Registered Accounts Store Helper
  const ACCOUNTS_STORAGE_KEY = 'flukexd_registered_accounts';

  const getAccounts = (): Array<{ userId: string; name: string; password: string; profile: UserProfile }> => {
    try {
      const raw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!userId.trim()) {
      setErrorMessage(isEn ? 'Please enter a User ID / Member ID' : 'กรุณากรอกไอดีผู้ใช้งาน (User ID / ID สมาชิก)');
      return;
    }
    if (!name.trim()) {
      setErrorMessage(isEn ? 'Please enter your Display Name' : 'กรุณากรอกชื่อของคุณ (Display Name)');
      return;
    }
    if (!password) {
      setErrorMessage(isEn ? 'Please enter a password' : 'กรุณากรอกรหัสผ่าน (Password)');
      return;
    }
    if (password.length < 4) {
      setErrorMessage(isEn ? 'Password must be at least 4 characters' : 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage(isEn ? 'Passwords do not match. Please verify again.' : 'รหัสผ่านทั้ง 2 ครั้งไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง');
      return;
    }
    if (!isAgreedTerms) {
      setErrorMessage(isEn ? 'Please check and accept the Terms & Conditions' : 'กรุณาทำเครื่องหมายยอมรับข้อตกลงและเงื่อนไขการใช้งาน');
      return;
    }

    const accounts = getAccounts();
    const isDuplicate = accounts.some(
      (acc) =>
        acc.userId.toLowerCase() === userId.trim().toLowerCase() ||
        acc.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (isDuplicate) {
      setErrorMessage(isEn ? 'This User ID or Name is already registered. Please use another ID or log in.' : 'ไอดีหรือชื่อผู้ใช้งานนี้มีอยู่ในระบบแล้ว กรุณาใช้ไอดีอื่น หรือเข้าสู่ระบบ');
      return;
    }

    const w = parseFloat(weightKg) || 70;
    const h = parseFloat(heightCm) || 175;
    const a = parseInt(age) || 25;
    const calculatedTarget = Math.round(10 * w + 6.25 * h - 5 * a + 300);

    const newUser: UserProfile = {
      name: name.trim(),
      memberId: userId.trim(),
      weightKg: w,
      heightCm: h,
      age: a,
      dailyCalorieTarget: calculatedTarget > 400 ? calculatedTarget : 650,
      gymName: 'Gym Gym Gym',
      themeMode: 'yellow',
      isRegistered: true,
      registeredDate: new Date().toISOString().split('T')[0],
    };

    // Save account securely into accounts store
    accounts.push({
      userId: userId.trim(),
      name: name.trim(),
      password: password,
      profile: newUser,
    });
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));

    setIsSuccess(true);
    setTimeout(() => {
      onSuccessAuth(newUser);
      setIsSuccess(false);
      onClose();
    }, 1000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErrorMessage('');

    if (!loginIdOrName.trim()) {
      setLoginErrorMessage(isEn ? 'Please enter your User ID or Display Name' : 'กรุณากรอกไอดีหรือชื่อผู้ใช้งาน');
      return;
    }
    if (!loginPassword) {
      setLoginErrorMessage(isEn ? 'Please enter your password' : 'กรุณากรอกรหัสผ่าน');
      return;
    }

    const accounts = getAccounts();
    const match = accounts.find(
      (acc) =>
        acc.userId.toLowerCase() === loginIdOrName.trim().toLowerCase() ||
        acc.name.toLowerCase() === loginIdOrName.trim().toLowerCase()
    );

    if (!match) {
      if (accounts.length === 0) {
        setLoginErrorMessage(isEn ? 'No accounts registered yet. Please click "Sign Up" first.' : 'ยังไม่มีบัญชีในระบบ กรุณากด "สมัครสมาชิก" ก่อนเข้าสู่ระบบ');
      } else {
        setLoginErrorMessage(isEn ? 'User ID or Name not found. Please sign up for a new account.' : 'ไม่พบชื่อผู้ใช้หรือไอดีนี้ในระบบ กรุณาสมัครสมาชิกใหม่');
      }
      return;
    }

    if (match.password !== loginPassword) {
      setLoginErrorMessage(isEn ? 'Incorrect password. Please try again.' : 'รหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบรหัสผ่านอีกครั้ง');
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      onSuccessAuth(match.profile);
      setIsSuccess(false);
      onClose();
    }, 1000);
  };

  return createPortal(
    <div
      onClick={isGateOnly ? undefined : onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isGateOnly ? '#121214' : 'rgba(10, 10, 12, 0.85)',
        backdropFilter: isGateOnly ? 'none' : 'blur(10px)',
        WebkitBackdropFilter: isGateOnly ? 'none' : 'blur(10px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      {/* Centered Modal Container: Matches exact width of the system (#root: 480px) */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '92vh',
          maxHeight: '840px',
          backgroundColor: '#ffffff',
          borderRadius: '32px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4), 0 0 0 2px #0a0a0c',
          margin: '0 auto',
        }}
      >
        {/* Floating Close Button: Strictly hidden on initial gate */}
        {!isGateOnly && (
          <button
            onClick={onClose}
            title="ปิด / ข้ามไปหน้าแอป"
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              zIndex: 30,
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: view === 'gateway' ? 'rgba(255,255,255,0.2)' : 'rgba(10,10,12,0.08)',
              color: view === 'gateway' ? '#ffffff' : '#0a0a0c',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <X size={18} />
          </button>
        )}

        {/* ============================================================ */}
        {/* SCREEN B: MAIN GATEWAY (CENTERED, SYSTEM WIDTH 480px) */}
        {/* ============================================================ */}
        {view === 'gateway' && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              backgroundColor: '#ffffff',
              overflowY: 'auto',
            }}
          >
            {/* Top Dramatic Fluid Black Wave with Echoing Contour Lines */}
            <div style={{ position: 'relative', width: '100%' }}>
              <svg
                viewBox="0 0 400 220"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: '100%', display: 'block' }}
              >
                {/* Black fluid organic wave pouring down from top-left */}
                <path
                  d="M0,0 L400,0 L400,55 C370,50 330,70 295,105 C260,140 220,150 180,120 C145,95 115,105 85,140 C55,175 30,195 0,205 Z"
                  fill="#0a0a0c"
                />
              </svg>
            </div>

            {/* Center Brand Identity: Logo + Gym Gym Gym */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: '0 24px',
                marginTop: '10px',
              }}
            >
              {/* Soaring Phoenix Logo */}
              <div
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '20px',
                  backgroundColor: '#0a0a0c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                  overflow: 'hidden',
                  padding: '6px',
                }}
              >
                <img
                  src="/flukexd-logo.png"
                  alt="Gym Gym Gym"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <h1
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '34px',
                  fontWeight: 800,
                  color: '#0a0a0c',
                  letterSpacing: '-0.8px',
                  margin: '12px 0 2px 0',
                  textTransform: 'lowercase',
                }}
              >
                gym gym gym
              </h1>
              <p
                style={{
                  fontFamily: 'Prompt, sans-serif',
                  fontSize: '13px',
                  color: '#71717a',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                Fit & Finance | {isEn ? 'Workout & Budget Tracker' : 'ออกกำลัง & บัญชีเงิน'}
              </p>
            </div>

            {/* Action Buttons: Sign Up & Log In + Terms Link */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '24px 32px 36px 32px',
                width: '100%',
              }}
            >
              {/* Black Solid Button: Sign Up */}
              <button
                onClick={() => {
                  setErrorMessage('');
                  setView('signup');
                }}
                style={{
                  width: '100%',
                  backgroundColor: '#0a0a0c',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '16px 24px',
                  fontSize: '16px',
                  fontWeight: 700,
                  fontFamily: 'Outfit, sans-serif',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.22)',
                  transition: 'transform 0.15s ease',
                  userSelect: 'none',
                }}
              >
                {isEn ? 'Sign Up' : 'Sign Up (สมัครสมาชิก)'}
              </button>

              {/* White Outline Button: Log In */}
              <button
                onClick={() => {
                  setLoginErrorMessage('');
                  setView('login');
                }}
                style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  color: '#0a0a0c',
                  border: '1.5px solid #0a0a0c',
                  borderRadius: '9999px',
                  padding: '15px 24px',
                  fontSize: '16px',
                  fontWeight: 700,
                  fontFamily: 'Outfit, sans-serif',
                  cursor: 'pointer',
                  transition: 'transform 0.15s ease',
                  userSelect: 'none',
                }}
              >
                {isEn ? 'Log In' : 'Log In (เข้าสู่ระบบ)'}
              </button>

              {/* Terms & Liability Waiver link */}
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#71717a',
                  fontSize: '11px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '5px',
                  textDecoration: 'underline',
                  marginTop: '4px',
                }}
              >
                <ShieldAlert size={13} />
                <span>{isEn ? '5 Terms & Conditions (Free • Confidential & Safe)' : 'ข้อตกลงและเงื่อนไขการใช้งาน 5 ข้อ (ฟรี • ข้อมูลเป็นความลับ)'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCREEN A: ONBOARDING TOUR */}
        {/* ============================================================ */}
        {view === 'onboarding' && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              backgroundColor: '#ffffff',
              padding: '24px 20px',
            }}
          >

            {/* Header: Logo */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '40px', zIndex: 2 }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '18px',
                  backgroundColor: '#0a0a0c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  padding: '5px',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                }}
              >
                <img
                  src="/flukexd-logo.png"
                  alt="Gym Gym Gym"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>

              <h1
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#0a0a0c',
                  letterSpacing: '-0.5px',
                  margin: '8px 0 4px 0',
                  textTransform: 'lowercase',
                }}
              >
                gym gym gym
              </h1>
              <p
                style={{
                  fontFamily: 'Prompt, sans-serif',
                  fontSize: '13px',
                  color: '#71717a',
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                {onboardingStep === 0
                  ? 'Find the best workout routine for you!'
                  : onboardingStep === 1
                  ? 'Smart Calorie & Distance Tracking'
                  : 'Daily Finance & Cashflow Management'}
              </p>
            </div>

            {/* Center Vector Illustration */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0', zIndex: 2 }}>
              <svg width="240" height="240" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 200 C30 150 70 120 100 130 C120 180 80 210 50 200 Z" fill="#e4e4e7" opacity="0.6" />
                <path d="M70 210 C50 170 90 140 120 150 C130 190 100 220 70 210 Z" fill="#d4d4d8" opacity="0.7" />
                <path d="M220 200 C240 150 200 120 170 130 C150 180 190 210 220 200 Z" fill="#e4e4e7" opacity="0.6" />
                <rect x="75" y="210" width="130" height="18" rx="6" fill="#0a0a0c" />
                <rect x="85" y="194" width="110" height="16" rx="5" fill="#27272a" />
                <rect x="95" y="180" width="90" height="14" rx="4" fill="#0a0a0c" />
                <rect x="100" y="168" width="80" height="12" rx="4" fill="#ffffff" stroke="#0a0a0c" strokeWidth="2" />
                <path d="M125 75 C115 80 100 95 105 115 C110 130 125 135 125 135 C120 120 125 100 130 90 Z" fill="#0a0a0c" />
                <circle cx="140" cy="78" r="14" fill="#ffffff" stroke="#0a0a0c" strokeWidth="2" />
                <path d="M130 92 L150 92 L155 125 L125 125 Z" fill="#71717a" />
                <path d="M148 100 L180 115 L175 122 L145 110 Z" fill="#ffffff" stroke="#0a0a0c" strokeWidth="2" />
                <path d="M175 95 L190 120 L165 125 Z" fill="#0a0a0c" />
                <path d="M125 125 L125 155 L165 155 L165 190 L155 190 L150 165 L120 165 L115 135 Z" fill="#0a0a0c" />
              </svg>
            </div>

            {/* Bottom Controls */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 10px 10px 10px',
                zIndex: 2,
              }}
            >
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span
                  style={{
                    width: onboardingStep === 0 ? '18px' : '7px',
                    height: '7px',
                    borderRadius: '9999px',
                    backgroundColor: '#0a0a0c',
                    transition: 'all 0.2s ease',
                  }}
                />
                <span
                  style={{
                    width: onboardingStep === 1 ? '18px' : '7px',
                    height: '7px',
                    borderRadius: '9999px',
                    backgroundColor: onboardingStep === 1 ? '#0a0a0c' : '#d4d4d8',
                    transition: 'all 0.2s ease',
                  }}
                />
                <span
                  style={{
                    width: onboardingStep === 2 ? '18px' : '7px',
                    height: '7px',
                    borderRadius: '9999px',
                    backgroundColor: onboardingStep === 2 ? '#0a0a0c' : '#d4d4d8',
                    transition: 'all 0.2s ease',
                  }}
                />
              </div>

              <button
                onClick={() => {
                  if (onboardingStep < 2) {
                    setOnboardingStep((prev) => prev + 1);
                  } else {
                    setView('gateway');
                  }
                }}
                style={{
                  backgroundColor: '#0a0a0c',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '12px 24px',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
              >
                <span>{onboardingStep < 2 ? 'Next' : 'Get Started'}</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCREEN C: SIGN UP FORM VIEW (ID + PASSWORD 2 ครั้ง + ข้อตกลง) */}
        {/* ============================================================ */}
        {view === 'signup' && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#ffffff',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              padding: '24px 24px 36px 24px',
            }}
          >
            {/* Top Back Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <button
                onClick={() => setView('gateway')}
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#0a0a0c',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <ArrowLeft size={16} />
                <span>{isEn ? 'Back' : 'ย้อนกลับ'}</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#0a0a0c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  padding: '2px',
                }}
              >
                <img
                  src="/flukexd-logo.png"
                  alt="Gym Gym Gym"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '18px' }}>
                gym gym gym
              </span>
            </div>

            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '26px', fontWeight: 800, margin: '6px 0 2px 0' }}>
              Sign Up
            </h2>
            <p style={{ fontSize: '13px', color: '#71717a', margin: '0 0 16px 0' }}>
              {isEn ? 'Enter ID, profile stats, and password twice to confirm' : 'กรอก ID, ข้อมูลส่วนตัว และตั้งรหัสผ่าน 2 ครั้งเพื่อยืนยัน'}
            </p>

            {/* Error Message Box */}
            {errorMessage && (
              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: '#fff1f2',
                  border: '1.5px solid #fecdd3',
                  borderRadius: '12px',
                  color: '#be123c',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '14px',
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* FIELD 1: User ID / ID สมาชิก */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                  <UserCheck size={14} /> {isEn ? 'User ID / Member ID' : 'ไอดีผู้ใช้งาน (User ID / ID สมาชิก)'} <span style={{ color: '#f43f5e' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={isEn ? 'e.g. GYM-007 or fluke99' : 'เช่น GYM-007 หรือ fluke99'}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #0a0a0c',
                    fontFamily: 'Outfit, Prompt, sans-serif',
                    fontSize: '14px',
                    fontWeight: 600,
                    outline: 'none',
                    backgroundColor: '#fafafa',
                  }}
                />
              </div>

              {/* FIELD 2: Display Name */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                  <User size={14} /> {isEn ? 'Display Name' : 'ชื่อของคุณ (Display Name)'} <span style={{ color: '#f43f5e' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={isEn ? 'e.g. Fluke, Alex...' : 'เช่น Fluke, ปลั๊ก...'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #0a0a0c',
                    fontFamily: 'Prompt, sans-serif',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: '#fafafa',
                  }}
                />
              </div>

              {/* FIELD 3: Physical Stats: Weight, Height, Age */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <Scale size={12} /> {isEn ? 'Weight (kg)' : 'น้ำหนัก (กก.)'}
                  </label>
                  <input
                    type="number"
                    step="1"
                    required
                    placeholder="70"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 6px',
                      borderRadius: '12px',
                      border: '1.5px solid #0a0a0c',
                      fontFamily: 'Outfit, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      textAlign: 'center',
                      outline: 'none',
                      backgroundColor: '#fafafa',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <Ruler size={12} /> {isEn ? 'Height (cm)' : 'ส่วนสูง (ซม.)'}
                  </label>
                  <input
                    type="number"
                    step="1"
                    required
                    placeholder="175"
                    value={heightCm}
                    onChange={(e) => setHeightCm(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 6px',
                      borderRadius: '12px',
                      border: '1.5px solid #0a0a0c',
                      fontFamily: 'Outfit, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      textAlign: 'center',
                      outline: 'none',
                      backgroundColor: '#fafafa',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <Calendar size={12} /> {isEn ? 'Age (yrs)' : 'อายุ (ปี)'}
                  </label>
                  <input
                    type="number"
                    step="1"
                    required
                    placeholder="25"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 6px',
                      borderRadius: '12px',
                      border: '1.5px solid #0a0a0c',
                      fontFamily: 'Outfit, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      textAlign: 'center',
                      outline: 'none',
                      backgroundColor: '#fafafa',
                    }}
                  />
                </div>
              </div>

              {/* FIELD 4: Password ครั้งที่ 1 */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                  <Lock size={14} /> {isEn ? 'Password' : 'รหัสผ่าน (Password)'} <span style={{ color: '#f43f5e' }}>*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder={isEn ? 'Enter password (at least 4 characters)' : 'กรอกรหัสผ่าน (อย่างน้อย 4 ตัวอักษร)'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #0a0a0c',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: '#fafafa',
                  }}
                />
              </div>

              {/* FIELD 5: Password ครั้งที่ 2 เพื่อยืนยัน */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                  <Lock size={14} /> {isEn ? 'Confirm Password' : 'ยืนยันรหัสผ่าน (Confirm Password 2 ครั้ง)'} <span style={{ color: '#f43f5e' }}>*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder={isEn ? 'Re-enter password to confirm' : 'กรอกรหัสผ่านซ้ำอีกครั้งเพื่อยืนยัน'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: `1.5px solid ${
                      confirmPassword.length === 0
                        ? '#0a0a0c'
                        : password === confirmPassword
                        ? '#10b981'
                        : '#f43f5e'
                    }`,
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: '#fafafa',
                  }}
                />
                {confirmPassword.length > 0 && (
                  <div style={{ marginTop: '5px', fontSize: '11px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {password === confirmPassword ? (
                      <span style={{ color: '#10b981' }}>{isEn ? '✓ Passwords match' : '✓ รหัสผ่านตรงกันเรียบร้อย'}</span>
                    ) : (
                      <span style={{ color: '#f43f5e' }}>{isEn ? '✗ Passwords do not match' : '✗ รหัสผ่าน 2 ครั้งไม่ตรงกัน กรุณาตรวจสอบ'}</span>
                    )}
                  </div>
                )}
              </div>

              {/* FIELD 6: ข้อตกลงและเงื่อนไขการใช้งานเพื่อป้องกันการโดนฟ้อง */}
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: '14px',
                  backgroundColor: '#f8f8f9',
                  border: '1.5px solid #e4e4e7',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  marginTop: '4px',
                }}
              >
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    color: '#27272a',
                    lineHeight: '1.45',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isAgreedTerms}
                    onChange={(e) => setIsAgreedTerms(e.target.checked)}
                    style={{
                      width: '18px',
                      height: '18px',
                      accentColor: '#0a0a0c',
                      cursor: 'pointer',
                      marginTop: '2px',
                      flexShrink: 0,
                    }}
                  />
                  <span>
                    {isEn
                      ? 'I have read and agree to the 5 Terms & Conditions (Free usage • Confidential & secure data • Liability waiver)'
                      : 'ฉันได้อ่านและยินยอมตาม ข้อตกลงและเงื่อนไข 5 ข้อ (ใช้งานและบันทึกได้ฟรี • ข้อมูลเป็นความลับไม่มีเปิดเผย • สละสิทธิ์ฟ้องร้อง)'}
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  style={{
                    alignSelf: 'flex-start',
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: '#0a0a0c',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <ShieldAlert size={14} color="#0a0a0c" />
                  <span>{isEn ? 'Click to read full 5 terms' : 'คลิกอ่านข้อตกลง 5 ข้อฉบับเต็ม'}</span>
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: isSuccess ? '#10b981' : '#0a0a0c',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '15px 24px',
                  fontSize: '15px',
                  fontWeight: 700,
                  fontFamily: 'Outfit, sans-serif',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {isSuccess ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>{isEn ? 'Account Created Successfully!' : 'สมัครสมาชิกสำเร็จ!'}</span>
                  </>
                ) : (
                  <>
                    <span>{isEn ? 'Create Account' : 'Create Account (ยืนยันสมัครสมาชิก)'}</span>
                    <ChevronRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* ============================================================ */}
        {/* SCREEN D: LOG IN FORM VIEW (ID + PASSWORD) */}
        {/* ============================================================ */}
        {view === 'login' && (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#ffffff',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              padding: '24px 24px 36px 24px',
            }}
          >
            {/* Top Back Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <button
                onClick={() => setView('gateway')}
                style={{
                  background: 'none',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#0a0a0c',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                <ArrowLeft size={16} />
                <span>{isEn ? 'Back' : 'ย้อนกลับ'}</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#0a0a0c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  padding: '2px',
                }}
              >
                <img
                  src="/flukexd-logo.png"
                  alt="Gym Gym Gym"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '18px' }}>
                gym gym gym
              </span>
            </div>

            <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '26px', fontWeight: 800, margin: '6px 0 2px 0' }}>
              Log In
            </h2>
            <p style={{ fontSize: '13px', color: '#71717a', margin: '0 0 16px 0' }}>
              {isEn ? 'Sign in with your User ID or Display Name' : 'เข้าสู่ระบบด้วยไอดีผู้ใช้งาน (User ID) หรือชื่อสมาชิก'}
            </p>

            {/* Error Message Box */}
            {loginErrorMessage && (
              <div
                style={{
                  padding: '10px 14px',
                  backgroundColor: '#fff1f2',
                  border: '1.5px solid #fecdd3',
                  borderRadius: '12px',
                  color: '#be123c',
                  fontSize: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '14px',
                }}
              >
                <AlertCircle size={16} style={{ flexShrink: 0 }} />
                <span>{loginErrorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* User ID or Display Name */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                  <UserCheck size={14} /> {isEn ? 'User ID or Member Name' : 'ไอดีผู้ใช้งาน หรือ ชื่อสมาชิก (User ID / Display Name)'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isEn ? 'e.g. GYM-007 or Fluke' : 'เช่น GYM-007 หรือ Fluke'}
                  value={loginIdOrName}
                  onChange={(e) => setLoginIdOrName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #0a0a0c',
                    fontFamily: 'Outfit, Prompt, sans-serif',
                    fontWeight: 600,
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: '#fafafa',
                  }}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '6px' }}>
                  <Lock size={14} /> {isEn ? 'Password' : 'รหัสผ่าน (Password)'}
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #0a0a0c',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: '#fafafa',
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: isSuccess ? '#10b981' : '#0a0a0c',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '15px 24px',
                  fontSize: '15px',
                  fontWeight: 700,
                  fontFamily: 'Outfit, sans-serif',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  marginTop: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {isSuccess ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span>{isEn ? 'Login Successful!' : 'เข้าสู่ระบบสำเร็จ!'}</span>
                  </>
                ) : (
                  <>
                    <span>{isEn ? 'Log In' : 'เข้าสู่ระบบ (Log In)'}</span>
                    <ChevronRight size={16} />
                  </>
                )}
              </button>

              <div style={{ textAlign: 'center', marginTop: '12px' }}>
                <span style={{ fontSize: '12px', color: '#71717a' }}>{isEn ? "Don't have an account? " : 'ยังไม่มีบัญชีสมาชิก? '}</span>
                <button
                  type="button"
                  onClick={() => {
                    setErrorMessage('');
                    setView('signup');
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '12px',
                    color: '#0a0a0c',
                    fontWeight: 700,
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  }}
                >
                  {isEn ? 'Sign up here' : 'สมัครสมาชิกใหม่ที่นี่'}
                </button>
              </div>

              {/* Terms Link in Login */}
              <div style={{ textAlign: 'center', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '11px',
                    color: '#71717a',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <ShieldAlert size={12} />
                  <span>{isEn ? 'Read 5 Terms & Conditions' : 'อ่านข้อตกลงและเงื่อนไขการใช้งาน 5 ข้อ'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Embedded Terms & Conditions Modal */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={() => setIsAgreedTerms(true)}
        showAcceptButton={view === 'signup'}
        language={userProfile?.language || 'th'}
      />
    </div>,
    document.body
  );
};
