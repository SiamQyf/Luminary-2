const fs = require('fs');
const previewCss = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

// Find a complete single theme block, e.g. for 'emerald-vault' or 'liquid-mercury'
const start = previewCss.indexOf('Emerald Vault');
if (start !== -1) {
  console.log('Emerald Vault block in preview.css:');
  console.log(previewCss.slice(start, start + 3000));
} else {
  // Let's find any theme comment
  const m = previewCss.match(/\/\*\s*([A-Za-z0-9 &'-]+)\s*\(([a-z0-9-]+)\)\s*\*\//);
  if (m) {
    console.log('Matched theme comment:', m[0]);
    const idx = previewCss.indexOf(m[0]);
    console.log(previewCss.slice(idx, idx + 2500));
  }
}
