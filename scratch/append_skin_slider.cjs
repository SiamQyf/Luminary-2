const fs = require('fs');

function appendSliderRule(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('.horizontal-volume-slider')) {
    content += `\n\n.horizontal-volume-slider {
  display: flex !important;
  align-items: center !important;
  position: relative !important;
  left: -2px !important;
}\n`;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Appended to', filePath);
  }
}

appendSliderRule('d:/video player/skin 2/custom-skin/src/skin.css');
appendSliderRule('d:/video player/custom-skin/src/skin.css');
