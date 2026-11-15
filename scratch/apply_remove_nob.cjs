const fs = require('fs');

const files = [
  'd:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css',
  'd:/video player/skin 2/custom-skin/src/skin.css',
  'd:/video player/custom-skin/apps/preview/src/frame/preview.css',
  'd:/video player/custom-skin/src/skin.css'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // 1. Seekbar diamond knob ::before -> display: none !important; content: none !important;
  const oldSbBefore = `.preview-player[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::before,
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
}`;

  const newSbBefore = `.preview-player[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::before,
.preview-player[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::after,
:root[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::before,
:root[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::after,
:where(.media-skin)[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::before,
:where(.media-skin)[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::after {
  display: none !important;
  content: none !important;
}`;

  // 2. Volume slider thumb -> display: none !important;
  const oldVolThumb = `.preview-player[data-theme="glacial-permafrost"] .volume-slider-thumb,
:root[data-theme="glacial-permafrost"] .volume-slider-thumb,
:where(.media-skin)[data-theme="glacial-permafrost"] .volume-slider-thumb {
  width: 7.5px !important;
  height: 7.5px !important;
  border-radius: 1.5px !important;
  rotate: 45deg !important;
  background: #ffffff !important;
  border: 1px solid #7dd3fc !important;
  box-shadow: 0 0 8px #7dd3fc, 0 1px 3px rgba(0, 0, 0, 0.8) !important;
}`;

  const newVolThumb = `.preview-player[data-theme="glacial-permafrost"] .volume-slider-thumb,
:root[data-theme="glacial-permafrost"] .volume-slider-thumb,
:where(.media-skin)[data-theme="glacial-permafrost"] .volume-slider-thumb {
  display: none !important;
}`;

  if (!content.includes(oldSbBefore)) {
    console.error('File', file, 'does not match oldSbBefore');
  }
  if (!content.includes(oldVolThumb)) {
    console.error('File', file, 'does not match oldVolThumb');
  }

  content = content.replace(oldSbBefore, newSbBefore);
  content = content.replace(oldVolThumb, newVolThumb);

  fs.writeFileSync(file, content, 'utf8');
  console.log('Successfully updated', file);
}
