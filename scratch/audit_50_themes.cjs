const path = require('path');
const part1 = require(path.join(__dirname, 'creative_themes_part1.cjs'));
const part2 = require(path.join(__dirname, 'creative_themes_part2.cjs'));
const part3 = require(path.join(__dirname, 'creative_themes_part3.cjs'));
const part4 = require(path.join(__dirname, 'creative_themes_part4.cjs'));

console.log('Part 1 count:', part1.length);
console.log('Part 2 count:', part2.length);
console.log('Part 3 count:', part3.length);
console.log('Part 4 count:', part4.length);

const all = [...part1, ...part2, ...part3, ...part4];

// Check each theme's track style and dock backdrop
all.forEach((t, i) => {
  const isPlainTrack = !t.seekTrackBg.includes('gradient') && !t.seekTrackBg.includes('repeating');
  const isPlainFill = !t.seekFillBg.includes('gradient') && !t.seekFillBg.includes('repeating');
  const hasSolidDock = t.dockBackdrop && t.dockBackdrop.includes('background-color:');
  const hasBorderTop = t.dockBackdrop && t.dockBackdrop.includes('border-top:');
  
  if (isPlainTrack || isPlainFill || hasSolidDock || hasBorderTop) {
    console.log(`[${i + 54}] ${t.id} NEEDS REFINEMENT:`);
    if (isPlainTrack) console.log('  - seekTrack is plain:', t.seekTrackBg);
    if (isPlainFill) console.log('  - seekFill is plain:', t.seekFillBg);
    if (hasSolidDock) console.log('  - dockBackdrop has solid color:', t.dockBackdrop.trim());
    if (hasBorderTop) console.log('  - dockBackdrop has border-top:', t.dockBackdrop.trim());
  }
});
