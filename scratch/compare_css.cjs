const fs = require('fs');

const f1 = 'd:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css';
const f2 = 'd:/video player/skin 2/custom-skin/src/skin.css';

const c1 = fs.readFileSync(f1, 'utf8');
const c2 = fs.readFileSync(f2, 'utf8');

console.log('preview.css length:', c1.length);
console.log('skin.css length:', c2.length);

const lightThemes = ['gamepad-white', 'news-magazine', 'clay-pastel', 'swiss-intl', 'polaroid-film', 'porcelain-cobalt', 'crystal', 'water-droplet', 'holo-prism', 'frutiger-aero'];

for (const t of lightThemes) {
  const inF1 = c1.includes(`data-theme="${t}"`);
  const inF2 = c2.includes(`data-theme="${t}"`);
  console.log(`Theme ${t}: in preview.css: ${inF1}, in skin.css: ${inF2}`);
}
