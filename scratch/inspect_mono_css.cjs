const fs = require('fs');
const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

const themeId = 'monochrome-editorial';
const idx = css.indexOf(themeId);
console.log('Found monochrome-editorial at:', idx);
if (idx !== -1) {
  const bbarIdx = css.indexOf('bottom-controls-bar', idx);
  console.log('Found bottom-controls-bar at:', bbarIdx);
  if (bbarIdx !== -1) {
    console.log(css.slice(bbarIdx - 100, bbarIdx + 800));
  }
}
