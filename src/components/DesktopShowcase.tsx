import React, { useState, useEffect } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Lock,
  ChevronDown,
  Wifi,
  Battery,
} from 'lucide-react';

interface DesktopShowcaseProps {
  children: React.ReactNode;
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const DesktopShowcase: React.FC<DesktopShowcaseProps> = ({
  children,
  onOpenAuth,
  isLoggedIn,
  onLogout,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobileScreen, setIsMobileScreen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On real mobile screens, render the mobile WebApp directly
  if (isMobileScreen) {
    return (
      <div style={{ width: '100%', maxWidth: '480px', minHeight: '100vh', backgroundColor: '#ffffff', margin: '0 auto', position: 'relative' }}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#e5e5e7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '18px 24px',
        boxSizing: 'border-box',
        fontFamily: 'Outfit, Prompt, -apple-system, sans-serif',
        position: 'relative',
      }}
    >
      {/* Outer Editorial Website Frame (Matching user's reference image exactly) */}
      <div
        className="desktop-showcase-outer"
        style={{
          width: '100%',
          maxWidth: '1480px',
          minHeight: '880px',
          height: 'calc(100vh - 36px)',
          maxHeight: '940px',
          backgroundColor: '#f5f5f7',
          border: '3.5px solid #0a0a0c',
          borderRadius: '36px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.18)',
        }}
      >
        {/* Soft 3D-like Sphere 1 (Left behind orange card) */}
        <div
          style={{
            position: 'absolute',
            top: '180px',
            left: '265px',
            width: '155px',
            height: '155px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #eaeaf0 55%, #cfcfe0 100%)',
            boxShadow: '0 24px 45px rgba(0,0,0,0.07), inset -6px -6px 14px rgba(0,0,0,0.06)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Soft 3D-like Sphere 2 (Right side beside Step 3) */}
        <div
          style={{
            position: 'absolute',
            bottom: '180px',
            right: '25px',
            width: '135px',
            height: '135px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #ffffff 0%, #eaeaf0 55%, #cfcfe0 100%)',
            boxShadow: '0 24px 45px rgba(0,0,0,0.07), inset -6px -6px 14px rgba(0,0,0,0.06)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* ================================================================
            1. TOP NAVIGATION BAR (Exact reference layout)
            ================================================================ */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '24px 48px 18px 48px',
            zIndex: 10,
            borderBottom: '1px solid rgba(0,0,0,0.05)',
          }}
        >
          {/* Left Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '42px' }}>
            <span
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '24px',
                fontWeight: 900,
                letterSpacing: '-1.5px',
                color: '#0a0a0c',
                userSelect: 'none',
              }}
            >
              +1
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              {/* Active Tab: PROJECTS with orange underline */}
              <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: '#0a0a0c',
                    cursor: 'pointer',
                  }}
                >
                  PROJECTS
                </span>
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-6px',
                    left: 0,
                    right: 0,
                    height: '2.5px',
                    backgroundColor: '#ff4724',
                    borderRadius: '2px',
                  }}
                />
              </div>

              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#71717a',
                  cursor: 'pointer',
                }}
              >
                METHOD
              </span>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#71717a',
                  cursor: 'pointer',
                }}
              >
                FEATURES
              </span>
            </div>
          </div>

          {/* Right Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#0a0a0c',
                cursor: 'pointer',
              }}
            >
              PHILOSOPHY
            </span>

            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#0a0a0c',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
              }}
            >
              <span>FIT & FINANCE</span>
              <ChevronDown size={14} />
            </div>

            {/* Log In Button (Matches user prompt: พอกดล็อกอินก็จะมาหน้า login) */}
            <button
              onClick={isLoggedIn ? onLogout : onOpenAuth}
              style={{
                backgroundColor: '#0a0a0c',
                color: '#ffffff',
                border: 'none',
                borderRadius: '9999px',
                padding: '8px 22px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                transition: 'all 0.15s ease',
              }}
            >
              <Lock size={12} color="#ffffff" />
              <span>{isLoggedIn ? 'LOG OUT' : 'LOG IN'}</span>
            </button>

            {/* Hamburger Menu (3 black horizontal lines) */}
            <div
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '4.5px',
                padding: '4px',
              }}
            >
              <div style={{ width: '20px', height: '2.5px', backgroundColor: '#0a0a0c', borderRadius: '2px' }} />
              <div style={{ width: '20px', height: '2.5px', backgroundColor: '#0a0a0c', borderRadius: '2px' }} />
              <div style={{ width: '20px', height: '2.5px', backgroundColor: '#0a0a0c', borderRadius: '2px' }} />
            </div>
          </div>
        </nav>

        {/* ================================================================
            2. MAIN BODY (3 Columns: Left Story, Center Phone, Right Detail)
            ================================================================ */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 415px 1fr',
            gap: '28px',
            padding: '14px 48px 24px 48px',
            position: 'relative',
            zIndex: 5,
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* ------------------------------------------------------------
              LEFT COLUMN (Exhibition bar, Orange Card, Dots, "gym.")
              ------------------------------------------------------------ */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              paddingTop: '18px',
              paddingBottom: '14px',
              position: 'relative',
              zIndex: 3,
            }}
          >
            {/* Top: Vertical orange line + Exhibition text */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                <div
                  style={{
                    width: '3.5px',
                    height: '16px',
                    backgroundColor: '#ff4724',
                    borderRadius: '2px',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '11px',
                    fontWeight: 900,
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    color: '#0a0a0c',
                  }}
                >
                  EXHIBITION
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '9px',
                  fontWeight: 700,
                  color: '#71717a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.6px',
                  lineHeight: 1.4,
                  paddingLeft: '11.5px',
                }}
              >
                15 REPS HYPERTROPHY & RUNNING CALCULATION
                <br />
                FOR AUTENTICATION OF GYM GYM GYM OS
              </div>

              {/* Orange Feature Banner (Exact reference layout) */}
              <div
                onClick={onOpenAuth}
                style={{
                  backgroundColor: '#ff4724',
                  color: '#ffffff',
                  borderRadius: '16px',
                  padding: '24px 26px',
                  maxWidth: '260px',
                  marginTop: '28px',
                  cursor: 'pointer',
                  boxShadow: '0 14px 34px rgba(255, 71, 36, 0.35)',
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                  position: 'relative',
                  zIndex: 4,
                }}
              >
                <div
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '9px',
                    fontWeight: 900,
                    letterSpacing: '1.2px',
                    textTransform: 'uppercase',
                    marginBottom: '6px',
                    opacity: 0.9,
                  }}
                >
                  SURVIVALIST
                </div>
                <div
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '12px',
                    fontWeight: 900,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    lineHeight: 1.35,
                    marginBottom: '18px',
                  }}
                >
                  CRAFTED ELEMENTS
                  <br />
                  & DUAL-TRACK DISCIPLINE
                </div>

                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#0a0a0c',
                    color: '#ffffff',
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '10px',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                  }}
                >
                  <span>EXPLORE</span>
                  <ArrowRight size={12} strokeWidth={2.5} />
                </div>
              </div>
            </div>

            {/* Bottom Left: 3 Dots & Massive "gym." Typography */}
            <div style={{ marginTop: 'auto' }}>
              {/* 3 Dots (1 orange, 2 grey) */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
                <div
                  onClick={() => setActiveSlide(0)}
                  style={{
                    width: '6.5px',
                    height: '6.5px',
                    borderRadius: '50%',
                    backgroundColor: activeSlide === 0 ? '#ff4724' : '#cbd5e1',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                />
                <div
                  onClick={() => setActiveSlide(1)}
                  style={{
                    width: '6.5px',
                    height: '6.5px',
                    borderRadius: '50%',
                    backgroundColor: activeSlide === 1 ? '#ff4724' : '#cbd5e1',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                />
                <div
                  onClick={() => setActiveSlide(2)}
                  style={{
                    width: '6.5px',
                    height: '6.5px',
                    borderRadius: '50%',
                    backgroundColor: activeSlide === 2 ? '#ff4724' : '#cbd5e1',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                />
              </div>

              {/* Massive "gym." Typography (Exact reference "lab.") */}
              <div
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '120px',
                  fontWeight: 900,
                  lineHeight: 0.8,
                  letterSpacing: '-6px',
                  color: '#0a0a0c',
                  userSelect: 'none',
                }}
              >
                gym.
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------
              CENTER COLUMN: THE ACTUAL WEBAPP INSIDE MOBILE PHONE MOCKUP
              "เอาหน้า Web App เรามาใส่... พอกดล็อกอินก็จะมาหน้า login"
              ------------------------------------------------------------ */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              position: 'relative',
              zIndex: 6,
            }}
          >
            {/* Smartphone Device Frame (iPhone 15/16 Pro style) */}
            <div
              style={{
                width: '395px',
                height: '750px',
                maxHeight: 'calc(100vh - 110px)',
                backgroundColor: '#121214',
                borderRadius: '48px',
                padding: '10px',
                boxShadow:
                  '0 32px 80px rgba(0,0,0,0.36), 0 0 0 1px rgba(255,255,255,0.12), 0 12px 28px rgba(0,0,0,0.2)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                border: '2px solid #2a2a2e',
              }}
            >
              {/* Inner Screen Viewport: Hosts the live interactive WebApp */}
              <div
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#ffffff',
                  borderRadius: '38px',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  position: 'relative',
                  WebkitOverflowScrolling: 'touch',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Real iOS Status Bar with Dynamic Island */}
                <div
                  style={{
                    height: '38px',
                    backgroundColor: '#0a0a0c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 24px',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 700,
                    fontFamily: 'Outfit, -apple-system, sans-serif',
                    zIndex: 900,
                    flexShrink: 0,
                    userSelect: 'none',
                  }}
                >
                  <span>9:41</span>

                  {/* Dynamic Island Pill */}
                  <div
                    style={{
                      width: '84px',
                      height: '20px',
                      backgroundColor: '#000000',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      padding: '0 8px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    <div
                      style={{
                        width: '7.5px',
                        height: '7.5px',
                        borderRadius: '50%',
                        backgroundColor: '#16161b',
                        border: '1px solid #23232b',
                      }}
                    />
                  </div>

                  {/* Right Status Icons */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1.5px', height: '10px' }}>
                      <div style={{ width: '2px', height: '3px', backgroundColor: '#ffffff', borderRadius: '0.5px' }} />
                      <div style={{ width: '2px', height: '5px', backgroundColor: '#ffffff', borderRadius: '0.5px' }} />
                      <div style={{ width: '2px', height: '7px', backgroundColor: '#ffffff', borderRadius: '0.5px' }} />
                      <div style={{ width: '2px', height: '9px', backgroundColor: '#ffffff', borderRadius: '0.5px' }} />
                    </div>
                    <Wifi size={13} strokeWidth={2.5} />
                    <Battery size={15} strokeWidth={2.2} />
                  </div>
                </div>

                {/* The WebApp Container */}
                <div style={{ flex: 1, position: 'relative', overflowY: 'auto' }}>
                  {children}
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------
              RIGHT COLUMN: EDITORIAL EXPLANATION & VALUE PROPOSITION
              (Exact match with user's screenshot)
              ------------------------------------------------------------ */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              paddingTop: '18px',
              paddingBottom: '14px',
              position: 'relative',
              zIndex: 3,
            }}
          >
            {/* Top: Small orange horizontal accent bar */}
            <div>
              <div
                style={{
                  width: '28px',
                  height: '3.5px',
                  backgroundColor: '#ff4724',
                  borderRadius: '2px',
                  marginBottom: '16px',
                }}
              />

              {/* Bold Title */}
              <div
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '25px',
                  fontWeight: 900,
                  letterSpacing: '0.2px',
                  textTransform: 'uppercase',
                  color: '#0a0a0c',
                  lineHeight: 1.15,
                  marginBottom: '10px',
                }}
              >
                SURVIVALIST
                <br />
                CRAFTED ELEMENTS
                <br />
                & DUAL-TRACK DISCIPLINE
              </div>

              {/* Subheading: FOR HEALTH & FINANCIAL CONTROL */}
              <div
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '11px',
                  fontWeight: 900,
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  color: '#ff4724',
                  marginBottom: '10px',
                }}
              >
                FOR HEALTH & FINANCIAL CONTROL
              </div>

              {/* Body Paragraph: ออกแบบมาเพื่อช่วยให้คุณ "ควบคุมสุขภาพและการเงิน" */}
              <p
                style={{
                  fontFamily: 'Prompt, sans-serif',
                  fontSize: '12px',
                  color: '#3f3f46',
                  lineHeight: 1.55,
                  margin: '0 0 18px 0',
                }}
              >
                ออกแบบมาเพื่อช่วยให้คุณ "ควบคุมสุขภาพและการเงิน"
                <br />
                ได้อย่างสมดุล ด้วยระบบติดตามการฝึกซ้อมและโภชนาการ
                <br />
                แบบคู่ขนาน (Fit & Daily Finance) ที่ใช้งานได้จริงในชีวิตประจำวัน
              </p>

              {/* Steps Header: HOW TO USE // 3 STEPS */}
              <div
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '1.2px',
                  textTransform: 'uppercase',
                  color: '#71717a',
                  marginBottom: '12px',
                }}
              >
                HOW TO USE // 3 STEPS
              </div>

              {/* Step 1 */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '12px' }}>
                <span
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '15px',
                    fontWeight: 900,
                    color: '#0a0a0c',
                    lineHeight: 1.2,
                    width: '12px',
                  }}
                >
                  1
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: 'Prompt, sans-serif',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#0a0a0c',
                      marginBottom: '2px',
                    }}
                  >
                    วางเป้าหมายของคุณ
                  </div>
                  <div
                    style={{
                      fontFamily: 'Prompt, sans-serif',
                      fontSize: '11px',
                      color: '#71717a',
                      lineHeight: 1.45,
                    }}
                  >
                    ตั้งเป้าหมายการฝึกซ้อม ระยะเวลา และตัวชี้วัดที่ต้องการ
                    <br />
                    ทั้งด้านสุขภาพและการเงิน
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '12px' }}>
                <span
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '15px',
                    fontWeight: 900,
                    color: '#0a0a0c',
                    lineHeight: 1.2,
                    width: '12px',
                  }}
                >
                  2
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: 'Prompt, sans-serif',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#0a0a0c',
                      marginBottom: '2px',
                    }}
                  >
                    บันทึกและติดตาม
                  </div>
                  <div
                    style={{
                      fontFamily: 'Prompt, sans-serif',
                      fontSize: '11px',
                      color: '#71717a',
                      lineHeight: 1.45,
                    }}
                  >
                    ใช้ระบบบันทึกข้อมูลแบบเรียลไทม์ ทั้งการออกกำลังกาย
                    <br />
                    โภชนาการ และการใช้จ่าย
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
                <span
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '15px',
                    fontWeight: 900,
                    color: '#0a0a0c',
                    lineHeight: 1.2,
                    width: '12px',
                  }}
                >
                  3
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: 'Prompt, sans-serif',
                      fontSize: '12px',
                      fontWeight: 800,
                      color: '#0a0a0c',
                      marginBottom: '2px',
                    }}
                  >
                    ปรับและพัฒนา
                  </div>
                  <div
                    style={{
                      fontFamily: 'Prompt, sans-serif',
                      fontSize: '11px',
                      color: '#71717a',
                      lineHeight: 1.45,
                    }}
                  >
                    ดูผลลัพธ์และวิเคราะห์แนวโน้ม เพื่อปรับแผนให้เหมาะกับคุณ
                    <br />
                    ในทุก ๆ วัน
                  </div>
                </div>
              </div>

              {/* Privacy: OFFLINE LOCALSTORAGE */}
              <div>
                <div
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '9px',
                    fontWeight: 800,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    color: '#71717a',
                    marginBottom: '3px',
                  }}
                >
                  OFFLINE LOCALSTORAGE
                </div>
                <div
                  style={{
                    fontFamily: 'Prompt, sans-serif',
                    fontSize: '11px',
                    color: '#71717a',
                    lineHeight: 1.4,
                  }}
                >
                  ข้อมูลของคุณถูกเก็บในเครื่อง 100% รองรับ ปลอดภัย
                  <br />
                  ไร้กังวลเรื่องข้อมูลรั่วไหล
                </div>
              </div>
            </div>

            {/* Bottom Right: Meta Credits & Accent Button with Down Arrow (Reference Layout) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginTop: 'auto',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '9px',
                    fontWeight: 800,
                    letterSpacing: '0.8px',
                    textTransform: 'uppercase',
                    color: '#0a0a0c',
                  }}
                >
                  GYM WORKS
                </div>
                <div
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    color: '#71717a',
                  }}
                >
                  CRAFTED FOR DISCIPLINE
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '9px',
                    fontWeight: 700,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    color: '#71717a',
                  }}
                >
                  FIT & FINANCE
                </div>
                <div
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '9px',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    color: '#0a0a0c',
                  }}
                >
                  SPRING / SUMMER 2026
                </div>
              </div>

              {/* Orange Accent Action Button with Arrow (Matches reference image bottom right) */}
              <button
                onClick={onOpenAuth}
                title="เข้าสู่ระบบ หรือ สมัครสมาชิก"
                style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: '#ff4724',
                  border: 'none',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  borderRadius: '10px',
                  boxShadow: '0 6px 18px rgba(255, 71, 36, 0.4)',
                  transition: 'transform 0.15s ease',
                }}
              >
                <ArrowDown size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopShowcase;
