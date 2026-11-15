const fs = require('fs');

const css = fs.readFileSync('skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');
const startMarker = '.preview-player[data-theme="glacial-permafrost"] .group\\/vol-pill div[class*="bg-white/20"]';
const endMarker = '.preview-player[data-theme="glacial-permafrost"] time-value';

const startIdx = css.indexOf(startMarker);
const endIdx = css.indexOf(endMarker);

console.log('startIdx:', startIdx, 'endIdx:', endIdx);
console.log(css.slice(startIdx, endIdx));
