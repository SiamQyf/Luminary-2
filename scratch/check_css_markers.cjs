const fs = require('fs');

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`\n=== Checking ${filePath} ===`);
  const firstIdx = content.indexOf('THEME: Tourbillon Skeleton');
  const lastIdx = content.lastIndexOf('THEME: Newtonian Optical Prism');
  console.log('First index of tourbillon-skeleton:', firstIdx);
  console.log('Last index of prism-rainbow:', lastIdx);
  const smoothIdx = content.indexOf('Universal Silky-Smooth Progress Knob');
  console.log('Index of Universal Silky-Smooth:', smoothIdx);
}

checkFile('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
checkFile('d:/video player/skin 2/custom-skin/src/skin.css');
