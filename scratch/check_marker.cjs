const fs = require('fs');

const marker = '/* Universal Smooth Advancement Across ALL Themes */';
const p1 = 'd:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css';
const s1 = 'd:/video player/skin 2/custom-skin/src/skin.css';
const p2 = 'd:/video player/custom-skin/apps/preview/src/frame/preview.css';
const s2 = 'd:/video player/custom-skin/src/skin.css';

console.log(p1, fs.readFileSync(p1, 'utf8').includes(marker));
console.log(s1, fs.readFileSync(s1, 'utf8').includes(marker));
console.log(p2, fs.readFileSync(p2, 'utf8').includes(marker));
console.log(s2, fs.readFileSync(s2, 'utf8').includes(marker));
