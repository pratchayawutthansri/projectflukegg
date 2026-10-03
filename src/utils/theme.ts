import type { ThemeMode } from '../types';

export interface ThemePalette {
  id: ThemeMode;
  nameTh: string;
  nameEn: string;
  accent: string;
  accentText: string;
  accentGlow: string;
  accentLight: string;
  borderAccent: string;
  previewColor: string;
  gradient?: string;
  cardBg?: string;
  cardBorder?: string;
  headerBg?: string;
  headerFill?: string;
}

export const THEMES: Record<ThemeMode, ThemePalette> = {
  yellow: {
    id: 'yellow',
    nameTh: 'เหลืองฟีนิกซ์',
    nameEn: 'Electric Yellow',
    accent: '#ffe500',
    accentText: '#0a0a0c',
    accentGlow: 'rgba(255, 229, 0, 0.35)',
    accentLight: 'rgba(255, 229, 0, 0.12)',
    borderAccent: '#ffe500',
    previewColor: '#ffe500',
    gradient: 'linear-gradient(135deg, #ffe500 0%, #fef08a 100%)',
    cardBg: 'linear-gradient(135deg, #854d0e 0%, #b45309 40%, #d97706 75%, #fde047 100%)',
    cardBorder: '#facc15',
    headerBg: 'linear-gradient(135deg, #713f12 0%, #a16207 45%, #ca8a04 100%)',
    headerFill: '#ca8a04',
  },
  green: {
    id: 'green',
    nameTh: 'เขียวนีออน',
    nameEn: 'Neon Lime',
    accent: '#22c55e',
    accentText: '#0a0a0c',
    accentGlow: 'rgba(34, 197, 94, 0.35)',
    accentLight: 'rgba(34, 197, 94, 0.12)',
    borderAccent: '#22c55e',
    previewColor: '#22c55e',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #86efac 100%)',
    cardBg: 'linear-gradient(135deg, #065f46 0%, #059669 45%, #10b981 75%, #a7f3d0 100%)',
    cardBorder: '#34d399',
    headerBg: 'linear-gradient(135deg, #047857 0%, #059669 45%, #10b981 100%)',
    headerFill: '#10b981',
  },
  cyan: {
    id: 'cyan',
    nameTh: 'ฟ้าไซเบอร์',
    nameEn: 'Cyber Cyan',
    accent: '#06b6d4',
    accentText: '#0a0a0c',
    accentGlow: 'rgba(6, 182, 212, 0.35)',
    accentLight: 'rgba(6, 182, 212, 0.12)',
    borderAccent: '#06b6d4',
    previewColor: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #67e8f9 100%)',
    cardBg: 'linear-gradient(135deg, #0e7490 0%, #0891b2 45%, #06b6d4 75%, #a5f3fc 100%)',
    cardBorder: '#22d3ee',
    headerBg: 'linear-gradient(135deg, #0369a1 0%, #0891b2 45%, #06b6d4 100%)',
    headerFill: '#06b6d4',
  },
  orange: {
    id: 'orange',
    nameTh: 'ส้มลาวา',
    nameEn: 'Lava Orange',
    accent: '#f97316',
    accentText: '#ffffff',
    accentGlow: 'rgba(249, 115, 22, 0.35)',
    accentLight: 'rgba(249, 115, 22, 0.12)',
    borderAccent: '#f97316',
    previewColor: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316 0%, #fdba74 100%)',
    cardBg: 'linear-gradient(135deg, #c2410c 0%, #ea580c 45%, #f97316 75%, #fed7aa 100%)',
    cardBorder: '#fb923c',
    headerBg: 'linear-gradient(135deg, #9a3412 0%, #ea580c 45%, #f97316 100%)',
    headerFill: '#ea580c',
  },
  purple: {
    id: 'purple',
    nameTh: 'ม่วงอัลตร้า',
    nameEn: 'Ultra Violet',
    accent: '#a855f7',
    accentText: '#ffffff',
    accentGlow: 'rgba(168, 85, 247, 0.35)',
    accentLight: 'rgba(168, 85, 247, 0.12)',
    borderAccent: '#a855f7',
    previewColor: '#a855f7',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #d8b4fe 100%)',
    cardBg: 'linear-gradient(135deg, #6b21a8 0%, #7e22ce 45%, #a855f7 75%, #e9d5ff 100%)',
    cardBorder: '#c084fc',
    headerBg: 'linear-gradient(135deg, #581c87 0%, #7e22ce 45%, #a855f7 100%)',
    headerFill: '#7e22ce',
  },
  pink: {
    id: 'pink',
    nameTh: 'ชมพูไล่เฉด (Fade)',
    nameEn: 'Pink Gradient',
    accent: '#ec4899',
    accentText: '#ffffff',
    accentGlow: 'rgba(236, 72, 153, 0.45)',
    accentLight: 'rgba(236, 72, 153, 0.18)',
    borderAccent: '#f472b6',
    previewColor: '#ec4899',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #fbcfe8 100%)',
    cardBg: 'linear-gradient(135deg, #db2777 0%, #ec4899 45%, #f472b6 75%, #fbcfe8 100%)',
    cardBorder: '#f472b6',
    headerBg: 'linear-gradient(135deg, #be185d 0%, #db2777 40%, #ec4899 100%)',
    headerFill: '#ec4899',
  },
  monochrome: {
    id: 'monochrome',
    nameTh: 'ขาว-ดำโมโนโครม',
    nameEn: 'Stealth Mono',
    accent: '#ffffff',
    accentText: '#0a0a0c',
    accentGlow: 'rgba(255, 255, 255, 0.25)',
    accentLight: 'rgba(255, 255, 255, 0.12)',
    borderAccent: '#ffffff',
    previewColor: '#18181b',
    gradient: 'linear-gradient(135deg, #ffffff 0%, #d4d4d8 100%)',
    cardBg: 'linear-gradient(135deg, #27272a 0%, #18181b 50%, #09090b 100%)',
    cardBorder: '#3f3f46',
    headerBg: '#0a0a0c',
    headerFill: '#0a0a0c',
  },
};

export const getTheme = (mode?: string): ThemePalette => {
  if (mode && mode in THEMES) {
    return THEMES[mode as ThemeMode];
  }
  return THEMES.yellow;
};

export function applyThemeToDocument(palette: ThemePalette) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--color-yellow-gym', palette.accent);
  root.style.setProperty('--color-yellow-glow', palette.accentGlow);
  root.style.setProperty('--color-yellow-hover', palette.accent);
  root.style.setProperty('--theme-accent', palette.accent);
  root.style.setProperty('--theme-accent-glow', palette.accentGlow);
  root.style.setProperty('--theme-accent-light', palette.accentLight);
  root.style.setProperty(
    '--theme-gradient',
    palette.gradient || `linear-gradient(135deg, ${palette.accent} 0%, ${palette.accent} 100%)`
  );
  root.style.setProperty('--theme-card-bg', palette.cardBg || '#0a0a0c');
  root.style.setProperty('--theme-card-border', palette.cardBorder || palette.borderAccent || '#0a0a0c');
  root.style.setProperty('--theme-header-bg', palette.headerBg || '#0a0a0c');
  root.style.setProperty('--theme-header-fill', palette.headerFill || '#0a0a0c');
}
