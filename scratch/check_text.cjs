const fs = require('fs');
const content = fs.readFileSync('d:/video player/skin 2/custom-skin/scratch/hifi_remote.css', 'utf8');
const idx = content.indexOf('/* Recessed Control Panel Deck');
console.log(content.slice(idx, idx + 450));
