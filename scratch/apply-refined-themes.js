import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Build replacement for porcelain-cobalt
const porcelainRegex = /\/\* ==========================================================================\s+6\. PORCELAIN & COBALT \(porcelain-cobalt\)[\s\S]*?(?=\/\* ==========================================================================\s+7\. EMERALD VAULT)/;

const porcelainCSS = `/* ==========================================================================
   6. PORCELAIN & COBALT (porcelain-cobalt)
   White fine china cabochons, royal delftware cobalt enamel, cohesive porcelain family
   ========================================================================== */
.preview-player[data-theme="porcelain-cobalt"] .group\\/liquid-btn,
.preview-player[data-theme="porcelain-cobalt"] .group\\/center-buffering button,
.preview-player[data-theme="porcelain-cobalt"] [data-slot="control"],
.preview-player[data-theme="porcelain-cobalt"] .media-fullscreen-button {
  border-radius: 9999px !important;
  background: radial-gradient(circle at 35% 25%, #ffffff 0%, #f8fafc 55%, #e2e8f0 100%) !important;
  border: 1.5px solid #1d4ed8 !important;
  box-shadow: inset 0 1.5px 2px #ffffff, inset 0 -1.5px 2px rgba(30, 64, 175, 0.15), 0 4px 12px rgba(15, 23, 42, 0.18) !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}
.preview-player[data-theme="porcelain-cobalt"] .group\\/liquid-btn:hover,
.preview-player[data-theme="porcelain-cobalt"] .group\\/center-buffering button:hover,
.preview-player[data-theme="porcelain-cobalt"] [data-slot="control"]:hover,
.preview-player[data-theme="porcelain-cobalt"] .media-fullscreen-button:hover {
  background: #ffffff !important;
  border-color: #2563eb !important;
  box-shadow: inset 0 2px 3px #ffffff, 0 6px 18px rgba(30, 64, 175, 0.35) !important;
  transform: translateY(-1.5px) !important;
}
.preview-player[data-theme="porcelain-cobalt"] .group\\/play,
.preview-player[data-theme="porcelain-cobalt"] .group\\/center-buffering button:nth-child(2) {
  background: radial-gradient(circle at 35% 25%, #ffffff 0%, #eff6ff 50%, #dbeafe 100%) !important;
  border: 2px solid #1d4ed8 !important;
  box-shadow: inset 0 2px 3px #ffffff, inset 0 -2px 3px rgba(29, 78, 216, 0.2), 0 6px 18px rgba(29, 78, 216, 0.35) !important;
}
.preview-player[data-theme="porcelain-cobalt"] svg,
.preview-player[data-theme="porcelain-cobalt"] .player-icon-scale svg,
.preview-player[data-theme="porcelain-cobalt"] .group\\/mute svg,
.preview-player[data-theme="porcelain-cobalt"] .group\\/liquid-btn svg,
.preview-player[data-theme="porcelain-cobalt"] [data-slot="control"] svg {
  color: #1d4ed8 !important;
  filter: none !important;
}
.preview-player[data-theme="porcelain-cobalt"] .group\\/play svg {
  color: #1d4ed8 !important;
}
.preview-player[data-theme="porcelain-cobalt"] .group\\/vol-pill {
  border-radius: 9999px !important;
  background: radial-gradient(circle at 35% 25%, #ffffff 0%, #f8fafc 55%, #e2e8f0 100%) !important;
  border: 1.5px solid #1d4ed8 !important;
  box-shadow: inset 0 1.5px 2px #ffffff, inset 0 -1.5px 2px rgba(30, 64, 175, 0.15), 0 4px 12px rgba(15, 23, 42, 0.18) !important;
}
.preview-player[data-theme="porcelain-cobalt"] .group\\/vol-pill div[class*="bg-white/20"] {
  height: 4px !important;
  border-radius: 9999px !important;
  background: rgba(30, 64, 175, 0.15) !important;
}
.preview-player[data-theme="porcelain-cobalt"] .group\\/vol-pill div[class*="bg-white/90"] {
  height: 4px !important;
  border-radius: 9999px !important;
  background: linear-gradient(90deg, #1d4ed8 0%, #2563eb 100%) !important;
  box-shadow: 0 0 6px rgba(37, 99, 235, 0.4) !important;
}
.preview-player[data-theme="porcelain-cobalt"] .volume-slider-thumb {
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
  background: #ffffff !important;
  border: 2px solid #1d4ed8 !important;
}
.preview-player[data-theme="porcelain-cobalt"] div[class*="media-slider-smooth"][class*="isolate"] {
  height: 4px !important;
  border-radius: 9999px !important;
  background: rgba(255, 255, 255, 0.25) !important;
}
.preview-player[data-theme="porcelain-cobalt"] div[class*="clip-media-x-[--media-slider-buffer]"] {
  background: rgba(30, 64, 175, 0.25) !important;
  border-radius: 9999px !important;
}
.preview-player[data-theme="porcelain-cobalt"] div[class*="clip-media-x-[--media-slider-fill]"] {
  background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 100%) !important;
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.5) !important;
  border-radius: 9999px !important;
}
.preview-player[data-theme="porcelain-cobalt"] .group\\/slider .media-thumb-smooth {
  width: 14px !important;
  height: 14px !important;
  border-radius: 50% !important;
  background: #ffffff !important;
  border: 2.5px solid #1d4ed8 !important;
  box-shadow: 0 2px 8px rgba(30, 64, 175, 0.4) !important;
  opacity: 1 !important;
  display: block !important;
}
.preview-player[data-theme="porcelain-cobalt"] time-value,
.preview-player[data-theme="porcelain-cobalt"] div[class*="tabular-nums"] {
  color: #bfdbfe !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.85) !important;
}
.preview-player[data-theme="porcelain-cobalt"] .media-skin [data-part="bottom-controls-bar"]:not(.static\\!)::before {
  background-image:
    radial-gradient(circle at 50% 120%, rgba(30, 64, 175, 0.12) 0%, transparent 60%),
    linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.45) 35%, rgba(10, 18, 38, 0.88) 100%);
  box-shadow: inset 0 -1px 0 rgba(30, 64, 175, 0.3);
}
.preview-player[data-theme="porcelain-cobalt"] [role="menu"],
:root[data-theme="porcelain-cobalt"] [role="menu"] {
  background: rgba(255, 255, 255, 0.98) !important;
  border: 1.5px solid rgba(30, 64, 175, 0.4) !important;
  border-radius: 18px !important;
  box-shadow: 0 24px 50px rgba(15, 23, 42, 0.25), inset 0 1px 0 #ffffff !important;
  color: #1e3a8a !important;
}
.preview-player[data-theme="porcelain-cobalt"] .group\\/menu-btn:hover,
.preview-player[data-theme="porcelain-cobalt"] .group\\/menu-radio:hover,
:root[data-theme="porcelain-cobalt"] [role="menuitem"]:hover,
:root[data-theme="porcelain-cobalt"] [role="menuitemradio"]:hover {
  background: rgba(30, 64, 175, 0.1) !important;
  border-radius: 10px !important;
  color: #1d4ed8 !important;
}

`;

