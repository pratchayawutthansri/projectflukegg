import React from 'react';
import { createPortal } from 'react-dom';
import { X, FileText } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  showAcceptButton?: boolean;
  language?: 'th' | 'en';
}

const TERMS_ITEMS_TH = [
  'ทำมาเพื่อให้ใช้งานออกกำลังกายและบันทึกข้อมูลได้ฟรี โดยไม่มีค่าใช้จ่ายหรือเรียกเก็บเงินย้อนหลังใดๆ',
  'ข้อมูลทั้งหมดจะถูกจัดเก็บเป็นความลับสูงสุดบนอุปกรณ์ของคุณ ไม่มีการเปิดเผยหรือส่งต่อให้บุคคลภายนอกเด็ดขาด',
  'ระบบเป็นเพียงเครื่องมือช่วยบันทึกการฝึกซ้อมส่วนบุคคลและคำนวณสถิติเบื้องต้น ไม่ใช่คำแนะนำทางการแพทย์',
  'การออกกำลังกายมีความเสี่ยง ผู้ใช้งานตกลงสละสิทธิ์ในการเรียกร้องค่าเสียหายหรือฟ้องร้องดำเนินคดีต่อผู้พัฒนาระบบทุกกรณี',
  'การเข้าใช้งานหรือสมัครสมาชิก ถือว่าผู้ใช้งานได้รับทราบ เข้าใจ และยินยอมปฏิบัติตามข้อตกลงทั้งหมดนี้โดยสมบูรณ์',
];

const TERMS_ITEMS_EN = [
  'Created for 100% free workout and finance tracking with zero hidden fees or retroactive charges.',
  'All data is kept strictly confidential on your local device and is never shared with third parties.',
  'This application is a personal training journal and basic calculator, not professional medical advice.',
  'Physical exercise carries risk; users waive claims or liability against the system creators under all circumstances.',
  'Using the app or registering constitutes complete understanding and agreement with all terms.',
];

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  language = 'th',
}) => {
  if (!isOpen) return null;

  const isEn = language === 'en';
  const termsList = isEn ? TERMS_ITEMS_EN : TERMS_ITEMS_TH;

  const handleConfirm = () => {
    if (onAccept) {
      onAccept();
    }
    onClose();
  };

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(10, 10, 12, 0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          maxHeight: '90vh',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          border: '2px solid #0a0a0c',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), 0 4px 0 #0a0a0c',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          animation: 'fadeInUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '18px 22px 14px 22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1.5px solid #f4f4f5',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                backgroundColor: '#0a0a0c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--theme-accent, #ffe500)',
                flexShrink: 0,
              }}
            >
              <FileText size={18} color="var(--theme-accent, #ffe500)" strokeWidth={2.2} />
            </div>
            <h2
              style={{
                fontFamily: 'Prompt, Outfit, sans-serif',
                fontSize: '18px',
                fontWeight: 800,
                color: '#0a0a0c',
                margin: 0,
              }}
            >
              {isEn ? 'Terms & Conditions (5 Rules)' : 'ข้อตกลงและเงื่อนไขการใช้งาน'}
            </h2>
          </div>

          <button
            onClick={onClose}
            title={isEn ? 'Close' : 'ปิด'}
            style={{
              background: '#f4f4f5',
              border: 'none',
              cursor: 'pointer',
              color: '#0a0a0c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              transition: 'all 0.15s ease',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content: Clean Numbered List */}
        <div
          style={{
            padding: '22px 22px 14px 22px',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {termsList.map((text, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  minWidth: '26px',
                  borderRadius: '50%',
                  backgroundColor: '#0a0a0c',
                  color: 'var(--theme-accent, #ffe500)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: 800,
                  fontFamily: 'Outfit, sans-serif',
                  marginTop: '1px',
                  flexShrink: 0,
                }}
              >
                {index + 1}
              </div>

              <p
                style={{
                  margin: 0,
                  fontSize: '13.5px',
                  color: '#18181b',
                  lineHeight: '1.55',
                  fontFamily: 'Prompt, sans-serif',
                  fontWeight: 500,
                }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Prominent Theme Button */}
        <div
          style={{
            padding: '14px 22px 22px 22px',
          }}
        >
          <button
            onClick={handleConfirm}
            style={{
              width: '100%',
              backgroundColor: '#0a0a0c',
              color: 'var(--theme-accent, #ffe500)',
              border: '2px solid #0a0a0c',
              borderRadius: '16px',
              padding: '15px 20px',
              fontSize: '16px',
              fontWeight: 800,
              fontFamily: 'Prompt, Outfit, sans-serif',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
              transition: 'transform 0.15s ease, background-color 0.15s ease',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            {isEn ? 'I Understand and Agree' : 'รับทราบแล้ว'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
