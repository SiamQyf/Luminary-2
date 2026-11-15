const fs = require('fs');
const content = fs.readFileSync('skin 2/custom-skin/apps/preview/src/shell/ambient-background.tsx', 'utf8');
const lines = content.split('\n');
console.log('Total lines in ambient-background.tsx:', lines.length);
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('tourbillon-skeleton') || lines[i].includes('monochrome-editorial')) {
    console.log(`Line ${i + 1}: ${lines[i]}`);
  }
}
