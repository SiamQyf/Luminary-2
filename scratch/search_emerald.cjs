const fs = require('fs');
const previewCss = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

const matches = [];
const lines = previewCss.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('[data-theme="emerald-vault"]')) {
    matches.push(`Line ${idx + 1}: ${line}`);
  }
});

console.log('Matches for emerald-vault in preview.css:', matches.length);
console.log(matches.slice(0, 20).join('\n'));
