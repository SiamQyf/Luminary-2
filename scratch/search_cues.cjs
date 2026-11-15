const fs = require('fs');

const css = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

for (const term of ['::cue', 'vjs-text-track', 'text-track', 'captions-display']) {
  console.log(term, css.includes(term));
}
