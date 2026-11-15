const fs = require('fs');

const css = fs.readFileSync('skin 2/custom-skin/src/skin.css', 'utf8');

function checkTheme(id) {
  const hasSlider = css.includes(`[data-theme="${id}"] div[class*="media-slider-smooth"]`) || css.includes(`[data-theme="${id}"] .group/slider`);
  console.log(`Theme ${id} in src/skin.css has slider rules:`, hasSlider);
}

checkTheme('podcast-studio');
checkTheme('linear-ticks');
checkTheme('dot-matrix');
checkTheme('glacial-permafrost');
