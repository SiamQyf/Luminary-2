const fs = require('fs');

const css = fs.readFileSync('d:/video player/skin 2/custom-skin/src/skin.css', 'utf8');

const lightThemes = ['gamepad-white', 'news-magazine', 'clay-pastel', 'swiss-intl', 'polaroid-film', 'porcelain-cobalt', 'crystal', 'water-droplet', 'holo-prism', 'frutiger-aero'];

for (const t of lightThemes) {
  const reg = new RegExp(`[^{}]*\\[data-theme="${t}"\\][^{]*\\{[^}]*\\}`, 'g');
  let m;
  console.log(`=== THEME: ${t} ===`);
  while ((m = reg.exec(css)) !== null) {
    if (m[0].includes('caption-pill')) {
      console.log(m[0]);
    }
  }
}
