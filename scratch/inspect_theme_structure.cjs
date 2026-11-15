const fs = require('fs');
const previewCss = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

// Look for a few themes: 'amethyst-geode', 'tactical-hud', 'podcast-studio', 'bauhaus'
function showThemeRules(theme) {
  console.log(`\n=================== THEME: ${theme} ===================`);
  const regex = new RegExp(`(\\[data-theme=["']?${theme}["']?[\\s\\S]*?)(?=\\[data-theme|$)`, 'g');
  const matches = [];
  let m;
  let count = 0;
  while ((m = regex.exec(previewCss)) !== null) {
    count++;
    if (count <= 3) {
      console.log('--- Rule ' + count + ' ---');
      console.log(m[0].slice(0, 500) + '...');
    }
  }
  console.log(`Total rule blocks mentioning ${theme}: ${count}`);
}

showThemeRules('amethyst-geode');
showThemeRules('tactical-hud');
showThemeRules('podcast-studio');
