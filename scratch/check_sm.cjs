const fs = require('fs');
const content = fs.readFileSync('skin 2/custom-skin/src/video/shared/settings-menu.tsx', 'utf8');
const lines = content.split('\n');
console.log('Total lines in settings-menu.tsx:', lines.length);
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('tourbillon-skeleton') || lines[i].includes('monochrome-editorial')) {
    console.log(`Line ${i + 1}: ${lines[i]}`);
  }
}
