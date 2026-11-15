const fs = require('fs');
const content = fs.readFileSync('skin 2/custom-skin/apps/preview/src/frame/video-input.tsx', 'utf8');
const lines = content.split('\n');
console.log(lines.slice(170, 235).join('\n'));
