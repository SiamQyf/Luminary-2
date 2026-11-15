const fs = require('fs');
const content = fs.readFileSync('d:/video player/skin 2/custom-skin/src/skin.css', 'utf8');
const idx = content.indexOf('group/vol-pill');
if (idx !== -1) {
  console.log(content.slice(idx - 50, idx + 350));
}
