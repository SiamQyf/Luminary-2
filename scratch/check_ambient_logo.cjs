const fs = require('fs');
const p1 = require('D:/video player/skin 2/custom-skin/scratch/creative_themes_part1.cjs');
const p2 = require('D:/video player/skin 2/custom-skin/scratch/creative_themes_part2.cjs');
const p3 = require('D:/video player/skin 2/custom-skin/scratch/creative_themes_part3.cjs');
const p4 = require('D:/video player/skin 2/custom-skin/scratch/creative_themes_part4.cjs');
const allThemes = [...p1, ...p2, ...p3, ...p4];

const ambPath = 'd:/video player/skin 2/custom-skin/apps/preview/src/shell/ambient-background.tsx';
const ambContent = fs.readFileSync(ambPath, 'utf8');

const logoPath = 'd:/video player/skin 2/custom-skin/apps/preview/src/shell/logo.tsx';
const logoContent = fs.readFileSync(logoPath, 'utf8');

let ambMissing = 0;
let logoMissing = 0;
for (const t of allThemes) {
  if (!ambContent.includes(`'${t.id}':`)) ambMissing++;
  if (!logoContent.includes(`'${t.id}':`)) logoMissing++;
}

console.log('ambient-background.tsx missing:', ambMissing);
console.log('logo.tsx missing:', logoMissing);
