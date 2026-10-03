import React from 'react';
import { createPortal } from 'react-dom';
import { X, FileText } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept?: () => void;
  showAcceptButton?: boolean;
}

const TERMS_ITEMS = [
  'ทำมาเพื่อให้ใช้งานออกกำลังกายและบันทึกข้อมูลได้ฟรี โดยไม่มีค่าใช้จ่ายหรือเรียกเก็บเงินย้อนหลังใดๆ',
  'ข้อมูลทั้งหมดจะถูกจัดเก็บเป็นความลับสูงสุดบนอุปกรณ์ของคุณ ไม่มีการเปิดเผยหรือส่งต่อให้บุคคลภายนอกเด็ดขาด',
  'ระบบเป็นเพียงเครื่องมือช่วยบันทึกการฝึกซ้อมส่วนบุคคลและคำนวณสถิติเบื้องต้น ไม่ใช่คำแนะนำทางการแพทย์',
  'การออกกำลังกายมีความเสี่ยง ผู้ใช้งานตกลงสละสิทธิ์ในการเรียกร้องค่าเสียหายหรือฟ้องร้องดำเนินคดีต่อผู้พัฒนาระบบทุกกรณี',
  'การเข้าใช้งานหรือสมัครสมาชิก ถือว่าผู้ใช้งานได้รับทราบ เข้าใจ และยินยอมปฏิบัติตามข้อตกลงทั้งหมดนี้โดยสมบูรณ์',
];

export const TermsModal: React.FC<TermsModalProps> = ({
  isOpen,
  onClose,
  onAccept,
}) => {
  if (!isOpen) return null;

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
        {/* Modal Header: Theme Icon Badge (Black & Electric Yellow) + Bold Title + Close (X) */}
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
                color: '#ffe500',
                flexShrink: 0,
              }}
            >
              <FileText size={18} color="#ffe500" strokeWidth={2.2} />
            </div>
            <h2
              style={{
                fontFamily: 'Prompt, sans-serif',
                fontSize: '18px',
                fontWeight: 800,
                color: '#0a0a0c',
                margin: 0,
              }}
            >
              ข้อตกลงและเงื่อนไขการใช้งาน
            </h2>
          </div>

          <button
            onClick={onClose}
            title="ปิด"
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

        {/* Content: Clean Numbered List matching reference style with Gym Gym Gym Theme */}
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
          {TERMS_ITEMS.map((text, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              {/* Circular Number Pill (Theme: Carbon Black with Electric Yellow Number) */}
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  minWidth: '26px',
                  borderRadius: '50%',
                  backgroundColor: '#0a0a0c',
                  color: '#ffe500',
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

              {/* Text content on the right */}
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

        {/* Bottom Prominent Theme Button: รับทราบแล้ว */}
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
              color: '#ffe500',
              border: '2px solid #0a0a0c',
              borderRadius: '16px',
              padding: '15px 20px',
              fontSize: '16px',
              fontWeight: 800,
              fontFamily: 'Prompt, sans-serif',
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
            รับทราบแล้ว
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
