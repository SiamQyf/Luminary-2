import React, { useEffect, useState } from 'react';

export interface ThemePalette {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  glow: string;
  iconGlow: string;
}

export const THEME_PALETTES: Record<string, { dark: ThemePalette; light: ThemePalette }> = {
  translucent: {
    dark: {
      primary: '#38bdf8',
      secondary: '#818cf8',
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 15%, #38bdf8 65%, #818cf8 100%)',
      glow: 'rgba(56, 189, 248, 0.4)',
      iconGlow: 'rgba(56, 189, 248, 0.35)',
    },
    light: {
      primary: '#0284c7',
      secondary: '#4f46e5',
      accent: '#0f172a',
      gradient: 'linear-gradient(135deg, #0f172a 10%, #0284c7 60%, #4f46e5 100%)',
      glow: 'rgba(2, 132, 199, 0.25)',
      iconGlow: 'rgba(2, 132, 199, 0.2)',
    },
  },
  'gta-vi': {
    dark: {
      primary: '#ff1389',
      secondary: '#ff7b00',
      accent: '#ffe600',
      gradient: 'linear-gradient(135deg, #ff1389 10%, #ff5e00 60%, #ffb703 100%)',
      glow: 'rgba(255, 19, 137, 0.55)',
      iconGlow: 'rgba(255, 19, 137, 0.45)',
    },
    light: {
      primary: '#e11d48',
      secondary: '#ea580c',
      accent: '#d97706',
      gradient: 'linear-gradient(135deg, #e11d48 10%, #ea580c 60%, #d97706 100%)',
      glow: 'rgba(225, 29, 72, 0.35)',
      iconGlow: 'rgba(225, 29, 72, 0.25)',
    },
  },
  'cyber-neon': {
    dark: {
      primary: '#00f0ff',
      secondary: '#a855f7',
      accent: '#3b82f6',
      gradient: 'linear-gradient(135deg, #00f0ff 15%, #06b6d4 50%, #a855f7 100%)',
      glow: 'rgba(0, 240, 255, 0.55)',
      iconGlow: 'rgba(0, 240, 255, 0.45)',
    },
    light: {
      primary: '#0891b2',
      secondary: '#7c3aed',
      accent: '#2563eb',
      gradient: 'linear-gradient(135deg, #0891b2 15%, #2563eb 50%, #7c3aed 100%)',
      glow: 'rgba(8, 145, 178, 0.35)',
      iconGlow: 'rgba(8, 145, 178, 0.25)',
    },
  },
  'synthwave-80s': {
    dark: {
      primary: '#f72585',
      secondary: '#7209b7',
      accent: '#4cc9f0',
      gradient: 'linear-gradient(135deg, #f72585 10%, #b5179e 50%, #4cc9f0 100%)',
      glow: 'rgba(247, 37, 133, 0.55)',
      iconGlow: 'rgba(247, 37, 133, 0.45)',
    },
    light: {
      primary: '#db2777',
      secondary: '#7c3aed',
      accent: '#0284c7',
      gradient: 'linear-gradient(135deg, #db2777 10%, #7c3aed 50%, #0284c7 100%)',
      glow: 'rgba(219, 39, 119, 0.35)',
      iconGlow: 'rgba(219, 39, 119, 0.25)',
    },
  },
  'cyberpunk-2077': {
    dark: {
      primary: '#fcee0a',
      secondary: '#00f0ff',
      accent: '#ff003c',
      gradient: 'linear-gradient(135deg, #fcee0a 15%, #ffd600 55%, #00f0ff 100%)',
      glow: 'rgba(252, 238, 10, 0.5)',
      iconGlow: 'rgba(252, 238, 10, 0.4)',
    },
    light: {
      primary: '#ca8a04',
      secondary: '#0891b2',
      accent: '#dc2626',
      gradient: 'linear-gradient(135deg, #ca8a04 15%, #d97706 55%, #0891b2 100%)',
      glow: 'rgba(202, 138, 4, 0.35)',
      iconGlow: 'rgba(202, 138, 4, 0.25)',
    },
  },
  'sakura-blossom': {
    dark: {
      primary: '#f472b6',
      secondary: '#fda4af',
      accent: '#fb7185',
      gradient: 'linear-gradient(135deg, #fce7f3 10%, #f472b6 60%, #fb7185 100%)',
      glow: 'rgba(244, 114, 182, 0.5)',
      iconGlow: 'rgba(244, 114, 182, 0.4)',
    },
    light: {
      primary: '#db2777',
      secondary: '#f43f5e',
      accent: '#e11d48',
      gradient: 'linear-gradient(135deg, #db2777 10%, #f43f5e 60%, #9f1239 100%)',
      glow: 'rgba(219, 39, 119, 0.35)',
      iconGlow: 'rgba(219, 39, 119, 0.25)',
    },
  },
  'cosmic-nebula': {
    dark: {
      primary: '#c084fc',
      secondary: '#e879f9',
      accent: '#818cf8',
      gradient: 'linear-gradient(135deg, #f5d0fe 10%, #c084fc 55%, #818cf8 100%)',
      glow: 'rgba(192, 132, 252, 0.55)',
      iconGlow: 'rgba(192, 132, 252, 0.45)',
    },
    light: {
      primary: '#7c3aed',
      secondary: '#c026d3',
      accent: '#4f46e5',
      gradient: 'linear-gradient(135deg, #7c3aed 10%, #c026d3 55%, #4f46e5 100%)',
      glow: 'rgba(124, 58, 237, 0.35)',
      iconGlow: 'rgba(124, 58, 237, 0.25)',
    },
  },
  'retro-terminal': {
    dark: {
      primary: '#4ade80',
      secondary: '#22c55e',
      accent: '#86efac',
      gradient: 'linear-gradient(135deg, #86efac 15%, #4ade80 55%, #16a34a 100%)',
      glow: 'rgba(74, 222, 128, 0.55)',
      iconGlow: 'rgba(74, 222, 128, 0.45)',
    },
    light: {
      primary: '#15803d',
      secondary: '#16a34a',
      accent: '#14532d',
      gradient: 'linear-gradient(135deg, #15803d 15%, #16a34a 55%, #14532d 100%)',
      glow: 'rgba(21, 128, 61, 0.35)',
      iconGlow: 'rgba(21, 128, 61, 0.25)',
    },
  },
  'obsidian-gold': {
    dark: {
      primary: '#fbbf24',
      secondary: '#f59e0b',
      accent: '#fef08a',
      gradient: 'linear-gradient(135deg, #fef08a 10%, #fbbf24 55%, #d97706 100%)',
      glow: 'rgba(251, 191, 36, 0.55)',
      iconGlow: 'rgba(251, 191, 36, 0.45)',
    },
    light: {
      primary: '#b45309',
      secondary: '#d97706',
      accent: '#78350f',
      gradient: 'linear-gradient(135deg, #b45309 10%, #d97706 55%, #78350f 100%)',
      glow: 'rgba(180, 83, 9, 0.35)',
      iconGlow: 'rgba(180, 83, 9, 0.25)',
    },
  },
  timber: {
    dark: {
      primary: '#f59e0b',
      secondary: '#d97706',
      accent: '#fcd34d',
      gradient: 'linear-gradient(135deg, #fef3c7 10%, #f59e0b 55%, #b45309 100%)',
      glow: 'rgba(245, 158, 11, 0.5)',
      iconGlow: 'rgba(245, 158, 11, 0.4)',
    },
    light: {
      primary: '#b45309',
      secondary: '#92400e',
      accent: '#78350f',
      gradient: 'linear-gradient(135deg, #b45309 10%, #92400e 55%, #78350f 100%)',
      glow: 'rgba(180, 83, 9, 0.35)',
      iconGlow: 'rgba(180, 83, 9, 0.25)',
    },
  },
  'molten-magma': {
    dark: {
      primary: '#ef4444',
      secondary: '#f97316',
      accent: '#fca5a5',
      gradient: 'linear-gradient(135deg, #fecaca 10%, #ef4444 55%, #dc2626 100%)',
      glow: 'rgba(239, 68, 68, 0.55)',
      iconGlow: 'rgba(239, 68, 68, 0.45)',
    },
    light: {
      primary: '#dc2626',
      secondary: '#ea580c',
      accent: '#991b1b',
      gradient: 'linear-gradient(135deg, #dc2626 10%, #ea580c 55%, #991b1b 100%)',
      glow: 'rgba(220, 38, 38, 0.35)',
      iconGlow: 'rgba(220, 38, 38, 0.25)',
    },
  },
  'pencil-sketch': {
    dark: {
      primary: '#a1a1aa',
      secondary: '#71717a',
      accent: '#e4e4e7',
      gradient: 'linear-gradient(135deg, #ffffff 20%, #a1a1aa 60%, #71717a 100%)',
      glow: 'rgba(161, 161, 170, 0.35)',
      iconGlow: 'rgba(161, 161, 170, 0.25)',
    },
    light: {
      primary: '#27272a',
      secondary: '#3f3f46',
      accent: '#18181b',
      gradient: 'linear-gradient(135deg, #18181b 20%, #27272a 60%, #52525b 100%)',
      glow: 'rgba(39, 39, 42, 0.25)',
      iconGlow: 'rgba(39, 39, 42, 0.15)',
    },
  },
  plain: {
    dark: {
      primary: '#ffffff',
      secondary: '#e4e4e7',
      accent: '#d4d4d8',
      gradient: 'linear-gradient(135deg, #ffffff 40%, #e4e4e7 75%, #a1a1aa 100%)',
      glow: 'rgba(255, 255, 255, 0.3)',
      iconGlow: 'rgba(255, 255, 255, 0.2)',
    },
    light: {
      primary: '#09090b',
      secondary: '#27272a',
      accent: '#52525b',
      gradient: 'linear-gradient(135deg, #09090b 40%, #27272a 75%, #52525b 100%)',
      glow: 'rgba(9, 9, 11, 0.2)',
      iconGlow: 'rgba(9, 9, 11, 0.15)',
    },
  },
};

