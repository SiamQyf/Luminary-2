const fs = require('fs');

const podcastCss = fs.readFileSync('d:/video player/skin 2/custom-skin/scratch/podcast_studio.css', 'utf8');

function updateWorkspace(baseDir) {
  console.log('Updating workspace:', baseDir);

  // 1. settings-menu.tsx
  const settingsPath = `${baseDir}/src/video/shared/settings-menu.tsx`;
  let sContent = fs.readFileSync(settingsPath, 'utf8');
  if (!sContent.includes("'podcast-studio'")) {
    sContent = sContent.replace(
      "{ id: 'glacial-permafrost', label: 'Glacial Permafrost' },",
      "{ id: 'glacial-permafrost', label: 'Glacial Permafrost' },\n  { id: 'podcast-studio', label: 'Podcast Studio' },"
    );
    fs.writeFileSync(settingsPath, sContent, 'utf8');
    console.log('  Updated settings-menu.tsx');
  }

  // 2. video-input.tsx
  const inputPath = `${baseDir}/apps/preview/src/frame/video-input.tsx`;
  let iContent = fs.readFileSync(inputPath, 'utf8');
  if (!iContent.includes("'podcast-studio'")) {
    iContent = iContent.replace(
      "{ id: 'glacial-permafrost', label: 'Glacial Permafrost' },",
      "{ id: 'glacial-permafrost', label: 'Glacial Permafrost' },\n  { id: 'podcast-studio', label: 'Podcast Studio' },"
    );
    fs.writeFileSync(inputPath, iContent, 'utf8');
    console.log('  Updated video-input.tsx');
  }

  // 3. ambient-background.tsx
  const ambPath = `${baseDir}/apps/preview/src/shell/ambient-background.tsx`;
  let aContent = fs.readFileSync(ambPath, 'utf8');
  if (!aContent.includes("'podcast-studio'")) {
    const ambEntry = `  'podcast-studio': {
    bleed1: 'rgba(245, 158, 11, 0.22)',
    bleed2: 'rgba(217, 119, 6, 0.18)',
    bleed3: 'rgba(251, 191, 36, 0.14)',
    bleed4: 'rgba(24, 26, 32, 0.25)',
    strip1: '#f59e0b',
    strip2: '#fbbf24',
    bit1: '#f59e0b',
    bit2: '#fffbeb',
    bitGlow: 'rgba(245, 158, 11, 0.75)',
  },
};`;
    aContent = aContent.replace(/\s*\}\;\s*\/\*\*\s*\*\s*Precision Optical Diffraction Stars/, `\n${ambEntry}\n\n/**\n * Precision Optical Diffraction Stars`);
    fs.writeFileSync(ambPath, aContent, 'utf8');
    console.log('  Updated ambient-background.tsx');
  }

  // 4. logo.tsx
  const logoPath = `${baseDir}/apps/preview/src/shell/logo.tsx`;
  let lContent = fs.readFileSync(logoPath, 'utf8');
  if (!lContent.includes("'podcast-studio'")) {
    const logoEntry = `  'podcast-studio': {
    dark: {
      primary: '#f59e0b',
      secondary: '#d97706',
      accent: '#fbbf24',
      gradient: 'linear-gradient(135deg, #fbbf24 15%, #f59e0b 55%, #b45309 100%)',
      glow: 'rgba(245, 158, 11, 0.65)',
      iconGlow: 'rgba(245, 158, 11, 0.45)',
    },
    light: {
      primary: '#b45309',
      secondary: '#d97706',
      accent: '#78350f',
      gradient: 'linear-gradient(135deg, #d97706 15%, #b45309 60%, #78350f 100%)',
      glow: 'rgba(217, 119, 6, 0.28)',
      iconGlow: 'rgba(180, 83, 9, 0.22)',
    },
  },
};`;
    lContent = lContent.replace(/\s*\}\;\s*export function getThemePalette/, `\n${logoEntry}\n\nexport function getThemePalette`);
    fs.writeFileSync(logoPath, lContent, 'utf8');
    console.log('  Updated logo.tsx');
  }

  // 5. preview.css
  const prevCssPath = `${baseDir}/apps/preview/src/frame/preview.css`;
  let pcContent = fs.readFileSync(prevCssPath, 'utf8');
  if (!pcContent.includes('data-theme="podcast-studio"')) {
    pcContent += '\n\n' + podcastCss;
    fs.writeFileSync(prevCssPath, pcContent, 'utf8');
    console.log('  Appended to preview.css');
  }

  // 6. skin.css
  const skinCssPath = `${baseDir}/src/skin.css`;
  let scContent = fs.readFileSync(skinCssPath, 'utf8');
  if (!scContent.includes('data-theme="podcast-studio"')) {
    scContent += '\n\n' + podcastCss;
    fs.writeFileSync(skinCssPath, scContent, 'utf8');
    console.log('  Appended to skin.css');
  }
}

updateWorkspace('d:/video player/skin 2/custom-skin');
updateWorkspace('d:/video player/custom-skin');
