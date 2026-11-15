const fs = require('fs');
const path = require('path');

// 50 bar relative heights from Image 1
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

const seek = generateSeekbarMask(6.0, 1.4, 9.0, 0.7);
const vol = generateVolumeMask(65.0, 9.0, 1.4, 13, 0.7);

console.log('Seekbar URI length:', seek.dataUri.length, 'W:', seek.width, 'H:', seek.height);
console.log('Volume URI length:', vol.dataUri.length, 'W:', vol.width, 'H:', vol.height);

const newRules = `
.preview-player[data-theme="podcast-studio"] div[class*="media-slider-smooth"][class*="isolate"],
:root[data-theme="podcast-studio"] div[class*="media-slider-smooth"][class*="isolate"],
:where(.media-skin)[data-theme="podcast-studio"] div[class*="media-slider-smooth"][class*="isolate"] {
  height: ${seek.height.toFixed(1)}px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  border-radius: 0 !important;
  background: rgba(255, 255, 255, 0.3) !important;
  border: none !important;
  box-shadow: none !important;
  mask-image: url("${seek.dataUri}") !important;
  -webkit-mask-image: url("${seek.dataUri}") !important;
  mask-repeat: repeat-x !important;
  -webkit-mask-repeat: repeat-x !important;
  mask-size: ${seek.width.toFixed(1)}px ${seek.height.toFixed(1)}px !important;
  -webkit-mask-size: ${seek.width.toFixed(1)}px ${seek.height.toFixed(1)}px !important;
  transition: background 0.15s ease-out !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"] {
  height: ${seek.height.toFixed(1)}px !important;
  background: rgba(255, 255, 255, 0.45) !important;
}

.preview-player[data-theme="podcast-studio"] div[class*="clip-media-x-[--media-slider-buffer]"],
:root[data-theme="podcast-studio"] div[class*="clip-media-x-[--media-slider-buffer]"],
:where(.media-skin)[data-theme="podcast-studio"] div[class*="clip-media-x-[--media-slider-buffer]"] {
  border-radius: 0 !important;
  background: rgba(245, 158, 11, 0.45) !important;
}

.preview-player[data-theme="podcast-studio"] div[class*="clip-media-x-[--media-slider-fill]"],
:root[data-theme="podcast-studio"] div[class*="clip-media-x-[--media-slider-fill]"],
:where(.media-skin)[data-theme="podcast-studio"] div[class*="clip-media-x-[--media-slider-fill]"] {
  border-radius: 0 !important;
  background: linear-gradient(90deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%) !important;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.85) !important;
  opacity: 1 !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth,
:root[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth,
:where(.media-skin)[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth {
  width: 2px !important;
  height: 15px !important;
  top: 50% !important;
  transform: none !important;
  border-radius: 1px !important;
  background: #ffffff !important;
  border: none !important;
  box-shadow:
    0 0 8px rgba(245, 158, 11, 0.95),
    0 1px 3px rgba(0, 0, 0, 0.7) !important;
  transition: height 0.15s ease-out, box-shadow 0.15s ease-out !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/slider:hover .media-thumb-smooth,
.preview-player[data-theme="podcast-studio"] .group\\/slider[data-dragging] .media-thumb-smooth {
  height: 17px !important;
  box-shadow:
    0 0 12px rgba(245, 158, 11, 1),
    0 0 3px #fbbf24,
    0 1px 4px rgba(0, 0, 0, 0.8) !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth::before,
.preview-player[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth::after,
:root[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth::before,
:root[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth::after,
:where(.media-skin)[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth::before,
:where(.media-skin)[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth::after {
  display: none !important;
  content: none !important;
}

/* Waveform Volume Level Track & Precision Fader Needle */
.preview-player[data-theme="podcast-studio"] .horizontal-volume-slider div[class*="rounded-full"][class*="w-"],
:root[data-theme="podcast-studio"] .horizontal-volume-slider div[class*="rounded-full"][class*="w-"],
:where(.media-skin)[data-theme="podcast-studio"] .horizontal-volume-slider div[class*="rounded-full"][class*="w-"] {
  height: ${vol.height.toFixed(1)}px !important;
  top: auto !important;
  transform: none !important;
  border-radius: 0 !important;
  background: rgba(255, 255, 255, 0.3) !important;
  border: none !important;
  box-shadow: none !important;
  mask-image: url("${vol.dataUri}") !important;
  -webkit-mask-image: url("${vol.dataUri}") !important;
  mask-repeat: no-repeat !important;
  -webkit-mask-repeat: no-repeat !important;
  mask-size: ${vol.width.toFixed(1)}px ${vol.height.toFixed(1)}px !important;
  -webkit-mask-size: ${vol.width.toFixed(1)}px ${vol.height.toFixed(1)}px !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/90"],
:root[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/90"],
:where(.media-skin)[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/90"] {
  border-radius: 0 !important;
  background: linear-gradient(90deg, #d97706 0%, #f59e0b 60%, #fbbf24 100%) !important;
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.8) !important;
}

.preview-player[data-theme="podcast-studio"] .volume-slider-thumb,
:root[data-theme="podcast-studio"] .volume-slider-thumb,
:where(.media-skin)[data-theme="podcast-studio"] .volume-slider-thumb {
  width: 2px !important;
  height: 13px !important;
  top: 50% !important;
  transform: none !important;
  border-radius: 1px !important;
  background: #ffffff !important;
  border: none !important;
  box-shadow:
    0 0 6px rgba(245, 158, 11, 0.95),
    0 1px 3px rgba(0, 0, 0, 0.6) !important;
}

.preview-player[data-theme="podcast-studio"] .volume-slider-thumb::before,
.preview-player[data-theme="podcast-studio"] .volume-slider-thumb::after,
:root[data-theme="podcast-studio"] .volume-slider-thumb::before,
:root[data-theme="podcast-studio"] .volume-slider-thumb::after,
:where(.media-skin)[data-theme="podcast-studio"] .volume-slider-thumb::before,
:where(.media-skin)[data-theme="podcast-studio"] .volume-slider-thumb::after {
  display: none !important;
  content: none !important;
}
`;

// Replace in target CSS files:
// from '.preview-player[data-theme="podcast-studio"] div[class*="media-slider-smooth"][class*="isolate"]'
// to the end of .volume-slider-thumb::after block (before /* Broadcast Studio Timecode Readout */)

const targetFiles = [
  'd:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css',
  'd:/video player/skin 2/custom-skin/src/skin.css',
  'd:/video player/custom-skin/apps/preview/src/frame/preview.css',
  'd:/video player/custom-skin/src/skin.css'
];

targetFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log('Skipping missing:', file);
    return;
  }
  let content = fs.readFileSync(file, 'utf8');
  
  // Find the block starting at podcast-studio media-slider-smooth
  const startMarker = '.preview-player[data-theme="podcast-studio"] div[class*="media-slider-smooth"][class*="isolate"]';
  const endMarker = '/* Broadcast Studio Timecode Readout */';
  
  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker, startIdx);
  
  if (startIdx === -1 || endIdx === -1) {
    console.error('Could not find markers in', file);
    return;
  }
  
  const updated = content.slice(0, startIdx) + newRules.trim() + '\n\n' + content.slice(endIdx);
  fs.writeFileSync(file, updated, 'utf8');
  console.log('Updated:', file);
});
