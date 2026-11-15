const fs = require('fs');
const content = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');
const idx = content.indexOf('PODCAST STUDIO');
console.log(content.slice(idx, idx + 4500));
