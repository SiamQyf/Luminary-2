const fs = require('fs');
const skinCss = fs.readFileSync('d:/video player/skin 2/custom-skin/src/skin.css', 'utf8');
const lines = skinCss.split('\n');
console.log(lines.slice(-75, -35).join('\n'));
