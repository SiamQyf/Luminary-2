const fs = require('fs');
const content = fs.readFileSync('skin 2/custom-skin/apps/preview/src/shell/logo.tsx', 'utf8');
const lines = content.split('\n');
console.log('--- Around 910 ---');
console.log(lines.slice(905, 920).join('\n'));
console.log('--- Around 1810 ---');
console.log(lines.slice(1805, 1820).join('\n'));
