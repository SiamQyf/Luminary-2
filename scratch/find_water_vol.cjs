const fs = require('fs');

const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

const regex = /[^\n\}]*water-droplet[^\n\{]*volume[^\n\{]*\{[^}]*\}/g;
let m;
while ((m = regex.exec(css)) !== null) {
  console.log('--- FOUND ---');
  console.log(m[0]);
}

const regex2 = /[^\n\}]*water-droplet[^\n\{]*vol-pill[^\n\{]*\{[^}]*\}/g;
while ((m = regex2.exec(css)) !== null) {
  console.log('--- FOUND PILL ---');
  console.log(m[0]);
}
