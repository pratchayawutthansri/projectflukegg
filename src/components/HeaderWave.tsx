import React from 'react';
import { Plus, Dumbbell, Globe, Languages } from 'lucide-react';
import type { UserProfile } from '../types';
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
  const t = getTranslation(userProfile.language || 'th');
  const isEn = userProfile.language === 'en';

  return (
    <div style={{ position: 'relative', width: '100%', zIndex: 10 }}>
      {/* Top Black/Theme Section with iOS Notch / Dynamic Island Safe Area */}
      <div
        style={{
          background: 'var(--theme-header-bg, #0a0a0c)',
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
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#000000',
                border: '1.5px solid rgba(255, 255, 255, 0.45)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
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
                  fontWeight: 900,
                  fontSize: '19px',
                  letterSpacing: '-0.3px',
                  color: '#ffffff',
                  display: 'block',
                  lineHeight: 1.1,
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
                }}
              >
                GYM GYM GYM
              </span>
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 800,
                  fontSize: '10px',
                  color: '#ffffff',
                  opacity: 0.95,
                  letterSpacing: '1.2px',
                  display: 'inline-block',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.45)',
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
                  backgroundColor: 'rgba(0, 0, 0, 0.32)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                  borderRadius: '9999px',
                  padding: '5px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: '#ffffff',
                  fontFamily: 'Outfit, Prompt, sans-serif',
                  fontSize: '11px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.18)',
                }}
                title="Switch Language / สลับภาษา"
              >
                <Languages size={14} color="#ffffff" strokeWidth={2.5} />
                <span style={{ color: '#ffffff', fontWeight: 800 }}>{isEn ? 'EN' : 'TH'}</span>
              </button>
            )}

            {onOpenLanding && (
              <button
                onClick={onOpenLanding}
                title="ดูหน้าเว็บไซต์แนะนำ & วิธีใช้งาน"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.32)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                  color: '#ffffff',
                  borderRadius: '9999px',
                  padding: '5px 12px',
                  fontSize: '11px',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.18)',
                }}
              >
                <Globe size={14} color="#ffffff" strokeWidth={2.5} />
                <span style={{ color: '#ffffff', fontWeight: 800 }}>{isEn ? 'Manual' : 'คู่มือ / เว็บไซต์'}</span>
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
              border: `2px solid var(--theme-card-border, #0a0a0c)`,
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
                background: 'var(--theme-card-bg, #0a0a0c)',
                color: '#ffffff',
                borderRadius: '50%',
                width: '26px',
                height: '26px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Plus size={15} color="#ffffff" />
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
          fill="var(--theme-header-fill, #0a0a0c)"
        />
      </svg>
    </div>
  );
};
