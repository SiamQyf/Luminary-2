const fs = require('fs');

const cssPath = 'd:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css';
const css = fs.readFileSync(cssPath, 'utf8');

const regex = /([^{}]*\[data-part="caption-pill"\][^{]*)\{([^}]*)\}/g;
let m;
const rules = [];
while ((m = regex.exec(css)) !== null) {
  const sel = m[1].trim();
  const body = m[2].trim();
  rules.push({ sel, body });
}
console.log('Found ' + rules.length + ' caption-pill rules in preview.css\n');

for (const r of rules) {
  const colorMatch = r.body.match(/color\s*:\s*([^;]+)/i);
  const bgMatch = r.body.match(/background(?:-color)?\s*:\s*([^;]+)/i);
  const themeMatch = r.sel.match(/data-theme="([^"]+)"/);
  const theme = themeMatch ? themeMatch[1] : 'DEFAULT';
  console.log(`Theme [${theme}]:`);
  console.log(`  BG:    ${bgMatch ? bgMatch[1].trim() : 'unset'}`);
  console.log(`  COLOR: ${colorMatch ? colorMatch[1].trim() : 'unset'}`);
}
