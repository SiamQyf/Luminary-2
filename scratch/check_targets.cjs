const fs = require('fs');

const files = [
  'd:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css',
  'd:/video player/skin 2/custom-skin/src/skin.css',
  'd:/video player/custom-skin/apps/preview/src/frame/preview.css',
  'd:/video player/custom-skin/src/skin.css'
];

for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const hasVol = content.includes('.preview-player[data-theme="glacial-permafrost"] .volume-slider-thumb');
  const hasSbBefore = content.includes('.preview-player[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::before');
  console.log(f, 'hasVol:', hasVol, 'hasSbBefore:', hasSbBefore);
}
