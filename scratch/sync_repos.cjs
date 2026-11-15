const fs = require('fs');

const files = [
  'src/video/shared/captions-display.tsx',
  'apps/preview/src/frame/preview.css',
  'src/skin.css'
];

for (const f of files) {
  const src = `d:/video player/skin 2/custom-skin/${f}`;
  const dest = `d:/video player/custom-skin/${f}`;
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} -> ${dest}`);
}
