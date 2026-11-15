const fs = require('fs');
const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

const idx = css.indexOf('Theme-Matched Bottom Control Bar Backgrounds');
console.log(css.slice(idx, idx + 4000));
