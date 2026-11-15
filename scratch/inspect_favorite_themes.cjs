const fs = require('fs');
const css = fs.readFileSync('skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

function extractThemeCss(themeId) {
  const regex = new RegExp(`(\\/\\*[^\\n]*THEME:[^\\n]*${themeId}[\\s\\S]*?)(?=\\/\\* ===|$)`, 'i');
  const match = css.match(regex);
  if (match) return match[0];
  // fallback search for selector
  const selRegex = new RegExp(`(\\.preview-player\\[data-theme="${themeId}"\\][\\s\\S]*?)(?=\\.preview-player\\[data-theme="|$)`);
  const selMatch = css.match(selRegex);
  return selMatch ? selMatch[0] : 'NOT FOUND';
}

console.log('=== LINEAR TICKS ===');
console.log(extractThemeCss('linear-ticks').slice(0, 1500));
console.log('=== DOT MATRIX ===');
console.log(extractThemeCss('dot-matrix').slice(0, 1500));
console.log('=== RETRO TERMINAL ===');
console.log(extractThemeCss('retro-terminal').slice(0, 1500));
