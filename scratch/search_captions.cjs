const fs = require('fs');

function searchInFile(file, term) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes(term)) {
    console.log(`Found "${term}" in ${file}`);
  }
}

function walk(dir, term) {
  for (const f of fs.readdirSync(dir)) {
    const full = dir + '/' + f;
    if (fs.statSync(full).isDirectory()) {
      if (f !== 'node_modules' && f !== '.git' && f !== 'dist') walk(full, term);
    } else if (/\.(tsx|ts|css|html)$/.test(f)) {
      searchInFile(full, term);
    }
  }
}

console.log('--- Searching for caption-pill ---');
walk('d:/video player/skin 2/custom-skin/src', 'caption-pill');
walk('d:/video player/skin 2/custom-skin/apps', 'caption-pill');
console.log('--- Searching for caption-text ---');
walk('d:/video player/skin 2/custom-skin/src', 'caption-text');
walk('d:/video player/skin 2/custom-skin/apps', 'caption-text');
