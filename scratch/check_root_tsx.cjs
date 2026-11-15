const fs = require('fs');

function checkThemeCount(file) {
  const content = fs.readFileSync(file, 'utf8');
  const hasTourbillon = content.includes('tourbillon-skeleton');
  console.log(file, 'has tourbillon:', hasTourbillon);
}

checkThemeCount('d:/video player/custom-skin/apps/preview/src/frame/video-input.tsx');
checkThemeCount('d:/video player/custom-skin/apps/preview/src/shell/ambient-background.tsx');
checkThemeCount('d:/video player/custom-skin/apps/preview/src/shell/logo.tsx');
checkThemeCount('d:/video player/custom-skin/src/video/shared/settings-menu.tsx');
