const fs = require('fs');

function updateCss(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const oldRule = `/* Recessed Control Panel Deck (Bottom Controls Bar) */
.preview-player[data-theme="hi-fi-remote"] .media-skin [data-part="bottom-controls-bar"]:not(.static\!)::before,
:root[data-theme="hi-fi-remote"] .media-skin [data-part="bottom-controls-bar"]:not(.static\!)::before,
:where(.media-skin)[data-theme="hi-fi-remote"] [data-part="bottom-controls-bar"]:not(.static\!)::before {
  background-image:
    linear-gradient(180deg, rgba(200, 204, 212, 0) 0%, rgba(205, 209, 217, 0.7) 25%, #d1d5dc 65%, #c8ccd5 100%);
  background-size: 100% 100%;
  box-shadow:
    inset 0 1px 2px rgba(0, 0, 0, 0.12),
    inset 0 -1px 0 rgba(255, 255, 255, 0.7);
}`;

  const newRule = `/* Recessed Control Panel Deck (Bottom Controls Bar) */
.preview-player[data-theme="hi-fi-remote"] .media-skin [data-part="bottom-controls-bar"]:not(.static\!)::before,
:root[data-theme="hi-fi-remote"] .media-skin [data-part="bottom-controls-bar"]:not(.static\!)::before,
:where(.media-skin)[data-theme="hi-fi-remote"] [data-part="bottom-controls-bar"]:not(.static\!)::before {
  background: linear-gradient(180deg, rgba(220, 224, 232, 0.82) 0%, rgba(205, 210, 219, 0.94) 35%, #ccd1da 100%) !important;
  backdrop-filter: blur(16px) !important;
  -webkit-backdrop-filter: blur(16px) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.85) !important;
  box-shadow:
    inset 0 1.5px 3px rgba(0, 0, 0, 0.16),
    inset 0 -1px 0 rgba(255, 255, 255, 0.8),
    0 -1px 0 rgba(0, 0, 0, 0.08) !important;
}`;

  if (content.includes(oldRule)) {
    content = content.replace(oldRule, newRule);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', filePath);
  } else {
    console.log('Old rule not found in', filePath);
  }
}

updateCss('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
updateCss('d:/video player/skin 2/custom-skin/src/skin.css');
updateCss('d:/video player/custom-skin/apps/preview/src/frame/preview.css');
updateCss('d:/video player/custom-skin/src/skin.css');
updateCss('d:/video player/skin 2/custom-skin/scratch/hifi_remote.css');
