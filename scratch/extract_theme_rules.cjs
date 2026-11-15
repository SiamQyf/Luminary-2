const fs = require('fs');
const previewCss = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

// Find all CSS rules targeting [data-theme="amethyst-geode"]
const lines = previewCss.split('\n');
const themeRules = [];
let capturing = false;
let currentBlock = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('[data-theme="amethyst-geode"]')) {
    capturing = true;
  }
  if (capturing) {
    currentBlock.push(line);
    if (line.includes('}') && currentBlock.join('\n').split('{').length <= currentBlock.join('\n').split('}').length) {
      themeRules.push(currentBlock.join('\n'));
      currentBlock = [];
      capturing = false;
    }
  }
}

console.log('Sample rules for amethyst-geode:');
console.log(themeRules.slice(0, 15).join('\n---\n'));
