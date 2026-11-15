const fs = require('fs');
const skinCss = fs.readFileSync('d:/video player/skin 2/custom-skin/src/skin.css', 'utf8');
const previewCss = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

console.log('skin.css end 2000 chars:');
console.log(skinCss.slice(-2000));
