const fs = require('fs');
const css = fs.readFileSync('skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

function inspectTheme(file, themeId) {
  const lines = css.split('\n');
  const matchingBlocks = [];
  let currentBlock = [];
  let recording = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(`data-theme="${themeId}"`)) {
      recording = true;
    }
    if (recording) {
      currentBlock.push(line);
      if (line.includes('}')) {
        matchingBlocks.push(currentBlock.join('\n'));
        currentBlock = [];
        recording = false;
      }
    }
  }
  return matchingBlocks;
}

console.log('=== dot-matrix ===');
const dm = inspectTheme('skin 2/custom-skin/apps/preview/src/frame/preview.css', 'dot-matrix');
dm.forEach((b, i) => console.log(`--- Block ${i + 1} ---\n${b}\n`));
