const fs = require('fs');

function inspectAroundEnd(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const idx = content.indexOf('Universal Silky-Smooth Progress Knob');
  console.log(`\n=== 200 chars before index ${idx} in ${filePath} ===`);
  console.log(content.slice(Math.max(0, idx - 200), idx + 100));
}

inspectAroundEnd('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
