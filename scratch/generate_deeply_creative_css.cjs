/**
 * Generator script for 50 truly creative, structural, visually unbelievable themes.
 * Every theme features:
 * - Bespoke seekbar track & fill pattern (gears, ticks, film sprockets, waveforms, constellations, grids, etc.)
 * - Bespoke thumb playhead (custom SVG data URIs, needles, diamonds, prisms, blocks, etc.)
 * - Bespoke volume pill & track (decibel meters, crescendo ladders, notch rulers)
 * - Bespoke bottom bar dock backdrop ::before (mesh, scanlines, grids, star maps, acoustic baffles)
 * - Bespoke buttons & hover animations
 */

const fs = require('fs');

// We will build a modular catalog of all 50 creative themes
const CREATIVE_THEMES = [];

// Helper to register a theme
function addTheme(t) {
  CREATIVE_THEMES.push(t);
}

// 51. Tourbillon Skeleton
addTheme({
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
  // Creative Seekbar: Watchmaker gear rack teeth
  seekTrackHeight: '7px',
  seekTrackBg: 'repeating-linear-gradient(90deg, rgba(212, 175, 55, 0.22) 0 2px, transparent 2px 7px), #14100a',
  seekTrackBorder: '1px solid rgba(212, 175, 55, 0.4)',
  seekTrackRadius: '2px',
  seekBufferBg: 'repeating-linear-gradient(90deg, rgba(212, 175, 55, 0.45) 0 2px, transparent 2px 7px)',
  seekFillBg: 'repeating-linear-gradient(90deg, #fef08a 0 2px, #d4af37 2px 7px)',
  seekFillShadow: '0 0 12px rgba(212, 175, 55, 0.85)',
  // Thumb: Golden mechanical watch hand with ruby jewel pivot SVG
  seekThumbStyle: `
    width: 14px !important;
    height: 18px !important;
    border-radius: 2px !important;
    background: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 18' fill='none'><polygon points='7,0 13,5 13,18 1,18 1,5' fill='%23d4af37' stroke='%23fef08a' stroke-width='1'/><circle cx='7' cy='11' r='3.5' fill='%23b91c1c' stroke='%23ffffff' stroke-width='0.75'/><circle cx='7' cy='11' r='1.2' fill='%23ffffff'/></svg>") center / contain no-repeat !important;
    border: none !important;
    box-shadow: 0 0 12px rgba(212, 175, 55, 0.9) !important;
  `,
  // Vol Pill & Track: 5-minute watch dial graduations
  volPillBg: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(20, 14, 8, 0.9) 100%)',
  volPillBorder: '1.5px solid rgba(212, 175, 55, 0.45)',
  volTrackBg: 'repeating-linear-gradient(90deg, rgba(212, 175, 55, 0.25) 0 1px, transparent 1px 5px), #0f0a05',
  volTrackBorder: '0.5px solid rgba(212, 175, 55, 0.3)',
  volFillBg: 'repeating-linear-gradient(90deg, #fef08a 0 1.5px, #d4af37 1.5px 5px)',
  volThumbStyle: 'width: 3px; height: 12px; border-radius: 1px; background: #ffffff; box-shadow: 0 0 6px #d4af37;',
  // Dock backdrop: guilloche rose-engine gearing watermark
  dockBackdrop: `
    background-image:
      repeating-radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.05) 0 1px, transparent 1px 6px),
      repeating-linear-gradient(45deg, rgba(212, 175, 55, 0.03) 0 1px, transparent 1px 12px),
      linear-gradient(180deg, rgba(16, 12, 8, 0) 0%, rgba(16, 12, 8, 0.6) 40%, #0d0905 100%);
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
});

console.log('Sample creative theme added:', CREATIVE_THEMES.length);
