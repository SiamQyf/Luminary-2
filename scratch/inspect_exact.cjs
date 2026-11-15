const fs = require('fs');
const css = fs.readFileSync('D:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

function showThemeExact(themeId) {
  console.log(`\n=================== ${themeId} ===================`);
  const idx = css.indexOf(`[data-theme="${themeId}"]`);
  if (idx !== -1) {
    console.log(css.slice(idx, idx + 1800));
  } else {
    console.log('Not found');
  }
}

showThemeExact('linear-ticks');
showThemeExact('dot-matrix');
showThemeExact('retro-terminal');
