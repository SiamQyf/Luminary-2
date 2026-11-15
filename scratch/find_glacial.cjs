const fs = require('fs');

function findGlacial(file) {
  const css = fs.readFileSync(file, 'utf8');
  const lines = css.split('\n');
  const matched = [];
  let block = [];
  let capturing = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes('glacial-permafrost')) {
      capturing = true;
    }
    if (capturing) {
      block.push(line);
      if (line.includes('}')) {
        matched.push(block.join('\n'));
        block = [];
        capturing = false;
      }
    }
  }
  return matched;
}

console.log('=== In preview.css ===');
const m1 = findGlacial('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
console.log('Total blocks in preview.css:', m1.length);
m1.forEach((b, i) => console.log(`Block ${i + 1}:\n${b}\n---`));
