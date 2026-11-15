const fs = require('fs');
const previewCss = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');
const lines = previewCss.split('\n');
console.log(lines.slice(8570, 8660).join('\n'));
