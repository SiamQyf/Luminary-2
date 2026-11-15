const fs = require('fs');
const previewCss = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

console.log('preview.css end 2000 chars:');
console.log(previewCss.slice(-2000));
