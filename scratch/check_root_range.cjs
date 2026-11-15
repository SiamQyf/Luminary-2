const fs = require('fs');

function checkFile(file) {
  const content = fs.readFileSync(file, 'utf8');
  const startMarker = 'THEME: Tourbillon Skeleton';
  const endMarker = 'Universal Silky-Smooth Progress Knob';

  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);
  const commentStart = content.lastIndexOf('/*', startIdx);
  const commentEnd = content.lastIndexOf('/*', endIdx);

  console.log(file);
  console.log('  commentStart:', commentStart, 'commentEnd:', commentEnd);
}

checkFile('d:/video player/custom-skin/apps/preview/src/frame/preview.css');
checkFile('d:/video player/custom-skin/src/skin.css');
