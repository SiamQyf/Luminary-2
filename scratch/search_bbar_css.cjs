const fs = require('fs');
const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

const regex = /[^{}]*bottom-controls-bar[^{}]*\{([^}]*)\}/g;
let m;
let count = 0;
while ((m = regex.exec(css)) !== null) {
  if (count++ < 10) {
    console.log(m[0].slice(0, 300));
    console.log('---');
  }
}