if (porcelainRegex.test(css)) {
  css = css.replace(porcelainRegex, porcelainCSS);
  console.log('Successfully replaced porcelain-cobalt with consistent fine china styling!');
} else {
  console.warn('Could not match porcelain-cobalt block!');
}

// Build replacement for water-droplet
const waterRegex = /\/\* ==========================================================================\s+14\. WATER DROPLET \(water-droplet\)[\s\S]*$/;

const waterCSS = `/* ==========================================================================
   14. WATER DROPLET (water-droplet) - 100% PHOTOREALISTIC LIQUID WATER OPTICS
   Convex magnifying lens refraction, dual specular sun glints, caustic ground bounce,
   surface tension meniscus rim, and elastic liquid response.
   ========================================================================== */
.preview-player[data-theme="water-droplet"] .group\\/liquid-btn,
.preview-player[data-theme="water-droplet"] .group\\/center-buffering button,
.preview-player[data-theme="water-droplet"] [data-slot="control"],
.preview-player[data-theme="water-droplet"] .media-fullscreen-button {
  border-radius: 9999px !important;
  background:
    radial-gradient(ellipse 65% 35% at 34% 18%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.55) 30%, rgba(255, 255, 255, 0) 65%),
    radial-gradient(ellipse 60% 40% at 65% 82%, rgba(255, 255, 255, 0.6) 0%, rgba(186, 230, 253, 0.28) 45%, transparent 75%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, rgba(14, 165, 233, 0.06) 70%, rgba(2, 132, 199, 0.14) 100%) !important;
  backdrop-filter: blur(2px) contrast(118%) brightness(112%) saturate(140%) !important;
  -webkit-backdrop-filter: blur(2px) contrast(118%) brightness(112%) saturate(140%) !important;
  border: 1px solid rgba(255, 255, 255, 0.65) !important;
  box-shadow:
    inset 0 2.5px 3px rgba(255, 255, 255, 0.85),
    inset 0 -2.5px 4px rgba(0, 0, 0, 0.35),
    inset 1px 0 2px rgba(255, 255, 255, 0.4),
    0 3px 8px rgba(0, 0, 0, 0.45),
    0 1px 2px rgba(0, 0, 0, 0.6),
    0 0 16px rgba(56, 189, 248, 0.25) !important;
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease-out !important;
}
.preview-player[data-theme="water-droplet"] .group\\/liquid-btn:hover,
.preview-player[data-theme="water-droplet"] .group\\/center-buffering button:hover,
.preview-player[data-theme="water-droplet"] [data-slot="control"]:hover,
.preview-player[data-theme="water-droplet"] .media-fullscreen-button:hover {
  transform: scale(1.08) translateY(-1.5px) !important;
  border-color: #ffffff !important;
  box-shadow:
    inset 0 3px 4px #ffffff,
    inset 0 -3px 5px rgba(0, 0, 0, 0.4),
    0 6px 18px rgba(0, 0, 0, 0.5),
    0 0 20px rgba(56, 189, 248, 0.45) !important;
}
.preview-player[data-theme="water-droplet"] .group\\/play,
.preview-player[data-theme="water-droplet"] .group\\/center-buffering button:nth-child(2) {
  background:
    radial-gradient(ellipse 65% 35% at 34% 18%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.75) 35%, rgba(255, 255, 255, 0) 65%),
    radial-gradient(ellipse 65% 45% at 65% 82%, rgba(255, 255, 255, 0.75) 0%, rgba(186, 230, 253, 0.45) 45%, transparent 75%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05) 0%, rgba(14, 165, 233, 0.1) 70%, rgba(2, 132, 199, 0.22) 100%) !important;
  border: 1.25px solid rgba(255, 255, 255, 0.85) !important;
  box-shadow:
    inset 0 3px 4px rgba(255, 255, 255, 0.95),
    inset 0 -3px 5px rgba(0, 0, 0, 0.4),
    0 4px 12px rgba(0, 0, 0, 0.5),
    0 0 22px rgba(56, 189, 248, 0.35) !important;
  color: #ffffff !important;
}
.preview-player[data-theme="water-droplet"] svg,
.preview-player[data-theme="water-droplet"] .player-icon-scale svg,
.preview-player[data-theme="water-droplet"] .group\\/mute svg,
.preview-player[data-theme="water-droplet"] .group\\/liquid-btn svg,
.preview-player[data-theme="water-droplet"] [data-slot="control"] svg {
  color: #ffffff !important;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85)) !important;
}
.preview-player[data-theme="water-droplet"] .group\\/play svg {
  color: #ffffff !important;
}
.preview-player[data-theme="water-droplet"] .group\\/vol-pill {
  border-radius: 9999px !important;
  background:
    radial-gradient(ellipse 65% 35% at 34% 18%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 30%, rgba(255, 255, 255, 0) 65%),
    radial-gradient(ellipse 60% 40% at 65% 82%, rgba(255, 255, 255, 0.55) 0%, rgba(186, 230, 253, 0.25) 45%, transparent 75%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, rgba(14, 165, 233, 0.06) 70%, rgba(2, 132, 199, 0.14) 100%) !important;
  backdrop-filter: blur(2px) contrast(118%) brightness(112%) saturate(140%) !important;
  -webkit-backdrop-filter: blur(2px) contrast(118%) brightness(112%) saturate(140%) !important;
  border: 1px solid rgba(255, 255, 255, 0.65) !important;
  box-shadow:
    inset 0 2.5px 3px rgba(255, 255, 255, 0.85),
    inset 0 -2.5px 4px rgba(0, 0, 0, 0.35),
    0 3px 8px rgba(0, 0, 0, 0.45),
    0 0 16px rgba(56, 189, 248, 0.25) !important;
}
.preview-player[data-theme="water-droplet"] .group\\/vol-pill div[class*="bg-white/20"] {
  height: 4px !important;
  border-radius: 9999px !important;
  background: rgba(0, 0, 0, 0.3) !important;
  border: 0.5px solid rgba(255, 255, 255, 0.25) !important;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.6) !important;
}
.preview-player[data-theme="water-droplet"] .group\\/vol-pill div[class*="bg-white/90"] {
  height: 4px !important;
  border-radius: 9999px !important;
  background: linear-gradient(90deg, #38bdf8 0%, #0284c7 70%, #ffffff 100%) !important;
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.85) !important;
}
.preview-player[data-theme="water-droplet"] .volume-slider-thumb {
  width: 10px !important;
  height: 10px !important;
  border-radius: 50% !important;
  background: radial-gradient(circle at 35% 25%, #ffffff 0%, #bae6fd 45%, #0284c7 100%) !important;
  border: 1px solid rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.45), inset 0 1px 1px #ffffff !important;
}
.preview-player[data-theme="water-droplet"] div[class*="media-slider-smooth"][class*="isolate"] {
  height: 4px !important;
  border-radius: 9999px !important;
  background: rgba(0, 0, 0, 0.28) !important;
  border: 0.5px solid rgba(255, 255, 255, 0.35) !important;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.5) !important;
}
.preview-player[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-buffer]"] {
  background: rgba(186, 230, 253, 0.25) !important;
  border-radius: 9999px !important;
}
.preview-player[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-fill]"] {
  background: linear-gradient(90deg, #38bdf8 0%, #0284c7 50%, #38bdf8 85%, #ffffff 100%) !important;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.9) !important;
  border-radius: 9999px !important;
}
.preview-player[data-theme="water-droplet"] .group\\/slider .media-thumb-smooth {
  width: 15px !important;
  height: 15px !important;
  border-radius: 50% !important;
  background:
    radial-gradient(ellipse 65% 35% at 35% 20%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.6) 35%, transparent 70%),
    radial-gradient(ellipse 60% 40% at 65% 82%, rgba(255, 255, 255, 0.7) 0%, rgba(186, 230, 253, 0.4) 45%, transparent 75%),
    radial-gradient(circle at 50% 50%, #ffffff 0%, #7dd3fc 45%, #0284c7 100%) !important;
  border: 1.5px solid rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.5), 0 0 14px rgba(56, 189, 248, 0.6), inset 0 1.5px 2px #ffffff !important;
  opacity: 1 !important;
  display: block !important;
}
.preview-player[data-theme="water-droplet"] time-value,
.preview-player[data-theme="water-droplet"] div[class*="tabular-nums"] {
  color: #e0f2fe !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.85) !important;
}
.preview-player[data-theme="water-droplet"] .media-skin [data-part="bottom-controls-bar"]:not(.static\\!)::before {
  background-image:
    radial-gradient(ellipse 70px 28px at 25% 75%, rgba(56, 189, 248, 0.08) 0%, transparent 65%),
    radial-gradient(ellipse 90px 35px at 75% 80%, rgba(14, 165, 233, 0.07) 0%, transparent 65%),
    linear-gradient(180deg, transparent 0%, rgba(3, 14, 24, 0.35) 35%, rgba(1, 8, 16, 0.88) 100%);
  background-size: 160px 70px, 200px 90px, 100% 100%;
  box-shadow: inset 0 -1px 0 rgba(56, 189, 248, 0.35);
}
.preview-player[data-theme="water-droplet"] [role="menu"],
:root[data-theme="water-droplet"] [role="menu"] {
  background:
    radial-gradient(circle at 35% 0%, rgba(56, 189, 248, 0.18) 0%, transparent 70%),
    linear-gradient(180deg, rgba(3, 14, 24, 0.94) 0%, rgba(1, 8, 16, 0.98) 100%) !important;
  border: 1.5px solid rgba(255, 255, 255, 0.45) !important;
  border-radius: 18px !important;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.88), inset 0 1.5px 2px rgba(255, 255, 255, 0.5), 0 0 24px rgba(56, 189, 248, 0.25) !important;
  backdrop-filter: blur(24px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
}
.preview-player[data-theme="water-droplet"] .group\\/menu-btn:hover,
.preview-player[data-theme="water-droplet"] .group\\/menu-radio:hover,
:root[data-theme="water-droplet"] [role="menuitem"]:hover,
:root[data-theme="water-droplet"] [role="menuitemradio"]:hover {
  background: rgba(56, 189, 248, 0.18) !important;
  border-radius: 10px !important;
  color: #bae6fd !important;
}
`;

if (waterRegex.test(css)) {
  css = css.replace(waterRegex, waterCSS);
  console.log('Successfully replaced water-droplet with 100% photorealistic liquid water optics!');
} else {
  console.warn('Could not match water-droplet block!');
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('preview.css updated. New length:', css.length);

