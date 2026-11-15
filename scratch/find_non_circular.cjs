const fs = require('fs');
const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

const regex = /\[data-theme="([^"]+)"\][^{]*\.group\/liquid-btn[^{]*\{([^}]+)\}/g;
let m;
const map = {};
while ((m = regex.exec(css)) !== null) {
  const theme = m[1];
  const body = m[2];
  const br = body.match(/border-radius:\s*([^;!]+)/);
  if (br && !br[1].includes('9999')) {
    map[theme] = br[1].trim();
  }
}
console.log('Themes with non-circular buttons:', map);
