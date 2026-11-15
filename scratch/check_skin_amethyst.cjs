const fs = require('fs');
const skinCss = fs.readFileSync('d:/video player/skin 2/custom-skin/src/skin.css', 'utf8');

// Find lines containing amethyst-geode
const lines = skinCss.split('\n');
lines.forEach((l, i) => {
  if (l.includes('amethyst-geode')) {
    console.log(`Line ${i}: ${l}`);
  }
});
