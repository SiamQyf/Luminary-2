const fs = require('fs');
const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');
const lines = css.split('\n');

let capturing = false;
let captured = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('GLACIAL PERMAFROST') || line.includes('glacial-permafrost')) {
    capturing = true;
  }
  if (capturing) {
    captured.push(`${i + 1}: ${line}`);
    if (line.includes('/* ==========================================================================') && !line.includes('GLACIAL')) {
      if (captured.length > 50) {
        capturing = false;
      }
    }
  }
}
fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_css_rules.txt', captured.join('\n'));
console.log('Saved', captured.length, 'lines');
