const p1 = require('D:/video player/skin 2/custom-skin/scratch/creative_themes_part1.cjs');
console.log('Count in part 1:', p1.length);
p1.forEach((t, i) => {
  console.log(`${i+1}. id=${t.id}, label=${t.label}`);
  console.log('  seekTrackBg snippet:', (t.seekTrackBg || '').slice(0, 80));
  console.log('  seekThumbStyle snippet:', (t.seekThumbStyle || '').slice(0, 80));
});
