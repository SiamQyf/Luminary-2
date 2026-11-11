import React, { useMemo } from 'react';

export interface AmbientBackgroundProps {
  theme: string;
  isDark: boolean;
}

interface ThemePalette {
  bleed1: string; // Top ambient glow
  bleed2: string; // Bottom-left atmospheric glow
  bleed3: string; // Bottom-right accent glow
  bleed4: string; // Mid-center halo
  strip1: string;
  strip2: string;
  bit1: string;
  bit2: string;
  bitGlow: string;
}

const THEME_PALETTES: Record<string, ThemePalette> = {
  translucent: {
    bleed1: 'rgba(56, 189, 248, 0.22)',
    bleed2: 'rgba(168, 85, 247, 0.18)',
    bleed3: 'rgba(14, 165, 233, 0.16)',
    bleed4: 'rgba(99, 102, 241, 0.12)',
    strip1: '#38bdf8',
    strip2: '#a855f7',
    bit1: '#38bdf8',
    bit2: '#c084fc',
    bitGlow: 'rgba(56, 189, 248, 0.65)',
  },
  'gta-vi': {
    bleed1: 'rgba(255, 19, 137, 0.24)',
    bleed2: 'rgba(255, 123, 0, 0.20)',
    bleed3: 'rgba(168, 85, 247, 0.18)',
    bleed4: 'rgba(255, 60, 120, 0.14)',
    strip1: '#ff1389',
    strip2: '#ff7b00',
    bit1: '#ff1389',
    bit2: '#ff9e00',
    bitGlow: 'rgba(255, 19, 137, 0.65)',
  },
  'cyber-neon': {
    bleed1: 'rgba(0, 240, 255, 0.24)',
    bleed2: 'rgba(139, 92, 246, 0.20)',
    bleed3: 'rgba(255, 0, 127, 0.18)',
    bleed4: 'rgba(6, 182, 212, 0.14)',
    strip1: '#00f0ff',
    strip2: '#a855f7',
    bit1: '#00f0ff',
    bit2: '#ff007f',
    bitGlow: 'rgba(0, 240, 255, 0.70)',
  },
  'synthwave-80s': {
    bleed1: 'rgba(247, 37, 133, 0.24)',
    bleed2: 'rgba(114, 9, 183, 0.22)',
    bleed3: 'rgba(76, 201, 240, 0.18)',
    bleed4: 'rgba(181, 23, 158, 0.14)',
    strip1: '#f72585',
    strip2: '#4cc9f0',
    bit1: '#f72585',
    bit2: '#7209b7',
    bitGlow: 'rgba(247, 37, 133, 0.65)',
  },
  'cyberpunk-2077': {
    bleed1: 'rgba(254, 231, 21, 0.20)',
    bleed2: 'rgba(0, 229, 255, 0.18)',
    bleed3: 'rgba(255, 0, 60, 0.16)',
    bleed4: 'rgba(250, 204, 21, 0.12)',
    strip1: '#fee715',
    strip2: '#00e5ff',
    bit1: '#fee715',
    bit2: '#ff003c',
    bitGlow: 'rgba(254, 231, 21, 0.65)',
  },
  'sakura-blossom': {
    bleed1: 'rgba(244, 114, 182, 0.22)',
    bleed2: 'rgba(251, 113, 133, 0.18)',
    bleed3: 'rgba(232, 121, 249, 0.16)',
    bleed4: 'rgba(249, 168, 212, 0.12)',
    strip1: '#f472b6',
    strip2: '#fb7185',
    bit1: '#f472b6',
    bit2: '#fbcfe8',
    bitGlow: 'rgba(244, 114, 182, 0.65)',
  },
  'cosmic-nebula': {
    bleed1: 'rgba(99, 102, 241, 0.24)',
    bleed2: 'rgba(168, 85, 247, 0.20)',
    bleed3: 'rgba(236, 72, 153, 0.18)',
    bleed4: 'rgba(129, 140, 248, 0.14)',
    strip1: '#818cf8',
    strip2: '#c084fc',
    bit1: '#a855f7',
    bit2: '#ec4899',
    bitGlow: 'rgba(168, 85, 247, 0.65)',
  },
  'retro-terminal': {
    bleed1: 'rgba(34, 197, 94, 0.22)',
    bleed2: 'rgba(16, 185, 129, 0.18)',
    bleed3: 'rgba(134, 239, 172, 0.14)',
    bleed4: 'rgba(74, 222, 128, 0.12)',
    strip1: '#22c55e',
    strip2: '#4ade80',
    bit1: '#22c55e',
    bit2: '#86efac',
    bitGlow: 'rgba(34, 197, 94, 0.65)',
  },
  'obsidian-gold': {
    bleed1: 'rgba(251, 191, 36, 0.22)',
    bleed2: 'rgba(245, 158, 11, 0.18)',
    bleed3: 'rgba(217, 119, 6, 0.16)',
    bleed4: 'rgba(252, 211, 77, 0.12)',
    strip1: '#fbbf24',
    strip2: '#f59e0b',
    bit1: '#fbbf24',
    bit2: '#fde68a',
    bitGlow: 'rgba(251, 191, 36, 0.65)',
  },
  timber: {
    bleed1: 'rgba(217, 119, 6, 0.20)',
    bleed2: 'rgba(180, 83, 9, 0.16)',
    bleed3: 'rgba(245, 158, 11, 0.14)',
    bleed4: 'rgba(146, 64, 14, 0.12)',
    strip1: '#d97706',
    strip2: '#b45309',
    bit1: '#d97706',
    bit2: '#f59e0b',
    bitGlow: 'rgba(217, 119, 6, 0.60)',
  },
  'molten-magma': {
    bleed1: 'rgba(249, 115, 22, 0.24)',
    bleed2: 'rgba(239, 68, 68, 0.20)',
    bleed3: 'rgba(251, 191, 36, 0.16)',
    bleed4: 'rgba(234, 88, 12, 0.14)',
    strip1: '#f97316',
    strip2: '#ef4444',
    bit1: '#f97316',
    bit2: '#fbbf24',
    bitGlow: 'rgba(249, 115, 22, 0.65)',
  },
  'pencil-sketch': {
    bleed1: 'rgba(226, 232, 240, 0.16)',
    bleed2: 'rgba(148, 163, 184, 0.14)',
    bleed3: 'rgba(100, 116, 139, 0.12)',
    bleed4: 'rgba(203, 213, 225, 0.10)',
    strip1: '#e2e8f0',
    strip2: '#94a3b8',
    bit1: '#e2e8f0',
    bit2: '#cbd5e1',
    bitGlow: 'rgba(226, 232, 240, 0.50)',
  },
  plain: {
    bleed1: 'rgba(255, 255, 255, 0.16)',
    bleed2: 'rgba(224, 231, 255, 0.14)',
    bleed3: 'rgba(199, 210, 254, 0.12)',
    bleed4: 'rgba(241, 245, 249, 0.10)',
    strip1: '#ffffff',
    strip2: '#e0e7ff',
    bit1: '#ffffff',
    bit2: '#c7d2fe',
    bitGlow: 'rgba(255, 255, 255, 0.60)',
  },
};

