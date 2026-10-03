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
}
