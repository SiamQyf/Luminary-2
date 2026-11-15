const fs = require('fs');
const css = fs.readFileSync('D:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

function showThemeSnippet(themeId) {
  console.log(`\n=================== ${themeId} ===================`);
  const regex = new RegExp(`(\\/\\*[\\s\\S]*?${themeId}[\\s\\S]*?\\*\\/[\\s\\S]*?)(?=\\/\\* ==========================================================================|\\/\\* Universal Silky-Smooth|$)`, 'i');
  const m = css.match(regex);
  if (m) {
    console.log(m[1].slice(0, 2000));
  } else {
    // search simple selector
    const idx = css.indexOf(`data-theme="${themeId}"`);
    if (idx !== -1) {
      console.log(css.slice(idx - 100, idx + 1500));
    } else {
      console.log('Not found in preview.css');
    }
  }
}

showThemeSnippet('linear-ticks');
showThemeSnippet('dot-matrix');
showThemeSnippet('retro-terminal');