/**
 * Precision Optical Diffraction Stars (Thin architectural crosshairs + crisp pinpoint core)
 */
interface OpticalStar {
  id: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: number;
  colorKey: 'bit1' | 'bit2';
  animName: string;
  duration: number;
  delay: number;
  twinkleDuration: number;
}

const OPTICAL_STARS: readonly OpticalStar[] = [
  { id: 1, top: '12%', left: '10%', size: 14, colorKey: 'bit1', animName: 'brownian-1', duration: 28, delay: -4, twinkleDuration: 7 },
  { id: 2, top: '18%', right: '11%', size: 16, colorKey: 'bit2', animName: 'brownian-3', duration: 32, delay: -12, twinkleDuration: 8.5 },
  { id: 3, bottom: '20%', left: '14%', size: 12, colorKey: 'bit2', animName: 'brownian-4', duration: 34, delay: -8, twinkleDuration: 6.5 },
  { id: 4, bottom: '15%', right: '13%', size: 15, colorKey: 'bit1', animName: 'brownian-2', duration: 30, delay: -16, twinkleDuration: 7.8 },
];

/**
 * Fine Deep-Space Starfield Grains (Subtle stellar points with slow Brownian motion)
 */
interface StarfieldGrain {
  id: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: number;
  colorKey: 'bit1' | 'bit2';
  animName: string;
  duration: number;
  delay: number;
  pulseDuration: number;
}

