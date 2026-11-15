const fs = require('fs');
const content = fs.readFileSync('skin 2/custom-skin/apps/preview/src/shell/ambient-background.tsx', 'utf8');
const lines = content.split('\n');
console.log('--- Around 565 ---');
console.log(lines.slice(560, 575).join('\n'));
console.log('--- Around 1120 ---');
console.log(lines.slice(1110, 1130).join('\n'));
