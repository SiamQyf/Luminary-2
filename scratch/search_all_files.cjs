const fs = require('fs');

function search(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = dir + '/' + f.name;
    if (f.isDirectory() && f.name !== 'node_modules' && f.name !== '.git' && f.name !== 'dist' && f.name !== 'scratch') {
      search(full);
    } else if (f.isFile() && (f.name.endsWith('.tsx') || f.name.endsWith('.ts') || f.name.endsWith('.css') || f.name.endsWith('.html') || f.name.endsWith('.json'))) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('tourbillon-skeleton')) {
        console.log(full);
      }
    }
  }
}

console.log('--- In skin 2/custom-skin ---');
search('d:/video player/skin 2/custom-skin');

console.log('--- In custom-skin ---');
search('d:/video player/custom-skin');
