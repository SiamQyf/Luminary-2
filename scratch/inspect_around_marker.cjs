const fs = require('fs');

function inspectAround(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const idx = content.indexOf('THEME: Tourbillon Skeleton');
  console.log(`\n=== 200 chars before index ${idx} in ${filePath} ===`);
  console.log(content.slice(Math.max(0, idx - 200), idx + 100));
}

inspectAround('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
