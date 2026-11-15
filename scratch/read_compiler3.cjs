const fs = require('fs');
const content = fs.readFileSync('skin 2/custom-skin/scratch/compile_and_apply_creative_themes.cjs', 'utf8');
console.log(content.slice(7000, 11000));
