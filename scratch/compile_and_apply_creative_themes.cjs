const fs = require('fs');
const path = require('path');

const part1 = require('./creative_themes_part1.cjs');
const part2 = require('./creative_themes_part2.cjs');
const part3 = require('./creative_themes_part3.cjs');
const part4 = require('./creative_themes_part4.cjs');

const allThemes = [...part1, ...part2, ...part3, ...part4];
console.log('Total creative themes loaded:', allThemes.length);

// 50-bar relative heights from Image 1
const H50 = [
  0.302, 0.605, 0.302, 0.209, 0.395, 0.767, 0.465, 0.209, 0.209, 0.209,
  1.0,   0.535, 0.209, 0.721, 0.535, 0.302, 0.163, 0.163, 0.442, 1.0,
  0.791, 0.14,  0.256, 0.581, 0.209, 0.163, 1.0,   0.674, 0.907, 0.163,
  0.395, 0.442, 0.163, 0.163, 1.0,   0.907, 0.535, 0.837, 0.163, 0.279,
  0.163, 0.628, 0.349, 0.814, 0.14,  0.279, 0.163, 0.488, 0.163, 0.163
];

function generateSeekbarMask(step = 6.0, barW = 1.4, totalH = 9.0, rx = 0.7) {
  const totalW = step * H50.length;
  let rects = '';
  for (let i = 0; i < H50.length; i++) {
    const rel = H50[i];
    const minH = 1.6;
    const bh = Math.max(minH, Math.round((minH + rel * (totalH - minH)) * 10) / 10);
    const by = Math.round(((totalH - bh) / 2) * 10) / 10;
    const bx = Math.round((i * step + (step - barW) / 2) * 10) / 10;
    rects += `<rect x='${bx}' y='${by}' width='${barW}' height='${bh}' rx='${rx}' fill='white'/>`;
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${totalW.toFixed(1)} ${totalH.toFixed(1)}' width='${totalW.toFixed(1)}' height='${totalH.toFixed(1)}'>${rects}</svg>`;
  return {
    svg,
    dataUri: 'data:image/svg+xml,' + encodeURIComponent(svg),
    width: totalW,
    height: totalH
  };
}

function generateVolumeMask(width = 65.0, totalH = 9.0, barW = 1.4, numBars = 13, rx = 0.7) {
  const step = width / numBars;
  let rects = '';
  for (let i = 0; i < numBars; i++) {
    const t = i / (numBars - 1);
    const curve = Math.pow(t, 1.15);
    const minH = 1.8;
    const bh = Math.round((minH + curve * (totalH - minH)) * 10) / 10;
    const by = Math.round(((totalH - bh) / 2) * 10) / 10;
    const bx = Math.round((i * step + (step - barW) / 2) * 10) / 10;
    rects += `<rect x='${bx}' y='${by}' width='${barW}' height='${bh}' rx='${rx}' fill='white'/>`;
  }
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width.toFixed(1)} ${totalH.toFixed(1)}' width='${width.toFixed(1)}' height='${totalH.toFixed(1)}'>${rects}</svg>`;
  return {
    svg,
    dataUri: 'data:image/svg+xml,' + encodeURIComponent(svg),
    width,
    height: totalH
  };
}

const seekMask = generateSeekbarMask(6.0, 1.4, 9.0, 0.7);
const volMask = generateVolumeMask(65.0, 9.0, 1.4, 13, 0.7);

// Audio waveform configs for specific themes
const waveformThemes = {
  'spectral-analyzer': {
    track: 'rgba(56, 189, 248, 0.35)',
    fill: 'linear-gradient(90deg, #0284c7 0%, #38bdf8 60%, #67e8f9 100%)',
    glow: 'rgba(56, 189, 248, 0.85)'
  },
  'modular-synth': {
    track: 'rgba(234, 179, 8, 0.35)',
    fill: 'linear-gradient(90deg, #ca8a04 0%, #eab308 50%, #38bdf8 100%)',
    glow: 'rgba(234, 179, 8, 0.85)'
  },
  'reel-to-reel': {
    track: 'rgba(217, 119, 6, 0.35)',
    fill: 'linear-gradient(90deg, #b45309 0%, #f59e0b 60%, #fed7aa 100%)',
    glow: 'rgba(245, 158, 11, 0.85)'
  },
  'analog-tube-amp': {
    track: 'rgba(249, 115, 22, 0.35)',
    fill: 'linear-gradient(90deg, #c2410c 0%, #f97316 60%, #ffedd5 100%)',
    glow: 'rgba(249, 115, 22, 0.85)'
  },
  'acid-techno-303': {
    track: 'rgba(234, 179, 8, 0.35)',
    fill: 'linear-gradient(90deg, #eab308 0%, #84cc16 50%, #22c55e 100%)',
    glow: 'rgba(132, 204, 22, 0.85)'
  },
  'synth-matrix-green': {
    track: 'rgba(34, 197, 94, 0.35)',
    fill: 'linear-gradient(90deg, #15803d 0%, #22c55e 60%, #86efac 100%)',
    glow: 'rgba(34, 197, 94, 0.85)'
  }
};

