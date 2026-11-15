const fs = require('fs');

function makeWaveformSvg(height, heights) {
  const pitch = 4;
  const barWidth = 1.3;
  const rx = 0.65;
  const totalWidth = heights.length * pitch;
  
  let rects = '';
  for (let i = 0; i < heights.length; i++) {
    const h = heights[i];
    const x = +(i * pitch + (pitch - barWidth) / 2).toFixed(2);
    const y = +((height - h) / 2).toFixed(2);
    rects += `<rect x='${x}' y='${y}' width='${barWidth}' height='${h}' rx='${rx}' fill='white'/>`;
  }
  
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${totalWidth} ${height}' width='${totalWidth}' height='${height}'>${rects}</svg>`;
  return { svg, totalWidth, height, dataUri: `url("data:image/svg+xml,${encodeURIComponent(svg)}")` };
}

// 64-bar organic podcast speech waveform, height 14
const seekbarHeights = [
  3, 5, 8, 4, 11, 7, 3, 2,
  6, 12, 14, 10, 4, 2, 5, 9,
  13, 8, 12, 6, 3, 2, 7, 11,
  4, 2, 2, 5, 8, 13, 10, 4,
  7, 14, 13, 9, 5, 2, 3, 6,
  10, 12, 8, 4, 2, 6, 9, 13,
  14, 11, 7, 3, 2, 4, 8, 12,
  9, 6, 3, 2, 2, 3, 5, 7
];
const seekbarResult = makeWaveformSvg(14, seekbarHeights);

// 16-bar rising acoustic speech volume VU waveform, height 12
const volHeights = [2.5, 3.5, 4.5, 3.5, 6, 7.5, 6, 9, 10.5, 9, 11.5, 12, 11, 12, 12, 12];
const volResult = makeWaveformSvg(12, volHeights);

