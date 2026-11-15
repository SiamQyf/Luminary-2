const fs = require('fs');
const content = fs.readFileSync('d:/video player/skin 2/custom-skin/src/skin.css', 'utf8');
console.log('has horizontal-volume-slider:', content.includes('horizontal-volume-slider'));
console.log('has vol-pill:', content.includes('vol-pill'));
