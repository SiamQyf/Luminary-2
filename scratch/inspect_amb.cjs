const fs = require('fs');
const amb = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/shell/ambient-background.tsx', 'utf8');

console.log(amb.slice(0, 1500));
console.log('--- A SAMPLE THEME (tourbillon-skeleton) ---');
const idx = amb.indexOf("'tourbillon-skeleton'");
if (idx !== -1) {
  console.log(amb.slice(idx, idx + 400));
}
