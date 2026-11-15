const fs = require('fs');
const amb = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/shell/ambient-background.tsx', 'utf8');

console.log(amb.slice(-1500));
