const fs = require('fs');
const settingsMenu = fs.readFileSync('d:/video player/skin 2/custom-skin/src/video/shared/settings-menu.tsx', 'utf8');

const match = settingsMenu.match(/export const THEME_STYLES = \[([\s\S]*?)\] as const;/);
if (match) {
  const items = match[1].split('\n').filter(l => l.includes('{ id:'));
  console.log('Count in settings-menu.tsx:', items.length);
  items.forEach((item, idx) => console.log((idx + 1) + ': ' + item.trim()));
}
