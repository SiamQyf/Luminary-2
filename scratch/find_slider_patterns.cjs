const fs = require('fs');
const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

const regex = /\.preview-player\[data-theme="([a-z0-9-]+)"\]\s+div\[class\*="media-slider-smooth"\]\[class\*="isolate"\]\s*\{([^}]*)\}/g;
let match;
let count = 0;
while ((match = regex.exec(css)) !== null && count < 6) {
  console.log('--- Theme:', match[1], '---');
  console.log(match[2].trim());
  count++;
}
