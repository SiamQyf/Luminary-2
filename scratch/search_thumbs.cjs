const fs = require('fs');
const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

const regex = /\[data-theme="([^"]+)"\][^{]*\.media-thumb-smooth[^{]*\{([^}]+)\}/g;
let m;
const themesWithThumbs = [];
while ((m = regex.exec(css)) !== null) {
  themesWithThumbs.push({ theme: m[1], css: m[2].replace(/\s+/g, ' ') });
}
console.log('Total thumb rules:', themesWithThumbs.length);
themesWithThumbs.forEach(t => {
  console.log(t.theme, '=>', t.css.slice(0, 100));
});
