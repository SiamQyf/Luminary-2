const fs = require('fs');

const waveformCss = `/* Audio Scrubbing Waveform Seekbar Track & DAW Playhead Needle */
.preview-player[data-theme="podcast-studio"] .group\\/slider,
:root[data-theme="podcast-studio"] .group\\/slider,
:where(.media-skin)[data-theme="podcast-studio"] .group\\/slider {
  height: 24px !important;
}

.preview-player[data-theme="podcast-studio"] div[class*="media-slider-smooth"][class*="isolate"],
:root[data-theme="podcast-studio"] div[class*="media-slider-smooth"][class*="isolate"],
:where(.media-skin)[data-theme="podcast-studio"] div[class*="media-slider-smooth"][class*="isolate"] {
  height: 20px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  border-radius: 0 !important;
  background: rgba(245, 158, 11, 0.22) !important;
  border: none !important;
  box-shadow: none !important;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 20' width='48' height='20'%3E%3Crect x='0.75' y='7' width='2.5' height='6' rx='1.25' fill='white'/%3E%3Crect x='4.75' y='4' width='2.5' height='12' rx='1.25' fill='white'/%3E%3Crect x='8.75' y='6' width='2.5' height='8' rx='1.25' fill='white'/%3E%3Crect x='12.75' y='1' width='2.5' height='18' rx='1.25' fill='white'/%3E%3Crect x='16.75' y='5' width='2.5' height='10' rx='1.25' fill='white'/%3E%3Crect x='20.75' y='3' width='2.5' height='14' rx='1.25' fill='white'/%3E%3Crect x='24.75' y='7.5' width='2.5' height='5' rx='1.25' fill='white'/%3E%3Crect x='28.75' y='2' width='2.5' height='16' rx='1.25' fill='white'/%3E%3Crect x='32.75' y='5.5' width='2.5' height='9' rx='1.25' fill='white'/%3E%3Crect x='36.75' y='0.5' width='2.5' height='19' rx='1.25' fill='white'/%3E%3Crect x='40.75' y='4' width='2.5' height='12' rx='1.25' fill='white'/%3E%3Crect x='44.75' y='6.5' width='2.5' height='7' rx='1.25' fill='white'/%3E%3C/svg%3E") !important;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 20' width='48' height='20'%3E%3Crect x='0.75' y='7' width='2.5' height='6' rx='1.25' fill='white'/%3E%3Crect x='4.75' y='4' width='2.5' height='12' rx='1.25' fill='white'/%3E%3Crect x='8.75' y='6' width='2.5' height='8' rx='1.25' fill='white'/%3E%3Crect x='12.75' y='1' width='2.5' height='18' rx='1.25' fill='white'/%3E%3Crect x='16.75' y='5' width='2.5' height='10' rx='1.25' fill='white'/%3E%3Crect x='20.75' y='3' width='2.5' height='14' rx='1.25' fill='white'/%3E%3Crect x='24.75' y='7.5' width='2.5' height='5' rx='1.25' fill='white'/%3E%3Crect x='28.75' y='2' width='2.5' height='16' rx='1.25' fill='white'/%3E%3Crect x='32.75' y='5.5' width='2.5' height='9' rx='1.25' fill='white'/%3E%3Crect x='36.75' y='0.5' width='2.5' height='19' rx='1.25' fill='white'/%3E%3Crect x='40.75' y='4' width='2.5' height='12' rx='1.25' fill='white'/%3E%3Crect x='44.75' y='6.5' width='2.5' height='7' rx='1.25' fill='white'/%3E%3C/svg%3E") !important;
  mask-repeat: repeat-x !important;
  -webkit-mask-repeat: repeat-x !important;
  mask-size: 48px 20px !important;
  -webkit-mask-size: 48px 20px !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"] {
  height: 20px !important;
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
  box-shadow: 0 0 10px rgba(245, 158, 11, 0.8) !important;
  opacity: 1 !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth,
:root[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth,
:where(.media-skin)[data-theme="podcast-studio"] .group\\/slider .media-thumb-smooth {
  width: 3px !important;
  height: 22px !important;
  border-radius: 2px !important;
  background: #ffffff !important;
  border: none !important;
  box-shadow:
    0 0 8px rgba(251, 191, 36, 0.95),
    0 0 2px rgba(0, 0, 0, 0.9) !important;
}

/* Volume Pill: Waveform Track, Active Fill & Scrubber Needle */
.preview-player[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/20"],
:root[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/20"],
:where(.media-skin)[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/20"] {
  height: 14px !important;
  max-width: calc(100% - 1px) !important;
  border-radius: 0 !important;
  background: rgba(245, 158, 11, 0.22) !important;
  border: none !important;
  box-shadow: none !important;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 14' width='44' height='14'%3E%3Crect x='0.5' y='5' width='2' height='4' rx='1' fill='white'/%3E%3Crect x='4.5' y='3.5' width='2' height='7' rx='1' fill='white'/%3E%3Crect x='8.5' y='4.5' width='2' height='5' rx='1' fill='white'/%3E%3Crect x='12.5' y='2' width='2' height='10' rx='1' fill='white'/%3E%3Crect x='16.5' y='3.5' width='2' height='7' rx='1' fill='white'/%3E%3Crect x='20.5' y='1' width='2' height='12' rx='1' fill='white'/%3E%3Crect x='24.5' y='3' width='2' height='8' rx='1' fill='white'/%3E%3Crect x='28.5' y='0.5' width='2' height='13' rx='1' fill='white'/%3E%3Crect x='32.5' y='2.5' width='2' height='9' rx='1' fill='white'/%3E%3Crect x='36.5' y='0' width='2' height='14' rx='1' fill='white'/%3E%3Crect x='40.5' y='1.5' width='2' height='11' rx='1' fill='white'/%3E%3C/svg%3E") !important;
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 14' width='44' height='14'%3E%3Crect x='0.5' y='5' width='2' height='4' rx='1' fill='white'/%3E%3Crect x='4.5' y='3.5' width='2' height='7' rx='1' fill='white'/%3E%3Crect x='8.5' y='4.5' width='2' height='5' rx='1' fill='white'/%3E%3Crect x='12.5' y='2' width='2' height='10' rx='1' fill='white'/%3E%3Crect x='16.5' y='3.5' width='2' height='7' rx='1' fill='white'/%3E%3Crect x='20.5' y='1' width='2' height='12' rx='1' fill='white'/%3E%3Crect x='24.5' y='3' width='2' height='8' rx='1' fill='white'/%3E%3Crect x='28.5' y='0.5' width='2' height='13' rx='1' fill='white'/%3E%3Crect x='32.5' y='2.5' width='2' height='9' rx='1' fill='white'/%3E%3Crect x='36.5' y='0' width='2' height='14' rx='1' fill='white'/%3E%3Crect x='40.5' y='1.5' width='2' height='11' rx='1' fill='white'/%3E%3C/svg%3E") !important;
  mask-repeat: repeat-x !important;
  -webkit-mask-repeat: repeat-x !important;
  mask-size: 44px 14px !important;
  -webkit-mask-size: 44px 14px !important;
}

.preview-player[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/90"],
:root[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/90"],
:where(.media-skin)[data-theme="podcast-studio"] .group\\/vol-pill div[class*="bg-white/90"] {
  border-radius: 0 !important;
  background: linear-gradient(90deg, #d97706 0%, #f59e0b 60%, #fbbf24 100%) !important;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.7) !important;
}

.preview-player[data-theme="podcast-studio"] .volume-slider-thumb,
:root[data-theme="podcast-studio"] .volume-slider-thumb,
:where(.media-skin)[data-theme="podcast-studio"] .volume-slider-thumb {
  width: 2.5px !important;
  height: 16px !important;
  border-radius: 2px !important;
  background: #ffffff !important;
  border: none !important;
  box-shadow: 0 0 6px rgba(251, 191, 36, 0.9), 0 0 2px rgba(0, 0, 0, 0.8) !important;
}`;

function replaceRules(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace from /* Audio Scrubbing Seekbar Track to /* Broadcast Studio Timecode
  const oldRegex = /\/\* Audio Scrubbing Seekbar Track[\s\S]*?(?=\/\* Broadcast Studio Timecode)/;
  if (oldRegex.test(content)) {
    content = content.replace(oldRegex, waveformCss + '\n\n');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Replaced waveform seekbar rules in', filePath);
  } else {
    console.log('oldRegex not matched in', filePath);
  }

  // Also replace volume slider thumb rule if it exists before
  const oldVolRegex = /\/\* Volume Pill: Studio Mixing Fader Capsule \*\/[\s\S]*?(?=\/\* Audio Scrubbing Waveform)/;
  // keep Volume Pill base container rule
}

replaceRules('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
replaceRules('d:/video player/skin 2/custom-skin/src/skin.css');
replaceRules('d:/video player/custom-skin/apps/preview/src/frame/preview.css');
replaceRules('d:/video player/custom-skin/src/skin.css');
replaceRules('d:/video player/skin 2/custom-skin/scratch/podcast_studio.css');
