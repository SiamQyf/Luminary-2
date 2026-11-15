const fs = require('fs');
const content = fs.readFileSync('skin 2/custom-skin/src/skin.css', 'utf8');

const startMarker = 'THEME: Tourbillon Skeleton';
const endMarker = 'Universal Silky-Smooth Progress Knob';

const startIdx = content.indexOf(startMarker);
const endIdx = content.indexOf(endMarker);

console.log('startIdx:', startIdx, 'endIdx:', endIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const commentStart = content.lastIndexOf('/*', startIdx);
  const commentEnd = content.lastIndexOf('/*', endIdx);
  console.log('commentStart:', commentStart, 'commentEnd:', commentEnd);
  console.log('Snippet before commentStart:');
  console.log(content.slice(commentStart - 300, commentStart));
  console.log('Snippet at commentEnd:');
  console.log(content.slice(commentEnd, commentEnd + 300));
}
