const fs = require('fs');
const path = require('path');

function removeNew50Css(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const startMarker = 'THEME: Tourbillon Skeleton';
  const endMarker = 'Universal Silky-Smooth Progress Knob';

  const startIdx = content.indexOf(startMarker);
  const endIdx = content.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    console.error(`Markers not found in ${filePath}: start=${startIdx}, end=${endIdx}`);
    return;
  }

  const commentStart = content.lastIndexOf('/*', startIdx);
  const commentEnd = content.lastIndexOf('/*', endIdx);

  const before = content.slice(0, commentStart).trimEnd();
  const after = content.slice(commentEnd);

  const newContent = before + '\n\n' + after;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Successfully removed new 50 themes CSS from ${filePath}`);
}

const targetFiles = [
  'd:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css',
  'd:/video player/skin 2/custom-skin/src/skin.css',
  'd:/video player/custom-skin/apps/preview/src/frame/preview.css',
  'd:/video player/custom-skin/src/skin.css'
];

targetFiles.forEach(removeNew50Css);
