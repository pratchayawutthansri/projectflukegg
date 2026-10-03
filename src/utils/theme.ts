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
    cardBg: 'linear-gradient(145deg, #18181b 0%, #0a0a0c 100%)',
    cardBorder: '#ffe500',
    headerBg: '#0a0a0c',
    headerFill: '#0a0a0c',
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
    cardBg: 'linear-gradient(135deg, #052e16 0%, #064e3b 50%, #047857 100%)',
    cardBorder: '#22c55e',
    headerBg: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)',
    headerFill: '#064e3b',
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
    cardBg: 'linear-gradient(135deg, #083344 0%, #0e7490 50%, #0284c7 100%)',
    cardBorder: '#06b6d4',
    headerBg: 'linear-gradient(135deg, #083344 0%, #0e7490 100%)',
    headerFill: '#0e7490',
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
    cardBg: 'linear-gradient(135deg, #431407 0%, #9a3412 50%, #ea580c 100%)',
    cardBorder: '#f97316',
    headerBg: 'linear-gradient(135deg, #431407 0%, #9a3412 100%)',
    headerFill: '#9a3412',
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
    cardBg: 'linear-gradient(135deg, #3b0764 0%, #581c87 50%, #7e22ce 100%)',
    cardBorder: '#a855f7',
    headerBg: 'linear-gradient(135deg, #3b0764 0%, #581c87 100%)',
    headerFill: '#581c87',
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
    headerBg: 'linear-gradient(135deg, #9d174d 0%, #db2777 45%, #ec4899 100%)',
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
