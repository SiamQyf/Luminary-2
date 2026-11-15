const fs = require('fs');
const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

const regex = /\[data-theme="([^"]+)"\][^{]*\[data-part="bottom-controls-bar"\][^{]*\{([^}]+)\}/g;
let m;
while ((m = regex.exec(css)) !== null) {
  console.log('--- Theme:', m[1], '---');
  console.log(m[0]);
}
