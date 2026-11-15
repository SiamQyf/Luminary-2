const fs = require('fs');

function updateCssRegex(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const regex = /\.horizontal-volume-slider\s*\{[^}]*\}/;
  const m = content.match(regex);
  if (m) {
    console.log('Found in', filePath, ':', JSON.stringify(m[0]));
    const newRule = `.horizontal-volume-slider {
  display: flex !important;
  align-items: center !important;
  position: relative !important;
  left: -2px !important;
}`;
    content = content.replace(regex, newRule);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully updated', filePath);
  } else {
    console.log('Not found in', filePath);
  }
}

updateCssRegex('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
updateCssRegex('d:/video player/skin 2/custom-skin/src/skin.css');
updateCssRegex('d:/video player/custom-skin/apps/preview/src/frame/preview.css');
updateCssRegex('d:/video player/custom-skin/src/skin.css');