export function getThemePalette(themeName: string, isDark = true): ThemePalette {
  const t = THEME_PALETTES[themeName] || THEME_PALETTES.translucent;
  return isDark ? t.dark : t.light;
}

interface LogoProps {
  className?: string;
  theme?: string;
  isDark?: boolean;
}

/**
 * Modern Borderless Luminescence Emblem:
 * Integrates a luminous Play prism with photon emission wave rings
 * and apex photon star, smoothly colorized with the active theme.
 */
export function LuminescenceIcon({
  className = 'size-[26px]',
  theme = 'translucent',
  isDark = true,
  id = 'lumi-icon',
}: {
  className?: string;
  theme?: string;
  isDark?: boolean;
  id?: string;
}) {
  const palette = getThemePalette(theme, isDark);

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{
        filter: `drop-shadow(0 0 10px ${palette.iconGlow})`,
        transition: 'filter 0.3s ease',
      }}
    >
      <defs>
        {/* Dynamic Theme Gradient for Core Play Glyph */}
        <linearGradient id={`${id}-play-grad`} x1="8" y1="6" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={palette.primary} />
          <stop offset="55%" stopColor={palette.secondary} />
          <stop offset="100%" stopColor={palette.accent} />
        </linearGradient>

        {/* Dynamic Emission Ray Gradient */}
        <linearGradient id={`${id}-ray-grad`} x1="4" y1="26" x2="26" y2="4" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={palette.secondary} stopOpacity="0.4" />
          <stop offset="60%" stopColor={palette.primary} stopOpacity="0.85" />
          <stop offset="100%" stopColor={palette.accent} stopOpacity="0.95" />
        </linearGradient>

        {/* Soft Photonic Diffusion */}
        <filter id={`${id}-diffusion`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. Ambient Background Luminescence Glow */}
      <circle cx="16" cy="16" r="8" fill={palette.primary} fillOpacity={isDark ? 0.2 : 0.12} filter={`url(#${id}-diffusion)`} />

      {/* 2. Outer Photon Emission Arc (Rays of Light) */}
      <path
        d="M6.5 22C4.8 16.5 7.5 10 13 6.8C18.8 3.5 25.5 6.2 27.5 12"
        stroke={`url(#${id}-ray-grad)`}
        strokeWidth="1.8"
        strokeLinecap="round"
        className="transition-all duration-300"
      />

      {/* 3. Inner Delicate Emission Arc */}
      <path
        d="M8.5 24.5C7.2 20.8 8.8 16 12.5 13.5"
        stroke={palette.primary}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeOpacity="0.65"
        className="transition-all duration-300"
      />

      {/* 4. Core Rounded Play Chevron (The Video Prism) */}
      <path
        d="M12 9.4C12 8.5 13 8 13.8 8.4L21.8 13.6C22.5 14.1 22.5 15.1 21.8 15.6L13.8 20.8C13 21.2 12 20.7 12 19.8V9.4Z"
        fill={`url(#${id}-play-grad)`}
        className="transition-all duration-300"
      />

      {/* 5. Glass Specular Bevel on Play Edge */}
      <path
        d="M12.5 10.3L20.8 14.6L12.5 12.1V10.3Z"
        fill="#ffffff"
        fillOpacity={isDark ? 0.5 : 0.65}
      />

      {/* 6. Apex Photon Sparkle (Light Emission Point) */}
      <path
        d="M24.5 5.5L25 6.8L26.3 7.3L25 7.8L24.5 9.1L24 7.8L22.7 7.3L24 6.8Z"
        fill="#ffffff"
      />
      <circle cx="24.5" cy="7.3" r="1.3" fill={palette.accent} fillOpacity="0.8" />
    </svg>
  );
}