const prettyWaveformCss = `/* Audio Scrubbing Waveform Seekbar Track & DAW Playhead Needle (High-End Studio Polish) */
.preview-player[data-theme="podcast-studio"] .group\\/slider,
:root[data-theme="podcast-studio"] .group\\/slider,
:where(.media-skin)[data-theme="podcast-studio"] .group\\/slider {
  height: 24px !important;
  padding: 0 6px !important;
  border-radius: 9999px !important;
  background: rgba(14, 16, 22, 0.55) !important;
  border: 1px solid rgba(245, 158, 11, 0.22) !important;
  box-shadow:
    inset 0 1.5px 3px rgba(0, 0, 0, 0.65),
    0 1px 0 rgba(255, 255, 255, 0.06) !important;
  backdrop-filter: blur(10px) !important;
  -webkit-backdrop-filter: blur(10px) !important;
  transition: all 0.2s ease-out !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/slider:hover,
:root[data-theme="podcast-studio"] .group\\/slider:hover {
  border-color: rgba(245, 158, 11, 0.48) !important;
  background: rgba(18, 20, 28, 0.72) !important;
  box-shadow:
    0 0 16px rgba(245, 158, 11, 0.18),
    inset 0 1.5px 3px rgba(0, 0, 0, 0.75) !important;
}

.preview-player[data-theme="podcast-studio"] div[class*="media-slider-smooth"][class*="isolate"],
:root[data-theme="podcast-studio"] div[class*="media-slider-smooth"][class*="isolate"],
:where(.media-skin)[data-theme="podcast-studio"] div[class*="media-slider-smooth"][class*="isolate"] {
  height: 14px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  border-radius: 0 !important;
  background: rgba(254, 243, 199, 0.24) !important;
  border: none !important;
  box-shadow: none !important;
  mask-image: ${seekbarResult.dataUri} !important;
  -webkit-mask-image: ${seekbarResult.dataUri} !important;
  mask-repeat: repeat-x !important;
  -webkit-mask-repeat: repeat-x !important;
  mask-size: 256px 14px !important;
  -webkit-mask-size: 256px 14px !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"] {
  height: 14px !important;
  background: rgba(254, 243, 199, 0.32) !important;
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
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.9) !important;
  opacity: 1 !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth,
:root[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth,
:where(.media-skin)[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth {
  width: 8px !important;
  height: 8px !important;
  border-radius: 9999px !important;
  background: radial-gradient(circle at 35% 30%, #ffffff 0%, #fbbf24 65%, #d97706 100%) !important;
  border: 1.25px solid #fffbeb !important;
  box-shadow:
    0 0 10px rgba(245, 158, 11, 0.95),
    0 2px 4px rgba(0, 0, 0, 0.6) !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth::before,
:root[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth::before,
:where(.media-skin)[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth::before {
  content: '' !important;
  position: absolute !important;
  top: -5px !important;
  bottom: -5px !important;
  left: 50% !important;
  width: 1.5px !important;
  transform: translateX(-50%) !important;
  background: #ffffff !important;
  border-radius: 1px !important;
  box-shadow: 0 0 6px rgba(251, 191, 36, 0.95) !important;
  pointer-events: none !important;
}

/* Volume Pill: Waveform Track, Active Fill & Scrubber Jewel (High-End Studio Polish) */
.preview-player[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/20"],
:root[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/20"],
:where(.media-skin)[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/20"] {
  height: 12px !important;
  max-width: calc(100% - 1px) !important;
  border-radius: 0 !important;
  background: rgba(254, 243, 199, 0.24) !important;
  border: none !important;
  box-shadow: none !important;
  mask-image: ${volResult.dataUri} !important;
  -webkit-mask-image: ${volResult.dataUri} !important;
  mask-repeat: repeat-x !important;
  -webkit-mask-repeat: repeat-x !important;
  mask-size: 64px 12px !important;
  -webkit-mask-size: 64px 12px !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/90"],
:root[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/90"],
:where(.media-skin)[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/90"] {
  border-radius: 0 !important;
  background: linear-gradient(90deg, #d97706 0%, #f59e0b 60%, #fbbf24 100%) !important;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.8) !important;
}

.preview-player[data-theme="podcast-studio"] .volume-slider-thumb,
:root[data-theme="podcast-studio"] .volume-slider-thumb,
:where(.media-skin)[data-theme="podcast-studio"] .volume-slider-thumb {
  width: 7px !important;
  height: 7px !important;
  border-radius: 9999px !important;
  background: radial-gradient(circle at 35% 30%, #ffffff 0%, #fbbf24 65%, #d97706 100%) !important;
  border: 1px solid #fffbeb !important;
  box-shadow:
    0 0 8px rgba(245, 158, 11, 0.95),
    0 1px 3px rgba(0, 0, 0, 0.5) !important;
}

.preview-player[data-theme="podcast-studio"] .volume-slider-thumb::before,
:root[data-theme="podcast-studio"] .volume-slider-thumb::before,
:where(.media-skin)[data-theme="podcast-studio"] .volume-slider-thumb::before {
  content: '' !important;
  position: absolute !important;
  top: -4px !important;
  bottom: -4px !important;
  left: 50% !important;
  width: 1.5px !important;
  transform: translateX(-50%) !important;
  background: #ffffff !important;
  border-radius: 1px !important;
  box-shadow: 0 0 5px rgba(251, 191, 36, 0.9) !important;
  pointer-events: none !important;
}`;

function updateFiles(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const targetRegex = /\/\* Audio Scrubbing Waveform Seekbar Track[\s\S]*?(?=\/\* Broadcast Studio Timecode)/;
  if (targetRegex.test(content)) {
    content = content.replace(targetRegex, prettyWaveformCss + '\n\n');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated pretty waveform rules in', filePath);
  } else {
    console.log('targetRegex not matched in', filePath);
  }
}

updateFiles('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
updateFiles('d:/video player/skin 2/custom-skin/src/skin.css');
updateFiles('d:/video player/custom-skin/apps/preview/src/frame/preview.css');
updateFiles('d:/video player/custom-skin/src/skin.css');
updateFiles('d:/video player/skin 2/custom-skin/scratch/podcast_studio.css');
