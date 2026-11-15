const fs = require('fs');
const amb = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/shell/ambient-background.tsx', 'utf8');

const p1 = require('d:/video player/skin 2/custom-skin/scratch/creative_themes_part1.cjs');
const p2 = require('d:/video player/skin 2/custom-skin/scratch/creative_themes_part2.cjs');
const p3 = require('d:/video player/skin 2/custom-skin/scratch/creative_themes_part3.cjs');
const p4 = require('d:/video player/skin 2/custom-skin/scratch/creative_themes_part4.cjs');
const allThemes = [...p1, ...p2, ...p3, ...p4];

console.log('Checking ambient palettes in ambient-background.tsx:');
for (const t of allThemes.slice(0, 5)) {
  const idx = amb.indexOf(`'${t.id}':`);
  if (idx !== -1) {
    console.log(amb.slice(idx, idx + 250));
    console.log('---');
  } else {
    console.log(`Missing palette for ${t.id}`);
  }
}
