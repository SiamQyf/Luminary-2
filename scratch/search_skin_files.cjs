const fs = require('fs');

function searchTheme(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = dir + '/' + f.name;
    if (f.isDirectory()) searchTheme(full);
    else if (f.isFile() && f.name.endsWith('.css')) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('glacial-permafrost') && c.includes('media-slider-smooth')) {
        console.log('Found in:', full);
      }
    }
  }
}

searchTheme('d:/video player/skin 2/custom-skin/src');
