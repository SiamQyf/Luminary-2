import React, { useEffect, useId, useRef, useState } from 'react';

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
  gamepad: {
    dark: {
      primary: '#00e5a3',
      secondary: '#3b82f6',
      accent: '#f43f5e',
      gradient: 'linear-gradient(135deg, #e2e8f0 10%, #00e5a3 55%, #3b82f6 100%)',
      glow: 'rgba(0, 229, 163, 0.5)',
      iconGlow: 'rgba(0, 229, 163, 0.4)',
    },
    light: {
      primary: '#059669',
      secondary: '#2563eb',
      accent: '#e11d48',
      gradient: 'linear-gradient(135deg, #059669 10%, #2563eb 60%, #1e293b 100%)',
      glow: 'rgba(5, 150, 105, 0.35)',
      iconGlow: 'rgba(5, 150, 105, 0.25)',
    },
  },
  'gamepad-white': {
    dark: {
      primary: '#86e01a',
      secondary: '#6366f1',
      accent: '#fb7185',
      gradient: 'linear-gradient(135deg, #bef264 10%, #86e01a 55%, #6366f1 100%)',
      glow: 'rgba(134, 224, 26, 0.5)',
      iconGlow: 'rgba(134, 224, 26, 0.4)',
    },
    light: {
      primary: '#4d7c0f',
      secondary: '#4338ca',
      accent: '#e11d48',
      gradient: 'linear-gradient(135deg, #65a30d 10%, #4d7c0f 60%, #4338ca 100%)',
      glow: 'rgba(101, 163, 13, 0.35)',
      iconGlow: 'rgba(101, 163, 13, 0.25)',
    },
  },
  'news-magazine': {
    dark: {
      primary: '#faf7f0',
      secondary: '#dc2626',
      accent: '#d6ccb8',
      gradient: 'linear-gradient(135deg, #faf7f0 15%, #e7dfd0 60%, #dc2626 100%)',
      glow: 'rgba(220, 38, 38, 0.45)',
      iconGlow: 'rgba(220, 38, 38, 0.35)',
    },
    light: {
      primary: '#141210',
      secondary: '#b91c1c',
      accent: '#57534e',
      gradient: 'linear-gradient(135deg, #141210 15%, #292524 60%, #b91c1c 100%)',
      glow: 'rgba(185, 28, 28, 0.28)',
      iconGlow: 'rgba(185, 28, 28, 0.2)',
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
  'vinyl-turntable': {
    dark: {
      primary: '#f97316',
      secondary: '#ea580c',
      accent: '#fdba74',
      gradient: 'linear-gradient(135deg, #fdba74 10%, #f97316 55%, #c2410c 100%)',
      glow: 'rgba(249, 115, 22, 0.45)',
      iconGlow: 'rgba(249, 115, 22, 0.35)',
    },
    light: {
      primary: '#c2410c',
      secondary: '#ea580c',
      accent: '#18181b',
      gradient: 'linear-gradient(135deg, #ea580c 15%, #c2410c 60%, #18181b 100%)',
      glow: 'rgba(194, 65, 12, 0.25)',
      iconGlow: 'rgba(194, 65, 12, 0.2)',
    },
  },
  blueprint: {
    dark: {
      primary: '#38bdf8',
      secondary: '#bae6fd',
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 10%, #bae6fd 50%, #0284c7 100%)',
      glow: 'rgba(56, 189, 248, 0.48)',
      iconGlow: 'rgba(56, 189, 248, 0.38)',
    },
    light: {
      primary: '#0369a1',
      secondary: '#0284c7',
      accent: '#1e3a8a',
      gradient: 'linear-gradient(135deg, #0284c7 15%, #0369a1 60%, #1e3a8a 100%)',
      glow: 'rgba(3, 105, 161, 0.28)',
      iconGlow: 'rgba(3, 105, 161, 0.2)',
    },
  },
  'frutiger-aero': {
    dark: {
      primary: '#38bdf8',
      secondary: '#4ade80',
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 10%, #38bdf8 55%, #4ade80 100%)',
      glow: 'rgba(14, 165, 233, 0.48)',
      iconGlow: 'rgba(14, 165, 233, 0.38)',
    },
    light: {
      primary: '#0284c7',
      secondary: '#16a34a',
      accent: '#0ea5e9',
      gradient: 'linear-gradient(135deg, #0ea5e9 15%, #0284c7 55%, #16a34a 100%)',
      glow: 'rgba(2, 132, 199, 0.28)',
      iconGlow: 'rgba(2, 132, 199, 0.2)',
    },
  },
  'art-deco': {
    dark: {
      primary: '#e5c17b',
      secondary: '#10b981',
      accent: '#fef3c7',
      gradient: 'linear-gradient(135deg, #fef3c7 10%, #e5c17b 55%, #10b981 100%)',
      glow: 'rgba(229, 193, 123, 0.45)',
      iconGlow: 'rgba(229, 193, 123, 0.35)',
    },
    light: {
      primary: '#a16207',
      secondary: '#065f46',
      accent: '#ca8a04',
      gradient: 'linear-gradient(135deg, #ca8a04 15%, #a16207 60%, #065f46 100%)',
      glow: 'rgba(161, 98, 7, 0.28)',
      iconGlow: 'rgba(161, 98, 7, 0.2)',
    },
  },
  'clay-pastel': {
    dark: {
      primary: '#fb7185',
      secondary: '#c084fc',
      accent: '#5eead4',
      gradient: 'linear-gradient(135deg, #fb7185 10%, #c084fc 55%, #5eead4 100%)',
      glow: 'rgba(192, 132, 252, 0.45)',
      iconGlow: 'rgba(192, 132, 252, 0.35)',
    },
    light: {
      primary: '#e11d48',
      secondary: '#9333ea',
      accent: '#0d9488',
      gradient: 'linear-gradient(135deg, #e11d48 15%, #9333ea 55%, #0d9488 100%)',
      glow: 'rgba(147, 51, 234, 0.25)',
      iconGlow: 'rgba(147, 51, 234, 0.2)',
    },
  },
  'tactical-hud': {
    dark: {
      primary: '#fbbf24',
      secondary: '#84cc16',
      accent: '#d6d3c4',
      gradient: 'linear-gradient(135deg, #fbbf24 15%, #84cc16 60%, #4d7c0f 100%)',
      glow: 'rgba(245, 158, 11, 0.42)',
      iconGlow: 'rgba(245, 158, 11, 0.32)',
    },
    light: {
      primary: '#b45309',
      secondary: '#4d7c0f',
      accent: '#365314',
      gradient: 'linear-gradient(135deg, #b45309 15%, #4d7c0f 60%, #365314 100%)',
      glow: 'rgba(180, 83, 9, 0.25)',
      iconGlow: 'rgba(180, 83, 9, 0.2)',
    },
  },
  'matcha-zen': {
    dark: {
      primary: '#a3c987',
      secondary: '#84a96c',
      accent: '#f2efe4',
      gradient: 'linear-gradient(135deg, #f2efe4 10%, #a3c987 55%, #4f773d 100%)',
      glow: 'rgba(163, 201, 135, 0.42)',
      iconGlow: 'rgba(163, 201, 135, 0.32)',
    },
    light: {
      primary: '#3f6212',
      secondary: '#4d7c3f',
      accent: '#65a30d',
      gradient: 'linear-gradient(135deg, #4d7c3f 15%, #3f6212 60%, #365314 100%)',
      glow: 'rgba(77, 124, 63, 0.25)',
      iconGlow: 'rgba(77, 124, 63, 0.2)',
    },
  },
  bauhaus: {
    dark: {
      primary: '#facc15',
      secondary: '#dc2626',
      accent: '#2563eb',
      gradient: 'linear-gradient(135deg, #dc2626 10%, #facc15 55%, #2563eb 100%)',
      glow: 'rgba(250, 204, 21, 0.48)',
      iconGlow: 'rgba(220, 38, 38, 0.4)',
    },
    light: {
      primary: '#dc2626',
      secondary: '#2563eb',
      accent: '#ca8a04',
      gradient: 'linear-gradient(135deg, #dc2626 15%, #ca8a04 55%, #2563eb 100%)',
      glow: 'rgba(220, 38, 38, 0.28)',
      iconGlow: 'rgba(37, 99, 235, 0.2)',
    },
  },
  'swiss-intl': {
    dark: {
      primary: '#ea580c',
      secondary: '#e5e5e0',
      accent: '#fafaf9',
      gradient: 'linear-gradient(135deg, #fafaf9 10%, #ea580c 60%, #9a3412 100%)',
      glow: 'rgba(234, 88, 12, 0.45)',
      iconGlow: 'rgba(234, 88, 12, 0.35)',
    },
    light: {
      primary: '#ea580c',
      secondary: '#1c1917',
      accent: '#78716c',
      gradient: 'linear-gradient(135deg, #1c1917 15%, #ea580c 65%, #c2410c 100%)',
      glow: 'rgba(234, 88, 12, 0.25)',
      iconGlow: 'rgba(234, 88, 12, 0.2)',
    },
  },
  'ukiyo-e': {
    dark: {
      primary: '#60a5fa',
      secondary: '#dc2626',
      accent: '#e8dcc4',
      gradient: 'linear-gradient(135deg, #e8dcc4 10%, #60a5fa 55%, #dc2626 100%)',
      glow: 'rgba(96, 165, 250, 0.45)',
      iconGlow: 'rgba(220, 38, 38, 0.35)',
    },
    light: {
      primary: '#1d4ed8',
      secondary: '#b91c1c',
      accent: '#152a45',
      gradient: 'linear-gradient(135deg, #152a45 15%, #1d4ed8 60%, #b91c1c 100%)',
      glow: 'rgba(29, 78, 216, 0.25)',
      iconGlow: 'rgba(185, 28, 28, 0.2)',
    },
  },
  bioluminescent: {
    dark: {
      primary: '#2dd4bf',
      secondary: '#06b6d4',
      accent: '#a5f3fc',
      gradient: 'linear-gradient(135deg, #a5f3fc 10%, #2dd4bf 55%, #0284c7 100%)',
      glow: 'rgba(45, 212, 191, 0.55)',
      iconGlow: 'rgba(45, 212, 191, 0.45)',
    },
    light: {
      primary: '#0d9488',
      secondary: '#0891b2',
      accent: '#0e7490',
      gradient: 'linear-gradient(135deg, #0d9488 15%, #0891b2 60%, #155e75 100%)',
      glow: 'rgba(13, 148, 136, 0.3)',
      iconGlow: 'rgba(8, 145, 178, 0.22)',
    },
  },
  steampunk: {
    dark: {
      primary: '#d4a03a',
      secondary: '#f59e0b',
      accent: '#fde68a',
      gradient: 'linear-gradient(135deg, #fde68a 10%, #d4a03a 55%, #92400e 100%)',
      glow: 'rgba(212, 160, 58, 0.48)',
      iconGlow: 'rgba(212, 160, 58, 0.38)',
    },
    light: {
      primary: '#b45309',
      secondary: '#92400e',
      accent: '#78350f',
      gradient: 'linear-gradient(135deg, #d97706 15%, #b45309 60%, #78350f 100%)',
      glow: 'rgba(180, 83, 9, 0.28)',
      iconGlow: 'rgba(146, 64, 14, 0.22)',
    },
  },
  'candy-pop': {
    dark: {
      primary: '#ec4899',
      secondary: '#f97316',
      accent: '#facc15',
      gradient: 'linear-gradient(135deg, #f472b6 10%, #ec4899 50%, #f97316 100%)',
      glow: 'rgba(236, 72, 153, 0.52)',
      iconGlow: 'rgba(249, 115, 22, 0.42)',
    },
    light: {
      primary: '#db2777',
      secondary: '#ea580c',
      accent: '#7c3aed',
      gradient: 'linear-gradient(135deg, #db2777 15%, #ea580c 55%, #7c3aed 100%)',
      glow: 'rgba(219, 39, 119, 0.3)',
      iconGlow: 'rgba(234, 88, 12, 0.22)',
    },
  },
  'polaroid-film': {
    dark: {
      primary: '#fbbf24',
      secondary: '#dc2626',
      accent: '#e5e7eb',
      gradient: 'linear-gradient(135deg, #e5e7eb 15%, #fbbf24 55%, #dc2626 100%)',
      glow: 'rgba(245, 158, 11, 0.42)',
      iconGlow: 'rgba(220, 38, 38, 0.32)',
    },
    light: {
      primary: '#b45309',
      secondary: '#dc2626',
      accent: '#1c1917',
      gradient: 'linear-gradient(135deg, #1c1917 15%, #b45309 60%, #dc2626 100%)',
      glow: 'rgba(180, 83, 9, 0.25)',
      iconGlow: 'rgba(220, 38, 38, 0.2)',
    },
  },
  'nordic-frost': {
    dark: {
      primary: '#bae6fd',
      secondary: '#2dd4bf',
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 10%, #bae6fd 55%, #2dd4bf 100%)',
      glow: 'rgba(186, 230, 253, 0.45)',
      iconGlow: 'rgba(45, 212, 191, 0.35)',
    },
    light: {
      primary: '#0369a1',
      secondary: '#0d9488',
      accent: '#0f172a',
      gradient: 'linear-gradient(135deg, #0369a1 15%, #0284c7 55%, #0d9488 100%)',
      glow: 'rgba(3, 105, 161, 0.25)',
      iconGlow: 'rgba(13, 148, 136, 0.2)',
    },
  },
  'crimson-cinema': {
    dark: {
      primary: '#fb7185',
      secondary: '#e11d48',
      accent: '#fde68a',
      gradient: 'linear-gradient(135deg, #fde68a 10%, #fb7185 55%, #9f1239 100%)',
      glow: 'rgba(225, 29, 72, 0.5)',
      iconGlow: 'rgba(253, 230, 138, 0.38)',
    },
    light: {
      primary: '#be123c',
      secondary: '#9f1239',
      accent: '#b45309',
      gradient: 'linear-gradient(135deg, #be123c 15%, #9f1239 60%, #881337 100%)',
      glow: 'rgba(190, 18, 60, 0.28)',
      iconGlow: 'rgba(159, 18, 57, 0.2)',
    },
  },
  'pixel-8bit': {
    dark: {
      primary: '#facc15',
      secondary: '#38bdf8',
      accent: '#ef4444',
      gradient: 'linear-gradient(135deg, #facc15 10%, #38bdf8 55%, #ef4444 100%)',
      glow: 'rgba(250, 204, 21, 0.5)',
      iconGlow: 'rgba(56, 189, 248, 0.4)',
    },
    light: {
      primary: '#4338ca',
      secondary: '#0284c7',
      accent: '#dc2626',
      gradient: 'linear-gradient(135deg, #4338ca 15%, #0284c7 55%, #dc2626 100%)',
      glow: 'rgba(67, 56, 202, 0.28)',
      iconGlow: 'rgba(2, 132, 199, 0.2)',
    },
  },
  'linear-ticks': {
    dark: {
      primary: '#ede5ce',
      secondary: '#a1a1aa',
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 10%, #ede5ce 55%, #a1a1aa 100%)',
      glow: 'rgba(237, 229, 206, 0.42)',
      iconGlow: 'rgba(237, 229, 206, 0.3)',
    },
    light: {
      primary: '#18181b',
      secondary: '#52525b',
      accent: '#71717a',
      gradient: 'linear-gradient(135deg, #18181b 15%, #52525b 60%, #71717a 100%)',
      glow: 'rgba(24, 24, 27, 0.24)',
      iconGlow: 'rgba(82, 82, 91, 0.18)',
    },
  },
  'crystal': {
    dark: {
      primary: '#ffffff',
      secondary: '#f0ede6',
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 10%, #e2ded5 55%, #c8c2b5 100%)',
      glow: 'rgba(255, 255, 255, 0.45)',
      iconGlow: 'rgba(255, 255, 255, 0.35)',
    },
    light: {
      primary: '#1c1f24',
      secondary: '#4b5563',
      accent: '#111827',
      gradient: 'linear-gradient(135deg, #1c1f24 15%, #4b5563 60%, #111827 100%)',
      glow: 'rgba(28, 31, 36, 0.22)',
      iconGlow: 'rgba(75, 85, 99, 0.18)',
    },
  },
  'dot-matrix': {
    dark: {
      primary: '#00f0ff',
      secondary: '#38bdf8',
      accent: '#ff2a85',
      gradient: 'linear-gradient(135deg, #00f0ff 10%, #38bdf8 55%, #ff2a85 100%)',
      glow: 'rgba(0, 240, 255, 0.55)',
      iconGlow: 'rgba(0, 240, 255, 0.45)',
    },
    light: {
      primary: '#0284c7',
      secondary: '#0891b2',
      accent: '#e11d48',
      gradient: 'linear-gradient(135deg, #0284c7 15%, #0891b2 55%, #e11d48 100%)',
      glow: 'rgba(2, 132, 199, 0.28)',
      iconGlow: 'rgba(8, 145, 178, 0.22)',
    },
  },
  'liquid-mercury': {
    dark: {
      primary: '#e2e8f0',
      secondary: '#94a3b8',
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 15%, #cbd5e1 55%, #64748b 100%)',
      glow: 'rgba(226, 232, 240, 0.60)',
      iconGlow: 'rgba(226, 232, 240, 0.45)',
    },
    light: {
      primary: '#475569',
      secondary: '#64748b',
      accent: '#0f172a',
      gradient: 'linear-gradient(135deg, #0f172a 15%, #475569 60%, #94a3b8 100%)',
      glow: 'rgba(71, 85, 105, 0.25)',
      iconGlow: 'rgba(100, 116, 139, 0.20)',
    },
  },
  'aurora-borealis': {
    dark: {
      primary: '#34d399',
      secondary: '#06b6d4',
      accent: '#a78bfa',
      gradient: 'linear-gradient(135deg, #34d399 15%, #06b6d4 55%, #a78bfa 100%)',
      glow: 'rgba(52, 211, 153, 0.65)',
      iconGlow: 'rgba(52, 211, 153, 0.50)',
    },
    light: {
      primary: '#059669',
      secondary: '#0891b2',
      accent: '#7c3aed',
      gradient: 'linear-gradient(135deg, #059669 15%, #0891b2 55%, #7c3aed 100%)',
      glow: 'rgba(5, 150, 105, 0.28)',
      iconGlow: 'rgba(8, 145, 178, 0.22)',
    },
  },
  'solar-flare': {
    dark: {
      primary: '#f97316',
      secondary: '#fde047',
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 15%, #fde047 45%, #ea580c 100%)',
      glow: 'rgba(249, 115, 22, 0.70)',
      iconGlow: 'rgba(249, 115, 22, 0.55)',
    },
    light: {
      primary: '#c2410c',
      secondary: '#d97706',
      accent: '#7c2d12',
      gradient: 'linear-gradient(135deg, #c2410c 15%, #d97706 60%, #7c2d12 100%)',
      glow: 'rgba(194, 65, 12, 0.30)',
      iconGlow: 'rgba(217, 119, 6, 0.22)',
    },
  },
  'amethyst-geode': {
    dark: {
      primary: '#a855f7',
      secondary: '#c084fc',
      accent: '#f3e8ff',
      gradient: 'linear-gradient(135deg, #f3e8ff 15%, #c084fc 55%, #7e22ce 100%)',
      glow: 'rgba(168, 85, 247, 0.65)',
      iconGlow: 'rgba(168, 85, 247, 0.50)',
    },
    light: {
      primary: '#7e22ce',
      secondary: '#9333ea',
      accent: '#3b0764',
      gradient: 'linear-gradient(135deg, #7e22ce 15%, #9333ea 60%, #3b0764 100%)',
      glow: 'rgba(126, 34, 206, 0.28)',
      iconGlow: 'rgba(147, 51, 234, 0.22)',
    },
  },
  'cyber-deck': {
    dark: {
      primary: '#facc15',
      secondary: '#06b6d4',
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #facc15 20%, #eab308 55%, #06b6d4 100%)',
      glow: 'rgba(250, 204, 21, 0.70)',
      iconGlow: 'rgba(250, 204, 21, 0.55)',
    },
    light: {
      primary: '#854d0e',
      secondary: '#0891b2',
      accent: '#18181b',
      gradient: 'linear-gradient(135deg, #854d0e 15%, #0891b2 60%, #18181b 100%)',
      glow: 'rgba(133, 77, 14, 0.25)',
      iconGlow: 'rgba(8, 145, 178, 0.20)',
    },
  },
  'porcelain-cobalt': {
    dark: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 25%, #60a5fa 65%, #1d4ed8 100%)',
      glow: 'rgba(59, 130, 246, 0.55)',
      iconGlow: 'rgba(59, 130, 246, 0.40)',
    },
    light: {
      primary: '#1d4ed8',
      secondary: '#1e40af',
      accent: '#0f172a',
      gradient: 'linear-gradient(135deg, #1d4ed8 15%, #1e40af 60%, #0f172a 100%)',
      glow: 'rgba(29, 78, 216, 0.25)',
      iconGlow: 'rgba(30, 64, 175, 0.20)',
    },
  },
  'emerald-vault': {
    dark: {
      primary: '#10b981',
      secondary: '#d4af37',
      accent: '#fef08a',
      gradient: 'linear-gradient(135deg, #fef08a 10%, #d4af37 45%, #059669 100%)',
      glow: 'rgba(16, 185, 129, 0.65)',
      iconGlow: 'rgba(212, 175, 55, 0.50)',
    },
    light: {
      primary: '#047857',
      secondary: '#854d0e',
      accent: '#064e3b',
      gradient: 'linear-gradient(135deg, #047857 15%, #854d0e 60%, #064e3b 100%)',
      glow: 'rgba(4, 120, 87, 0.25)',
      iconGlow: 'rgba(133, 77, 14, 0.20)',
    },
  },
  'vaporwave-sunset': {
    dark: {
      primary: '#f472b6',
      secondary: '#fb923c',
      accent: '#fde047',
      gradient: 'linear-gradient(135deg, #f472b6 15%, #fb923c 60%, #fde047 100%)',
      glow: 'rgba(244, 114, 182, 0.65)',
      iconGlow: 'rgba(244, 114, 182, 0.50)',
    },
    light: {
      primary: '#db2777',
      secondary: '#ea580c',
      accent: '#7c3aed',
      gradient: 'linear-gradient(135deg, #db2777 15%, #ea580c 60%, #7c3aed 100%)',
      glow: 'rgba(219, 39, 119, 0.25)',
      iconGlow: 'rgba(234, 88, 12, 0.20)',
    },
  },
  'carbon-stealth': {
    dark: {
      primary: '#ef4444',
      secondary: '#78716c',
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 10%, #78716c 50%, #dc2626 100%)',
      glow: 'rgba(239, 68, 68, 0.60)',
      iconGlow: 'rgba(239, 68, 68, 0.45)',
    },
    light: {
      primary: '#b91c1c',
      secondary: '#44403c',
      accent: '#0c0a09',
      gradient: 'linear-gradient(135deg, #b91c1c 15%, #44403c 60%, #0c0a09 100%)',
      glow: 'rgba(185, 28, 28, 0.25)',
      iconGlow: 'rgba(68, 64, 60, 0.20)',
    },
  },
  'holo-prism': {
    dark: {
      primary: '#d946ef',
      secondary: '#06b6d4',
      accent: '#fde047',
      gradient: 'linear-gradient(135deg, #d946ef 15%, #06b6d4 55%, #fde047 100%)',
      glow: 'rgba(217, 70, 239, 0.70)',
      iconGlow: 'rgba(217, 70, 239, 0.55)',
    },
    light: {
      primary: '#a21caf',
      secondary: '#0891b2',
      accent: '#b45309',
      gradient: 'linear-gradient(135deg, #a21caf 15%, #0891b2 55%, #b45309 100%)',
      glow: 'rgba(162, 28, 175, 0.28)',
      iconGlow: 'rgba(8, 145, 178, 0.22)',
    },
  },
  'deep-abyss': {
    dark: {
      primary: '#06b6d4',
      secondary: '#22d3ee',
      accent: '#67e8f9',
      gradient: 'linear-gradient(135deg, #67e8f9 15%, #06b6d4 55%, #0e7490 100%)',
      glow: 'rgba(6, 182, 212, 0.70)',
      iconGlow: 'rgba(6, 182, 212, 0.55)',
    },
    light: {
      primary: '#0891b2',
      secondary: '#0e7490',
      accent: '#083344',
      gradient: 'linear-gradient(135deg, #0891b2 15%, #0e7490 60%, #083344 100%)',
      glow: 'rgba(8, 145, 178, 0.25)',
      iconGlow: 'rgba(14, 116, 144, 0.20)',
    },
  },
  'velvet-opera': {
    dark: {
      primary: '#be123c',
      secondary: '#d4af37',
      accent: '#fef08a',
      gradient: 'linear-gradient(135deg, #fef08a 10%, #d4af37 45%, #881337 100%)',
      glow: 'rgba(190, 18, 60, 0.65)',
      iconGlow: 'rgba(212, 175, 55, 0.50)',
    },
    light: {
      primary: '#9f1239',
      secondary: '#854d0e',
      accent: '#4c0519',
      gradient: 'linear-gradient(135deg, #9f1239 15%, #854d0e 60%, #4c0519 100%)',
      glow: 'rgba(159, 18, 57, 0.25)',
      iconGlow: 'rgba(133, 77, 14, 0.20)',
    },
  },
  'toxic-hazard': {
    dark: {
      primary: '#39ff14',
      secondary: '#22c55e',
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 15%, #39ff14 55%, #15803d 100%)',
      glow: 'rgba(57, 255, 20, 0.80)',
      iconGlow: 'rgba(57, 255, 20, 0.65)',
    },
    light: {
      primary: '#15803d',
      secondary: '#16a34a',
      accent: '#052e16',
      gradient: 'linear-gradient(135deg, #15803d 15%, #16a34a 60%, #052e16 100%)',
      glow: 'rgba(21, 128, 61, 0.30)',
      iconGlow: 'rgba(22, 163, 74, 0.22)',
    },
  },
  'glacial-permafrost': {
    dark: {
      primary: '#38bdf8',
      secondary: '#7dd3fc',
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 20%, #7dd3fc 55%, #0284c7 100%)',
      glow: 'rgba(56, 189, 248, 0.65)',
      iconGlow: 'rgba(56, 189, 248, 0.50)',
    },
    light: {
      primary: '#0284c7',
      secondary: '#0369a1',
      accent: '#082f49',
      gradient: 'linear-gradient(135deg, #0284c7 15%, #0369a1 60%, #082f49 100%)',
      glow: 'rgba(2, 132, 199, 0.28)',
      iconGlow: 'rgba(3, 105, 161, 0.22)',
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

const ORBIT_CX = 16;
const ORBIT_CY = 16;
const ORBIT_RX = 11.6;
const ORBIT_RY = 4.6;
const ORBIT_TILT_RAD = -Math.PI / 6; // -30 degrees
const ORBIT_COS = Math.cos(ORBIT_TILT_RAD);
const ORBIT_SIN = Math.sin(ORBIT_TILT_RAD);

function getTiltedOrbitPoint(theta: number) {
  const x0 = ORBIT_RX * Math.cos(theta);
  const y0 = ORBIT_RY * Math.sin(theta);
  return {
    x: ORBIT_CX + x0 * ORBIT_COS - y0 * ORBIT_SIN,
    y: ORBIT_CY + x0 * ORBIT_SIN + y0 * ORBIT_COS,
  };
}

function buildOrbitArcPath(startTheta: number, endTheta: number, steps: number): string {
  const pts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = startTheta + ((endTheta - startTheta) * i) / steps;
    const { x, y } = getTiltedOrbitPoint(t);
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return pts.join(' ');
}

function LuminaryOrbitalStarIcon({
  palette,
  className = 'size-[22px] sm:size-[24px] shrink-0',
}: {
  palette: ThemePalette;
  className?: string;
}) {
  const uid = useId().replace(/:/g, '');
  const trailRefs = useRef<(SVGPathElement | null)[]>([]);
  const sparkARef = useRef<SVGCircleElement>(null);
  const sparkBRef = useRef<SVGCircleElement>(null);
  const starGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const applyFrame = (theta: number) => {
      // 5 tapered comet tail segments from tail (oldest) to neck (newest near star)
      const tailSpan = 2.35;
      const segRanges: [number, number][] = [
        [0.0, 0.34],
        [0.26, 0.56],
        [0.48, 0.76],
        [0.7, 0.91],
        [0.86, 1.0],
      ];
      segRanges.forEach(([a, b], idx) => {
        const el = trailRefs.current[idx];
        if (!el) return;
        const t0 = theta - tailSpan * (1 - a);
        const t1 = theta - tailSpan * (1 - b);
        el.setAttribute('d', buildOrbitArcPath(t0, t1, 8));
      });

      const spA = getTiltedOrbitPoint(theta - 0.52);
      if (sparkARef.current) {
        sparkARef.current.setAttribute('cx', spA.x.toFixed(2));
        sparkARef.current.setAttribute('cy', spA.y.toFixed(2));
      }

      const spB = getTiltedOrbitPoint(theta - 1.12);
      if (sparkBRef.current) {
        sparkBRef.current.setAttribute('cx', spB.x.toFixed(2));
        sparkBRef.current.setAttribute('cy', spB.y.toFixed(2));
      }

      const head = getTiltedOrbitPoint(theta);
      // Subtle depth scale as star orbits front/back of the 30-deg tilted ellipse
      const depthScale = 0.94 + 0.14 * Math.sin(theta);
      const starSpin = (theta * 18) % 360;
      if (starGroupRef.current) {
        starGroupRef.current.setAttribute(
          'transform',
          `translate(${head.x.toFixed(2)} ${head.y.toFixed(2)}) scale(${depthScale.toFixed(3)}) rotate(${starSpin.toFixed(1)})`
        );
      }
    };

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      applyFrame(-0.45);
      return;
    }

    let rafId = 0;
    const start = performance.now();
    const orbitMs = 2600;
    const tick = (now: number) => {
      const elapsed = now - start;
      const theta = ((elapsed % orbitMs) / orbitMs) * Math.PI * 2;
      applyFrame(theta);
      rafId = requestAnimationFrame(tick);
    };

    applyFrame(0);
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const tailColors = [
    { stroke: palette.secondary, width: 0.75, opacity: 0.18 },
    { stroke: palette.secondary, width: 1.05, opacity: 0.34 },
    { stroke: palette.primary, width: 1.35, opacity: 0.55 },
    { stroke: palette.primary, width: 1.65, opacity: 0.78 },
    { stroke: palette.accent, width: 1.9, opacity: 0.94 },
  ];

  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
      className={className}
      aria-hidden="true"
      style={{
        filter: `drop-shadow(0 0 7px ${palette.glow})`,
      }}
    >
      <defs>
        <radialGradient id={`${uid}-core-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={palette.accent} stopOpacity="0.45" />
          <stop offset="60%" stopColor={palette.primary} stopOpacity="0.16" />
          <stop offset="100%" stopColor={palette.primary} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Subtle soft focal glow at orbit center */}
      <circle cx={ORBIT_CX} cy={ORBIT_CY} r="5.5" fill={`url(#${uid}-core-glow)`} />

      {/* 30-degree tilted orbital path guide */}
      <ellipse
        cx={ORBIT_CX}
        cy={ORBIT_CY}
        rx={ORBIT_RX}
        ry={ORBIT_RY}
        transform="rotate(-30 16 16)"
        stroke={palette.primary}
        strokeWidth="0.75"
        strokeOpacity="0.22"
      />

      {/* Tapered animated star trail */}
      {tailColors.map((cfg, idx) => (
        <path
          key={idx}
          ref={(el) => {
            trailRefs.current[idx] = el;
          }}
          d={buildOrbitArcPath(-2.35 * (1 - idx * 0.2), -2.35 * (1 - (idx + 1) * 0.2), 8)}
          stroke={cfg.stroke}
          strokeWidth={cfg.width}
          strokeOpacity={cfg.opacity}
          strokeLinecap="round"
        />
      ))}

      {/* Wake stardust particles */}
      <circle ref={sparkARef} cx="24" cy="11" r="0.8" fill={palette.accent} fillOpacity="0.85" />
      <circle ref={sparkBRef} cx="19" cy="9" r="0.55" fill={palette.primary} fillOpacity="0.65" />

      {/* Orbiting 4-point Luminary Star */}
      <g ref={starGroupRef} transform="translate(26.05 10.2) scale(0.94)">
        <circle cx="0" cy="0" r="2.7" fill={palette.primary} fillOpacity="0.32" />
        <path
          d="M0 -4.3C0.45 -1.35 1.35 -0.45 4.3 0C1.35 0.45 0.45 1.35 0 4.3C-0.45 1.35 -1.35 0.45 -4.3 0C-1.35 -0.45 -0.45 -1.35 0 -4.3Z"
          fill="#ffffff"
        />
        <circle cx="0" cy="0" r="1.05" fill={palette.accent} />
      </g>
    </svg>
  );
}

export function useLuminaryPalette(propTheme?: string, propIsDark?: boolean): ThemePalette {
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

  return getThemePalette(activeTheme, activeDark);
}

/**
 * Complete Luminescence Brand Logo:
 * - Dynamic color synchronization matching the selected theme.
 * - Clean borderless orbital star-trail icon on a 30-degree tilted ellipse.
 * - Compact wordmark where the leading 'L' matches the height of the remaining letters.
 */
export function LuminescenceLogo({ className = '', theme: propTheme, isDark: propIsDark }: LogoProps) {
  const palette = useLuminaryPalette(propTheme, propIsDark);

  return (
    <div className={`flex items-center gap-1.5 select-none ${className}`}>
      {/* Animated Star Trail on a 30-degree Tilted Oval Orbit */}
      <LuminaryOrbitalStarIcon palette={palette} />

      {/* Dynamic Wordmark matching selected theme */}
      <span
        className="inline-block text-[15px] sm:text-[16.5px] font-semibold tracking-[0.04em] leading-none transition-all duration-300 hover:opacity-95"
        style={{
          fontFamily: "'Orbitron', 'Space Grotesk', sans-serif",
          color: palette.primary,
          backgroundImage: palette.gradient,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          filter: `drop-shadow(0 0 12px ${palette.glow})`,
        }}
      >
        <span
          style={{
            fontSize: '0.768em',
            fontWeight: 700,
            letterSpacing: '0.02em',
          }}
        >
          L
        </span>
        uminary
      </span>
    </div>
  );
}

// Backward compatibility alias
export const InescenceIcon = LuminescenceIcon;
export const InescenceLogo = LuminescenceLogo;
