const path = require('path');
const part1 = require(path.join(__dirname, 'creative_themes_part1.cjs'));
const part2 = require(path.join(__dirname, 'creative_themes_part2.cjs'));
const part3 = require(path.join(__dirname, 'creative_themes_part3.cjs'));
const part4 = require(path.join(__dirname, 'creative_themes_part4.cjs'));
const all = [...part1, ...part2, ...part3, ...part4];

let tickThemes = 0;
let plainThemes = 0;

all.forEach((t, i) => {
  const hasSpecialTrack = t.seekTrackBg.includes('gradient') || t.seekTrackBg.includes('repeating');
  const hasSpecialFill = t.seekFillBg.includes('repeating');
  if (hasSpecialTrack || hasSpecialFill) {
    tickThemes++;
  } else {
    plainThemes++;
  }
  console.log(`[${i + 54}] ${t.id}:`);
  console.log(`  seekTrack: ${t.seekTrackBg.slice(0, 70)}...`);
  console.log(`  seekFill: ${t.seekFillBg.slice(0, 70)}...`);
  console.log(`  thumb: ${t.seekThumbStyle ? t.seekThumbStyle.replace(/\s+/g, ' ').slice(0, 60) : 'none'}...`);
});

console.log(`\nSpecial tracks: ${tickThemes}, Plain tracks: ${plainThemes}`);
