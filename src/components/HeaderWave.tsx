import React from 'react';
import { Plus, Dumbbell, Globe, Languages } from 'lucide-react';
import type { UserProfile } from '../types';
import { getTheme } from '../utils/theme';
import { getTranslation } from '../utils/translations';

interface HeaderWaveProps {
  userProfile: UserProfile;
  onOpenScheduler: () => void;
  showQuickScheduler?: boolean;
  onOpenLanding?: () => void;
  onToggleLanguage?: () => void;
}

export const HeaderWave: React.FC<HeaderWaveProps> = ({
  userProfile,
  onOpenScheduler,
  showQuickScheduler = true,
  onOpenLanding,
  onToggleLanguage,
}) => {
  const theme = getTheme(userProfile.themeMode);
  const t = getTranslation(userProfile.language || 'th');
  const isEn = userProfile.language === 'en';

  return (
    <div style={{ position: 'relative', width: '100%', zIndex: 10 }}>
      {/* Top Black Section with iOS Notch / Dynamic Island Safe Area */}
      <div
        style={{
          backgroundColor: '#0a0a0c',
          color: '#ffffff',
          paddingTop: 'max(20px, env(safe-area-inset-top, 20px))',
          paddingLeft: '20px',
          paddingRight: '20px',
          paddingBottom: '16px',
          position: 'relative',
        }}
      >
        {/* Top bar with Logo, Brand Name, and Quick Language & Website Link */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: showQuickScheduler ? '16px' : '4px',
          }}
        >
          {/* Brand Logo & Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000000',
                border: `1.5px solid ${theme.accent}`,
                boxShadow: `0 2px 10px ${theme.accentGlow}`,
              }}
            >
              <img
                src="/flukexd-logo.png"
                alt="Gym Gym Gym Logo"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            <div>
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: '18px',
                  letterSpacing: '-0.3px',
                  color: '#ffffff',
                  display: 'block',
                  lineHeight: 1.1,
                }}
              >
                GYM GYM GYM
              </span>
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 600,
                  fontSize: '9px',
                  color: theme.accent,
                  letterSpacing: '1px',
                }}
              >
                {t.appSub}
              </span>
            </div>
          </div>

          {/* Right Action Icons: Language Toggle & Website Guide */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {onToggleLanguage && (
              <button
                type="button"
                onClick={onToggleLanguage}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: `1px solid ${theme.accentLight}`,
                  borderRadius: '9999px',
                  padding: '5px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#ffffff',
                  fontFamily: 'Outfit, Prompt, sans-serif',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                title="Switch Language / สลับภาษา"
              >
                <Languages size={13} color={theme.accent} />
                <span>{isEn ? 'EN' : 'TH'}</span>
              </button>
            )}

          {onOpenLanding && (
            <button
              onClick={onOpenLanding}
              title="ดูหน้าเว็บไซต์แนะนำ & วิธีใช้งาน"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                borderRadius: '9999px',
                padding: '5px 11px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Globe size={13} color="#ffe500" />
              <span>คู่มือ / เว็บไซต์</span>
            </button>
          )}
          </div>
        </div>

        {/* Quick Scheduler Prompt Bar - Only shown on Dashboard (ภาพรวม) */}
        {showQuickScheduler && (
          <div
            onClick={onOpenScheduler}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '9999px',
              padding: '11px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
              border: `2px solid ${theme.accent}`,
              transition: 'transform 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Dumbbell size={16} color="#0a0a0c" />
              <span
                style={{
                  color: '#52525b',
                  fontSize: '13px',
                  fontFamily: 'Prompt, sans-serif',
                  fontWeight: 500,
                }}
              >
                {isEn
                  ? 'Quick schedule: "Chest + Arms 1.5h" or "Run 5km"...'
                  : 'จัดตารางซ้อมด่วน เช่น "อก + แขน 1.5 ชม." หรือ "วิ่ง 5 โล"...'}
              </span>
            </div>
            <div
              style={{
                backgroundColor: '#0a0a0c',
                color: theme.accent,
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Plus size={15} />
            </div>
          </div>
        )}
      </div>

      {/* Organic Wave Divider SVG */}
      <svg
        viewBox="0 0 480 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          display: 'block',
          width: '100%',
          marginTop: '-1px',
        }}
      >
        <path
          d="M0,0 L480,0 L480,12 C360,38 280,3 160,26 C80,38 30,15 0,22 Z"
          fill="#0a0a0c"
        />
      </svg>
    </div>
  );
};
