import React, { useState, useEffect } from 'react';
import {
  User,
  ShieldCheck,
  Scale,
  Ruler,
  Calendar,
  Target,
  Check,
  LogOut,
  Palette,
  Globe,
  Trash2,
  Smartphone,
  Download,
  Info,
} from 'lucide-react';
import type { UserProfile, ThemeMode } from '../types';
import { THEMES, getTheme } from '../utils/theme';
import { getTranslation } from '../utils/translations';

interface SettingsTabProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenAuth: () => void;
  onToggleTheme: () => void;
  onLogout: () => void;
  onOpenLanding?: () => void;
  onResetAllData?: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  userProfile,
  onUpdateProfile,
  onOpenAuth,
  onToggleTheme: _onToggleTheme,
  onLogout,
  onOpenLanding,
  onResetAllData,
}) => {
  const [name, setName] = useState(userProfile.name);
  const [weightKg, setWeightKg] = useState(userProfile.weightKg.toString());
  const [heightCm, setHeightCm] = useState((userProfile.heightCm || 175).toString());
  const [age, setAge] = useState((userProfile.age || 25).toString());
  const [dailyCalorieTarget, setDailyCalorieTarget] = useState(
    userProfile.dailyCalorieTarget.toString()
  );
  const [isSaved, setIsSaved] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallHelp, setShowInstallHelp] = useState(false);

  const t = getTranslation(userProfile.language || 'th');
  const currentTheme = getTheme(userProfile.themeMode);

  useEffect(() => {
    // Check if already running as installed standalone PWA
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowInstallHelp((prev) => !prev);
    }
  };


  useEffect(() => {
    setName(userProfile.name);
    setWeightKg(userProfile.weightKg.toString());
    setHeightCm((userProfile.heightCm || 175).toString());
    setAge((userProfile.age || 25).toString());
    setDailyCalorieTarget(userProfile.dailyCalorieTarget.toString());
  }, [userProfile]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...userProfile,
      name: name.trim() || 'Fluke',
      weightKg: parseFloat(weightKg) || 70,
      heightCm: parseFloat(heightCm) || 175,
      age: parseInt(age) || 25,
      dailyCalorieTarget: parseInt(dailyCalorieTarget) || 650,
    };
    onUpdateProfile(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
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
          USER IDENTITY & SYSTEM SETTINGS
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
          ตั้งค่าข้อมูล & บัญชีสมาชิก
        </h1>
      </div>

      {/* Hero Profile Badge */}
      <div
        style={{
          backgroundColor: '#0a0a0c',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '22px',
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
            width: '130px',
            height: '130px',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', zIndex: 2 }}>
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: currentTheme.accent,
              color: currentTheme.accentText,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '20px',
              fontFamily: 'Outfit, sans-serif',
              boxShadow: `0 4px 12px ${currentTheme.accentGlow}`,
            }}
          >
            {userProfile.name ? userProfile.name.substring(0, 2).toUpperCase() : 'FX'}
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '20px',
                  fontWeight: 800,
                  margin: 0,
                  letterSpacing: '-0.3px',
                }}
              >
                {userProfile.name || 'Fluke'}
              </h2>
              <span
                onClick={onOpenAuth}
                style={{
                  backgroundColor: currentTheme.accentLight,
                  color: currentTheme.accent,
                  fontSize: '10px',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '9999px',
                  border: `1px solid ${currentTheme.accent}`,
                  cursor: 'pointer',
                }}
              >
                {userProfile.isRegistered ? 'ACTIVE VIP' : 'เข้าสู่ระบบ'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
              <span
                style={{
                  fontFamily: 'Prompt, sans-serif',
                  fontSize: '12px',
                  color: '#d4d4d8',
                  fontWeight: 500,
                }}
              >
                สูง {userProfile.heightCm || 175} ซม. · อายุ {userProfile.age || 25} ปี
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            marginTop: '16px',
            backgroundColor: '#16161b',
            padding: '10px',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.08)',
            textAlign: 'center',
          }}
        >
          <div>
            <span style={{ fontSize: '10px', color: '#a1a1aa' }}>น้ำหนัก</span>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', fontWeight: 800 }}>
              {userProfile.weightKg} kg
            </div>
          </div>
          <div style={{ borderLeft: '1px solid #27272a', borderRight: '1px solid #27272a' }}>
            <span style={{ fontSize: '10px', color: '#a1a1aa' }}>ส่วนสูง</span>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', fontWeight: 800 }}>
              {userProfile.heightCm || 175} cm
            </div>
          </div>
          <div>
            <span style={{ fontSize: '10px', color: '#a1a1aa' }}>อายุ</span>
            <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '15px', fontWeight: 800, color: '#ffe500' }}>
              {userProfile.age || 25} ปี
            </div>
          </div>
        </div>
      </div>



      {/* SETTINGS FORM: NAME, WEIGHT, HEIGHT, AGE */}
      <form
        onSubmit={handleSaveSettings}
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '22px',
          border: '2px solid #0a0a0c',
          padding: '18px',
          boxShadow: '0 4px 0 #0a0a0c',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0a0a0c', margin: 0 }}>
          แก้ไขรายละเอียดข้อมูลส่วนตัว
        </h3>

        {/* Input: Name */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <User size={14} /> ชื่อของคุณ (Display Name)
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="เช่น Fluke, ปลั๊ก..."
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: '12px',
              border: '1.5px solid #0a0a0c',
              fontSize: '13px',
              fontFamily: 'Prompt, sans-serif',
              fontWeight: 600,
              outline: 'none',
              backgroundColor: '#fafafa',
            }}
          />
        </div>

        {/* 3 Physical Stats: Weight, Height, Age */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
              <Scale size={12} /> น้ำหนัก (กก.)
            </label>
            <input
              type="number"
              step="0.5"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 6px',
                borderRadius: '12px',
                border: '1.5px solid #0a0a0c',
                fontSize: '13px',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 700,
                textAlign: 'center',
                outline: 'none',
                backgroundColor: '#fafafa',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
              <Ruler size={12} /> ส่วนสูง (ซม.)
            </label>
            <input
              type="number"
              step="1"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 6px',
                borderRadius: '12px',
                border: '1.5px solid #0a0a0c',
                fontSize: '13px',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 700,
                textAlign: 'center',
                outline: 'none',
                backgroundColor: '#fafafa',
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
              <Calendar size={12} /> อายุ (ปี)
            </label>
            <input
              type="number"
              step="1"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 6px',
                borderRadius: '12px',
                border: '1.5px solid #0a0a0c',
                fontSize: '13px',
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 700,
                textAlign: 'center',
                outline: 'none',
                backgroundColor: '#fafafa',
              }}
            />
          </div>
        </div>

        {/* Calorie Target */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <Target size={14} /> เป้าหมายเผาผลาญประจำวัน (kcal)
          </label>
          <input
            type="number"
            step="50"
            value={dailyCalorieTarget}
            onChange={(e) => setDailyCalorieTarget(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: '12px',
              border: '1.5px solid #0a0a0c',
              fontSize: '13px',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 700,
              outline: 'none',
              backgroundColor: '#fafafa',
            }}
          />
        </div>

        {/* Language Selection Bar */}
        <div
          style={{
            padding: '14px 16px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1.5px solid #0a0a0c',
            boxShadow: '0 2px 0 #0a0a0c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} color="#0a0a0c" />
            <div>
              <strong style={{ fontSize: '13px', color: '#0a0a0c', display: 'block' }}>
                {t.languageSelection}
              </strong>
              <span style={{ fontSize: '11px', color: '#71717a' }}>
                {userProfile.language === 'en' ? 'English (Active)' : 'ภาษาไทย (ใช้งานอยู่)'}
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              backgroundColor: '#f4f4f5',
              borderRadius: '9999px',
              padding: '3px',
              border: '1px solid #e4e4e7',
            }}
          >
            <button
              type="button"
              onClick={() => onUpdateProfile({ ...userProfile, language: 'th' })}
              style={{
                border: 'none',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: (userProfile.language || 'th') === 'th' ? '#0a0a0c' : 'transparent',
                color: (userProfile.language || 'th') === 'th' ? '#ffffff' : '#71717a',
                transition: 'all 0.15s ease',
              }}
            >
              🇹🇭 TH
            </button>
            <button
              type="button"
              onClick={() => onUpdateProfile({ ...userProfile, language: 'en' })}
              style={{
                border: 'none',
                padding: '6px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: userProfile.language === 'en' ? '#0a0a0c' : 'transparent',
                color: userProfile.language === 'en' ? '#ffffff' : '#71717a',
                transition: 'all 0.15s ease',
              }}
            >
              🇺🇸 EN
            </button>
          </div>
        </div>

        {/* 6-Color Theme Palette Picker */}
        <div
          style={{
            padding: '16px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1.5px solid #0a0a0c',
            boxShadow: '0 2px 0 #0a0a0c',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Palette size={18} color="#0a0a0c" />
            <div>
              <strong style={{ fontSize: '13px', color: '#0a0a0c', display: 'block' }}>
                {t.themeSelection}
              </strong>
              <span style={{ fontSize: '11px', color: '#71717a' }}>
                {userProfile.language === 'en' ? 'Select your primary accent color' : 'เลือกโทนสีเอกลักษณ์ประจำตัวของคุณ'}
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}
          >
            {(Object.keys(THEMES) as ThemeMode[]).map((mode) => {
              const pal = THEMES[mode];
              const isSelected = (userProfile.themeMode || 'yellow') === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onUpdateProfile({ ...userProfile, themeMode: mode })}
                  style={{
                    padding: '10px 8px',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid #0a0a0c' : '1.5px solid #e4e4e7',
                    backgroundColor: isSelected ? '#fafafb' : '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 2px 0 #0a0a0c' : 'none',
                    transform: isSelected ? 'scale(1.02)' : 'none',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: pal.previewColor,
                      border: '1.5px solid #0a0a0c',
                      boxShadow: isSelected ? `0 0 10px ${pal.accentGlow}` : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isSelected && (
                      <Check
                        size={12}
                        color={mode === 'yellow' || mode === 'green' || mode === 'cyan' ? '#0a0a0c' : '#ffffff'}
                        strokeWidth={3}
                      />
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      fontFamily: 'Outfit, Prompt, sans-serif',
                      fontWeight: isSelected ? 800 : 600,
                      color: isSelected ? '#0a0a0c' : '#71717a',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {userProfile.language === 'en' ? pal.nameEn : pal.nameTh}
                  </span>
                </button>
              );
            })}
          </div>
        </div>


        {/* Save feedback button */}
        <button
          type="submit"
          className="btn-black-pill"
          style={{
            marginTop: '4px',
            backgroundColor: isSaved ? '#10b981' : '#0a0a0c',
            borderColor: isSaved ? '#10b981' : '#0a0a0c',
            color: '#ffffff',
          }}
        >
          <span>{isSaved ? 'บันทึกข้อมูลสำเร็จเรียบร้อย!' : 'บันทึกการตั้งค่า'}</span>
          {isSaved ? <Check size={18} /> : <ShieldCheck size={18} />}
        </button>
      </form>

      {/* Website & User Guide Action */}
      {onOpenLanding && (
        <div
          onClick={onOpenLanding}
          style={{
            backgroundColor: '#ffffff',
            border: '2px solid #0a0a0c',
            borderRadius: '18px',
            padding: '16px',
            boxShadow: '0 3px 0 #0a0a0c',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'transform 0.15s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: '#0a0a0c',
                color: '#ffe500',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Globe size={18} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0a0a0c' }}>
                หน้าเว็บไซต์แนะนำ & วิธีการใช้งาน
              </div>
              <div style={{ fontSize: '11px', color: '#71717a' }}>
                อ่านเป้าหมายระบบ คู่มือ 4 ขั้นตอน และคำถามที่พบบ่อย
              </div>
            </div>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#0a0a0c' }}>
            เปิดดู →
          </span>
        </div>
      )}

      {/* Reset Data to Clean Slate */}
      {onResetAllData && (
        <div>
          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            style={{
              width: '100%',
              padding: '12px 18px',
              backgroundColor: '#fafafa',
              color: '#52525b',
              border: '1.5px dashed #d4d4d8',
              borderRadius: '16px',
              fontFamily: 'Prompt, sans-serif',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer',
            }}
          >
            <Trash2 size={16} />
            <span>ล้างข้อมูลทดสอบทั้งหมด (Reset Demo Data)</span>
          </button>
        </div>
      )}

      {/* PWA / Install Application Card */}
      <div
        style={{
          backgroundColor: '#0a0a0c',
          color: '#ffffff',
          borderRadius: '24px',
          padding: '20px',
          border: '2px solid #0a0a0c',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                backgroundColor: '#facc15',
                color: '#0a0a0c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 900,
              }}
            >
              <Smartphone size={22} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 800, fontFamily: 'Outfit, Prompt, sans-serif' }}>
                ติดตั้งแอพพลิเคชัน (Install App)
              </div>
              <div style={{ fontSize: '12px', color: '#a1a1aa' }}>
                {isInstalled ? 'ติดตั้งลงเครื่องเรียบร้อยแล้ว' : 'ใช้งานเต็มจอ ไร้แถบ URL รวดเร็วและบันทึกออฟไลน์'}
              </div>
            </div>
          </div>
          {isInstalled && (
            <span
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                color: '#4ade80',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '9999px',
                border: '1px solid #22c55e',
              }}
            >
              ติดตั้งแล้ว
            </span>
          )}
        </div>

        {!isInstalled && (
          <>
            <button
              type="button"
              onClick={handleInstallClick}
              style={{
                width: '100%',
                padding: '12px 18px',
                backgroundColor: '#facc15',
                color: '#0a0a0c',
                border: 'none',
                borderRadius: '9999px',
                fontFamily: 'Outfit, Prompt, sans-serif',
                fontSize: '14px',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(250, 204, 21, 0.35)',
                transition: 'transform 0.15s ease',
              }}
            >
              <Download size={18} />
              <span>{deferredPrompt ? 'กดติดตั้งแอปลงเครื่องทันที' : 'ดูวิธีติดตั้งลงหน้าจอโฮม'}</span>
            </button>

            {showInstallHelp && (
              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: '16px',
                  padding: '14px',
                  fontSize: '12px',
                  lineHeight: 1.6,
                  color: '#d4d4d8',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div style={{ fontWeight: 700, color: '#facc15', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Info size={14} /> วิธีเพิ่มลงหน้าจอมือถือ:
                </div>
                <div>
                  • <strong>iOS (Safari):</strong> แตะปุ่มแชร์ <strong>(Share 📤)</strong> ด้านล่าง แล้วเลือก <strong>"เพิ่มไปยังหน้าจอโฮม" (Add to Home Screen ➕)</strong>
                </div>
                <div>
                  • <strong>Android (Chrome):</strong> แตะจุด 3 จุดมุมขวาบน <strong>(⋮)</strong> แล้วเลือก <strong>"ติดตั้งแอป" (Install app)</strong>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Logout Action Area */}
      <div style={{ marginTop: '4px', marginBottom: '10px' }}>
        <button
          type="button"
          onClick={() => setShowLogoutConfirm(true)}
          style={{
            width: '100%',
            padding: '14px 20px',
            backgroundColor: '#fff1f2',
            color: '#e11d48',
            border: '2px solid #fda4af',
            borderRadius: '9999px',
            fontFamily: 'Outfit, Prompt, sans-serif',
            fontSize: '15px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(225, 29, 72, 0.08)',
            transition: 'all 0.18s ease',
          }}
        >
          <LogOut size={18} />
          <span>ออกจากระบบ (Log Out)</span>
        </button>
      </div>

      {/* Reset Data Confirmation Modal */}
      {showResetConfirm && (
        <div
          onClick={() => setShowResetConfirm(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(10, 10, 12, 0.75)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '2px solid #0a0a0c',
              boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
              padding: '24px',
              width: '100%',
              maxWidth: '380px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: '#fff7ed',
                color: '#ea580c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '1.5px solid #fed7aa',
              }}
            >
              <Trash2 size={26} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0a0a0c', margin: '0 0 8px 0' }}>
              ล้างข้อมูลเริ่มต้นทั้งหมด?
            </h3>
            <p style={{ fontSize: '13px', color: '#71717a', lineHeight: 1.5, margin: '0 0 20px 0' }}>
              ระบบจะลบข้อมูลประวัติการซ้อม ตารางที่วางไว้ และรายการบัญชีเงิน เพื่อให้แอพพร้อมใช้งานจริงแบบคลีน 100%
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '9999px',
                  border: '1.5px solid #d4d4d8',
                  backgroundColor: '#ffffff',
                  color: '#27272a',
                  fontFamily: 'Prompt, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowResetConfirm(false);
                  if (onResetAllData) onResetAllData();
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '9999px',
                  border: '1.5px solid #ea580c',
                  backgroundColor: '#ea580c',
                  color: '#ffffff',
                  fontFamily: 'Prompt, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)',
                }}
              >
                ล้างข้อมูลทันที
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div
          onClick={() => setShowLogoutConfirm(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(10, 10, 12, 0.75)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '24px',
              border: '2px solid #0a0a0c',
              boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
              padding: '24px',
              width: '100%',
              maxWidth: '380px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: '#fff1f2',
                color: '#e11d48',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                border: '1.5px solid #fda4af',
              }}
            >
              <LogOut size={26} />
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0a0a0c', margin: '0 0 8px 0' }}>
              ออกจากระบบใช่หรือไม่?
            </h3>
            <p style={{ fontSize: '13px', color: '#71717a', lineHeight: 1.5, margin: '0 0 20px 0' }}>
              คุณต้องการออกจากบัญชี <strong>{userProfile.name}</strong> ใช่หรือไม่? ข้อมูลและประวัติการออกกำลังกายที่บันทึกไว้ในอุปกรณ์นี้จะไม่สูญหาย
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '9999px',
                  border: '1.5px solid #d4d4d8',
                  backgroundColor: '#ffffff',
                  color: '#27272a',
                  fontFamily: 'Prompt, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  onLogout();
                }}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '9999px',
                  border: '1.5px solid #e11d48',
                  backgroundColor: '#e11d48',
                  color: '#ffffff',
                  fontFamily: 'Prompt, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)',
                }}
              >
                ยืนยันออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
