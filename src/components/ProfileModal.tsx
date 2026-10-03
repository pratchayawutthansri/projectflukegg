import React, { useState } from 'react';
import { X, User, Check, ChevronRight, Target, LogIn } from 'lucide-react';
import type { UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenAuth: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onUpdateProfile,
  onOpenAuth,
}) => {
  const [name, setName] = useState(userProfile.name);
  const [weightKg, setWeightKg] = useState(userProfile.weightKg.toString());
  const [heightCm, setHeightCm] = useState((userProfile.heightCm || 175).toString());
  const [age, setAge] = useState((userProfile.age || 25).toString());
  const [dailyCalorieTarget, setDailyCalorieTarget] = useState(userProfile.dailyCalorieTarget.toString());
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedWeight = parseFloat(weightKg) || 70;
    const parsedHeight = parseFloat(heightCm) || 175;
    const parsedAge = parseInt(age, 10) || 25;
    const parsedTarget = parseInt(dailyCalorieTarget, 10) || 600;

    onUpdateProfile({
      ...userProfile,
      name: name.trim() || 'Fluke',
      weightKg: parsedWeight,
      heightCm: parsedHeight,
      age: parsedAge,
      dailyCalorieTarget: parsedTarget,
    });

    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 900);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 10, 12, 0.75)',
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
          maxHeight: '88vh',
          borderTopLeftRadius: '32px',
          borderTopRightRadius: '32px',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          boxShadow: '0 -10px 40px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          paddingBottom: 'max(36px, env(safe-area-inset-bottom, 36px))',
        }}
      >
        {/* Handle */}
        <div
          style={{
            width: '44px',
            height: '5px',
            backgroundColor: '#d4d4d8',
            borderRadius: '9999px',
            margin: '12px auto 6px auto',
          }}
        />

        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 24px 16px 24px',
            borderBottom: '1px solid #f4f4f5',
          }}
        >
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
              MEMBER PROFILE
            </span>
            <h2
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '20px',
                fontWeight: 800,
                color: '#0a0a0c',
                margin: '3px 0 0 0',
              }}
            >
              {userProfile.language === 'en' ? 'Member Profile' : 'ข้อมูลสมาชิก'}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              backgroundColor: '#f4f4f5',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#0a0a0c',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Member Digital Card */}
          <div
            style={{
              background: 'var(--theme-card-bg, #0a0a0c)',
              color: '#ffffff',
              borderRadius: '20px',
              padding: '18px',
              border: '2px solid var(--theme-card-border, #0a0a0c)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background brand eagle watermark */}
            <div
              style={{
                position: 'absolute',
                right: '-10px',
                top: '-10px',
                width: '110px',
                height: '110px',
                opacity: 0.14,
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

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    color: '#0a0a0c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '15px',
                    fontFamily: 'Outfit, sans-serif',
                  }}
                >
                  {name.substring(0, 2).toUpperCase() || 'FX'}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '17px', fontWeight: 800, margin: 0 }}>
                    {name || 'Fluke'}
                  </h3>
                  <span style={{ fontSize: '11px', color: '#ffffff', opacity: 0.92, fontWeight: 600 }}>
                    Gym Gym Gym Official Member
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.8)', display: 'block' }}>
                  {userProfile.language === 'en' ? 'Height · Age' : 'ส่วนสูง · อายุ'}
                </span>
                <span
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '14px',
                    fontWeight: 800,
                    color: '#ffffff',
                  }}
                >
                  {heightCm} cm · {age} {userProfile.language === 'en' ? 'yrs' : 'ปี'}
                </span>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                marginTop: '14px',
                paddingTop: '12px',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                textAlign: 'center',
                fontSize: '11px',
              }}
            >
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', display: 'block' }}>
                  {userProfile.language === 'en' ? 'Weight' : 'น้ำหนักตัว'}
                </span>
                <strong style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#ffffff' }}>{weightKg} kg</strong>
              </div>
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', display: 'block' }}>
                  {userProfile.language === 'en' ? 'Height' : 'ส่วนสูง'}
                </span>
                <strong style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#ffffff' }}>{heightCm} cm</strong>
              </div>
              <div>
                <span style={{ color: 'rgba(255, 255, 255, 0.8)', display: 'block' }}>
                  {userProfile.language === 'en' ? 'Age' : 'อายุ'}
                </span>
                <strong style={{ fontFamily: 'Outfit, sans-serif', fontSize: '13px', color: '#ffffff' }}>
                  {age} {userProfile.language === 'en' ? 'yrs' : 'ปี'}
                </strong>
              </div>
            </div>
          </div>

          {/* Form to Edit Details */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Name */}
            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#52525b', display: 'block', marginBottom: '5px' }}>
                {userProfile.language === 'en' ? 'Display Name:' : 'ชื่อของคุณ (Name):'}
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={userProfile.language === 'en' ? 'e.g. Fluke' : 'เช่น Fluke'}
                  style={{
                    width: '100%',
                    border: '1.5px solid #0a0a0c',
                    borderRadius: '14px',
                    padding: '12px 14px',
                    fontSize: '14px',
                    fontFamily: 'Prompt, sans-serif',
                    fontWeight: 600,
                    outline: 'none',
                  }}
                />
                <User size={16} color="#71717a" style={{ position: 'absolute', right: '14px' }} />
              </div>
            </div>

            {/* 3 Physical Stats: Weight, Height, Age */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#52525b', display: 'block', marginBottom: '4px' }}>
                  {userProfile.language === 'en' ? 'Weight (kg):' : 'น้ำหนัก (กก.):'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  style={{
                    width: '100%',
                    border: '1.5px solid #0a0a0c',
                    borderRadius: '12px',
                    padding: '10px 8px',
                    fontSize: '13px',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 700,
                    textAlign: 'center',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#52525b', display: 'block', marginBottom: '4px' }}>
                  {userProfile.language === 'en' ? 'Height (cm):' : 'ส่วนสูง (ซม.):'}
                </label>
                <input
                  type="number"
                  step="1"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  style={{
                    width: '100%',
                    border: '1.5px solid #0a0a0c',
                    borderRadius: '12px',
                    padding: '10px 8px',
                    fontSize: '13px',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 700,
                    textAlign: 'center',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: 600, color: '#52525b', display: 'block', marginBottom: '4px' }}>
                  {userProfile.language === 'en' ? 'Age (yrs):' : 'อายุ (ปี):'}
                </label>
                <input
                  type="number"
                  step="1"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  style={{
                    width: '100%',
                    border: '1.5px solid #0a0a0c',
                    borderRadius: '12px',
                    padding: '10px 8px',
                    fontSize: '13px',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 700,
                    textAlign: 'center',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: 600, color: '#52525b', display: 'block', marginBottom: '5px' }}>
                {userProfile.language === 'en' ? 'Daily Calorie Target (kcal):' : 'เป้าหมายแคล/วัน:'}
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type="number"
                  step="50"
                  min="200"
                  max="5000"
                  value={dailyCalorieTarget}
                  onChange={(e) => setDailyCalorieTarget(e.target.value)}
                  style={{
                    width: '100%',
                    border: '1.5px solid #0a0a0c',
                    borderRadius: '14px',
                    padding: '12px 14px',
                    fontSize: '14px',
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 700,
                    outline: 'none',
                  }}
                />
                <Target size={16} color="#71717a" style={{ position: 'absolute', right: '12px' }} />
              </div>
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="btn-black-pill"
              style={{
                padding: '15px 22px',
                marginTop: '6px',
                backgroundColor: isSaved ? '#10b981' : '#0a0a0c',
                borderColor: isSaved ? '#10b981' : '#0a0a0c',
              }}
            >
              <span>
                {isSaved
                  ? (userProfile.language === 'en' ? 'Profile Saved Successfully!' : 'บันทึกข้อมูลเรียบร้อยแล้ว!')
                  : (userProfile.language === 'en' ? 'Save Profile Changes' : 'บันทึกการตั้งค่าข้อมูลส่วนตัว')}
              </span>
              {isSaved ? <Check size={18} /> : <ChevronRight size={18} />}
            </button>
          </form>

          {/* Membership Registration Option */}
          <div
            onClick={() => {
              onClose();
              onOpenAuth();
            }}
            style={{
              marginTop: '4px',
              padding: '14px 16px',
              backgroundColor: '#fafafb',
              border: '1.5px dashed #0a0a0c',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <LogIn size={18} color="#0a0a0c" />
              <div>
                <strong style={{ fontSize: '13px', color: '#0a0a0c', display: 'block' }}>
                  {userProfile.language === 'en' ? 'Membership & Account Switch' : 'ระบบสมัครสมาชิก / สลับบัญชี'}
                </strong>
                <span style={{ fontSize: '11px', color: '#71717a' }}>
                  {userProfile.language === 'en' ? 'Sign up or log into Gym Gym Gym' : 'สมัครสมาชิกใหม่ หรือเข้าสู่ระบบ Gym Gym Gym'}
                </span>
              </div>
            </div>
            <ChevronRight size={16} color="#0a0a0c" />
          </div>
        </div>
      </div>
    </div>
  );
};
