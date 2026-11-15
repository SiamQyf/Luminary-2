const p1 = require('D:/video player/skin 2/custom-skin/scratch/creative_themes_part1.cjs');
const p2 = require('D:/video player/skin 2/custom-skin/scratch/creative_themes_part2.cjs');
const p3 = require('D:/video player/skin 2/custom-skin/scratch/creative_themes_part3.cjs');
const p4 = require('D:/video player/skin 2/custom-skin/scratch/creative_themes_part4.cjs');

const all = [...p1, ...p2, ...p3, ...p4];
console.log('Total creative themes:', all.length);

const ids = new Set();
let duplicates = 0;
all.forEach((t, i) => {
  if (ids.has(t.id)) {
    console.error(`Duplicate ID: ${t.id} at index ${i}`);
    duplicates++;
  }
  ids.add(t.id);
});

console.log('Duplicates found:', duplicates);
if (duplicates === 0 && all.length === 50) {
  console.log('ALL 50 THEMES VALID AND UNIQUE!');
}
