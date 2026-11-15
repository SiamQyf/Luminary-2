const fs = require('fs');
const settingsMenu = fs.readFileSync('d:/video player/skin 2/custom-skin/src/video/shared/settings-menu.tsx', 'utf8');

const idx = settingsMenu.indexOf('THEME_STYLES');
if (idx !== -1) {
  console.log('THEME_STYLES found in settings-menu.tsx:');
  console.log(settingsMenu.slice(idx, idx + 1000));
} else {
  console.log('THEME_STYLES NOT found in settings-menu.tsx');
}
