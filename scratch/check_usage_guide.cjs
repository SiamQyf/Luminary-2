const fs = require('fs');
const guide = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/usage-guide.tsx', 'utf8');
console.log('usage-guide.tsx snippet:');
console.log(guide.slice(0, 1500));
