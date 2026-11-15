const fs = require('fs');
const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

// Find all rules containing water-droplet and thumb
const lines = css.split('\n');
lines.forEach((l, idx) => {
  if (l.includes('water-droplet') && (l.includes('thumb') || l.includes('nob'))) {
    console.log(`${idx + 1}: ${l}`);
  }
});
