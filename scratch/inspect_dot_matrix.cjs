const fs = require('fs');
const previewCss = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

const lines = previewCss.split('\n');
let capturing = false;
let block = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('[data-theme="dot-matrix"]')) {
    capturing = true;
  }
  if (capturing) {
    block.push(line);
    if (line.trim().endsWith('}') && block.join('\n').split('{').length <= block.join('\n').split('}').length) {
      if (block.some(l => l.includes('slider') || l.includes('radial-gradient') || l.includes('bottom-controls-bar') || l.includes('pill'))) {
        console.log(block.join('\n'));
        console.log('---');
      }
      block = [];
      capturing = false;
    }
  }
}
