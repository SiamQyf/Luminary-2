import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Remove the old duplicate block:
// Starts at: /* ==========================================================================\n   14 DISTINCT THEMES: BUTTONS, DOCKS, SEEKBARS & SETTINGS MENUS
// Ends right before: /* ==========================================================================\n   14 THEMES: RIGOROUS DESIGN CONSISTENCY & BESPOKE VISUAL IDENTITY
const oldBlockStartMarker = '/* ==========================================================================\r\n   14 DISTINCT THEMES: BUTTONS, DOCKS, SEEKBARS & SETTINGS MENUS';
const oldBlockStartMarkerLF = '/* ==========================================================================\n   14 DISTINCT THEMES: BUTTONS, DOCKS, SEEKBARS & SETTINGS MENUS';

const newBlockStartMarker = '/* ==========================================================================\r\n   14 THEMES: RIGOROUS DESIGN CONSISTENCY & BESPOKE VISUAL IDENTITY';
const newBlockStartMarkerLF = '/* ==========================================================================\n   14 THEMES: RIGOROUS DESIGN CONSISTENCY & BESPOKE VISUAL IDENTITY';

let startIdx = css.indexOf(oldBlockStartMarker);
if (startIdx === -1) startIdx = css.indexOf(oldBlockStartMarkerLF);

let endIdx = css.indexOf(newBlockStartMarker);
if (endIdx === -1) endIdx = css.indexOf(newBlockStartMarkerLF);

console.log('Old block startIdx:', startIdx, 'endIdx:', endIdx);

if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
  css = css.slice(0, startIdx) + css.slice(endIdx);
  console.log('Successfully removed old duplicate 14-themes block!');
} else {
  console.warn('Could not locate old block by exact markers, checking alternate markers...');
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Updated preview.css length:', css.length);

