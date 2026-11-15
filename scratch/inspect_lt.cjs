const fs = require('fs');

function inspectTheme(file, themeId) {
  const css = fs.readFileSync(file, 'utf8');
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

console.log('=== linear-ticks in preview.css ===');
const lt = inspectTheme('skin 2/custom-skin/apps/preview/src/frame/preview.css', 'linear-ticks');
lt.forEach((b, i) => console.log(`--- Block ${i + 1} ---\n${b}\n`));
