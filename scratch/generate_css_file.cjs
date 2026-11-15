const fs = require('fs');
const path = require('path');

const part1 = require('./themes_data_part1.cjs');
const part2 = require('./themes_data_part2.cjs');
const part3 = require('./themes_data_part3.cjs');
const part4 = require('./themes_data_part4.cjs');

const allNewThemes = [...part1, ...part2, ...part3, ...part4];

function generateThemeCss(theme) {
  return `
/* ==========================================================================
   THEME: ${theme.label} (${theme.id})
   ========================================================================== */
.preview-player[data-theme="${theme.id}"],
.preview-player[data-theme="${theme.id}"] .media-skin,
:root[data-theme="${theme.id}"] .media-skin,
:where(.media-skin)[data-theme="${theme.id}"] {
  border-radius: ${theme.frameRadius} !important;
}

.preview-player[data-theme="${theme.id}"] .media-skin,
:root[data-theme="${theme.id}"] .media-skin,
:where(.media-skin)[data-theme="${theme.id}"] {
  border: 1.5px solid ${theme.frameBorder} !important;
  box-shadow: ${theme.frameShadow} !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/liquid-btn,
.preview-player[data-theme="${theme.id}"] .group\\/center-buffering button,
.preview-player[data-theme="${theme.id}"] [data-slot="control"],
.preview-player[data-theme="${theme.id}"] .media-fullscreen-button,
:root[data-theme="${theme.id}"] .group\\/liquid-btn,
:root[data-theme="${theme.id}"] [data-slot="control"],
:root[data-theme="${theme.id}"] .media-fullscreen-button,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/liquid-btn,
:where(.media-skin)[data-theme="${theme.id}"] [data-slot="control"],
:where(.media-skin)[data-theme="${theme.id}"] .media-fullscreen-button {
  border-radius: ${theme.btnRadius} !important;
  background: ${theme.btnBg} !important;
  border: ${theme.btnBorder} !important;
  box-shadow: ${theme.btnShadow} !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/liquid-btn:hover,
.preview-player[data-theme="${theme.id}"] .group\\/center-buffering button:hover,
.preview-player[data-theme="${theme.id}"] [data-slot="control"]:hover,
.preview-player[data-theme="${theme.id}"] .media-fullscreen-button:hover,
:root[data-theme="${theme.id}"] .group\\/liquid-btn:hover,
:root[data-theme="${theme.id}"] [data-slot="control"]:hover,
:root[data-theme="${theme.id}"] .media-fullscreen-button:hover,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/liquid-btn:hover,
:where(.media-skin)[data-theme="${theme.id}"] [data-slot="control"]:hover,
:where(.media-skin)[data-theme="${theme.id}"] .media-fullscreen-button:hover {
  border-color: ${theme.btnHoverBorder} !important;
  box-shadow: ${theme.btnHoverShadow} !important;
  transform: translateY(-1.5px) !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/play,
.preview-player[data-theme="${theme.id}"] .group\\/center-buffering button:nth-child(2),
:root[data-theme="${theme.id}"] .group\\/play,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/play {
  background: ${theme.playBg} !important;
  border: ${theme.playBorder} !important;
  box-shadow: ${theme.playShadow} !important;
  color: ${theme.playIconColor} !important;
}

.preview-player[data-theme="${theme.id}"] .player-icon-scale svg,
.preview-player[data-theme="${theme.id}"] .group\\/mute svg,
.preview-player[data-theme="${theme.id}"] .group\\/liquid-btn svg,
.preview-player[data-theme="${theme.id}"] [data-slot="control"] svg,
:root[data-theme="${theme.id}"] [data-slot="control"] svg,
:where(.media-skin)[data-theme="${theme.id}"] [data-slot="control"] svg {
  color: ${theme.iconColor} !important;
  filter: ${theme.iconFilter} !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/play svg,
:root[data-theme="${theme.id}"] .group\\/play svg,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/play svg {
  color: ${theme.playIconColor} !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/vol-pill,
:root[data-theme="${theme.id}"] .group\\/vol-pill,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/vol-pill {
  border-radius: ${theme.btnRadius} !important;
  background: ${theme.volPillBg} !important;
  border: ${theme.volPillBorder} !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/vol-pill div[class*="bg-white/20"],
:root[data-theme="${theme.id}"] .group\\/vol-pill div[class*="bg-white/20"],
:where(.media-skin)[data-theme="${theme.id}"] .group\\/vol-pill div[class*="bg-white/20"] {
  height: 3.5px !important;
  border-radius: ${theme.btnRadius} !important;
  background: ${theme.volTrackBg} !important;
  border: ${theme.volTrackBorder} !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/vol-pill div[class*="bg-white/90"],
:root[data-theme="${theme.id}"] .group\\/vol-pill div[class*="bg-white/90"],
:where(.media-skin)[data-theme="${theme.id}"] .group\\/vol-pill div[class*="bg-white/90"] {
  height: 3.5px !important;
  border-radius: ${theme.btnRadius} !important;
  background: ${theme.volFillBg} !important;
}

.preview-player[data-theme="${theme.id}"] .volume-slider-thumb,
:root[data-theme="${theme.id}"] .volume-slider-thumb,
:where(.media-skin)[data-theme="${theme.id}"] .volume-slider-thumb {
  ${theme.volThumbStyle}
}

.preview-player[data-theme="${theme.id}"] div[class*="media-slider-smooth"][class*="isolate"],
:root[data-theme="${theme.id}"] div[class*="media-slider-smooth"][class*="isolate"],
:where(.media-skin)[data-theme="${theme.id}"] div[class*="media-slider-smooth"][class*="isolate"] {
  height: 4px !important;
  border-radius: ${theme.btnRadius} !important;
  background: ${theme.seekTrackBg} !important;
  border: ${theme.seekTrackBorder} !important;
}

.preview-player[data-theme="${theme.id}"] div[class*="clip-media-x-[--media-slider-buffer]"],
:root[data-theme="${theme.id}"] div[class*="clip-media-x-[--media-slider-buffer]"],
:where(.media-skin)[data-theme="${theme.id}"] div[class*="clip-media-x-[--media-slider-buffer]"] {
  background: ${theme.seekBufferBg} !important;
  border-radius: ${theme.btnRadius} !important;
}

.preview-player[data-theme="${theme.id}"] div[class*="clip-media-x-[--media-slider-fill]"],
:root[data-theme="${theme.id}"] div[class*="clip-media-x-[--media-slider-fill]"],
:where(.media-skin)[data-theme="${theme.id}"] div[class*="clip-media-x-[--media-slider-fill]"] {
  background: ${theme.seekFillBg} !important;
  border-radius: ${theme.btnRadius} !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/slider .media-thumb-smooth,
:root[data-theme="${theme.id}"] .group\\/slider .media-thumb-smooth,
:where(.media-skin)[data-theme="${theme.id}"] .group\\/slider .media-thumb-smooth {
  ${theme.seekThumbStyle}
  opacity: 1 !important;
  display: block !important;
}

.preview-player[data-theme="${theme.id}"] time-value,
.preview-player[data-theme="${theme.id}"] div[class*="tabular-nums"],
:root[data-theme="${theme.id}"] time-value,
:root[data-theme="${theme.id}"] div[class*="tabular-nums"],
:where(.media-skin)[data-theme="${theme.id}"] time-value,
:where(.media-skin)[data-theme="${theme.id}"] div[class*="tabular-nums"] {
  color: ${theme.timeColor} !important;
  font-family: ${theme.timeFont} !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.85) !important;
}

.preview-player[data-theme="${theme.id}"] [role="menu"],
:root[data-theme="${theme.id}"] [role="menu"],
:where(.media-skin)[data-theme="${theme.id}"] [role="menu"] {
  background: ${theme.menuBg} !important;
  border: ${theme.menuBorder} !important;
  border-radius: ${theme.menuRadius} !important;
  box-shadow: ${theme.menuShadow} !important;
  backdrop-filter: blur(28px) !important;
  -webkit-backdrop-filter: blur(28px) !important;
}

.preview-player[data-theme="${theme.id}"] .group\\/menu-btn:hover,
.preview-player[data-theme="${theme.id}"] .group\\/menu-radio:hover,
:root[data-theme="${theme.id}"] [role="menuitem"]:hover,
:root[data-theme="${theme.id}"] [role="menuitemradio"]:hover,
:where(.media-skin)[data-theme="${theme.id}"] [role="menuitem"]:hover,
:where(.media-skin)[data-theme="${theme.id}"] [role="menuitemradio"]:hover {
  background: ${theme.menuItemHoverBg} !important;
  color: ${theme.menuItemHoverColor} !important;
}

.preview-player[data-theme="${theme.id}"] [data-part="caption-pill"],
:root[data-theme="${theme.id}"] [data-part="caption-pill"],
:where(.media-skin)[data-theme="${theme.id}"] [data-part="caption-pill"] {
  background: ${theme.captionBg} !important;
  border: ${theme.captionBorder} !important;
  border-radius: ${theme.captionRadius} !important;
  box-shadow: ${theme.captionShadow} !important;
  color: ${theme.captionColor} !important;
  text-shadow: ${theme.captionTextShadow} !important;
}
`;
}

// Generate the whole CSS payload for the new 50 themes
const generatedCss = allNewThemes.map(generateThemeCss).join('\n');
fs.writeFileSync('d:/video player/skin 2/custom-skin/scratch/new_50_themes.css', generatedCss, 'utf8');
console.log('Successfully generated new_50_themes.css! Size:', generatedCss.length);
