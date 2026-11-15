const fs = require('fs');

function applySeekbarShift(baseDir) {
  // 1. volume-pill.tsx
  const pillPath = `${baseDir}/src/video/shared/volume-pill.tsx`;
  if (fs.existsSync(pillPath)) {
    let content = fs.readFileSync(pillPath, 'utf8');
    const oldSliderClass = "'horizontal-volume-slider relative z-10 flex h-full flex-1 items-center cursor-pointer outline-none transition-[width,opacity] duration-300 ease-out'";
    const newSliderClass = "'horizontal-volume-slider relative -left-[2px] z-10 flex h-full flex-1 items-center cursor-pointer outline-none transition-[width,opacity] duration-300 ease-out'";
    if (content.includes(oldSliderClass)) {
      content = content.replace(oldSliderClass, newSliderClass);
      fs.writeFileSync(pillPath, content, 'utf8');
      console.log('Updated volume-pill.tsx in', baseDir);
    } else {
      console.log('oldSliderClass not found in', pillPath);
    }
  }

  // 2. preview.css
  const previewCssPath = `${baseDir}/apps/preview/src/frame/preview.css`;
  if (fs.existsSync(previewCssPath)) {
    let content = fs.readFileSync(previewCssPath, 'utf8');
    const oldCss = `.horizontal-volume-slider {
  display: flex !important;
  align-items: center !important;
}`;
    const newCss = `.horizontal-volume-slider {
  display: flex !important;
  align-items: center !important;
  position: relative !important;
  left: -2px !important;
}`;
    if (content.includes(oldCss)) {
      content = content.replace(oldCss, newCss);
      fs.writeFileSync(previewCssPath, content, 'utf8');
      console.log('Updated preview.css in', baseDir);
    } else {
      console.log('oldCss not found in', previewCssPath);
    }
  }

  // 3. skin.css
  const skinCssPath = `${baseDir}/src/skin.css`;
  if (fs.existsSync(skinCssPath)) {
    let content = fs.readFileSync(skinCssPath, 'utf8');
    const oldCss = `.horizontal-volume-slider {
  display: flex !important;
  align-items: center !important;
}`;
    const newCss = `.horizontal-volume-slider {
  display: flex !important;
  align-items: center !important;
  position: relative !important;
  left: -2px !important;
}`;
    if (content.includes(oldCss)) {
      content = content.replace(oldCss, newCss);
      fs.writeFileSync(skinCssPath, content, 'utf8');
      console.log('Updated skin.css in', baseDir);
    } else {
      console.log('oldCss not found in', skinCssPath);
    }
  }
}

applySeekbarShift('d:/video player/skin 2/custom-skin');
applySeekbarShift('d:/video player/custom-skin');
