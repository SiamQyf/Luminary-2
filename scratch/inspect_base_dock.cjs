const fs = require('fs');
const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

// Print lines 7414 to 7500
const lines = css.split('\n');
console.log(lines.slice(7413, 7500).join('\n'));
