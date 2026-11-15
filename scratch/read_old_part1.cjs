const fs = require('fs');
const content = fs.readFileSync('D:/video player/skin 2/custom-skin/scratch/themes_data_part1.cjs', 'utf8');
console.log(content.slice(0, 1000));
console.log('--- END OF FILE ---');
console.log(content.slice(-500));
