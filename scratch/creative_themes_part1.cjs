// Part 1: Haute Horology, Sci-Fi & Deep Nature (Themes 54 - 66)

module.exports = [
  // 54. Tourbillon Skeleton
  {
    id: 'tourbillon-skeleton',
    label: 'Tourbillon Skeleton',
    frameBorder: 'rgba(212, 175, 55, 0.3333)',
    frameRadius: '14px',
    frameShadow: '0 24px 60px rgba(0, 0, 0, 0.95), inset 0 0 25px rgba(212, 175, 55, 0.15)',
    btnRadius: '9999px',
    btnBg: 'radial-gradient(circle at 35% 25%, rgba(246, 213, 141, 0.25) 0%, rgba(20, 16, 10, 0.85) 80%)',
    btnBorder: '1.5px solid rgba(212, 175, 55, 0.55)',
    btnShadow: '0 4px 16px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(254, 240, 138, 0.5)',
    btnHoverBorder: '#fef08a',
    btnHoverShadow: '0 0 20px rgba(212, 175, 55, 0.75), inset 0 1px 2px #fef08a',
    playBg: 'linear-gradient(135deg, #d4af37 0%, #b8860b 50%, #78350f 100%)',
    playBorder: '1.5px solid #fef08a',
    playShadow: '0 0 25px rgba(212, 175, 55, 0.8), inset 0 1px 1px #fff',
    iconColor: '#fde047',
    playIconColor: '#ffffff',
    iconFilter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    seekTrackHeight: '12px',
    seekTrackBg: 'repeating-linear-gradient(90deg, rgba(212, 175, 55, 0.35) 0 3px, transparent 3px 7px), #14100a',
    seekTrackBorder: '1px solid rgba(212, 175, 55, 0.45)',
    seekTrackRadius: '2px',
    seekBufferBg: 'repeating-linear-gradient(90deg, rgba(212, 175, 55, 0.5) 0 3px, transparent 3px 7px)',
    seekFillBg: 'repeating-linear-gradient(90deg, #fef08a 0 3px, #b8860b 3px 7px)',
    seekFillShadow: '0 0 14px rgba(212, 175, 55, 0.9)',
    seekThumbStyle: `
      width: 22px !important;
      height: 22px !important;
      border-radius: 9999px !important;
      background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 22' fill='none'><circle cx='11' cy='11' r='10' stroke='%23fef08a' stroke-width='1.5' fill='%2314100a'/><circle cx='11' cy='11' r='7.5' stroke='%23d4af37' stroke-dasharray='2 2' stroke-width='1'/><line x1='11' y1='1' x2='11' y2='21' stroke='%23d4af37' stroke-width='1.2'/><line x1='1' y1='11' x2='21' y2='11' stroke='%23d4af37' stroke-width='1.2'/><circle cx='11' cy='11' r='3.5' fill='%23b91c1c' stroke='%23ffffff' stroke-width='0.75'/><circle cx='11' cy='11' r='1.2' fill='%23ffffff'/></svg>") center / contain no-repeat !important;
      border: none !important;
      box-shadow: 0 0 14px rgba(212, 175, 55, 0.95) !important;
    `,
    volPillBg: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(20, 14, 8, 0.9) 100%)',
    volPillBorder: '1.5px solid rgba(212, 175, 55, 0.45)',
    volTrackBg: 'repeating-linear-gradient(90deg, rgba(212, 175, 55, 0.28) 0 1.5px, transparent 1.5px 5px), #0f0a05',
    volTrackBorder: '0.5px solid rgba(212, 175, 55, 0.3)',
    volFillBg: 'repeating-linear-gradient(90deg, #fef08a 0 1.5px, #d4af37 1.5px 5px)',
    volThumbStyle: 'width: 3.5px; height: 12px; border-radius: 1px; background: #ffffff; box-shadow: 0 0 6px #d4af37;',
    dockBackdrop: `
      background-image:
        repeating-radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0 1px, transparent 1px 6px),
        repeating-linear-gradient(45deg, rgba(212, 175, 55, 0.03) 0 1px, transparent 1px 12px),
        linear-gradient(180deg, rgba(16, 12, 8, 0) 0%, rgba(16, 12, 8, 0.6) 40%, rgba(13, 9, 5, 0.95) 76%, #0d0905 100%);
      background-size: 40px 40px, 12px 12px, 100% 100%;
      box-shadow: inset 0 -1px 0 rgba(212, 175, 55, 0.35);
    `,
    timeColor: '#fde047',
    timeFont: "'JetBrains Mono', 'Cinzel', monospace",
    menuBg: 'linear-gradient(145deg, rgba(24, 18, 12, 0.98), rgba(12, 8, 5, 0.99))',
    menuBorder: '1.5px solid rgba(212, 175, 55, 0.45)',
    menuRadius: '14px',
    menuShadow: '0 24px 50px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(254, 240, 138, 0.35)',
    menuItemHoverBg: 'rgba(212, 175, 55, 0.18)',
    menuItemHoverColor: '#fef08a',
    captionBg: 'rgba(20, 14, 8, 0.95)',
    captionBorder: '1.25px solid rgba(212, 175, 55, 0.45)',
    captionRadius: '6px',
    captionShadow: '0 4px 18px rgba(0, 0, 0, 0.85)',
    captionColor: '#fef08a',
    captionTextShadow: '0 1px 2px rgba(0, 0, 0, 0.95)',
  },

  // 55. Monaco Chronograph
  {
    id: 'chronograph-racing',
    label: 'Monaco Chronograph',
    frameBorder: 'rgba(255, 107, 0, 0.3333)',
    frameRadius: '10px',
    frameShadow: '0 24px 55px rgba(0, 0, 0, 0.9), inset 0 0 15px rgba(15, 35, 54, 0.6)',
    btnRadius: '8px',
    btnBg: 'linear-gradient(135deg, rgba(23, 49, 74, 0.8) 0%, rgba(10, 22, 34, 0.9) 100%)',
    btnBorder: '1.5px solid rgba(255, 107, 0, 0.5)',
    btnShadow: '0 4px 12px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    btnHoverBorder: '#ff8c33',
    btnHoverShadow: '0 0 18px rgba(255, 107, 0, 0.7), inset 0 1px 2px #ff8c33',
    playBg: 'linear-gradient(135deg, #ff6b00 0%, #e05300 50%, #b83d00 100%)',
    playBorder: '1.5px solid #ffa366',
    playShadow: '0 0 24px rgba(255, 107, 0, 0.8), inset 0 1px 1px #fff',
    iconColor: '#ff994d',
    playIconColor: '#ffffff',
    iconFilter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    seekTrackHeight: '14px',
    seekTrackBg: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0 2px, transparent 2px 8px), repeating-linear-gradient(0deg, rgba(255, 107, 0, 0.35) 0 2px, transparent 2px 7px), #08121c',
    seekTrackBorder: '1px solid rgba(255, 107, 0, 0.4)',
    seekTrackRadius: '3px',
    seekBufferBg: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.45) 0 2px, transparent 2px 8px)',
    seekFillBg: 'repeating-linear-gradient(90deg, #ff6b00 0 4px, #ffffff 4px 8px)',
    seekFillShadow: '0 0 12px rgba(255, 107, 0, 0.85)',
    seekThumbStyle: `
      width: 4px !important;
      height: 20px !important;
      border-radius: 1px !important;
      background: #ff6b00 !important;
      border: 1px solid #ffffff !important;
      box-shadow: 0 0 10px #ff6b00, 0 0 16px rgba(255, 107, 0, 0.9) !important;
    `,
    volPillBg: 'linear-gradient(135deg, rgba(15, 35, 54, 0.85) 0%, rgba(8, 18, 28, 0.95) 100%)',
    volPillBorder: '1.5px solid rgba(255, 107, 0, 0.45)',
    volTrackBg: 'repeating-linear-gradient(90deg, rgba(255, 107, 0, 0.25) 0 1.5px, transparent 1.5px 5px), #060e16',
    volTrackBorder: '0.5px solid rgba(255, 107, 0, 0.3)',
    volFillBg: 'repeating-linear-gradient(90deg, #ff6b00 0 1.5px, #ffa366 1.5px 5px)',
    volThumbStyle: 'width: 3px; height: 12px; border-radius: 1px; background: #ffffff; box-shadow: 0 0 6px #ff6b00;',
    dockBackdrop: `
      background-image:
        repeating-linear-gradient(45deg, rgba(255, 107, 0, 0.03) 0 1px, transparent 1px 12px),
        linear-gradient(180deg, rgba(15, 35, 54, 0) 0%, rgba(15, 35, 54, 0.55) 40%, rgba(8, 18, 28, 0.95) 76%, #050c13 100%);
      background-size: 12px 12px, 100% 100%;
      box-shadow: inset 0 -1px 0 rgba(255, 107, 0, 0.3);
    `,
    timeColor: '#ffffff',
    timeFont: "'Chakra Petch', 'Space Grotesk', sans-serif",
    menuBg: 'linear-gradient(145deg, rgba(15, 35, 54, 0.98), rgba(8, 18, 28, 0.99))',
    menuBorder: '1.5px solid rgba(255, 107, 0, 0.45)',
    menuRadius: '10px',
    menuShadow: '0 24px 50px rgba(0, 0, 0, 0.95)',
    menuItemHoverBg: 'rgba(255, 107, 0, 0.2)',
    menuItemHoverColor: '#ffffff',
    captionBg: 'rgba(10, 22, 34, 0.95)',
    captionBorder: '1.25px solid rgba(255, 107, 0, 0.45)',
    captionRadius: '6px',
    captionShadow: '0 4px 18px rgba(0, 0, 0, 0.85)',
    captionColor: '#ffffff',
    captionTextShadow: '0 1px 2px rgba(0, 0, 0, 0.95)',
  },

  // 56. Damascus Steel
  {
    id: 'damascus-steel',
    label: 'Damascus Steel',
    frameBorder: 'rgba(148, 163, 184, 0.3333)',
    frameRadius: '8px',
    frameShadow: '0 25px 65px rgba(0, 0, 0, 0.95), inset 0 0 20px rgba(148, 163, 184, 0.15)',
    btnRadius: '4px',
    btnBg: 'repeating-linear-gradient(45deg, rgba(148, 163, 184, 0.12) 0 2px, transparent 2px 6px), #1e293b',
    btnBorder: '1.5px solid #64748b',
    btnShadow: '0 4px 14px rgba(0, 0, 0, 0.8), inset 0 1px 1px #94a3b8',
    btnHoverBorder: '#cbd5e1',
    btnHoverShadow: '0 0 18px rgba(148, 163, 184, 0.8), inset 0 1px 2px #fff',
    playBg: 'linear-gradient(135deg, #475569 0%, #334155 50%, #0f172a 100%)',
    playBorder: '1.5px solid #cbd5e1',
    playShadow: '0 0 22px rgba(148, 163, 184, 0.75), inset 0 1px 1px #fff',
    iconColor: '#e2e8f0',
    playIconColor: '#ffffff',
    iconFilter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    seekTrackHeight: '12px',
    seekTrackBg: 'repeating-radial-gradient(ellipse at 50% 50%, rgba(148, 163, 184, 0.35) 0 3px, transparent 3px 8px), #0f172a',
    seekTrackBorder: '1px solid #475569',
    seekTrackRadius: '2px',
    seekBufferBg: 'repeating-radial-gradient(ellipse at 50% 50%, rgba(148, 163, 184, 0.5) 0 3px, transparent 3px 8px)',
    seekFillBg: 'linear-gradient(90deg, #64748b 0%, #94a3b8 50%, #e2e8f0 100%)',
    seekFillShadow: '0 0 12px rgba(148, 163, 184, 0.85)',
    seekThumbStyle: `
      width: 14px !important;
      height: 20px !important;
      border-radius: 2px !important;
      background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 20' fill='none'><polygon points='7,0 13,5 13,20 1,20 1,5' fill='%2364748b' stroke='%23e2e8f0' stroke-width='1.2'/><path d='M3 7 C6 8, 8 12, 11 13' stroke='%23ffffff' stroke-width='0.8'/></svg>") center / contain no-repeat !important;
      border: none !important;
      box-shadow: 0 0 10px rgba(148, 163, 184, 0.9) !important;
    `,
    volPillBg: '#1e293b',
    volPillBorder: '1.5px solid #475569',
    volTrackBg: 'repeating-linear-gradient(90deg, rgba(148, 163, 184, 0.25) 0 1.5px, transparent 1.5px 5px), #0b1120',
    volTrackBorder: '0.5px solid #334155',
    volFillBg: 'repeating-linear-gradient(90deg, #e2e8f0 0 1.5px, #64748b 1.5px 5px)',
    volThumbStyle: 'width: 4px; height: 12px; border-radius: 1px; background: #e2e8f0;',
    dockBackdrop: `
      background-image:
        repeating-radial-gradient(ellipse at 50% 50%, rgba(148, 163, 184, 0.04) 0 2px, transparent 2px 8px),
        linear-gradient(180deg, rgba(30, 41, 59, 0) 0%, rgba(30, 41, 59, 0.6) 40%, rgba(15, 23, 42, 0.95) 76%, #0b1120 100%);
      background-size: 24px 24px, 100% 100%;
      box-shadow: inset 0 -1px 0 rgba(148, 163, 184, 0.28);
    `,
    timeColor: '#e2e8f0',
    timeFont: "'Space Mono', monospace",
    menuBg: '#1e293b',
    menuBorder: '1.5px solid #475569',
    menuRadius: '8px',
    menuShadow: '0 24px 50px rgba(0, 0, 0, 0.95)',
    menuItemHoverBg: '#334155',
    menuItemHoverColor: '#ffffff',
    captionBg: '#0f172a',
    captionBorder: '1.25px solid #475569',
    captionRadius: '4px',
    captionShadow: '0 4px 18px rgba(0, 0, 0, 0.85)',
    captionColor: '#e2e8f0',
    captionTextShadow: 'none',
  },

  // 57. Guilloché Grand Feu
  {
    id: 'guilloche-enamel',
    label: 'Guilloché Grand Feu',
    frameBorder: 'rgba(59, 130, 246, 0.3333)',
    frameRadius: '16px',
    frameShadow: '0 25px 65px rgba(0, 0, 0, 0.96), inset 0 0 25px rgba(59, 130, 246, 0.15)',
    btnRadius: '9999px',
    btnBg: 'radial-gradient(circle at 35% 25%, rgba(147, 197, 253, 0.25) 0%, rgba(15, 23, 42, 0.9) 80%)',
    btnBorder: '1.5px solid rgba(59, 130, 246, 0.55)',
    btnShadow: '0 4px 16px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(191, 219, 254, 0.5)',
    btnHoverBorder: '#93c5fd',
    btnHoverShadow: '0 0 20px rgba(59, 130, 246, 0.8), inset 0 1px 2px #fff',
    playBg: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e3a8a 100%)',
    playBorder: '1.5px solid #93c5fd',
    playShadow: '0 0 25px rgba(59, 130, 246, 0.85), inset 0 1px 1px #fff',
    iconColor: '#93c5fd',
    playIconColor: '#ffffff',
    iconFilter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    seekTrackHeight: '12px',
    seekTrackBg: 'repeating-linear-gradient(45deg, rgba(59, 130, 246, 0.3) 0 2px, transparent 2px 6px), repeating-linear-gradient(-45deg, rgba(147, 197, 253, 0.3) 0 2px, transparent 2px 6px), #0a1329',
    seekTrackBorder: '1px solid rgba(59, 130, 246, 0.4)',
    seekTrackRadius: '3px',
    seekBufferBg: 'repeating-linear-gradient(45deg, rgba(59, 130, 246, 0.45) 0 2px, transparent 2px 6px)',
    seekFillBg: 'linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #93c5fd 100%)',
    seekFillShadow: '0 0 14px rgba(59, 130, 246, 0.9)',
    seekThumbStyle: `
      width: 18px !important;
      height: 18px !important;
      border-radius: 9999px !important;
      background: radial-gradient(circle at 35% 35%, #ffffff 0%, #93c5fd 40%, #1d4ed8 100%) !important;
      border: 1.5px solid #ffffff !important;
      box-shadow: 0 0 12px rgba(59, 130, 246, 0.95) !important;
    `,
    volPillBg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.18) 0%, rgba(10, 18, 38, 0.95) 100%)',
    volPillBorder: '1.5px solid rgba(59, 130, 246, 0.45)',
    volTrackBg: 'repeating-linear-gradient(45deg, rgba(59, 130, 246, 0.22) 0 1px, transparent 1px 4px), #070e20',
    volTrackBorder: '0.5px solid rgba(59, 130, 246, 0.3)',
    volFillBg: 'repeating-linear-gradient(90deg, #93c5fd 0 1.5px, #2563eb 1.5px 4px)',
    volThumbStyle: 'width: 3.5px; height: 11px; border-radius: 1px; background: #ffffff; box-shadow: 0 0 6px #3b82f6;',
    dockBackdrop: `
      background-image:
        repeating-linear-gradient(45deg, rgba(59, 130, 246, 0.03) 0 1px, transparent 1px 10px),
        linear-gradient(180deg, rgba(10, 19, 41, 0) 0%, rgba(10, 19, 41, 0.6) 40%, rgba(5, 11, 26, 0.95) 76%, #04091a 100%);
      background-size: 10px 10px, 100% 100%;
      box-shadow: inset 0 -1px 0 rgba(59, 130, 246, 0.28);
    `,
    timeColor: '#93c5fd',
    timeFont: "'Cinzel', serif",
    menuBg: 'linear-gradient(145deg, rgba(15, 26, 54, 0.98), rgba(7, 14, 30, 0.99))',
    menuBorder: '1.5px solid rgba(59, 130, 246, 0.45)',
    menuRadius: '14px',
    menuShadow: '0 24px 50px rgba(0, 0, 0, 0.95)',
    menuItemHoverBg: 'rgba(59, 130, 246, 0.2)',
    menuItemHoverColor: '#93c5fd',
    captionBg: 'rgba(10, 19, 41, 0.95)',
    captionBorder: '1.25px solid rgba(59, 130, 246, 0.45)',
    captionRadius: '6px',
    captionShadow: '0 4px 18px rgba(0, 0, 0, 0.85)',
    captionColor: '#93c5fd',
    captionTextShadow: '0 1px 2px rgba(0, 0, 0, 0.95)',
  },

  // 58. Renaissance Astrolabe
  {
    id: 'astrolabe-celestial',
    label: 'Renaissance Astrolabe',
    frameBorder: 'rgba(45, 212, 191, 0.3333)',
    frameRadius: '14px',
    frameShadow: '0 25px 65px rgba(0, 0, 0, 0.95), inset 0 0 25px rgba(45, 212, 191, 0.12)',
    btnRadius: '9999px',
    btnBg: 'radial-gradient(circle at 35% 25%, rgba(204, 251, 241, 0.22) 0%, rgba(13, 33, 32, 0.9) 80%)',
    btnBorder: '1.5px solid rgba(45, 212, 191, 0.5)',
    btnShadow: '0 4px 16px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(204, 251, 241, 0.4)',
    btnHoverBorder: '#5eead4',
    btnHoverShadow: '0 0 20px rgba(45, 212, 191, 0.8), inset 0 1px 2px #fff',
    playBg: 'linear-gradient(135deg, #0d9488 0%, #0f766e 50%, #115e59 100%)',
    playBorder: '1.5px solid #5eead4',
    playShadow: '0 0 25px rgba(45, 212, 191, 0.85), inset 0 1px 1px #fff',
    iconColor: '#5eead4',
    playIconColor: '#ffffff',
    iconFilter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    seekTrackHeight: '14px',
    seekTrackBg: 'repeating-linear-gradient(90deg, rgba(45, 212, 191, 0.35) 0 1.5px, transparent 1.5px 6px), repeating-linear-gradient(90deg, rgba(212, 175, 55, 0.5) 0 2px, transparent 2px 24px), #081a18',
    seekTrackBorder: '1px solid rgba(45, 212, 191, 0.4)',
    seekTrackRadius: '2px',
    seekBufferBg: 'repeating-linear-gradient(90deg, rgba(45, 212, 191, 0.5) 0 1.5px, transparent 1.5px 6px)',
    seekFillBg: 'linear-gradient(90deg, #0d9488 0%, #2dd4bf 60%, #fef08a 100%)',
    seekFillShadow: '0 0 14px rgba(45, 212, 191, 0.9)',
    seekThumbStyle: `
      width: 20px !important;
      height: 20px !important;
      border-radius: 9999px !important;
      background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'><circle cx='10' cy='10' r='9' stroke='%235eead4' stroke-width='1.5' fill='%23081a18'/><polygon points='10,1 12,8 19,10 12,12 10,19 8,12 1,10 8,8' fill='%23d4af37'/><circle cx='10' cy='10' r='2' fill='%23ffffff'/></svg>") center / contain no-repeat !important;
      border: none !important;
      box-shadow: 0 0 12px rgba(45, 212, 191, 0.95) !important;
    `,
    volPillBg: 'linear-gradient(135deg, rgba(45, 212, 191, 0.16) 0%, rgba(13, 33, 32, 0.95) 100%)',
    volPillBorder: '1.5px solid rgba(45, 212, 191, 0.4)',
    volTrackBg: 'repeating-linear-gradient(90deg, rgba(45, 212, 191, 0.25) 0 1px, transparent 1px 4px), #051211',
    volTrackBorder: '0.5px solid rgba(45, 212, 191, 0.3)',
    volFillBg: 'repeating-linear-gradient(90deg, #5eead4 0 1.5px, #0d9488 1.5px 4px)',
    volThumbStyle: 'width: 3.5px; height: 11px; border-radius: 1px; background: #ffffff; box-shadow: 0 0 6px #2dd4bf;',
    dockBackdrop: `
      background-image:
        repeating-radial-gradient(circle at 50% 120%, rgba(45, 212, 191, 0.04) 0 2px, transparent 2px 16px),
        linear-gradient(180deg, rgba(13, 33, 32, 0) 0%, rgba(13, 33, 32, 0.6) 40%, rgba(7, 20, 19, 0.95) 76%, #051413 100%);
      background-size: 100% 100%;
      box-shadow: inset 0 -1px 0 rgba(45, 212, 191, 0.28);
    `,
    timeColor: '#5eead4',
    timeFont: "'Cinzel', serif",
    menuBg: 'linear-gradient(145deg, rgba(16, 42, 40, 0.98), rgba(8, 22, 21, 0.99))',
    menuBorder: '1.5px solid rgba(45, 212, 191, 0.45)',
    menuRadius: '14px',
    menuShadow: '0 24px 50px rgba(0, 0, 0, 0.95)',
    menuItemHoverBg: 'rgba(45, 212, 191, 0.18)',
    menuItemHoverColor: '#5eead4',
    captionBg: 'rgba(13, 33, 32, 0.95)',
    captionBorder: '1.25px solid rgba(45, 212, 191, 0.45)',
    captionRadius: '6px',
    captionShadow: '0 4px 18px rgba(0, 0, 0, 0.85)',
    captionColor: '#5eead4',
    captionTextShadow: '0 1px 2px rgba(0, 0, 0, 0.95)',
  },

  // 59. Quantum Superposition
  {
    id: 'quantum-computing',
    label: 'Quantum Superposition',
    frameBorder: 'rgba(6, 182, 212, 0.3333)',
    frameRadius: '14px',
    frameShadow: '0 25px 65px rgba(0, 0, 0, 0.96), inset 0 0 25px rgba(6, 182, 212, 0.15)',
    btnRadius: '9999px',
    btnBg: 'radial-gradient(circle at 35% 25%, rgba(6, 182, 212, 0.22) 0%, rgba(13, 9, 33, 0.9) 80%)',
    btnBorder: '1.5px solid rgba(6, 182, 212, 0.5)',
    btnShadow: '0 4px 16px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(103, 232, 249, 0.45)',
    btnHoverBorder: '#67e8f9',
    btnHoverShadow: '0 0 20px rgba(6, 182, 212, 0.8), inset 0 1px 2px #fff',
    playBg: 'linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)',
    playBorder: '1.5px solid #67e8f9',
    playShadow: '0 0 25px rgba(6, 182, 212, 0.85), inset 0 1px 1px #fff',
    iconColor: '#67e8f9',
    playIconColor: '#ffffff',
    iconFilter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    seekTrackHeight: '12px',
    seekTrackBg: 'repeating-linear-gradient(90deg, rgba(6, 182, 212, 0.35) 0 2px, transparent 2px 10px, rgba(139, 92, 246, 0.35) 10px 12px, transparent 12px 20px), #09061a',
    seekTrackBorder: '1px solid rgba(6, 182, 212, 0.4)',
    seekTrackRadius: '3px',
    seekBufferBg: 'repeating-linear-gradient(90deg, rgba(6, 182, 212, 0.5) 0 2px, transparent 2px 10px)',
    seekFillBg: 'linear-gradient(90deg, #0891b2 0%, #8b5cf6 50%, #67e8f9 100%)',
    seekFillShadow: '0 0 14px rgba(6, 182, 212, 0.9)',
    seekThumbStyle: `
      width: 18px !important;
      height: 18px !important;
      border-radius: 9999px !important;
      background: radial-gradient(circle at 35% 35%, #ffffff 0%, #67e8f9 40%, #7c3aed 100%) !important;
      border: 1.5px solid #ffffff !important;
      box-shadow: 0 0 14px rgba(6, 182, 212, 0.95), 0 0 22px rgba(139, 92, 246, 0.8) !important;
    `,
    volPillBg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.16) 0%, rgba(13, 9, 33, 0.95) 100%)',
    volPillBorder: '1.5px solid rgba(6, 182, 212, 0.4)',
    volTrackBg: 'repeating-linear-gradient(90deg, rgba(6, 182, 212, 0.25) 0 1px, transparent 1px 4px), #060410',
    volTrackBorder: '0.5px solid rgba(6, 182, 212, 0.3)',
    volFillBg: 'repeating-linear-gradient(90deg, #67e8f9 0 1.5px, #7c3aed 1.5px 4px)',
    volThumbStyle: 'width: 3.5px; height: 11px; border-radius: 1px; background: #ffffff; box-shadow: 0 0 6px #67e8f9;',
    dockBackdrop: `
      background-image:
        repeating-linear-gradient(90deg, rgba(6, 182, 212, 0.03) 0 1px, transparent 1px 16px),
        linear-gradient(180deg, rgba(13, 9, 33, 0) 0%, rgba(13, 9, 33, 0.6) 40%, rgba(7, 5, 20, 0.95) 76%, #050310 100%);
      background-size: 16px 100%, 100% 100%;
      box-shadow: inset 0 -1px 0 rgba(6, 182, 212, 0.28);
    `,
    timeColor: '#67e8f9',
    timeFont: "'JetBrains Mono', monospace",
    menuBg: 'linear-gradient(145deg, rgba(18, 12, 45, 0.98), rgba(9, 6, 24, 0.99))',
    menuBorder: '1.5px solid rgba(6, 182, 212, 0.45)',
    menuRadius: '14px',
    menuShadow: '0 24px 50px rgba(0, 0, 0, 0.95)',
    menuItemHoverBg: 'rgba(6, 182, 212, 0.18)',
    menuItemHoverColor: '#67e8f9',
    captionBg: 'rgba(13, 9, 33, 0.95)',
    captionBorder: '1.25px solid rgba(6, 182, 212, 0.45)',
    captionRadius: '6px',
    captionShadow: '0 4px 18px rgba(0, 0, 0, 0.85)',
    captionColor: '#67e8f9',
    captionTextShadow: '0 1px 2px rgba(0, 0, 0, 0.95)',
  },

  // 60. Apollo AGC Guidance
  {
    id: 'nasa-apollo-calc',
    label: 'Apollo AGC Guidance',
    frameBorder: 'rgba(74, 222, 128, 0.3333)',
    frameRadius: '4px',
    frameShadow: '0 25px 65px rgba(0, 0, 0, 0.96), inset 0 0 25px rgba(74, 222, 128, 0.12)',
    btnRadius: '2px',
    btnBg: 'linear-gradient(180deg, #1b261e 0%, #0d1510 100%)',
    btnBorder: '1.5px solid rgba(74, 222, 128, 0.55)',
    btnShadow: '0 4px 14px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(134, 239, 172, 0.35)',
    btnHoverBorder: '#86efac',
    btnHoverShadow: '0 0 18px rgba(74, 222, 128, 0.8), inset 0 1px 2px #fff',
    playBg: 'linear-gradient(180deg, #22c55e 0%, #15803d 100%)',
    playBorder: '1.5px solid #86efac',
    playShadow: '0 0 22px rgba(74, 222, 128, 0.85), inset 0 1px 1px #fff',
    iconColor: '#4ade80',
    playIconColor: '#052e16',
    iconFilter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    seekTrackHeight: '14px',
    seekTrackBg: 'repeating-linear-gradient(90deg, rgba(74, 222, 128, 0.35) 0 3px, #031206 3px 5px), #031206',
    seekTrackBorder: '1px solid rgba(74, 222, 128, 0.45)',
    seekTrackRadius: '0px',
    seekBufferBg: 'repeating-linear-gradient(90deg, rgba(74, 222, 128, 0.5) 0 3px, #031206 3px 5px)',
    seekFillBg: 'repeating-linear-gradient(90deg, #4ade80 0 3px, #052e16 3px 5px)',
    seekFillShadow: '0 0 12px rgba(74, 222, 128, 0.9)',
    seekThumbStyle: `
      width: 14px !important;
      height: 18px !important;
      border-radius: 0 !important;
      background: #86efac !important;
      border: 1.5px solid #052e16 !important;
      box-shadow: 0 0 10px #4ade80 !important;
    `,
    volPillBg: '#0d1510',
    volPillBorder: '1.5px solid rgba(74, 222, 128, 0.5)',
    volTrackBg: 'repeating-linear-gradient(90deg, rgba(74, 222, 128, 0.25) 0 1.5px, #040906 1.5px 4px), #040906',
    volTrackBorder: '0.5px solid rgba(74, 222, 128, 0.3)',
    volFillBg: 'repeating-linear-gradient(90deg, #4ade80 0 1.5px, #052e16 1.5px 4px)',
    volThumbStyle: 'width: 3.5px; height: 11px; border-radius: 0; background: #86efac; box-shadow: 0 0 6px #4ade80;',
    dockBackdrop: `
      background-image:
        repeating-linear-gradient(180deg, rgba(74, 222, 128, 0.03) 0 1px, transparent 1px 3px),
        linear-gradient(180deg, rgba(13, 21, 16, 0) 0%, rgba(13, 21, 16, 0.6) 40%, rgba(7, 13, 9, 0.95) 76%, #040806 100%);
      background-size: 100% 3px, 100% 100%;
      box-shadow: inset 0 -1px 0 rgba(74, 222, 128, 0.28);
    `,
    timeColor: '#4ade80',
    timeFont: "'Courier New', monospace",
    menuBg: '#0d1510',
    menuBorder: '1.5px solid rgba(74, 222, 128, 0.5)',
    menuRadius: '2px',
    menuShadow: '0 24px 50px rgba(0, 0, 0, 0.95)',
    menuItemHoverBg: 'rgba(74, 222, 128, 0.2)',
    menuItemHoverColor: '#86efac',
    captionBg: '#040806',
    captionBorder: '1px solid rgba(74, 222, 128, 0.5)',
    captionRadius: '0px',
    captionShadow: '0 4px 18px rgba(0, 0, 0, 0.85)',
    captionColor: '#4ade80',
    captionTextShadow: '0 0 6px rgba(74, 222, 128, 0.8)',
  },

  // 61. Neo-Tokyo Ronin
  {
    id: 'cyber-samurai',
    label: 'Neo-Tokyo Ronin',
    frameBorder: 'rgba(239, 68, 68, 0.3333)',
    frameRadius: '8px',
    frameShadow: '0 25px 65px rgba(0, 0, 0, 0.96), inset 0 0 25px rgba(239, 68, 68, 0.15)',
    btnRadius: '2px',
    btnBg: 'linear-gradient(180deg, #240a12 0%, #120409 100%)',
    btnBorder: '1.5px solid #ef4444',
    btnShadow: '0 4px 14px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(254, 202, 202, 0.3)',
    btnHoverBorder: '#f87171',
    btnHoverShadow: '0 0 18px rgba(239, 68, 68, 0.85), inset 0 1px 2px #fff',
    playBg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #991b1b 100%)',
    playBorder: '1.5px solid #fca5a5',
    playShadow: '0 0 22px rgba(239, 68, 68, 0.85), inset 0 1px 1px #fff',
    iconColor: '#fca5a5',
    playIconColor: '#ffffff',
    iconFilter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    seekTrackHeight: '12px',
    seekTrackBg: 'linear-gradient(180deg, rgba(239, 68, 68, 0.4) 0%, #120409 40%, rgba(255, 255, 255, 0.3) 100%)',
    seekTrackBorder: '1px solid #ef4444',
    seekTrackRadius: '1px',
    seekBufferBg: 'rgba(239, 68, 68, 0.35)',
    seekFillBg: 'linear-gradient(90deg, #991b1b 0%, #ef4444 60%, #ffffff 100%)',
    seekFillShadow: '0 0 14px rgba(239, 68, 68, 0.9)',
    seekThumbStyle: `
      width: 14px !important;
      height: 20px !important;
      border-radius: 1px !important;
      background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 20' fill='none'><polygon points='7,0 13,4 11,20 3,20 1,4' fill='%23ef4444' stroke='%23ffffff' stroke-width='1.2'/><line x1='7' y1='2' x2='7' y2='18' stroke='%23ffffff' stroke-width='1'/></svg>") center / contain no-repeat !important;
      border: none !important;
      box-shadow: 0 0 12px rgba(239, 68, 68, 0.95) !important;
    `,
    volPillBg: '#120409',
    volPillBorder: '1.5px solid #ef4444',
    volTrackBg: 'repeating-linear-gradient(90deg, rgba(239, 68, 68, 0.25) 0 1px, transparent 1px 4px), #080204',
    volTrackBorder: '0.5px solid rgba(239, 68, 68, 0.3)',
    volFillBg: 'repeating-linear-gradient(90deg, #fca5a5 0 1.5px, #ef4444 1.5px 4px)',
    volThumbStyle: 'width: 3.5px; height: 11px; border-radius: 0; background: #ffffff; box-shadow: 0 0 6px #ef4444;',
    dockBackdrop: `
      background-image:
        repeating-linear-gradient(45deg, rgba(239, 68, 68, 0.03) 0 1px, transparent 1px 12px),
        linear-gradient(180deg, rgba(24, 7, 13, 0) 0%, rgba(24, 7, 13, 0.6) 40%, rgba(12, 3, 6, 0.95) 76%, #080204 100%);
      background-size: 12px 12px, 100% 100%;
      box-shadow: inset 0 -1px 0 rgba(239, 68, 68, 0.28);
    `,
    timeColor: '#fca5a5',
    timeFont: "'Chakra Petch', sans-serif",
    menuBg: '#180810',
    menuBorder: '1.5px solid #ef4444',
    menuRadius: '4px',
    menuShadow: '0 24px 50px rgba(0, 0, 0, 0.95)',
    menuItemHoverBg: 'rgba(239, 68, 68, 0.25)',
    menuItemHoverColor: '#ffffff',
    captionBg: '#080204',
    captionBorder: '1px solid #ef4444',
    captionRadius: '0px',
    captionShadow: '0 4px 18px rgba(0, 0, 0, 0.85)',
    captionColor: '#ffffff',
    captionTextShadow: '0 0 6px rgba(239, 68, 68, 0.8)',
  },

  // 62. Voyager Golden Record
  {
    id: 'deep-space-probe',
    label: 'Voyager Golden Record',
    frameBorder: 'rgba(234, 179, 8, 0.3333)',
    frameRadius: '14px',
    frameShadow: '0 25px 65px rgba(0, 0, 0, 0.96), inset 0 0 25px rgba(234, 179, 8, 0.12)',
    btnRadius: '9999px',
    btnBg: 'radial-gradient(circle at 35% 25%, rgba(254, 240, 138, 0.22) 0%, rgba(26, 20, 8, 0.9) 80%)',
    btnBorder: '1.5px solid rgba(234, 179, 8, 0.5)',
    btnShadow: '0 4px 16px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(254, 240, 138, 0.45)',
    btnHoverBorder: '#fef08a',
    btnHoverShadow: '0 0 20px rgba(234, 179, 8, 0.75), inset 0 1px 2px #fff',
    playBg: 'linear-gradient(135deg, #eab308 0%, #ca8a04 50%, #854d0e 100%)',
    playBorder: '1.5px solid #fef08a',
    playShadow: '0 0 25px rgba(234, 179, 8, 0.8), inset 0 1px 1px #fff',
    iconColor: '#fef08a',
    playIconColor: '#ffffff',
    iconFilter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    seekTrackHeight: '12px',
    seekTrackBg: 'repeating-linear-gradient(90deg, rgba(234, 179, 8, 0.35) 0 2px, transparent 2px 8px, rgba(234, 179, 8, 0.6) 8px 10px, transparent 10px 24px), #0a0804',
    seekTrackBorder: '1px solid rgba(234, 179, 8, 0.4)',
    seekTrackRadius: '2px',
    seekBufferBg: 'repeating-linear-gradient(90deg, rgba(234, 179, 8, 0.5) 0 2px, transparent 2px 8px)',
    seekFillBg: 'linear-gradient(90deg, #ca8a04 0%, #eab308 60%, #fef08a 100%)',
    seekFillShadow: '0 0 14px rgba(234, 179, 8, 0.85)',
    seekThumbStyle: `
      width: 20px !important;
      height: 20px !important;
      border-radius: 9999px !important;
      background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'><circle cx='10' cy='10' r='9' stroke='%23fef08a' stroke-width='1.5' fill='%231a1408'/><circle cx='10' cy='10' r='6' stroke='%23eab308' stroke-width='0.75'/><circle cx='10' cy='10' r='3' stroke='%23eab308' stroke-width='0.75'/><circle cx='10' cy='10' r='1.2' fill='%23ffffff'/></svg>") center / contain no-repeat !important;
      border: none !important;
      box-shadow: 0 0 12px rgba(234, 179, 8, 0.95) !important;
    `,
    volPillBg: 'linear-gradient(135deg, rgba(234, 179, 8, 0.16) 0%, rgba(22, 17, 7, 0.95) 100%)',
    volPillBorder: '1.5px solid rgba(234, 179, 8, 0.4)',
    volTrackBg: 'repeating-linear-gradient(90deg, rgba(234, 179, 8, 0.22) 0 1px, transparent 1px 4px), #070503',
    volTrackBorder: '0.5px solid rgba(234, 179, 8, 0.3)',
    volFillBg: 'repeating-linear-gradient(90deg, #fef08a 0 1.5px, #eab308 1.5px 4px)',
    volThumbStyle: 'width: 3.5px; height: 11px; border-radius: 1px; background: #ffffff; box-shadow: 0 0 6px #eab308;',
    dockBackdrop: `
      background-image:
        repeating-radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.04) 0 1px, transparent 1px 12px),
        linear-gradient(180deg, rgba(22, 17, 7, 0) 0%, rgba(22, 17, 7, 0.6) 40%, rgba(12, 9, 4, 0.95) 76%, #080603 100%);
      background-size: 100% 100%;
      box-shadow: inset 0 -1px 0 rgba(234, 179, 8, 0.28);
    `,
    timeColor: '#fef08a',
    timeFont: "'Space Mono', monospace",
    menuBg: 'linear-gradient(145deg, rgba(28, 22, 10, 0.98), rgba(14, 10, 5, 0.99))',
    menuBorder: '1.5px solid rgba(234, 179, 8, 0.45)',
    menuRadius: '12px',
    menuShadow: '0 24px 50px rgba(0, 0, 0, 0.95)',
    menuItemHoverBg: 'rgba(234, 179, 8, 0.18)',
    menuItemHoverColor: '#fef08a',
    captionBg: 'rgba(22, 17, 7, 0.95)',
    captionBorder: '1.25px solid rgba(234, 179, 8, 0.45)',
    captionRadius: '6px',
    captionShadow: '0 4px 18px rgba(0, 0, 0, 0.85)',
    captionColor: '#fef08a',
    captionTextShadow: '0 1px 2px rgba(0, 0, 0, 0.95)',
  },

  // 63. ISS Cupola Observation
  {
    id: 'orbital-habitat',
    label: 'ISS Cupola Observation',
    frameBorder: 'rgba(14, 165, 233, 0.3333)',
    frameRadius: '14px',
    frameShadow: '0 25px 65px rgba(0, 0, 0, 0.96), inset 0 0 25px rgba(14, 165, 233, 0.12)',
    btnRadius: '10px',
    btnBg: 'radial-gradient(circle at 35% 25%, rgba(186, 230, 253, 0.22) 0%, rgba(8, 25, 45, 0.9) 80%)',
    btnBorder: '1.5px solid rgba(14, 165, 233, 0.5)',
    btnShadow: '0 4px 16px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(186, 230, 253, 0.45)',
    btnHoverBorder: '#38bdf8',
    btnHoverShadow: '0 0 20px rgba(14, 165, 233, 0.8), inset 0 1px 2px #fff',
    playBg: 'linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #075985 100%)',
    playBorder: '1.5px solid #38bdf8',
    playShadow: '0 0 25px rgba(14, 165, 233, 0.85), inset 0 1px 1px #fff',
    iconColor: '#38bdf8',
    playIconColor: '#ffffff',
    iconFilter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    seekTrackHeight: '12px',
    seekTrackBg: 'repeating-linear-gradient(90deg, rgba(14, 165, 233, 0.35) 0 2px, transparent 2px 12px), #04101e',
    seekTrackBorder: '1px solid rgba(14, 165, 233, 0.4)',
    seekTrackRadius: '2px',
    seekBufferBg: 'repeating-linear-gradient(90deg, rgba(14, 165, 233, 0.5) 0 2px, transparent 2px 12px)',
    seekFillBg: 'linear-gradient(90deg, #0284c7 0%, #38bdf8 60%, #ffffff 100%)',
    seekFillShadow: '0 0 14px rgba(14, 165, 233, 0.9)',
    seekThumbStyle: `
      width: 18px !important;
      height: 18px !important;
      border-radius: 9999px !important;
      background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18' fill='none'><circle cx='9' cy='9' r='8' stroke='%2338bdf8' stroke-width='1.5' fill='%2304101e'/><polygon points='9,2 15,5.5 15,12.5 9,16 3,12.5 3,5.5' stroke='%23ffffff' stroke-width='0.8'/><circle cx='9' cy='9' r='1.5' fill='%2338bdf8'/></svg>") center / contain no-repeat !important;
      border: none !important;
      box-shadow: 0 0 12px rgba(14, 165, 233, 0.95) !important;
    `,
    volPillBg: 'linear-gradient(135deg, rgba(14, 165, 233, 0.16) 0%, rgba(8, 25, 45, 0.95) 100%)',
    volPillBorder: '1.5px solid rgba(14, 165, 233, 0.4)',
    volTrackBg: 'repeating-linear-gradient(90deg, rgba(14, 165, 233, 0.22) 0 1px, transparent 1px 4px), #030b15',
    volTrackBorder: '0.5px solid rgba(14, 165, 233, 0.3)',
    volFillBg: 'repeating-linear-gradient(90deg, #38bdf8 0 1.5px, #0284c7 1.5px 4px)',
    volThumbStyle: 'width: 3.5px; height: 11px; border-radius: 1px; background: #ffffff; box-shadow: 0 0 6px #38bdf8;',
    dockBackdrop: `
      background-image:
        repeating-linear-gradient(90deg, rgba(14, 165, 233, 0.03) 0 1px, transparent 1px 20px),
        linear-gradient(180deg, rgba(6, 20, 36, 0) 0%, rgba(6, 20, 36, 0.6) 40%, rgba(3, 10, 18, 0.95) 76%, #02070d 100%);
      background-size: 20px 100%, 100% 100%;
      box-shadow: inset 0 -1px 0 rgba(14, 165, 233, 0.28);
    `,
    timeColor: '#38bdf8',
    timeFont: "'Chakra Petch', sans-serif",
    menuBg: 'linear-gradient(145deg, rgba(8, 26, 48, 0.98), rgba(4, 13, 24, 0.99))',
    menuBorder: '1.5px solid rgba(14, 165, 233, 0.45)',
    menuRadius: '12px',
    menuShadow: '0 24px 50px rgba(0, 0, 0, 0.95)',
    menuItemHoverBg: 'rgba(14, 165, 233, 0.18)',
    menuItemHoverColor: '#38bdf8',
    captionBg: 'rgba(6, 20, 36, 0.95)',
    captionBorder: '1.25px solid rgba(14, 165, 233, 0.45)',
    captionRadius: '6px',
    captionShadow: '0 4px 18px rgba(0, 0, 0, 0.85)',
    captionColor: '#38bdf8',
    captionTextShadow: '0 1px 2px rgba(0, 0, 0, 0.95)',
  },

  // 64. Arrakis Desert Dune
  {
    id: 'dune-spice-spice',
    label: 'Arrakis Desert Dune',
    frameBorder: 'rgba(245, 158, 11, 0.3333)',
    frameRadius: '12px',
    frameShadow: '0 25px 65px rgba(0, 0, 0, 0.95), inset 0 0 25px rgba(245, 158, 11, 0.12)',
    btnRadius: '8px',
    btnBg: 'radial-gradient(circle at 35% 25%, rgba(254, 215, 170, 0.22) 0%, rgba(30, 16, 6, 0.9) 80%)',
    btnBorder: '1.5px solid rgba(245, 158, 11, 0.5)',
    btnShadow: '0 4px 14px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(254, 215, 170, 0.45)',
    btnHoverBorder: '#fde68a',
    btnHoverShadow: '0 0 18px rgba(245, 158, 11, 0.75), inset 0 1px 2px #fff',
    playBg: 'linear-gradient(135deg, #d97706 0%, #b45309 50%, #78350f 100%)',
    playBorder: '1.5px solid #fde68a',
    playShadow: '0 0 22px rgba(245, 158, 11, 0.8), inset 0 1px 1px #fff',
    iconColor: '#fde68a',
    playIconColor: '#ffffff',
    iconFilter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    seekTrackHeight: '12px',
    seekTrackBg: 'repeating-linear-gradient(65deg, rgba(245, 158, 11, 0.35) 0 2px, transparent 2px 10px), #1c1005',
    seekTrackBorder: '1px solid rgba(245, 158, 11, 0.4)',
    seekTrackRadius: '3px',
    seekBufferBg: 'repeating-linear-gradient(65deg, rgba(245, 158, 11, 0.5) 0 2px, transparent 2px 10px)',
    seekFillBg: 'linear-gradient(90deg, #b45309 0%, #f59e0b 60%, #fef08a 100%)',
    seekFillShadow: '0 0 14px rgba(245, 158, 11, 0.9)',
    seekThumbStyle: `
      width: 14px !important;
      height: 20px !important;
      border-radius: 2px !important;
      background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 20' fill='none'><path d='M7 0 C11 5, 12 14, 7 20 C2 14, 3 5, 7 0 Z' fill='%23f59e0b' stroke='%23fef08a' stroke-width='1.2'/><line x1='7' y1='2' x2='7' y2='18' stroke='%23ffffff' stroke-width='0.8'/></svg>") center / contain no-repeat !important;
      border: none !important;
      box-shadow: 0 0 12px rgba(245, 158, 11, 0.95) !important;
    `,
    volPillBg: 'linear-gradient(135deg, rgba(245, 158, 11, 0.16) 0%, rgba(26, 14, 5, 0.95) 100%)',
    volPillBorder: '1.5px solid rgba(245, 158, 11, 0.4)',
    volTrackBg: 'repeating-linear-gradient(65deg, rgba(245, 158, 11, 0.22) 0 1px, transparent 1px 4px), #100802',
    volTrackBorder: '0.5px solid rgba(245, 158, 11, 0.3)',
    volFillBg: 'repeating-linear-gradient(90deg, #fde68a 0 1.5px, #d97706 1.5px 4px)',
    volThumbStyle: 'width: 3.5px; height: 11px; border-radius: 1px; background: #ffffff; box-shadow: 0 0 6px #f59e0b;',
    dockBackdrop: `
      background-image:
        repeating-linear-gradient(65deg, rgba(245, 158, 11, 0.03) 0 1px, transparent 1px 16px),
        linear-gradient(180deg, rgba(24, 13, 5, 0) 0%, rgba(24, 13, 5, 0.6) 40%, rgba(13, 7, 2, 0.95) 76%, #0a0502 100%);
      background-size: 16px 16px, 100% 100%;
      box-shadow: inset 0 -1px 0 rgba(245, 158, 11, 0.28);
    `,
    timeColor: '#fde68a',
    timeFont: "'Cinzel', serif",
    menuBg: 'linear-gradient(145deg, rgba(32, 17, 7, 0.98), rgba(16, 8, 3, 0.99))',
    menuBorder: '1.5px solid rgba(245, 158, 11, 0.45)',
    menuRadius: '12px',
    menuShadow: '0 24px 50px rgba(0, 0, 0, 0.95)',
    menuItemHoverBg: 'rgba(245, 158, 11, 0.18)',
    menuItemHoverColor: '#fde68a',
    captionBg: 'rgba(24, 13, 5, 0.95)',
    captionBorder: '1.25px solid rgba(245, 158, 11, 0.45)',
    captionRadius: '6px',
    captionShadow: '0 4px 18px rgba(0, 0, 0, 0.85)',
    captionColor: '#fde68a',
    captionTextShadow: '0 1px 2px rgba(0, 0, 0, 0.95)',
  },

  // 65. Kilauea Pyroclastic
  {
    id: 'volcanic-obsidian',
    label: 'Kilauea Pyroclastic',
    frameBorder: 'rgba(239, 68, 68, 0.3333)',
    frameRadius: '10px',
    frameShadow: '0 25px 65px rgba(0, 0, 0, 0.96), inset 0 0 25px rgba(239, 68, 68, 0.15)',
    btnRadius: '4px',
    btnBg: 'radial-gradient(circle at 35% 25%, rgba(239, 68, 68, 0.25) 0%, rgba(22, 6, 6, 0.9) 80%)',
    btnBorder: '1.5px solid #ef4444',
    btnShadow: '0 4px 14px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(254, 202, 202, 0.4)',
    btnHoverBorder: '#f87171',
    btnHoverShadow: '0 0 18px rgba(239, 68, 68, 0.85), inset 0 1px 2px #fff',
    playBg: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 50%, #7f1d1d 100%)',
    playBorder: '1.5px solid #fca5a5',
    playShadow: '0 0 22px rgba(239, 68, 68, 0.85), inset 0 1px 1px #fff',
    iconColor: '#fca5a5',
    playIconColor: '#ffffff',
    iconFilter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    seekTrackHeight: '12px',
    seekTrackBg: 'repeating-linear-gradient(45deg, rgba(239, 68, 68, 0.4) 0 3px, #120404 3px 9px), #120404',
    seekTrackBorder: '1px solid #ef4444',
    seekTrackRadius: '2px',
    seekBufferBg: 'repeating-linear-gradient(45deg, rgba(239, 68, 68, 0.55) 0 3px, transparent 3px 9px)',
    seekFillBg: 'linear-gradient(90deg, #991b1b 0%, #ef4444 50%, #fef08a 100%)',
    seekFillShadow: '0 0 14px rgba(239, 68, 68, 0.9)',
    seekThumbStyle: `
      width: 14px !important;
      height: 20px !important;
      border-radius: 2px !important;
      background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 20' fill='none'><polygon points='7,0 13,6 10,20 4,20 1,6' fill='%23ef4444' stroke='%23fef08a' stroke-width='1.2'/><polygon points='7,3 10,8 8,17 6,17 4,8' fill='%23fef08a'/></svg>") center / contain no-repeat !important;
      border: none !important;
      box-shadow: 0 0 12px rgba(239, 68, 68, 0.95) !important;
    `,
    volPillBg: '#160606',
    volPillBorder: '1.5px solid #ef4444',
    volTrackBg: 'repeating-linear-gradient(45deg, rgba(239, 68, 68, 0.25) 0 1.5px, transparent 1.5px 5px), #0a0202',
    volTrackBorder: '0.5px solid rgba(239, 68, 68, 0.3)',
    volFillBg: 'repeating-linear-gradient(90deg, #fef08a 0 1.5px, #ef4444 1.5px 5px)',
    volThumbStyle: 'width: 3.5px; height: 11px; border-radius: 1px; background: #ffffff; box-shadow: 0 0 6px #ef4444;',
    dockBackdrop: `
      background-image:
        repeating-linear-gradient(45deg, rgba(239, 68, 68, 0.03) 0 1px, transparent 1px 12px),
        linear-gradient(180deg, rgba(22, 6, 6, 0) 0%, rgba(22, 6, 6, 0.6) 40%, rgba(12, 3, 3, 0.95) 76%, #080202 100%);
      background-size: 12px 12px, 100% 100%;
      box-shadow: inset 0 -1px 0 rgba(239, 68, 68, 0.28);
    `,
    timeColor: '#fca5a5',
    timeFont: "'Chakra Petch', sans-serif",
    menuBg: '#180606',
    menuBorder: '1.5px solid #ef4444',
    menuRadius: '4px',
    menuShadow: '0 24px 50px rgba(0, 0, 0, 0.95)',
    menuItemHoverBg: 'rgba(239, 68, 68, 0.25)',
    menuItemHoverColor: '#ffffff',
    captionBg: '#0a0202',
    captionBorder: '1px solid #ef4444',
    captionRadius: '0px',
    captionShadow: '0 4px 18px rgba(0, 0, 0, 0.85)',
    captionColor: '#ffffff',
    captionTextShadow: '0 0 6px rgba(239, 68, 68, 0.8)',
  },

  // 66. Bioluminescent Fungi
  {
    id: 'biolum-mycelium',
    label: 'Bioluminescent Fungi',
    frameBorder: 'rgba(16, 185, 129, 0.3333)',
    frameRadius: '14px',
    frameShadow: '0 25px 65px rgba(0, 0, 0, 0.96), inset 0 0 25px rgba(16, 185, 129, 0.15)',
    btnRadius: '9999px',
    btnBg: 'radial-gradient(circle at 35% 25%, rgba(16, 185, 129, 0.25) 0%, rgba(4, 22, 14, 0.9) 80%)',
    btnBorder: '1.5px solid rgba(16, 185, 129, 0.55)',
    btnShadow: '0 4px 16px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(167, 243, 208, 0.5)',
    btnHoverBorder: '#a7f3d0',
    btnHoverShadow: '0 0 20px rgba(16, 185, 129, 0.8), inset 0 1px 2px #fff',
    playBg: 'linear-gradient(135deg, #059669 0%, #047857 50%, #064e3b 100%)',
    playBorder: '1.5px solid #a7f3d0',
    playShadow: '0 0 25px rgba(16, 185, 129, 0.85), inset 0 1px 1px #fff',
    iconColor: '#6ee7b7',
    playIconColor: '#ffffff',
    iconFilter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))',
    seekTrackHeight: '12px',
    seekTrackBg: 'radial-gradient(circle 2px at center, rgba(16, 185, 129, 0.5) 2px, transparent 2.5px) 0 0 / 12px 12px, #05140d',
    seekTrackBorder: '1px solid rgba(16, 185, 129, 0.4)',
    seekTrackRadius: '3px',
    seekBufferBg: 'radial-gradient(circle 2px at center, rgba(16, 185, 129, 0.65) 2px, transparent 2.5px) 0 0 / 12px 12px',
    seekFillBg: 'linear-gradient(90deg, #059669 0%, #10b981 60%, #a7f3d0 100%)',
    seekFillShadow: '0 0 14px rgba(16, 185, 129, 0.9)',
    seekThumbStyle: `
      width: 20px !important;
      height: 20px !important;
      border-radius: 9999px !important;
      background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'><path d='M3 13 C3 7, 7 3, 10 3 C13 3, 17 7, 17 13 Z' fill='%2310b981' stroke='%23a7f3d0' stroke-width='1.2'/><rect x='8.5' y='13' width='3' height='5' rx='1.5' fill='%23059669'/><circle cx='7' cy='8' r='1.2' fill='%23ffffff'/><circle cx='13' cy='8' r='1.2' fill='%23ffffff'/></svg>") center / contain no-repeat !important;
      border: none !important;
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.95) !important;
    `,
    volPillBg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(4, 22, 14, 0.95) 100%)',
    volPillBorder: '1.5px solid rgba(16, 185, 129, 0.4)',
    volTrackBg: 'repeating-linear-gradient(90deg, rgba(16, 185, 129, 0.25) 0 1px, transparent 1px 4px), #020d08',
    volTrackBorder: '0.5px solid rgba(16, 185, 129, 0.3)',
    volFillBg: 'repeating-linear-gradient(90deg, #a7f3d0 0 1.5px, #10b981 1.5px 4px)',
    volThumbStyle: 'width: 3.5px; height: 11px; border-radius: 1px; background: #ffffff; box-shadow: 0 0 6px #10b981;',
    dockBackdrop: `
      background-image:
        radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.04) 1px, transparent 1px),
        linear-gradient(180deg, rgba(4, 22, 14, 0) 0%, rgba(4, 22, 14, 0.6) 40%, rgba(2, 11, 7, 0.95) 76%, #010604 100%);
      background-size: 16px 16px, 100% 100%;
      box-shadow: inset 0 -1px 0 rgba(16, 185, 129, 0.28);
    `,
    timeColor: '#6ee7b7',
    timeFont: "'Zen Kaku Gothic New', sans-serif",
    menuBg: 'linear-gradient(145deg, rgba(6, 30, 20, 0.98), rgba(3, 14, 9, 0.99))',
    menuBorder: '1.5px solid rgba(16, 185, 129, 0.45)',
    menuRadius: '14px',
    menuShadow: '0 24px 50px rgba(0, 0, 0, 0.95)',
    menuItemHoverBg: 'rgba(16, 185, 129, 0.18)',
    menuItemHoverColor: '#a7f3d0',
    captionBg: 'rgba(4, 22, 14, 0.95)',
    captionBorder: '1.25px solid rgba(16, 185, 129, 0.45)',
    captionRadius: '6px',
    captionShadow: '0 4px 18px rgba(0, 0, 0, 0.85)',
    captionColor: '#6ee7b7',
    captionTextShadow: '0 1px 2px rgba(0, 0, 0, 0.95)',
  },
];
