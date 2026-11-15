const fs = require('fs');

const previewCss = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

function extractThemeAll(themeId) {
  console.log(`\n============================ THEME: ${themeId} ============================`);
  const lines = previewCss.split('\n');
  let capturing = false;
  let block = [];
  let found = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(`[data-theme="${themeId}"]`)) {
      capturing = true;
    }
    if (capturing) {
      block.push(line);
      if (line.trim().endsWith('}') && block.join('\n').split('{').length <= block.join('\n').split('}').length) {
        found++;
        console.log(`/* Block ${found} */`);
        console.log(block.join('\n'));
        block = [];
        capturing = false;
      }
    }
  }
  console.log(`Total blocks for ${themeId}: ${found}`);
}

extractThemeAll('linear-ticks');
extractThemeAll('dot-matrix');
extractThemeAll('retro-terminal');
