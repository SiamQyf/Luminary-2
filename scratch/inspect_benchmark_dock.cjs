const fs = require('fs');
const css = fs.readFileSync('skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

const regex = /\.preview-player\[data-theme="([^"]+)"\] \.media-skin \[data-part="bottom-controls-bar"\][^{]*\{([^}]+)\}/g;
let match;
let count = 0;
while ((match = regex.exec(css)) !== null) {
  count++;
  if (count <= 12) {
    console.log(`=== ${match[1]} ===`);
    console.log(match[0].trim());
    console.log('----------------------------');
  }
}
console.log('Total found:', count);
