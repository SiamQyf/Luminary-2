const fs = require('fs');

const ambient = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/shell/ambient-background.tsx', 'utf8');
console.log('ambient-background.tsx snippet:');
console.log(ambient.slice(0, 1500));

const logo = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/shell/logo.tsx', 'utf8');
console.log('\nlogo.tsx snippet:');
console.log(logo.slice(0, 1500));