const STARFIELD_GRAINS: readonly StarfieldGrain[] = [
  { id: 1, top: '16%', left: '22%', size: 1.6, colorKey: 'bit1', animName: 'brownian-2', duration: 28, delay: -3.5, pulseDuration: 8 },
  { id: 2, top: '24%', right: '24%', size: 2.0, colorKey: 'bit2', animName: 'brownian-4', duration: 33, delay: -15.2, pulseDuration: 9.5 },
  { id: 3, top: '36%', left: '12%', size: 1.4, colorKey: 'bit2', animName: 'brownian-5', duration: 35, delay: -7.8, pulseDuration: 7.5 },
  { id: 4, top: '38%', right: '19%', size: 1.8, colorKey: 'bit1', animName: 'brownian-1', duration: 30, delay: -18.4, pulseDuration: 10 },
  { id: 5, bottom: '34%', left: '7%', size: 2.0, colorKey: 'bit1', animName: 'brownian-3', duration: 36, delay: -11.6, pulseDuration: 11 },
  { id: 6, bottom: '30%', right: '6%', size: 1.6, colorKey: 'bit2', animName: 'brownian-2', duration: 31, delay: -22.3, pulseDuration: 8.5 },
  { id: 7, bottom: '14%', left: '26%', size: 1.4, colorKey: 'bit2', animName: 'brownian-1', duration: 34, delay: -9.1, pulseDuration: 7.5 },
  { id: 8, bottom: '12%', right: '28%', size: 1.9, colorKey: 'bit1', animName: 'brownian-4', duration: 38, delay: -25.7, pulseDuration: 12 },
  { id: 9, bottom: '7%', right: '46%', size: 1.2, colorKey: 'bit2', animName: 'brownian-3', duration: 29, delay: -13.9, pulseDuration: 9.5 },
  { id: 10, top: '28%', left: '4%', size: 1.7, colorKey: 'bit1', animName: 'brownian-5', duration: 35, delay: -17.2, pulseDuration: 8 },
  { id: 11, top: '20%', right: '7%', size: 1.3, colorKey: 'bit2', animName: 'brownian-1', duration: 32, delay: -5.6, pulseDuration: 10.5 },
  { id: 12, bottom: '22%', right: '22%', size: 1.8, colorKey: 'bit1', animName: 'brownian-2', duration: 34, delay: -28.1, pulseDuration: 9 },
  { id: 13, top: '8%', left: '34%', size: 1.2, colorKey: 'bit1', animName: 'brownian-4', duration: 37, delay: -10.4, pulseDuration: 11 },
  { id: 14, top: '52%', left: '4%', size: 1.5, colorKey: 'bit2', animName: 'brownian-3', duration: 32, delay: -6.2, pulseDuration: 8.8 },
  { id: 15, top: '48%', right: '4%', size: 1.5, colorKey: 'bit1', animName: 'brownian-5', duration: 34, delay: -19.8, pulseDuration: 9.2 },
  { id: 16, bottom: '8%', left: '40%', size: 1.3, colorKey: 'bit2', animName: 'brownian-1', duration: 31, delay: -14.5, pulseDuration: 10.2 },
];

