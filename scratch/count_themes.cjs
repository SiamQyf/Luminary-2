const fs = require('fs');
const content = fs.readFileSync('d:/video player/skin 2/custom-skin/src/video/shared/settings-menu.tsx', 'utf8');
const match = content.match(/export const THEME_STYLES = \[([\s\S]*?)\] as const;/);
if (match) {
  const items = match[1].match(/\{ id: '([^']+)', label: '([^']+)' \}/g);
  console.log('Total themes:', items.length);
  console.log('Last 5 themes:', items.slice(-5));
}
