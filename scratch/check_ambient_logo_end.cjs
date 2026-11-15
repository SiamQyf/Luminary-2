const fs = require('fs');

const amb = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/shell/ambient-background.tsx', 'utf8');
const pStudioIdx = amb.indexOf("'podcast-studio'");
console.log('ambient podcast-studio:');
console.log(amb.slice(pStudioIdx, pStudioIdx + 500));

const logo = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/shell/logo.tsx', 'utf8');
const logoPStudioIdx = logo.indexOf("'podcast-studio'");
console.log('\nlogo podcast-studio:');
console.log(logo.slice(logoPStudioIdx, logoPStudioIdx + 800));