function generateThemeCss(theme) {
  // CORRECT DOCK BACKDROP RULE:
  // Must cover entire dock height behind all controls (z-index: -1), no top: 0 pinning cutoff!
  const dockOverlayRule = theme.dockBackdrop ? `
.preview-player[data-theme="${theme.id}"] .media-skin [data-part="bottom-controls-bar"]:not(.static\\!)::before,
:root[data-theme="${theme.id}"] .media-skin [data-part="bottom-controls-bar"]:not(.static\\!)::before,
:where(.media-skin)[data-theme="${theme.id}"] [data-part="bottom-controls-bar"]:not(.static\\!)::before {
  content: "" !important;
  position: absolute !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  top: 0 !important;
  height: 100% !important;
  max-height: none !important;
  pointer-events: none !important;
  border-radius: inherit !important;
  z-index: -1 !important;
  opacity: 0.92 !important;
  background-color: transparent !important;
  ${theme.dockBackdrop}
}
` : '';

  // Check if theme uses SVG audio waveform (Image 1 & Image 0)
  const wf = waveformThemes[theme.id];
  let waveformRules = '';
  if (wf) {
    waveformRules = `
.preview-player[data-theme="${theme.id}"] div[class*="media-slider-smooth"][class*="isolate"],
:root[data-theme="${theme.id}"] div[class*="media-slider-smooth"][class*="isolate"],
:where(.media-skin)[data-theme="${theme.id}"] div[class*="media-slider-smooth"][class*="isolate"] {
  height: ${seekMask.height.toFixed(1)}px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  border-radius: 0 !important;
  background: ${wf.track} !important;
  border: none !important;
  box-shadow: none !important;
  mask-image: url("${seekMask.dataUri}") !important;
  -webkit-mask-image: url("${seekMask.dataUri}") !important;
  mask-repeat: repeat-x !important;
  -webkit-mask-repeat: repeat-x !important;
  mask-size: ${seekMask.width.toFixed(1)}px ${seekMask.height.toFixed(1)}px !important;
  -webkit-mask-size: ${seekMask.width.toFixed(1)}px ${seekMask.height.toFixed(1)}px !important;
}

.preview-player[data-theme="${theme.id}"] div[class*="clip-media-x-[--media-slider-fill]"],
:root[data-theme="${theme.id}"] div[class*="clip-media-x-[--media-slider-fill]"],
:where(.media-skin)[data-theme="${theme.id}"] div[class*="clip-media-x-[--media-slider-fill]"] {
  border-radius: 0 !important;
  background: ${wf.fill} !important;
  box-shadow: 0 0 8px ${wf.glow} !important;
  opacity: 1 !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/slider .media-thumb-smooth,
:root[data-theme="${theme.id}"] .group\\/slider .media-thumb-smooth,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/slider .media-thumb-smooth {
  width: 2.5px !important;
  height: 16px !important;
  top: 50% !important;
  transform: none !important;
  border-radius: 1px !important;
  background: #ffffff !important;
  border: none !important;
  box-shadow: 0 0 8px ${wf.glow}, 0 1px 3px rgba(0, 0, 0, 0.7) !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/slider .media-thumb-smooth::before,
.preview-player[data-theme="${theme.id}"] .group\\/slider .media-thumb-smooth::after,
:root[data-theme="${theme.id}"] .group\\/slider .media-thumb-smooth::before,
:root[data-theme="${theme.id}"] .group\\/slider .media-thumb-smooth::after,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/slider .media-thumb-smooth::before,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/slider .media-thumb-smooth::after {
  display: none !important;
  content: none !important;
}

.preview-player[data-theme="${theme.id}"] .horizontal-volume-slider div[class*="rounded-full"][class*="w-"],
:root[data-theme="${theme.id}"] .horizontal-volume-slider div[class*="rounded-full"][class*="w-"],
:where(.media-skin)[data-theme="${theme.id}"] .horizontal-volume-slider div[class*="rounded-full"][class*="w-"] {
  height: ${volMask.height.toFixed(1)}px !important;
  top: auto !important;
  transform: none !important;
  border-radius: 0 !important;
  background: ${wf.track} !important;
  border: none !important;
  box-shadow: none !important;
  mask-image: url("${volMask.dataUri}") !important;
  -webkit-mask-image: url("${volMask.dataUri}") !important;
  mask-repeat: no-repeat !important;
  -webkit-mask-repeat: no-repeat !important;
  mask-size: ${volMask.width.toFixed(1)}px ${volMask.height.toFixed(1)}px !important;
  -webkit-mask-size: ${volMask.width.toFixed(1)}px ${volMask.height.toFixed(1)}px !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/vol-pill div[class*="bg-white/90"],
:root[data-theme="${theme.id}"] .group\\/vol-pill div[class*="bg-white/90"],
:where(.media-skin)[data-theme="${theme.id}"] .group\\/vol-pill div[class*="bg-white/90"] {
  border-radius: 0 !important;
  background: ${wf.fill} !important;
  box-shadow: 0 0 6px ${wf.glow} !important;
}

.preview-player[data-theme="${theme.id}"] .volume-slider-thumb,
:root[data-theme="${theme.id}"] .volume-slider-thumb,
:where(.media-skin)[data-theme="${theme.id}"] .volume-slider-thumb {
  width: 2.5px !important;
  height: 14px !important;
  top: 50% !important;
  transform: none !important;
  border-radius: 1px !important;
  background: #ffffff !important;
  border: none !important;
  box-shadow: 0 0 6px ${wf.glow}, 0 1px 3px rgba(0, 0, 0, 0.6) !important;
}

.preview-player[data-theme="${theme.id}"] .volume-slider-thumb::before,
.preview-player[data-theme="${theme.id}"] .volume-slider-thumb::after,
:root[data-theme="${theme.id}"] .volume-slider-thumb::before,
:root[data-theme="${theme.id}"] .volume-slider-thumb::after,
:where(.media-skin)[data-theme="${theme.id}"] .volume-slider-thumb::before,
:where(.media-skin)[data-theme="${theme.id}"] .volume-slider-thumb::after {
  display: none !important;
  content: none !important;
}
`;
  }

  return `
/* ==========================================================================
   THEME: ${theme.label} (${theme.id})
   ========================================================================== */
.preview-player[data-theme="${theme.id}"],
.preview-player[data-theme="${theme.id}"] .media-skin,
:root[data-theme="${theme.id}"] .media-skin,
:where(.media-skin)[data-theme="${theme.id}"] {
  border-radius: ${theme.frameRadius} !important;
}

.preview-player[data-theme="${theme.id}"] .media-skin,
:root[data-theme="${theme.id}"] .media-skin,
:where(.media-skin)[data-theme="${theme.id}"] {
  border: 1.5px solid ${theme.frameBorder} !important;
  box-shadow: ${theme.frameShadow} !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/liquid-btn,
.preview-player[data-theme="${theme.id}"] .group\\/center-buffering button,
.preview-player[data-theme="${theme.id}"] [data-slot="control"],
.preview-player[data-theme="${theme.id}"] .media-fullscreen-button,
:root[data-theme="${theme.id}"] .group\\/liquid-btn,
:root[data-theme="${theme.id}"] [data-slot="control"],
:root[data-theme="${theme.id}"] .media-fullscreen-button,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/liquid-btn,
:where(.media-skin)[data-theme="${theme.id}"] [data-slot="control"],
:where(.media-skin)[data-theme="${theme.id}"] .media-fullscreen-button {
  border-radius: ${theme.btnRadius} !important;
  background: ${theme.btnBg} !important;
  border: ${theme.btnBorder} !important;
  box-shadow: ${theme.btnShadow} !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/liquid-btn:hover,
.preview-player[data-theme="${theme.id}"] .group\\/center-buffering button:hover,
.preview-player[data-theme="${theme.id}"] [data-slot="control"]:hover,
.preview-player[data-theme="${theme.id}"] .media-fullscreen-button:hover,
:root[data-theme="${theme.id}"] .group\\/liquid-btn:hover,
:root[data-theme="${theme.id}"] [data-slot="control"]:hover,
:root[data-theme="${theme.id}"] .media-fullscreen-button:hover,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/liquid-btn:hover,
:where(.media-skin)[data-theme="${theme.id}"] [data-slot="control"]:hover,
:where(.media-skin)[data-theme="${theme.id}"] .media-fullscreen-button:hover {
  border-color: ${theme.btnHoverBorder} !important;
  box-shadow: ${theme.btnHoverShadow} !important;
  transform: translateY(-1.5px) !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/play,
.preview-player[data-theme="${theme.id}"] .group\\/center-buffering button:nth-child(2),
:root[data-theme="${theme.id}"] .group\\/play,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/play {
  background: ${theme.playBg} !important;
  border: ${theme.playBorder} !important;
  box-shadow: ${theme.playShadow} !important;
  color: ${theme.playIconColor} !important;
}

.preview-player[data-theme="${theme.id}"] .player-icon-scale svg,
.preview-player[data-theme="${theme.id}"] .group\\/mute svg,
.preview-player[data-theme="${theme.id}"] .group\\/liquid-btn svg,
.preview-player[data-theme="${theme.id}"] [data-slot="control"] svg,
:root[data-theme="${theme.id}"] [data-slot="control"] svg,
:where(.media-skin)[data-theme="${theme.id}"] [data-slot="control"] svg {
  color: ${theme.iconColor} !important;
  filter: ${theme.iconFilter} !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/play svg,
:root[data-theme="${theme.id}"] .group\\/play svg,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/play svg {
  color: ${theme.playIconColor} !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/vol-pill,
:root[data-theme="${theme.id}"] .group\\/vol-pill,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/vol-pill {
  border-radius: ${theme.btnRadius} !important;
  background: ${theme.volPillBg} !important;
  border: ${theme.volPillBorder} !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/vol-pill div[class*="bg-white/20"],
:root[data-theme="${theme.id}"] .group\\/vol-pill div[class*="bg-white/20"],
:where(.media-skin)[data-theme="${theme.id}"] .group\\/vol-pill div[class*="bg-white/20"] {
  height: 4px !important;
  border-radius: ${theme.btnRadius} !important;
  background: ${theme.volTrackBg} !important;
  border: ${theme.volTrackBorder || 'none'} !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/vol-pill div[class*="bg-white/90"],
:root[data-theme="${theme.id}"] .group\\/vol-pill div[class*="bg-white/90"],
:where(.media-skin)[data-theme="${theme.id}"] .group\\/vol-pill div[class*="bg-white/90"] {
  height: 4px !important;
  border-radius: ${theme.btnRadius} !important;
  background: ${theme.volFillBg} !important;
}

.preview-player[data-theme="${theme.id}"] .volume-slider-thumb,
:root[data-theme="${theme.id}"] .volume-slider-thumb,
:where(.media-skin)[data-theme="${theme.id}"] .volume-slider-thumb {
  ${theme.volThumbStyle}
}

.preview-player[data-theme="${theme.id}"] .group\\/slider,
:root[data-theme="${theme.id}"] .group\\/slider,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/slider {
  height: 18px !important;
}

.preview-player[data-theme="${theme.id}"] div[class*="media-slider-smooth"][class*="isolate"],
:root[data-theme="${theme.id}"] div[class*="media-slider-smooth"][class*="isolate"],
:where(.media-skin)[data-theme="${theme.id}"] div[class*="media-slider-smooth"][class*="isolate"] {
  height: ${theme.seekTrackHeight || '6px'} !important;
  border-radius: ${theme.seekTrackRadius || '3px'} !important;
  background: ${theme.seekTrackBg} !important;
  border: ${theme.seekTrackBorder || 'none'} !important;
}

.preview-player[data-theme="${theme.id}"] div[class*="clip-media-x-[--media-slider-buffer]"],
:root[data-theme="${theme.id}"] div[class*="clip-media-x-[--media-slider-buffer]"],
:where(.media-skin)[data-theme="${theme.id}"] div[class*="clip-media-x-[--media-slider-buffer]"] {
  background: ${theme.seekBufferBg} !important;
  border-radius: ${theme.seekTrackRadius || '3px'} !important;
}

.preview-player[data-theme="${theme.id}"] div[class*="clip-media-x-[--media-slider-fill]"],
:root[data-theme="${theme.id}"] div[class*="clip-media-x-[--media-slider-fill]"],
:where(.media-skin)[data-theme="${theme.id}"] div[class*="clip-media-x-[--media-slider-fill]"] {
  background: ${theme.seekFillBg} !important;
  border-radius: ${theme.seekTrackRadius || '3px'} !important;
  box-shadow: ${theme.seekFillShadow || 'none'} !important;
  opacity: 1 !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/slider .media-thumb-smooth,
:root[data-theme="${theme.id}"] .group\\/slider .media-thumb-smooth,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/slider .media-thumb-smooth {
  ${theme.seekThumbStyle}
  opacity: 1 !important;
  display: block !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/slider:hover .media-thumb-smooth,
.preview-player[data-theme="${theme.id}"] .group\\/slider[data-dragging] .media-thumb-smooth,
:root[data-theme="${theme.id}"] .group\\/slider:hover .media-thumb-smooth,
:root[data-theme="${theme.id}"] .group\\/slider[data-dragging] .media-thumb-smooth {
  scale: 1.12 !important;
}

${waveformRules}

${dockOverlayRule}

.preview-player[data-theme="${theme.id}"] time-value,
.preview-player[data-theme="${theme.id}"] div[class*="tabular-nums"],
:root[data-theme="${theme.id}"] time-value,
:root[data-theme="${theme.id}"] div[class*="tabular-nums"],
:where(.media-skin)[data-theme="${theme.id}"] time-value,
:where(.media-skin)[data-theme="${theme.id}"] div[class*="tabular-nums"] {
  color: ${theme.timeColor} !important;
  font-family: ${theme.timeFont} !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.85) !important;
}

.preview-player[data-theme="${theme.id}"] [role="menu"],
:root[data-theme="${theme.id}"] [role="menu"],
:where(.media-skin)[data-theme="${theme.id}"] [role="menu"] {
  background: ${theme.menuBg} !important;
  border: ${theme.menuBorder} !important;
  border-radius: ${theme.menuRadius} !important;
  box-shadow: ${theme.menuShadow} !important;
  backdrop-filter: blur(28px) !important;
  -webkit-backdrop-filter: blur(28px) !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/menu-btn:hover,
.preview-player[data-theme="${theme.id}"] .group\\/menu-radio:hover,
:root[data-theme="${theme.id}"] [role="menuitem"]:hover,
:root[data-theme="${theme.id}"] [role="menuitemradio"]:hover,
:where(.media-skin)[data-theme="${theme.id}"] [role="menuitem"]:hover,
:where(.media-skin)[data-theme="${theme.id}"] [role="menuitemradio"]:hover {
  background: ${theme.menuItemHoverBg} !important;
  color: ${theme.menuItemHoverColor} !important;
}

.preview-player[data-theme="${theme.id}"] [data-part="caption-pill"],
:root[data-theme="${theme.id}"] [data-part="caption-pill"],
:where(.media-skin)[data-theme="${theme.id}"] [data-part="caption-pill"] {
  background: ${theme.captionBg} !important;
  border: ${theme.captionBorder} !important;
  border-radius: ${theme.captionRadius} !important;
  box-shadow: ${theme.captionShadow} !important;
  color: ${theme.captionColor} !important;
  text-shadow: ${theme.captionTextShadow} !important;
}
`;
}

const compiledCss = allThemes.map(generateThemeCss).join('\n');
console.log('Compiled CSS size:', compiledCss.length, 'bytes');

function updateCssFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File does not exist:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const startMarker = 'THEME: Tourbillon Skeleton';
  const endMarker = 'Universal Silky-Smooth Progress Knob';

  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    console.error(`Markers not found in ${filePath}! startIdx=${startIdx}, endIdx=${endIdx}`);
    return;
  }

  // Find the comment start for Tourbillon Skeleton
  const commentStart = content.lastIndexOf('/*', startIdx);
  // Find the comment start for Universal Silky-Smooth
  const commentEnd = content.lastIndexOf('/*', endIdx);

  const before = content.slice(0, commentStart);
  const after = content.slice(commentEnd);

  const newContent = before + compiledCss.trim() + '\n\n' + after;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log('Successfully updated:', filePath);
}

const targetFiles = [
  path.join(__dirname, '../apps/preview/src/frame/preview.css'),
  path.join(__dirname, '../src/skin.css'),
  path.join(__dirname, '../../../custom-skin/apps/preview/src/frame/preview.css'),
  path.join(__dirname, '../../../custom-skin/src/skin.css')
];

targetFiles.forEach(updateCssFile);
console.log('All files updated successfully!');
