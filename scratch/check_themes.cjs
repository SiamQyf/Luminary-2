const fs = require('fs');

const skinCss = fs.readFileSync('d:/video player/skin 2/custom-skin/src/skin.css', 'utf8');
const previewCss = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

console.log('skin.css bytes:', skinCss.length, 'lines:', skinCss.split('\n').length);
console.log('preview.css bytes:', previewCss.length, 'lines:', previewCss.split('\n').length);

const themeRegex = /\[data-theme=["']([a-zA-Z0-9_-]+)["']\]/g;
const previewThemes = new Set();
let m;
while ((m = themeRegex.exec(previewCss)) !== null) {
  previewThemes.add(m[1]);
}
console.log('preview.css themes count:', previewThemes.size);
console.log('preview.css themes:', Array.from(previewThemes).sort());

const skinThemes = new Set();
while ((m = themeRegex.exec(skinCss)) !== null) {
  skinThemes.add(m[1]);
}
console.log('skin.css themes count:', skinThemes.size);
console.log('skin.css themes:', Array.from(skinThemes).sort());
