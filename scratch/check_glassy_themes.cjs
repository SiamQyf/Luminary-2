const fs = require('fs');

const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

const glassyThemes = ['crystal', 'water-droplet', 'holo-prism', 'frutiger-aero'];

for (const t of glassyThemes) {
  const reg = new RegExp(`\\.preview-player\\[data-theme="${t}"\\][^{]*\\{[^}]*\\}`, 'g');
  let m;
  console.log(`=== THEME: ${t} ===`);
  while ((m = reg.exec(css)) !== null) {
    if (m[0].includes('caption-pill')) {
      console.log(m[0]);
    }
  }
}
