const fs = require('fs');

const files = [
  'src/video/shared/volume-pill.tsx',
  'src/video/shared/mute-button.tsx',
  'src/video/shared/captions-button.tsx',
  'src/video/shared/screen-controls.tsx',
  'src/video/shared/airplay-button.tsx'
];

for (const f of files) {
  const src = `d:/video player/skin 2/custom-skin/${f}`;
  const dest = `d:/video player/custom-skin/${f}`;
  fs.copyFileSync(src, dest);
  console.log(`Copied ${src} -> ${dest}`);
}
