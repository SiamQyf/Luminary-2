const fs = require('fs');

function cleanRules(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const oldChunkRegex = /\.preview-player\[data-theme="podcast-studio"\] \.group\\\/vol-pill div\[class\*="bg-white\/20"\][\s\S]*?box-shadow: 0 0 6px rgba\(245, 158, 11, 0\.6\), 0 1px 3px rgba\(0, 0, 0, 0\.4\) !important;\s*\}/;
  
  if (oldChunkRegex.test(content)) {
    content = content.replace(oldChunkRegex, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Cleaned old volume rules in', filePath);
  } else {
    console.log('oldChunkRegex not matched in', filePath);
  }
}

cleanRules('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
cleanRules('d:/video player/skin 2/custom-skin/src/skin.css');
cleanRules('d:/video player/custom-skin/apps/preview/src/frame/preview.css');
cleanRules('d:/video player/custom-skin/src/skin.css');
cleanRules('d:/video player/skin 2/custom-skin/scratch/podcast_studio.css');
