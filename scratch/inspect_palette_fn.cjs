const fs = require('fs');
const amb = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/shell/ambient-background.tsx', 'utf8');
const logo = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/shell/logo.tsx', 'utf8');

console.log('ambient palette selection:');
const ambIdx = amb.indexOf('const palette =');
console.log(amb.slice(ambIdx, ambIdx + 400));

console.log('\nlogo palette selection:');
const logoIdx = logo.indexOf('getThemePalette');
console.log(logo.slice(logoIdx, logoIdx + 400));