export function AmbientBackground({ theme, isDark }: AmbientBackgroundProps) {
  const palette = useMemo(() => THEME_PALETTES[theme] || THEME_PALETTES.translucent, [theme]);

  if (!isDark) {
    // Light mode: pristine daylight luminescence
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none transition-opacity duration-700"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-[#f8fafc] transition-all duration-700 ease-out"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 95% 55% at 50% -8%, rgba(56, 189, 248, 0.22), transparent 70%),
              radial-gradient(ellipse 75% 60% at 50% 28%, rgba(244, 114, 182, 0.14), transparent 75%),
              radial-gradient(circle 550px at 10% 75%, rgba(45, 212, 191, 0.13), transparent 70%),
              radial-gradient(circle 550px at 90% 75%, rgba(168, 85, 247, 0.11), transparent 70%),
              linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)
            `,
          }}
        />
      </div>
    );
  }

  // Dark mode: deep obsidian black (#000000) with restrained theme nebula bleeds & precision optical elements
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none bg-black transition-colors duration-700"
      aria-hidden="true"
    >
      {/* 1. Deep Black Void Base */}
      <div className="absolute inset-0 bg-black" />

      {/* 2. Theme Nebula Color Bleeds (Layered atmospheric radial glows) */}
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 85% 50% at 50% -5%, ${palette.bleed1}, transparent 70%),
            radial-gradient(circle 650px at 6% 85%, ${palette.bleed2}, transparent 70%),
            radial-gradient(circle 600px at 94% 80%, ${palette.bleed3}, transparent 70%),
            radial-gradient(ellipse 65% 42% at 50% 46%, ${palette.bleed4}, transparent 75%)
          `,
        }}
      />

      {/* 3. Architectural Astronomical & Optical Layer */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Element 1: Sweeping Astrometric Orbital Trajectory Arc (Upper Right) */}
        <svg
          viewBox="0 0 420 420"
          width="420"
          height="420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute pointer-events-none transition-all duration-700"
          style={{
            top: '-110px',
            right: '-110px',
            opacity: 0.48,
          }}
        >
          <defs>
            <linearGradient id="orbit-arc-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={palette.bit1} stopOpacity="0" />
              <stop offset="50%" stopColor={palette.bit1} stopOpacity="0.32" />
              <stop offset="100%" stopColor={palette.bit2} stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="orbit-arc-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={palette.bit2} stopOpacity="0.22" />
              <stop offset="65%" stopColor={palette.bit1} stopOpacity="0.08" />
              <stop offset="100%" stopColor={palette.bit1} stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="210"
            cy="210"
            r="190"
            stroke="url(#orbit-arc-1)"
            strokeWidth="0.75"
          />
          <circle
            cx="210"
            cy="210"
            r="142"
            stroke="url(#orbit-arc-2)"
            strokeWidth="0.6"
            strokeDasharray="2 7"
          />
          {/* Subtle pinpoint satellite node along arc */}
          <circle cx="76" cy="344" r="1.5" fill="#ffffff" fillOpacity="0.7" />
        </svg>

        {/* Element 2: Deep Horizon Astrometric Arc (Lower Left) */}
        <svg
          viewBox="0 0 380 380"
          width="380"
          height="380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute pointer-events-none transition-all duration-700"
          style={{
            bottom: '-130px',
            left: '-110px',
            opacity: 0.42,
          }}
        >
          <defs>
            <linearGradient id="horizon-arc" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={palette.bit2} stopOpacity="0.05" />
              <stop offset="55%" stopColor={palette.bit2} stopOpacity="0.28" />
              <stop offset="100%" stopColor={palette.bit1} stopOpacity="0" />
            </linearGradient>
          </defs>
          <circle
            cx="190"
            cy="190"
            r="172"
            stroke="url(#horizon-arc)"
            strokeWidth="0.75"
          />
          <circle
            cx="190"
            cy="190"
            r="128"
            stroke={palette.bit1}
            strokeWidth="0.5"
            strokeOpacity="0.14"
            strokeDasharray="1.5 9"
          />
        </svg>

        {/* Element 3: Razor-Thin Anamorphic Optical Filaments (Slow Brownian Drift) */}
        <div
          className="absolute pointer-events-none will-change-transform"
          style={{
            top: '14%',
            left: '4%',
            width: '120px',
            height: '1px',
            animation: 'brownian-strip-1 28s ease-in-out infinite -4s',
          }}
        >
          <div
            className="w-full h-full transition-all duration-700"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${palette.strip1} 50%, transparent 100%)`,
              opacity: 0.45,
            }}
          />
        </div>

        <div
          className="absolute pointer-events-none will-change-transform"
          style={{
            bottom: '19%',
            right: '5%',
            width: '140px',
            height: '1px',
            animation: 'brownian-strip-2 32s ease-in-out infinite -11s',
          }}
        >
          <div
            className="w-full h-full transition-all duration-700"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${palette.strip2} 50%, transparent 100%)`,
              opacity: 0.4,
            }}
          />
        </div>

        {/* Element 4: Precision Optical Diffraction Crosshairs */}
        {OPTICAL_STARS.map((star) => {
          const color = palette[star.colorKey];
          return (
            <div
              key={star.id}
              className="absolute pointer-events-none will-change-transform"
              style={{
                top: star.top,
                bottom: star.bottom,
                left: star.left,
                right: star.right,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animation: `${star.animName} ${star.duration}s ease-in-out infinite ${star.delay}s`,
              }}
            >
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{
                  animation: `luminary-twinkle ${star.twinkleDuration}s ease-in-out infinite ${star.delay * 0.6}s`,
                }}
              >
                {/* Horizontal Hairline Flare */}
                <div
                  className="absolute w-full h-[1px] transition-all duration-700"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${color} 50%, transparent 100%)`,
                    opacity: 0.65,
                  }}
                />
                {/* Vertical Hairline Flare */}
                <div
                  className="absolute h-full w-[1px] transition-all duration-700"
                  style={{
                    background: `linear-gradient(180deg, transparent 0%, ${color} 50%, transparent 100%)`,
                    opacity: 0.65,
                  }}
                />
                {/* Crisp Pinpoint Optical Core */}
                <div
                  className="rounded-full bg-white transition-all duration-700"
                  style={{
                    width: '1.6px',
                    height: '1.6px',
                    boxShadow: `0 0 6px 1px ${palette.bitGlow}`,
                  }}
                />
              </div>
            </div>
          );
        })}

        {/* Element 5: Fine Deep-Space Starfield Grains (Gentle Brownian Drift) */}
        {STARFIELD_GRAINS.map((dot) => {
          const color = palette[dot.colorKey];
          return (
            <div
              key={dot.id}
              className="absolute pointer-events-none will-change-transform"
              style={{
                top: dot.top,
                bottom: dot.bottom,
                left: dot.left,
                right: dot.right,
                animation: `${dot.animName} ${dot.duration}s ease-in-out infinite ${dot.delay}s`,
              }}
            >
              <div
                className="rounded-full transition-all duration-700"
                style={{
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                  backgroundColor: color,
                  boxShadow: `0 0 ${Math.round(dot.size * 3)}px ${palette.bitGlow}`,
                  animation: `brownian-pulse ${dot.pulseDuration}s ease-in-out infinite ${dot.delay * 0.7}s`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
