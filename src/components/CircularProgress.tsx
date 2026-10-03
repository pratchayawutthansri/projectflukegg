import React from 'react';

interface CircularProgressProps {
  percentage: number;
  label: string;
  subLabel?: string;
  size?: number;
  strokeWidth?: number;
  accentColor?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  label,
  subLabel,
  size = 140,
  strokeWidth = 10,
  accentColor = '#0a0a0c',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercentage = Math.min(100, Math.max(0, percentage));
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e4e4e7"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress stroke */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={accentColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </svg>
      {/* Center text matching reference image (Screen 4: 56%) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: size > 120 ? '30px' : '22px',
            fontWeight: 800,
            lineHeight: 1,
            color: '#0a0a0c',
            letterSpacing: '-1px',
          }}
        >
          {label}
        </span>
        {subLabel && (
          <span
            style={{
              fontFamily: 'Prompt, sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              color: '#71717a',
              marginTop: '4px',
            }}
          >
            {subLabel}
          </span>
        )}
      </div>
    </div>
  );
};
