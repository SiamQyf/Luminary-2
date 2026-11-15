const fs = require('fs');
const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

const regex = /\.preview-player\[data-theme="(linear-ticks|dot-matrix|retro-terminal|podcast-studio)"\][^{]*?bottom-controls-bar[^{]*?\{([^}]*)\}/g;
let m;
while ((m = regex.exec(css)) !== null) {
  console.log(m[0]);
}
