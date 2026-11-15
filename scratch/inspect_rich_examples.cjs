const fs = require('fs');
const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

function inspectThemeFull(id) {
  console.log(`\n=================== THEME: ${id} ===================`);
  // find all lines containing id
  const lines = css.split('\n');
  let capturing = false;
  let block = [];
  let depth = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes(`[data-theme="${id}"]`) || (capturing && (line.includes('{') || depth > 0))) {
      capturing = true;
      block.push(line);
      depth += (line.match(/\{/g) || []).length;
      depth -= (line.match(/\}/g) || []).length;
      if (depth === 0 && line.includes('}')) {
        console.log(block.join('\n'));
        console.log('---');
        block = [];
        capturing = false;
      }
    }
  }
}

inspectThemeFull('tactical-hud');
inspectThemeFull('blueprint');
inspectThemeFull('vinyl-turntable');
