const fs = require('fs');
const amb = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/shell/ambient-background.tsx', 'utf8');
console.log('ambient end:');
console.log(amb.slice(-1200));

const logo = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/shell/logo.tsx', 'utf8');
console.log('logo end:');
console.log(logo.slice(-1200));
