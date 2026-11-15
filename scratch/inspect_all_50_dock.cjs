const path = require('path');
const part1 = require(path.join(__dirname, 'creative_themes_part1.cjs'));
const part2 = require(path.join(__dirname, 'creative_themes_part2.cjs'));
const part3 = require(path.join(__dirname, 'creative_themes_part3.cjs'));
const part4 = require(path.join(__dirname, 'creative_themes_part4.cjs'));
const all = [...part1, ...part2, ...part3, ...part4];

all.forEach((t, i) => {
  console.log(`[${i + 54}] ${t.id}:`);
  console.log(t.dockBackdrop ? t.dockBackdrop.trim() : 'NO DOCK BACKDROP');
  console.log('---');
});
