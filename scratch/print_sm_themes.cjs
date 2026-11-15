const fs = require('fs');
const content = fs.readFileSync('skin 2/custom-skin/src/video/shared/settings-menu.tsx', 'utf8');
const lines = content.split('\n');
console.log(lines.slice(68, 135).join('\n'));
