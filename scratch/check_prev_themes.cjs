const { execSync } = require('child_process');
const content = execSync('git show 2adc667:apps/preview/src/frame/video-input.tsx', { cwd: 'd:/video player/skin 2/custom-skin', encoding: 'utf8' });

const regex = /\{ id: '([^']+)', label: '([^']+)' \}/g;
let m;
const themes = [];
while ((m = regex.exec(content)) !== null) {
  themes.push({ id: m[1], label: m[2] });
}
console.log('Total themes in STYLE_OPTIONS at 2adc667:', themes.length);
themes.forEach((t, i) => console.log(`${i}: ${t.id} (${t.label})`));
