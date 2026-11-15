const fs = require('fs');
console.log('main.tsx:');
console.log(fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/main.tsx', 'utf8').slice(0, 1000));
console.log('\nskin.tsx:');
console.log(fs.readFileSync('d:/video player/skin 2/custom-skin/src/video/skin.tsx', 'utf8').slice(0, 1000));
