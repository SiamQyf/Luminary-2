const fs = require('fs');
const content = fs.readFileSync('skin 2/custom-skin/apps/preview/src/frame/video-input.tsx', 'utf8');

// Find where themes are listed
const lines = content.split('\n');
console.log('Total lines in video-input.tsx:', lines.length);
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('tourbillon-skeleton') || lines[i].includes('monochrome-editorial')) {
    console.log(`Line ${i + 1}: ${lines[i]}`);
  }
}
