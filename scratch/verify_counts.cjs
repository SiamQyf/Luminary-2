const fs = require('fs');

function checkCounts(baseDir) {
  console.log(`\nChecking: ${baseDir}`);
  const vidContent = fs.readFileSync(`${baseDir}/apps/preview/src/frame/video-input.tsx`, 'utf8');
  const vidMatch = vidContent.match(/export const STYLE_OPTIONS = \[([\s\S]*?)\] as const;/);
  const vidCount = vidMatch ? vidMatch[1].split('\n').filter(l => l.includes('{ id:')).length : 0;
  console.log('video-input.tsx STYLE_OPTIONS count:', vidCount);

  const setContent = fs.readFileSync(`${baseDir}/src/video/shared/settings-menu.tsx`, 'utf8');
  const setMatch = setContent.match(/export const THEME_STYLES = \[([\s\S]*?)\] as const;/);
  const setCount = setMatch ? setMatch[1].split('\n').filter(l => l.includes('{ id:')).length : 0;
  console.log('settings-menu.tsx THEME_STYLES count:', setCount);

  const prevContent = fs.readFileSync(`${baseDir}/apps/preview/src/frame/preview.css`, 'utf8');
  const prevThemes = new Set(Array.from(prevContent.matchAll(/\[data-theme=["']([a-zA-Z0-9_-]+)["']\]/g)).map(m => m[1]));
  console.log('preview.css unique data-theme count:', prevThemes.size);

  const skinContent = fs.readFileSync(`${baseDir}/src/skin.css`, 'utf8');
  const skinThemes = new Set(Array.from(skinContent.matchAll(/\[data-theme=["']([a-zA-Z0-9_-]+)["']\]/g)).map(m => m[1]));
  console.log('skin.css unique data-theme count:', skinThemes.size);
}

checkCounts('d:/video player/skin 2/custom-skin');
checkCounts('d:/video player/custom-skin');
