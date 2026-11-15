const fs = require('fs');
const p1 = require('D:/video player/skin 2/custom-skin/scratch/creative_themes_part1.cjs');
const p2 = require('D:/video player/skin 2/custom-skin/scratch/creative_themes_part2.cjs');
const p3 = require('D:/video player/skin 2/custom-skin/scratch/creative_themes_part3.cjs');
const p4 = require('D:/video player/skin 2/custom-skin/scratch/creative_themes_part4.cjs');
const allThemes = [...p1, ...p2, ...p3, ...p4];

const vidPath = 'd:/video player/skin 2/custom-skin/apps/preview/src/frame/video-input.tsx';
const vidContent = fs.readFileSync(vidPath, 'utf8');

const setPath = 'd:/video player/skin 2/custom-skin/src/video/shared/settings-menu.tsx';
const setContent = fs.readFileSync(setPath, 'utf8');

let vidMissing = 0;
let setMissing = 0;
for (const t of allThemes) {
  if (!vidContent.includes(`id: '${t.id}'`)) vidMissing++;
  if (!setContent.includes(`id: '${t.id}'`)) setMissing++;
}

console.log('video-input.tsx missing:', vidMissing);
console.log('settings-menu.tsx missing:', setMissing);
