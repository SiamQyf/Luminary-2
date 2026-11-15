const fs = require('fs');

const css = fs.readFileSync('skin 2/custom-skin/src/skin.css', 'utf8');
const lines = css.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('glacial-permafrost')) {
    console.log(`Line ${i + 1}: ${lines[i]}`);
  }
}