/**
 * Complete Luminescence Brand Logo:
 * - Dynamic color synchronization matching the selected theme.
 * - Clean borderless modern icon mark.
 * - Removed "Studio" badge.
 * - Ethereal text typography with radiant theme gradient & glow.
 */
export function LuminescenceLogo({ className = '', theme: propTheme, isDark: propIsDark }: LogoProps) {
  // Reactive theme detection if not directly passed as props
  const [activeTheme, setActiveTheme] = useState<string>(() => {
    if (propTheme) return propTheme;
    if (typeof window !== 'undefined') {
      return (
        document.documentElement.dataset.theme ||
        sessionStorage.getItem('luminescence-theme') ||
        sessionStorage.getItem('inescence-theme') ||
        'translucent'
      );
    }
    return 'translucent';
  });

  const [activeDark, setActiveDark] = useState<boolean>(() => {
    if (typeof propIsDark === 'boolean') return propIsDark;
    if (typeof window !== 'undefined') {
      return document.documentElement.dataset.colorScheme !== 'light';
    }
    return true;
  });

  useEffect(() => {
    if (propTheme) {
      setActiveTheme(propTheme);
    }
  }, [propTheme]);

  useEffect(() => {
    if (typeof propIsDark === 'boolean') {
      setActiveDark(propIsDark);
    }
  }, [propIsDark]);

  useEffect(() => {
    // Listen for theme change events from both window & iframe
    const handleThemeChange = (e: any) => {
      const newTheme = e.detail?.theme || e.data?.theme;
      if (newTheme) {
        setActiveTheme(newTheme);
      }
    };

    const handleMsg = (e: MessageEvent) => {
      if (e.data?.type === 'THEME_CHANGE' && e.data.theme) {
        setActiveTheme(e.data.theme);
      }
    };

    window.addEventListener('luminescence-theme-change', handleThemeChange);
    window.addEventListener('message', handleMsg);

    return () => {
      window.removeEventListener('luminescence-theme-change', handleThemeChange);
      window.removeEventListener('message', handleMsg);
    };
  }, []);

  const palette = getThemePalette(activeTheme, activeDark);

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Radiant Luminary Celestial Star Icon */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="size-[20px] shrink-0"
        aria-hidden="true"
        style={{
          filter: `drop-shadow(0 0 9px ${palette.glow})`,
        }}
      >
        <path
          d="M12 2C12 7.5 7.5 12 2 12C7.5 12 12 16.5 12 22C12 16.5 16.5 12 22 12C16.5 12 12 7.5 12 2Z"
          fill={palette.primary}
        />
        <circle cx="12" cy="12" r="2.2" fill={palette.accent} />
      </svg>

      {/* Dynamic Wordmark matching selected theme */}
      <span
        className="inline-block text-[22px] sm:text-[24px] font-semibold tracking-[-0.035em] leading-none transition-all duration-300 hover:opacity-95"
        style={{
          color: palette.primary,
          backgroundImage: palette.gradient,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: `drop-shadow(0 0 14px ${palette.glow})`,
        }}
      >
        Luminary
      </span>
    </div>
  );
}

// Backward compatibility alias
export const InescenceIcon = LuminescenceIcon;
export const InescenceLogo = LuminescenceLogo;
