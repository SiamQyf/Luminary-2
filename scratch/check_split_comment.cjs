const fs = require('fs');
const splitComment = '/* ==========================================================================\n   Universal Silky-Smooth Progress Knob & Fill Advancement across ALL Themes';

const files = [
  'd:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css',
  'd:/video player/skin 2/custom-skin/src/skin.css',
  'd:/video player/custom-skin/apps/preview/src/frame/preview.css',
  'd:/video player/custom-skin/src/skin.css'
];

files.forEach(f => {
  console.log(f, fs.readFileSync(f, 'utf8').includes(splitComment));
});
