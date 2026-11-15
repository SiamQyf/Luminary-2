const fs = require('fs');

const files = [
  'd:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css',
  'd:/video player/custom-skin/apps/preview/src/frame/preview.css'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  const target = '/* Seekbar Track (Bottom of Seekbar): Styled exactly like the Water Droplet Icon Background */';
  const idx = content.indexOf(target);
  if (idx !== -1) {
    const endMarker = '.preview-player[data-theme="water-droplet"] time-value';
    const endIdx = content.indexOf(endMarker, idx);
    if (endIdx !== -1) {
      console.log(`Found old block in ${f}: length ${endIdx - idx}`);
      content = content.slice(0, idx) + content.slice(endIdx);
      fs.writeFileSync(f, content, 'utf8');
      console.log(`Removed old block from ${f}`);
    } else {
      console.log(`End marker not found in ${f}`);
    }
  } else {
    console.log(`Target not found in ${f}`);
  }
}
