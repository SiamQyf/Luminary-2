const fs = require('fs');

function check(f) {
  if (fs.existsSync(f)) {
    const c = fs.readFileSync(f, 'utf8');
    if (c.includes('glacial-permafrost')) console.log('Found in', f);
  }
}

check('d:/video player/skin 2/custom-skin/src/styles/themes/theme.css');
check('d:/video player/skin 2/custom-skin/src/styles/video/theme.css');
check('d:/video player/skin 2/custom-skin/src/styles/themes/scaffold.css');
check('d:/video player/skin 2/custom-skin/src/styles/video/scaffold.css');
check('d:/video player/skin 2/custom-skin/src/styles/themes/preferences.css');
