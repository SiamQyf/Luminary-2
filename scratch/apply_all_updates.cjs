const fs = require('fs');
const path = require('path');

const part1 = require('./themes_data_part1.cjs');
const part2 = require('./themes_data_part2.cjs');
const part3 = require('./themes_data_part3.cjs');
const part4 = require('./themes_data_part4.cjs');

const allNewThemes = [...part1, ...part2, ...part3, ...part4];
console.log('Total new themes to apply:', allNewThemes.length);

const generatedCss = fs.readFileSync('d:/video player/skin 2/custom-skin/scratch/new_50_themes.css', 'utf8');

// Build string for video-input.tsx and settings-menu.tsx
const optionsCode = allNewThemes.map(t => `  { id: '${t.id}', label: '${t.label}' },`).join('\n');

// Build string for ambient-background.tsx
const ambientCode = allNewThemes.map(t => {
  const p = t.ambientPalette;
  return `  '${t.id}': {
    bleed1: '${p.bleed1}',
    bleed2: '${p.bleed2}',
    bleed3: '${p.bleed3}',
    bleed4: '${p.bleed4}',
    strip1: '${p.strip1}',
    strip2: '${p.strip2}',
    bit1: '${p.bit1}',
    bit2: '${p.bit2}',
    bitGlow: '${p.bitGlow}',
  },`;
}).join('\n');

// Build string for logo.tsx
const logoCode = allNewThemes.map(t => {
  const d = t.logoPalette.dark;
  const l = t.logoPalette.light;
  return `  '${t.id}': {
    dark: {
      primary: '${d.primary}',
      secondary: '${d.secondary}',
      accent: '${d.accent}',
      gradient: '${d.gradient}',
      glow: '${d.glow}',
      iconGlow: '${d.iconGlow}',
    },
    light: {
      primary: '${l.primary}',
      secondary: '${l.secondary}',
      accent: '${l.accent}',
      gradient: '${l.gradient}',
      glow: '${l.glow}',
      iconGlow: '${l.iconGlow}',
    },
  },`;
}).join('\n');

function updateWorkspace(baseDir) {
  console.log(`\n================ Updating workspace: ${baseDir} ================`);

  // 1. video-input.tsx
  const vidPath = path.join(baseDir, 'apps/preview/src/frame/video-input.tsx');
  let vidContent = fs.readFileSync(vidPath, 'utf8');
  if (vidContent.includes("'tourbillon-skeleton'")) {
    console.log('video-input.tsx already has new themes. Skipping.');
  } else {
    const target = "{ id: 'podcast-studio', label: 'Podcast Studio' },";
    const replacement = `${target}\n${optionsCode}`;
    vidContent = vidContent.replace(target, replacement);
    fs.writeFileSync(vidPath, vidContent, 'utf8');
    console.log('video-input.tsx updated successfully!');
  }

  // 2. settings-menu.tsx
  const setPath = path.join(baseDir, 'src/video/shared/settings-menu.tsx');
  let setContent = fs.readFileSync(setPath, 'utf8');
  if (setContent.includes("'tourbillon-skeleton'")) {
    console.log('settings-menu.tsx already has new themes. Skipping.');
  } else {
    const target = "{ id: 'podcast-studio', label: 'Podcast Studio' },";
    const replacement = `${target}\n${optionsCode}`;
    setContent = setContent.replace(target, replacement);
    fs.writeFileSync(setPath, setContent, 'utf8');
    console.log('settings-menu.tsx updated successfully!');
  }

  // 3. ambient-background.tsx
  const ambPath = path.join(baseDir, 'apps/preview/src/shell/ambient-background.tsx');
  let ambContent = fs.readFileSync(ambPath, 'utf8');
  if (ambContent.includes("'tourbillon-skeleton'")) {
    console.log('ambient-background.tsx already has new themes. Skipping.');
  } else {
    const targetIdx = ambContent.indexOf("'podcast-studio': {");
    if (targetIdx !== -1) {
      const closingIdx = ambContent.indexOf('},', targetIdx);
      if (closingIdx !== -1) {
        const insertPos = closingIdx + 2;
        ambContent = ambContent.slice(0, insertPos) + '\n' + ambientCode + ambContent.slice(insertPos);
        fs.writeFileSync(ambPath, ambContent, 'utf8');
        console.log('ambient-background.tsx updated successfully!');
      }
    }
  }

  // 4. logo.tsx
  const logoPath = path.join(baseDir, 'apps/preview/src/shell/logo.tsx');
  let logoContent = fs.readFileSync(logoPath, 'utf8');
  if (logoContent.includes("'tourbillon-skeleton'")) {
    console.log('logo.tsx already has new themes. Skipping.');
  } else {
    const targetIdx = logoContent.indexOf("'podcast-studio': {");
    if (targetIdx !== -1) {
      // Find the second closing `},`
      const darkClose = logoContent.indexOf('},', targetIdx);
      const lightClose = logoContent.indexOf('},', darkClose + 2);
      const mainClose = logoContent.indexOf('},', lightClose + 2);
      if (mainClose !== -1) {
        const insertPos = mainClose + 2;
        logoContent = logoContent.slice(0, insertPos) + '\n' + logoCode + logoContent.slice(insertPos);
        fs.writeFileSync(logoPath, logoContent, 'utf8');
        console.log('logo.tsx updated successfully!');
      }
    }
  }

  // 5. preview.css
  const previewCssPath = path.join(baseDir, 'apps/preview/src/frame/preview.css');
  let previewCssContent = fs.readFileSync(previewCssPath, 'utf8');
  if (previewCssContent.includes('tourbillon-skeleton')) {
    console.log('preview.css already has new themes. Skipping.');
  } else {
    const markerIdx = previewCssContent.indexOf('Universal Silky-Smooth Progress Knob');
    if (markerIdx !== -1) {
      // Find beginning of comment block
      const commentStart = previewCssContent.lastIndexOf('/*', markerIdx);
      previewCssContent = previewCssContent.slice(0, commentStart) + '\n' + generatedCss + '\n\n' + previewCssContent.slice(commentStart);
      fs.writeFileSync(previewCssPath, previewCssContent, 'utf8');
      console.log('preview.css updated successfully!');
    }
  }

  // 6. skin.css
  const skinCssPath = path.join(baseDir, 'src/skin.css');
  let skinCssContent = fs.readFileSync(skinCssPath, 'utf8');
  if (skinCssContent.includes('tourbillon-skeleton')) {
    console.log('skin.css already has new themes. Skipping.');
  } else {
    const markerIdx = skinCssContent.indexOf('Universal Silky-Smooth Progress Knob');
    if (markerIdx !== -1) {
      const commentStart = skinCssContent.lastIndexOf('/*', markerIdx);
      skinCssContent = skinCssContent.slice(0, commentStart) + '\n' + generatedCss + '\n\n' + skinCssContent.slice(commentStart);
      fs.writeFileSync(skinCssPath, skinCssContent, 'utf8');
      console.log('skin.css updated successfully!');
    }
  }
}

updateWorkspace('d:/video player/skin 2/custom-skin');
updateWorkspace('d:/video player/custom-skin');
console.log('\nAll workspaces updated with 50 new extraordinary themes!');
