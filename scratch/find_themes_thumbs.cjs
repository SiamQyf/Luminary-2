const fs = require('fs');
const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');
const regex = /\.preview-player\[data-theme="([^"]+)"\][^{]*\.media-thumb-smooth/g;
let m;
const set = new Set();
while ((m = regex.exec(css)) !== null) {
  set.add(m[1]);
}
console.log('Themes targeting media-thumb-smooth:', Array.from(set));
