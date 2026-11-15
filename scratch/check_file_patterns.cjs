const fs = require('fs');

const vidInput = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/frame/video-input.tsx', 'utf8');
const vidMatch = vidInput.match(/export const STYLE_OPTIONS = \[[\s\S]*?\] as const;/);
console.log('STYLE_OPTIONS in video-input.tsx length:', vidMatch ? vidMatch[0].length : 0);

const setMenu = fs.readFileSync('d:/video player/skin 2/custom-skin/src/video/shared/settings-menu.tsx', 'utf8');
const setMatch = setMenu.match(/export const THEME_STYLES = \[[\s\S]*?\] as const;/);
console.log('THEME_STYLES in settings-menu.tsx length:', setMatch ? setMatch[0].length : 0);

const ambBg = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/shell/ambient-background.tsx', 'utf8');
const ambMatch = ambBg.match(/const THEME_PALETTES: Record<string, ThemePalette> = \{[\s\S]*?\n\};/);
console.log('THEME_PALETTES in ambient-background.tsx length:', ambMatch ? ambMatch[0].length : 0);

const logoFile = fs.readFileSync('d:/video player/skin 2/custom-skin/apps/preview/src/shell/logo.tsx', 'utf8');
const logoMatch = logoFile.match(/export const THEME_PALETTES: Record<string, \{ dark: ThemePalette; light: ThemePalette \}> = \{[\s\S]*?\n\};/);
console.log('THEME_PALETTES in logo.tsx length:', logoMatch ? logoMatch[0].length : 0);
