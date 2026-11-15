const fs = require('fs');
const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

const regex = /\.preview-player\[data-theme="([^"]+)"\] \.group\/liquid-btn[^{]*\{[^}]*border-radius:\s*(0px|0|2px|3px|4px)[^}]*\}/g;
let m;
const found = [];
while ((m = regex.exec(css)) !== null) {
  found.push(m[1]);
}
console.log('Found themes with square/boxy buttons:', found);
