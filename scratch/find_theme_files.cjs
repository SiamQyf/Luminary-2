const fs = require('fs');
const path = require('path');

function walk(dir, list = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (file === 'node_modules' || file === '.git' || file === 'dist') continue;
    if (fs.statSync(full).isDirectory()) {
      walk(full, list);
    } else if (file.endsWith('.css') || file.endsWith('.tsx') || file.endsWith('.ts')) {
      list.push(full);
    }
  }
  return list;
}

const allFiles = walk('d:/video player/skin 2/custom-skin');
const themeFiles = [];

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('podcast-studio') || content.includes('data-theme')) {
    themeFiles.push({ file, size: content.length });
  }
}

console.log('Files with theme references:');
themeFiles.forEach(t => console.log(t.file, t.size));
