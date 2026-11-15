const fs = require('fs');
const content = fs.readFileSync('D:/video player/skin 2/custom-skin/apps/preview/src/frame/video-input.tsx', 'utf8');
const regex = /\{\s*id:\s*['"]([^'"]+)['"],\s*label:\s*['"]([^'"]+)['"]/g;
const items = [];
let m;
while ((m = regex.exec(content)) !== null) {
  items.push({ id: m[1], label: m[2] });
}
console.log('Total items found:', items.length);
const new50 = items.slice(50);
console.log(new50.map((x, i) => (51 + i) + ': ' + x.id + ' (' + x.label + ')').join('\n'));
