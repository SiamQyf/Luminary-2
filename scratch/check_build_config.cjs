const fs = require('fs');
console.log('package.json:');
console.log(fs.readFileSync('d:/video player/skin 2/custom-skin/package.json', 'utf8'));
console.log('vite.config.ts:');
if (fs.existsSync('d:/video player/skin 2/custom-skin/vite.config.ts')) {
  console.log(fs.readFileSync('d:/video player/skin 2/custom-skin/vite.config.ts', 'utf8'));
}
