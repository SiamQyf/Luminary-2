const fs = require('fs');

function makeWaveformSvg(height, heights) {
  const pitch = 4;
  const barWidth = 1.2;
  const rx = 0.6;
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

const seekbarHeights = [4, 7, 3, 5, 8, 5, 2, 4, 12, 4, 7, 3, 2, 12, 9, 2, 5, 3, 12, 9, 9, 2, 5, 2, 12, 10, 9, 2, 3, 7, 4, 8];
const seekbarResult = makeWaveformSvg(12, seekbarHeights);

const volHeights = [2, 3, 5, 3, 6, 8, 4, 7, 9, 6, 10, 8];
const volResult = makeWaveformSvg(10, volHeights);

const newWaveformCss = `/* Audio Scrubbing Waveform Seekbar Track & DAW Playhead Needle (Thin Refined Lines, Smaller Height) */
.preview-player[data-theme="podcast-studio"] .group\\/slider,
:root[data-theme="podcast-studio"] .group\\/slider,
:where(.media-skin)[data-theme="podcast-studio"] .group\\/slider {
  height: 16px !important;
}

.preview-player[data-theme="podcast-studio"] div[class*="media-slider-smooth"][class*="isolate"],
:root[data-theme="podcast-studio"] div[class*="media-slider-smooth"][class*="isolate"],
:where(.media-skin)[data-theme="podcast-studio"] div[class*="media-slider-smooth"][class*="isolate"] {
  height: 12px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  border-radius: 0 !important;
  background: rgba(245, 158, 11, 0.22) !important;
  border: none !important;
  box-shadow: none !important;
  mask-image: ${seekbarResult.dataUri} !important;
  -webkit-mask-image: ${seekbarResult.dataUri} !important;
  mask-repeat: repeat-x !important;
  -webkit-mask-repeat: repeat-x !important;
  mask-size: 128px 12px !important;
  -webkit-mask-size: 128px 12px !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"] {
  height: 12px !important;
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
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.8) !important;
  opacity: 1 !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth,
:root[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth,
:where(.media-skin)[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth {
  width: 1.5px !important;
  height: 14px !important;
  border-radius: 1px !important;
  background: #ffffff !important;
  border: none !important;
  box-shadow:
    0 0 6px rgba(251, 191, 36, 0.95),
    0 0 1.5px rgba(0, 0, 0, 0.9) !important;
}

/* Volume Pill: Waveform Track, Active Fill & Scrubber Needle (Thin Refined Lines, Smaller Height) */
.preview-player[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/20"],
:root[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/20"],
:where(.media-skin)[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/20"] {
  height: 10px !important;
  max-width: calc(100% - 1px) !important;
  border-radius: 0 !important;
  background: rgba(245, 158, 11, 0.22) !important;
  border: none !important;
  box-shadow: none !important;
  mask-image: ${volResult.dataUri} !important;
  -webkit-mask-image: ${volResult.dataUri} !important;
  mask-repeat: repeat-x !important;
  -webkit-mask-repeat: repeat-x !important;
  mask-size: 48px 10px !important;
  -webkit-mask-size: 48px 10px !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/90"],
:root[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/90"],
:where(.media-skin)[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/90"] {
  border-radius: 0 !important;
  background: linear-gradient(90deg, #d97706 0%, #f59e0b 60%, #fbbf24 100%) !important;
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.7) !important;
}

.preview-player[data-theme="podcast-studio"] .volume-slider-thumb,
:root[data-theme="podcast-studio"] .volume-slider-thumb,
:where(.media-skin)[data-theme="podcast-studio"] .volume-slider-thumb {
  width: 1.5px !important;
  height: 12px !important;
  border-radius: 1px !important;
  background: #ffffff !important;
  border: none !important;
  box-shadow: 0 0 5px rgba(251, 191, 36, 0.9), 0 0 1.5px rgba(0, 0, 0, 0.8) !important;
}`;

function updateFiles(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const targetRegex = /\/\* Audio Scrubbing Waveform Seekbar Track[\s\S]*?(?=\/\* Broadcast Studio Timecode)/;
  if (targetRegex.test(content)) {
    content = content.replace(targetRegex, newWaveformCss + '\n\n');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated thin waveform rules in', filePath);
  } else {
    console.log('targetRegex not matched in', filePath);
  }
}

updateFiles('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
updateFiles('d:/video player/skin 2/custom-skin/src/skin.css');
updateFiles('d:/video player/custom-skin/apps/preview/src/frame/preview.css');
updateFiles('d:/video player/custom-skin/src/skin.css');
updateFiles('d:/video player/skin 2/custom-skin/scratch/podcast_studio.css');
