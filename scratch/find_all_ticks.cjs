const fs = require('fs');
const css = fs.readFileSync('D:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'utf8');

function findRules(id) {
  console.log(`\n=================== ALL OCCURRENCES OF "${id}" ===================`);
  let idx = 0;
  while ((idx = css.indexOf(id, idx)) !== null) {
    if (idx === -1) break;
    // get surrounding lines
    const start = Math.max(0, css.lastIndexOf('\n', idx - 1));
    const end = Math.min(css.length, css.indexOf('}', idx) + 1);
    console.log(css.slice(start, Math.min(start + 400, end)).trim());
    console.log('---');
    idx = end;
  }
}

findRules('linear-ticks');
