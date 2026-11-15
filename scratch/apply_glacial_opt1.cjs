const fs = require('fs');

const cssOpt1 = `
/* ==========================================================================
   GLACIAL PERMAFROST: Arctic Crystalline Ice Columns & Ice-Gem Prism Thumb
   ========================================================================== */
.preview-player[data-theme="glacial-permafrost"] .group\\/slider,
:root[data-theme="glacial-permafrost"] .group\\/slider,
:where(.media-skin)[data-theme="glacial-permafrost"] .group\\/slider {
  height: 20px !important;
}

.preview-player[data-theme="glacial-permafrost"] div[class*="media-slider-smooth"][class*="isolate"],
:root[data-theme="glacial-permafrost"] div[class*="media-slider-smooth"][class*="isolate"],
:where(.media-skin)[data-theme="glacial-permafrost"] div[class*="media-slider-smooth"][class*="isolate"] {
  height: 14px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  border-radius: 0 !important;
  background-color: transparent !important;
  background-image: repeating-linear-gradient(90deg,
    rgba(186, 230, 253, 0.45) 0 1.5px,
    transparent 1.5px 5.5px,
    rgba(125, 211, 252, 0.22) 5.5px 7px,
    transparent 7px 11px
  ) !important;
  border: none !important;
  box-shadow: none !important;
  -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000000 15%, #000000 85%, transparent 100%) !important;
  mask-image: linear-gradient(180deg, transparent 0%, #000000 15%, #000000 85%, transparent 100%) !important;
  transition: height 0.18s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.preview-player[data-theme="glacial-permafrost"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"],
:root[data-theme="glacial-permafrost"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"],
:where(.media-skin)[data-theme="glacial-permafrost"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"] {
  height: 17px !important;
}

.preview-player[data-theme="glacial-permafrost"] div[class*="clip-media-x-[--media-slider-buffer]"],
:root[data-theme="glacial-permafrost"] div[class*="clip-media-x-[--media-slider-buffer]"],
:where(.media-skin)[data-theme="glacial-permafrost"] div[class*="clip-media-x-[--media-slider-buffer]"] {
  border-radius: 0 !important;
  background-color: transparent !important;
  background-image: repeating-linear-gradient(90deg,
    rgba(125, 211, 252, 0.55) 0 1.5px,
    transparent 1.5px 5.5px,
    rgba(186, 230, 253, 0.35) 5.5px 7px,
    transparent 7px 11px
  ) !important;
}

.preview-player[data-theme="glacial-permafrost"] div[class*="clip-media-x-[--media-slider-fill]"],
:root[data-theme="glacial-permafrost"] div[class*="clip-media-x-[--media-slider-fill]"],
:where(.media-skin)[data-theme="glacial-permafrost"] div[class*="clip-media-x-[--media-slider-fill]"] {
  border-radius: 0 !important;
  background-color: transparent !important;
  background-image: repeating-linear-gradient(90deg,
    #ffffff 0 1.5px,
    transparent 1.5px 5.5px,
    #7dd3fc 5.5px 7px,
    transparent 7px 11px
  ) !important;
  box-shadow: none !important;
  filter: drop-shadow(0 0 6px rgba(125, 211, 252, 0.95)) drop-shadow(0 0 2px #ffffff) !important;
  opacity: 1 !important;
}

.preview-player[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth,
:root[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth,
:where(.media-skin)[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth {
  width: 3px !important;
  height: 22px !important;
  top: 50% !important;
  transform: none !important;
  rotate: 0deg !important;
  border-radius: 1px !important;
  background: #ffffff !important;
  border: none !important;
  box-shadow:
    0 0 12px rgba(125, 211, 252, 1),
    0 0 3px #ffffff,
    0 0 20px rgba(56, 189, 248, 0.8),
    0 2px 5px rgba(0, 0, 0, 0.9) !important;
  opacity: 1 !important;
  display: block !important;
  overflow: visible !important;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.preview-player[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::before,
:root[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::before,
:where(.media-skin)[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::before {
  content: "" !important;
  display: block !important;
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) rotate(45deg) !important;
  width: 10px !important;
  height: 10px !important;
  border-radius: 2px !important;
  background: radial-gradient(circle at 35% 35%, #ffffff 0%, #bae6fd 30%, #38bdf8 65%, #0284c7 100%) !important;
  border: 1.5px solid #ffffff !important;
  box-shadow: 0 0 10px rgba(125, 211, 252, 0.95), 0 2px 4px rgba(0, 0, 0, 0.7) !important;
  transition: transform 0.18s ease-out, box-shadow 0.18s ease-out !important;
}

.preview-player[data-theme="glacial-permafrost"] .group\\/slider:hover .media-thumb-smooth,
.preview-player[data-theme="glacial-permafrost"] .group\\/slider[data-dragging] .media-thumb-smooth,
:root[data-theme="glacial-permafrost"] .group\\/slider:hover .media-thumb-smooth,
:root[data-theme="glacial-permafrost"] .group\\/slider[data-dragging] .media-thumb-smooth {
  scale: 1.15 !important;
  box-shadow:
    0 0 18px rgba(125, 211, 252, 1),
    0 0 6px #ffffff,
    0 0 28px rgba(56, 189, 248, 0.95) !important;
}

.preview-player[data-theme="glacial-permafrost"] .group\\/vol-pill div[class*="bg-white/20"],
:root[data-theme="glacial-permafrost"] .group\\/vol-pill div[class*="bg-white/20"],
:where(.media-skin)[data-theme="glacial-permafrost"] .group\\/vol-pill div[class*="bg-white/20"] {
  height: 9.5px !important;
  border-radius: 0 !important;
  background-color: transparent !important;
  background-image: repeating-linear-gradient(90deg, rgba(186, 230, 253, 0.35) 0 1.5px, transparent 1.5px 5px) !important;
  border: none !important;
  box-shadow: none !important;
}

.preview-player[data-theme="glacial-permafrost"] .group\\/vol-pill div[class*="bg-white/90"],
:root[data-theme="glacial-permafrost"] .group\\/vol-pill div[class*="bg-white/90"],
:where(.media-skin)[data-theme="glacial-permafrost"] .group\\/vol-pill div[class*="bg-white/90"] {
  height: 9.5px !important;
  border-radius: 0 !important;
  background-color: transparent !important;
  background-image: repeating-linear-gradient(90deg, #ffffff 0 1.5px, transparent 1.5px 5px) !important;
  filter: drop-shadow(0 0 5px rgba(125, 211, 252, 0.9)) !important;
  box-shadow: none !important;
}

.preview-player[data-theme="glacial-permafrost"] .volume-slider-thumb,
:root[data-theme="glacial-permafrost"] .volume-slider-thumb,
:where(.media-skin)[data-theme="glacial-permafrost"] .volume-slider-thumb {
  width: 7.5px !important;
  height: 7.5px !important;
  border-radius: 1.5px !important;
  rotate: 45deg !important;
  background: #ffffff !important;
  border: 1px solid #7dd3fc !important;
  box-shadow: 0 0 8px #7dd3fc, 0 1px 3px rgba(0, 0, 0, 0.8) !important;
}
`;

function applyGlacialCss(cssToApply) {
  const files = [
    'd:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css',
    'd:/video player/skin 2/custom-skin/src/skin.css',
    'd:/video player/custom-skin/apps/preview/src/frame/preview.css',
    'd:/video player/custom-skin/src/skin.css'
  ];

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    const startMarker = '.preview-player[data-theme="glacial-permafrost"] .group\\/vol-pill div[class*="bg-white/20"]';
    const endMarker = '.preview-player[data-theme="glacial-permafrost"] time-value';

    const sIdx = content.indexOf(startMarker);
    const eIdx = content.indexOf(endMarker);

    if (sIdx === -1 || eIdx === -1) {
      console.error('Markers not found in', file, sIdx, eIdx);
      continue;
    }

    const newContent = content.slice(0, sIdx) + cssToApply.trim() + '\n\n' + content.slice(eIdx);
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Applied to', file);
  }
}

applyGlacialCss(cssOpt1);
