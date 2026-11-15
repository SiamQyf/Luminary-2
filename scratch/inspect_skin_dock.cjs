const fs = require('fs');
const css = fs.readFileSync('skin 2/custom-skin/src/skin.css', 'utf8');

const regex = /\[data-theme="([^"]+)"\][^{]*\[data-part="bottom-controls-bar"\][^{]*\{([^}]+)\}/g;
let match;
let count = 0;
while ((match = regex.exec(css)) !== null) {
  count++;
  if (count <= 5) {
    console.log(`=== ${match[1]} ===`);
    console.log(match[0].trim());
    console.log('----------------------------');
  }
}
console.log('Total in skin.css:', count);
