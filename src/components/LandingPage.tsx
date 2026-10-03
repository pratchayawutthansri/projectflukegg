import React, { useState } from 'react';
import {
  Dumbbell,
  Wallet,
  Zap,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Clock,
  Flame,
  ChevronRight,
  Activity,
  Layers,
  Lock,
  Check,
  ChevronDown,
  Info,
  Smartphone,
  Award,
} from 'lucide-react';

interface LandingPageProps {
  onOpenAuth: () => void;
  onEnterAppAsGuest: () => void;
  isRegistered: boolean;
  onEnterApp: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenAuth,
  onEnterAppAsGuest,
  isRegistered,
  onEnterApp,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        color: '#0a0a0c',
        fontFamily: 'Prompt, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        paddingBottom: '60px',
      }}
    >
      {/* ====================================================================
          1. TOP NAVIGATION BAR
          ==================================================================== */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1.5px solid #0a0a0c',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '9px',
              backgroundColor: '#0a0a0c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffe500',
            }}
          >
            <Dumbbell size={18} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 900,
                  fontSize: '15px',
                  letterSpacing: '0.5px',
                  color: '#0a0a0c',
                }}
              >
                GYM GYM GYM
              </span>
              <span
                style={{
                  fontSize: '9px',
                  fontWeight: 800,
                  backgroundColor: '#ffe500',
                  color: '#0a0a0c',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  border: '1px solid #0a0a0c',
                }}
              >
                OS
              </span>
            </div>
            <div style={{ fontSize: '10px', color: '#71717a', fontWeight: 600 }}>
              Fit & Daily Finance
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isRegistered ? (
            <button
              onClick={onEnterApp}
              style={{
                backgroundColor: '#0a0a0c',
                color: '#ffe500',
                border: '1.5px solid #0a0a0c',
                borderRadius: '12px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer',
                boxShadow: '0 2px 0 #0a0a0c',
                whiteSpace: 'nowrap',
              }}
            >
              <span>เปิด WebApp</span>
              <ArrowRight size={14} />
            </button>
          ) : (
            <>
              <button
                onClick={onOpenAuth}
                style={{
                  backgroundColor: '#0a0a0c',
                  color: '#ffe500',
                  border: '1.5px solid #0a0a0c',
                  borderRadius: '12px',
                  padding: '7px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 0 #0a0a0c',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>เข้าสู่ระบบ</span>
              </button>
            </>
          )}
        </div>
      </header>

      {/* ====================================================================
          2. HERO SECTION
          ==================================================================== */}
      <section
        style={{
          padding: '28px 20px 24px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          backgroundColor: '#fafafb',
          borderBottom: '1.5px solid #0a0a0c',
          position: 'relative',
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#0a0a0c',
            color: '#ffe500',
            padding: '5px 12px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 700,
            marginBottom: '16px',
            letterSpacing: '0.4px',
          }}
        >
          <Sparkles size={13} color="#ffe500" />
          <span>ALL-IN-ONE FITNESS & CASHFLOW PLATFORM</span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: 'Outfit, Prompt, sans-serif',
            fontSize: '26px',
            lineHeight: 1.25,
            fontWeight: 900,
            color: '#0a0a0c',
            marginBottom: '14px',
            letterSpacing: '-0.3px',
          }}
        >
          สร้างวินัยการออกกำลังกาย
          <br />
          <span
            style={{
              backgroundColor: '#ffe500',
              padding: '2px 8px',
              borderRadius: '8px',
              border: '1.5px solid #0a0a0c',
              display: 'inline-block',
              marginTop: '4px',
            }}
          >
            พร้อมคุมค่าใช้จ่ายสุขภาพ
          </span>
          <br />
          ไว้ในที่เดียว
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '13px',
            color: '#52525b',
            lineHeight: 1.6,
            maxWidth: '380px',
            margin: '0 auto 20px auto',
          }}
        >
          หมดปัญหาการสลับแอพไปมา — รวมการจัดตารางซ้อมอัจฉริยะ (สูตรเครื่องเล่น 15 ที & วิ่งเก็บระยะ)
          เข้ากับการบริหารกระแสเงินสดรายวัน คำนวณแคลอรีอัตโนมัติ ปลอดภัยแบบออฟไลน์ 100%
        </p>

        {/* Main Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
            maxWidth: '360px',
          }}
        >
          {isRegistered ? (
            <button
              onClick={onEnterApp}
              style={{
                width: '100%',
                backgroundColor: '#0a0a0c',
                color: '#ffe500',
                border: '2px solid #0a0a0c',
                borderRadius: '16px',
                padding: '14px 20px',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 0 #0a0a0c',
                transition: 'all 0.15s ease',
              }}
            >
              <Dumbbell size={18} />
              <span>เข้าสู่หน้าหลัก WebApp</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <>
              <button
                onClick={onOpenAuth}
                style={{
                  width: '100%',
                  backgroundColor: '#0a0a0c',
                  color: '#ffe500',
                  border: '2px solid #0a0a0c',
                  borderRadius: '16px',
                  padding: '14px 20px',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 0 #0a0a0c',
                  transition: 'all 0.15s ease',
                }}
              >
                <Lock size={16} />
                <span>เข้าสู่ระบบ / สมัครสมาชิก</span>
                <ChevronRight size={18} />
              </button>

              <button
                onClick={onEnterAppAsGuest}
                style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  color: '#0a0a0c',
                  border: '2px solid #0a0a0c',
                  borderRadius: '16px',
                  padding: '12px 18px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 0 #0a0a0c',
                  transition: 'all 0.15s ease',
                }}
              >
                <Sparkles size={16} />
                <span>ทดลองใช้งานแบบ Guest (ไม่ต้องสมัคร)</span>
              </button>
            </>
          )}
        </div>

        {/* 4 Trust Badges */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '8px',
            width: '100%',
            maxWidth: '380px',
            marginTop: '22px',
          }}
        >
          {[
            { Icon: Zap, text: 'จัดตารางไวใน 1 วินาที' },
            { Icon: Award, text: 'เครื่องเล่นเซ็ตละ 15 ที' },
            { Icon: ShieldCheck, text: 'บันทึกออฟไลน์ ปลอดภัย 100%' },
            { Icon: Wallet, text: 'คุมงบสุขภาพ & ชีวิตประจำวัน' },
          ].map((item, i) => {
            const IconComponent = item.Icon;
            return (
              <div
                key={i}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #0a0a0c',
                  borderRadius: '12px',
                  padding: '8px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '6px',
                    backgroundColor: '#ffe500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    color: '#0a0a0c',
                  }}
                >
                  <IconComponent size={13} />
                </div>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#0a0a0c', lineHeight: 1.3 }}>
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          3. SECTION: WEBAPP ตัวนี้ออกแบบมาเพื่ออะไร? (WHY WE BUILT THIS)
          ==================================================================== */}
      <section style={{ padding: '24px 20px', borderBottom: '1.5px solid #0a0a0c' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Info size={16} color="#0a0a0c" />
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            เป้าหมายของระบบ (Vision & Purpose)
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'Outfit, Prompt, sans-serif',
            fontSize: '20px',
            fontWeight: 800,
            color: '#0a0a0c',
            margin: '0 0 12px 0',
          }}
        >
          WebApp ตัวนี้ออกแบบมาเพื่ออะไร?
        </h2>
        <p style={{ fontSize: '13px', color: '#52525b', lineHeight: 1.6, marginBottom: '16px' }}>
          ในการสร้างวินัยชีวิตให้ยั่งยืน สุขภาพกายและการเงินคือสองสิ่งที่ขับเคลื่อนควบคู่กันเสมอ
          แต่คนส่วนใหญ่มักประสบปัญหาที่ทำให้ล้มเลิกกลางคัน:
        </p>

        {/* Comparison Cards: Problem vs Solution */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Card 1: The Problem */}
          <div
            style={{
              backgroundColor: '#fff1f2',
              border: '1.5px solid #f43f5e',
              borderRadius: '16px',
              padding: '14px 16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#f43f5e',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 800,
                }}
              >
                ✕
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#9f1239' }}>
                ปัญหาเดิมที่คุณอาจเคยเจอ
              </span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '22px', fontSize: '12px', color: '#881337', lineHeight: 1.6 }}>
              <li>เข้ายิมแล้วยืนงง ไม่รู้จะเล่นเครื่องไหนต่อ หรือไม่มีตารางที่เข้ากับเวลา</li>
              <li>ซื้อเวย์ สมัครฟิตเนส ทานอาหารคลีน แต่คุมงบไม่อยู่ ไม่รู้ยอดเงินรั่วไหล</li>
              <li>ต้องจดสลับหลายแอพ (แอพฟิตเนส + แอพบัญชี) จนเหนื่อยและเลิกจดในที่สุด</li>
            </ul>
          </div>

          {/* Card 2: The Solution */}
          <div
            style={{
              backgroundColor: '#ecfdf5',
              border: '1.5px solid #10b981',
              borderRadius: '16px',
              padding: '14px 16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Check size={14} strokeWidth={3} />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 800, color: '#065f46' }}>
                คำตอบจาก Gym Gym Gym OS
              </span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '22px', fontSize: '12px', color: '#047857', lineHeight: 1.6 }}>
              <li><strong>จัดตารางอัจฉริยะ:</strong> ระบุเวลาซ้อม ระบบสุ่มเครื่องเล่น 15 ที/เซ็ต พร้อมคำนวณแคลอรีอัตโนมัติ</li>
              <li><strong>บันทึกเงินสุขภาพ & ประจำวัน:</strong> แยกประเภทค่าใช้จ่ายฟิตเนส รู้ยอดกระแสเงินสดสุทธิเรียลไทม์</li>
              <li><strong>รวดเร็ว ใช้งานง่าย:</strong> ออกแบบให้แตะมือเดียวในยิมได้ทันที ไม่มีขั้นตอนยุ่งยาก</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. SECTION: วิธีการใช้งาน (HOW TO USE - 4 STEPS)
          ==================================================================== */}
      <section style={{ padding: '24px 20px', borderBottom: '1.5px solid #0a0a0c', backgroundColor: '#fafafb' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Activity size={16} color="#0a0a0c" />
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            ขั้นตอนการทำงาน (How to Use)
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'Outfit, Prompt, sans-serif',
            fontSize: '20px',
            fontWeight: 800,
            color: '#0a0a0c',
            margin: '0 0 16px 0',
          }}
        >
          วิธีการใช้งาน 4 ขั้นตอนง่ายๆ
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Step 1 */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #0a0a0c',
              borderRadius: '18px',
              padding: '16px',
              boxShadow: '0 3px 0 #0a0a0c',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: '#0a0a0c',
                  color: '#ffe500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 900,
                  fontSize: '15px',
                  flexShrink: 0,
                }}
              >
                1
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0a0a0c', margin: '0 0 4px 0' }}>
                  จัดตารางซ้อมอัจฉริยะ (Smart Scheduler)
                </h3>
                <p style={{ fontSize: '12px', color: '#52525b', lineHeight: 1.5, margin: 0 }}>
                  เลือกกลุ่มกล้ามเนื้อ (อก, หลัง, ขา, ไหล่, แขน, หน้าท้อง) กำหนดระยะเวลาที่ว่าง (เช่น 1 ชม.)
                  และเลือกระยะวิ่ง (2, 5, 10 โล) ระบบจะสุ่มเครื่องเล่นเซ็ตละ 15 ที พร้อมคำนวณแคลอรีและเวลาเริ่มให้อัตโนมัติ
                </p>
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '10px', backgroundColor: '#f4f4f5', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                    อก / หลัง / ขา / ไหล่ / แขน / ท้อง
                  </span>
                  <span style={{ fontSize: '10px', backgroundColor: '#ffe500', color: '#0a0a0c', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                    เซ็ตละ 15 ที
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #0a0a0c',
              borderRadius: '18px',
              padding: '16px',
              boxShadow: '0 3px 0 #0a0a0c',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: '#0a0a0c',
                  color: '#ffe500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 900,
                  fontSize: '15px',
                  flexShrink: 0,
                }}
              >
                2
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0a0a0c', margin: '0 0 4px 0' }}>
                  บันทึกการซ้อมสดในยิม (Live Workout HUD)
                </h3>
                <p style={{ fontSize: '12px', color: '#52525b', lineHeight: 1.5, margin: 0 }}>
                  พกมือถือเข้ายิม เปิดหน้า <strong>&quot;บันทึกซ้อม&quot;</strong> มี Rest Timer นับถอยหลังพักเซ็ต (30/45/60 วิ)
                  ปรับน้ำหนักเครื่องเล่นได้ทันทีด้วยปุ่ม [+] [-] และแตะติ๊กถูกเมื่อยกครบ 15 ที
                </p>
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '10px', backgroundColor: '#f4f4f5', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                    Rest Timer 30/45/60s
                  </span>
                  <span style={{ fontSize: '10px', backgroundColor: '#f4f4f5', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                    ปรับน้ำหนักไว
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #0a0a0c',
              borderRadius: '18px',
              padding: '16px',
              boxShadow: '0 3px 0 #0a0a0c',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: '#0a0a0c',
                  color: '#ffe500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 900,
                  fontSize: '15px',
                  flexShrink: 0,
                }}
              >
                3
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0a0a0c', margin: '0 0 4px 0' }}>
                  ตรวจเช็กปฏิทินวางแผนรายวัน (Calendar Planner)
                </h3>
                <p style={{ fontSize: '12px', color: '#52525b', lineHeight: 1.5, margin: 0 }}>
                  ดูวันซ้อมตลอดสัปดาห์ในแถบปฏิทินแบบมินิมอล แตะเพื่อดูรายละเอียดเครื่องเล่นของวันนั้น
                  หรือจัดตารางล่วงหน้าเพื่อสร้างวินัยได้อย่างสม่ำเสมอ
                </p>
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '10px', backgroundColor: '#f4f4f5', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                    วางแผนล่วงหน้า
                  </span>
                  <span style={{ fontSize: '10px', backgroundColor: '#f4f4f5', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
                    ดูสถิติรายวัน
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div
            style={{
              backgroundColor: '#ffffff',
              border: '1.5px solid #0a0a0c',
              borderRadius: '18px',
              padding: '16px',
              boxShadow: '0 3px 0 #0a0a0c',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  backgroundColor: '#0a0a0c',
                  color: '#ffe500',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 900,
                  fontSize: '15px',
                  flexShrink: 0,
                }}
              >
                4
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0a0a0c', margin: '0 0 4px 0' }}>
                  บันทึกเงินสุขภาพ & ชีวิตประจำวัน (Fit & Finance)
                </h3>
                <p style={{ fontSize: '12px', color: '#52525b', lineHeight: 1.5, margin: 0 }}>
                  บันทึกรายจ่ายด้านสุขภาพ เช่น ค่าสมาชิกฟิตเนส, เวย์โปรตีน, อาหารเสริม, ค่าสมัครงานวิ่ง
                  รวมถึงรายรับและค่าใช้จ่ายทั่วไป เห็นยอดเงินคงเหลือและกระแสเงินสดชัดเจน
                </p>
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '10px', backgroundColor: '#ecfdf5', color: '#065f46', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                    รายรับ (Income)
                  </span>
                  <span style={{ fontSize: '10px', backgroundColor: '#fff1f2', color: '#9f1239', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>
                    รายจ่าย (Expense)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. SECTION: FEATURES GRID (ฟังก์ชันเด่น)
          ==================================================================== */}
      <section style={{ padding: '24px 20px', borderBottom: '1.5px solid #0a0a0c' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Layers size={16} color="#0a0a0c" />
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            จุดเด่นระบบ (Core Highlights)
          </span>
        </div>
        <h2
          style={{
            fontFamily: 'Outfit, Prompt, sans-serif',
            fontSize: '20px',
            fontWeight: 800,
            color: '#0a0a0c',
            margin: '0 0 16px 0',
          }}
        >
          ฟังก์ชันที่ทำให้คุณไปถึงเป้าหมาย
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {[
            {
              Icon: Dumbbell,
              title: 'คลังเครื่องเล่นมาตรฐาน',
              desc: 'มีท่าเครื่องเล่นยอดนิยมกว่า 30 ท่า ครอบคลุม 6 ส่วนกล้ามเนื้อ',
            },
            {
              Icon: Flame,
              title: 'คำนวณแคลอรีตามจริง',
              desc: 'ใช้สูตร BMR/TDEE และระยะทางวิ่ง คำนวณจากน้ำหนักตัวของคุณ',
            },
            {
              Icon: Clock,
              title: 'เวลาเริ่ม & เวลาจบ',
              desc: 'กำหนดเวลาเริ่มซ้อมได้อิสระ ระบบคำนวณเวลาเสร็จให้แม่นยำ',
            },
            {
              Icon: Wallet,
              title: 'หมวดหมู่เงินเพื่อสุขภาพ',
              desc: 'จำแนกค่าฟิตเนส เวย์โปรตีน อาหารคลีน ชัดเจนเป็นระบบ',
            },
            {
              Icon: Smartphone,
              title: 'ดีไซน์มือเดียวในยิม',
              desc: 'ปุ่มใหญ่ คมชัด สไตล์ Neo-Brutalist แตะสะดวกรวดเร็ว',
            },
            {
              Icon: ShieldCheck,
              title: '100% Offline Privacy',
              desc: 'ข้อมูลเก็บในเครื่องของคุณเท่านั้น ไม่ต้องกลัวข้อมูลรั่วไหล',
            },
          ].map((f, idx) => {
            const IconComponent = f.Icon;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #0a0a0c',
                  borderRadius: '16px',
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  boxShadow: '0 2px 0 #0a0a0c',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    backgroundColor: '#0a0a0c',
                    color: '#ffe500',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComponent size={16} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0a0a0c' }}>
                  {f.title}
                </div>
                <div style={{ fontSize: '11px', color: '#71717a', lineHeight: 1.4 }}>
                  {f.desc}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          6. SECTION: FAQ (คำถามที่พบบ่อย)
          ==================================================================== */}
      <section style={{ padding: '24px 20px', borderBottom: '1.5px solid #0a0a0c', backgroundColor: '#fafafb' }}>
        <h2
          style={{
            fontFamily: 'Outfit, Prompt, sans-serif',
            fontSize: '18px',
            fontWeight: 800,
            color: '#0a0a0c',
            margin: '0 0 14px 0',
            textAlign: 'center',
          }}
        >
          คำถามที่พบบ่อย (FAQ)
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            {
              q: 'ทำไมระบบถึงตั้งค่าตั้งต้นเครื่องเล่นเป็นเซ็ตละ 15 ที?',
              a: 'จำนวน 15 ที (Reps) เป็นช่วงการฝึกที่เหมาะสมที่สุดสำหรับการกระตุ้นการเผาผลาญไขมันควบคู่กับการสร้างกล้ามเนื้อ (Hypertrophy & Muscular Endurance) ช่วยให้กล้ามเนื้อกระชับและลดความเสี่ยงต่อการบาดเจ็บในยิม',
            },
            {
              q: 'ข้อมูลของฉันปลอดภัยหรือไม่ มีการส่งขึ้นคลาวด์ไหม?',
              a: 'ปลอดภัย 100% ระบบใช้เทคโนโลยี LocalStorage บันทึกข้อมูลทั้งหมดลงในอุปกรณ์ของคุณโดยตรง ไม่มีการส่งข้อมูลสุขภาพหรือการเงินไปเก็บบนเซิร์ฟเวอร์ภายนอก',
            },
            {
              q: 'ถ้าต้องการเพิ่มหรือลบท่าที่ระบบจัดให้ สามารถทำได้ไหม?',
              a: 'ทำได้ทันที! ในหน้าจัดตาราง คุณสามารถกดปุ่ม [🔄 สุ่มจัดท่าใหม่] เพื่อสุ่มชุดใหม่ หรือกด [🗑️] เพื่อลบท่าที่ไม่ต้องการเล่น และกด [+ เพิ่มท่าเล่น] เพื่อเลือกเครื่องเล่นที่ชอบจากคลัง',
            },
            {
              q: 'สามารถกำหนดเวลาเริ่มซ้อมเองได้ไหม?',
              a: 'ได้แน่นอน! มีทั้งปุ่มลัด (เช้า, กลางวัน, เย็น, ค่ำ) และช่องกำหนดเวลาเริ่มเองที่สามารถแตะตรงไหนก็ได้เพื่อเปิดนาฬิกาเลือกเวลาที่สะดวก รวมถึงปุ่ม +/- ปรับเวลาทีละ 15 นาที',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => toggleFaq(idx)}
              style={{
                backgroundColor: '#ffffff',
                border: '1.5px solid #0a0a0c',
                borderRadius: '14px',
                padding: '12px 14px',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#0a0a0c', lineHeight: 1.4 }}>
                  {item.q}
                </span>
                <ChevronDown
                  size={16}
                  color="#71717a"
                  style={{
                    transform: activeFaq === idx ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s ease',
                    flexShrink: 0,
                  }}
                />
              </div>
              {activeFaq === idx && (
                <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #f4f4f5', fontSize: '12px', color: '#52525b', lineHeight: 1.5 }}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ====================================================================
          7. BOTTOM CALL TO ACTION
          ==================================================================== */}
      <section
        style={{
          padding: '28px 20px',
          backgroundColor: '#0a0a0c',
          color: '#ffffff',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: '#1c1c22',
            border: '1.5px solid #ffe500',
            color: '#ffe500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Dumbbell size={22} />
        </div>

        <div>
          <h2
            style={{
              fontFamily: 'Outfit, Prompt, sans-serif',
              fontSize: '22px',
              fontWeight: 900,
              color: '#ffffff',
              margin: '0 0 4px 0',
            }}
          >
            พร้อมเริ่มต้นสร้างวินัยแล้วหรือยัง?
          </h2>
          <p style={{ fontSize: '12px', color: '#a1a1aa', margin: 0, maxWidth: '320px' }}>
            เข้าสู่ระบบเพื่อใช้งานตารางซ้อมที่บันทึกไว้ หรือเริ่มต้นใหม่อย่างมั่นใจ
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '320px', marginTop: '6px' }}>
          {isRegistered ? (
            <button
              onClick={onEnterApp}
              style={{
                width: '100%',
                backgroundColor: '#ffe500',
                color: '#0a0a0c',
                border: 'none',
                borderRadius: '14px',
                padding: '14px',
                fontSize: '15px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span>เปิดใช้งาน WebApp ทันที</span>
              <ArrowRight size={18} />
            </button>
          ) : (
            <>
              <button
                onClick={onOpenAuth}
                style={{
                  width: '100%',
                  backgroundColor: '#ffe500',
                  color: '#0a0a0c',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '14px',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Lock size={16} />
                <span>เข้าสู่ระบบ (Log In)</span>
              </button>

              <button
                onClick={onEnterAppAsGuest}
                style={{
                  width: '100%',
                  backgroundColor: '#1c1c22',
                  color: '#ffffff',
                  border: '1.5px solid #27272a',
                  borderRadius: '14px',
                  padding: '12px',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <span>เข้าใช้งานแบบ Guest ทันที</span>
              </button>
            </>
          )}
        </div>
      </section>

      {/* ====================================================================
          8. FOOTER
          ==================================================================== */}
      <footer
        style={{
          padding: '16px 20px',
          textAlign: 'center',
          fontSize: '11px',
          color: '#a1a1aa',
          borderTop: '1px solid #e4e4e7',
          backgroundColor: '#fafafb',
        }}
      >
        <div style={{ fontWeight: 700, color: '#0a0a0c', marginBottom: '2px' }}>
          Gym Gym Gym • Fit & Finance OS
        </div>
        <div>ระบบจัดการการออกกำลังกายและการเงินส่วนบุคคลแบบออฟไลน์</div>
      </footer>
    </div>
  );
};

export default LandingPage;
