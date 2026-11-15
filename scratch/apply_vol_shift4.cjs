const fs = require('fs');

function applyAdditionalShift(baseDir) {
  // 1. volume-pill.tsx
  const pillPath = `${baseDir}/src/video/shared/volume-pill.tsx`;
  if (fs.existsSync(pillPath)) {
    let content = fs.readFileSync(pillPath, 'utf8');
    content = content.replace('-left-[2px]', '-left-[4px]');
    fs.writeFileSync(pillPath, content, 'utf8');
    console.log('Updated volume-pill.tsx in', baseDir);
  }

  // 2. preview.css
  const previewCssPath = `${baseDir}/apps/preview/src/frame/preview.css`;
  if (fs.existsSync(previewCssPath)) {
    let content = fs.readFileSync(previewCssPath, 'utf8');
    content = content.replace('left: -2px !important;', 'left: -4px !important;');
    fs.writeFileSync(previewCssPath, content, 'utf8');
    console.log('Updated preview.css in', baseDir);
  }

  // 3. skin.css
  const skinCssPath = `${baseDir}/src/skin.css`;
  if (fs.existsSync(skinCssPath)) {
    let content = fs.readFileSync(skinCssPath, 'utf8');
    content = content.replace('left: -2px !important;', 'left: -4px !important;');
    fs.writeFileSync(skinCssPath, content, 'utf8');
    console.log('Updated skin.css in', baseDir);
  }
}

applyAdditionalShift('d:/video player/skin 2/custom-skin');
applyAdditionalShift('d:/video player/custom-skin');
