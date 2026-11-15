import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
let css = fs.readFileSync(cssPath, 'utf8');

const waterRegex = /\/\* ==========================================================================\s+14\. WATER DROPLET \(water-droplet\)[\s\S]*$/;

const waterCSS = `/* ==========================================================================
   14. WATER DROPLET (water-droplet) - PURE TRANSLUCENT WATER (REDUCED NORTH/SOUTH WHITE)
   Ultra-clear liquid water: significantly reduced white glints at North & South,
   narrow delicate specular arcs, zero milky opacity, pure lens refraction.
   ========================================================================== */
.preview-player[data-theme="water-droplet"] .group\\/liquid-btn,
.preview-player[data-theme="water-droplet"] .group\\/center-buffering button,
.preview-player[data-theme="water-droplet"] [data-slot="control"],
.preview-player[data-theme="water-droplet"] .media-fullscreen-button {
  border-radius: 9999px !important;
  border: none !important;
  outline: none !important;
  background:
    radial-gradient(ellipse 35% 15% at 35% 16%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%),
    radial-gradient(ellipse 30% 14% at 65% 84%, rgba(255, 255, 255, 0.2) 0%, rgba(186, 230, 253, 0.08) 40%, transparent 70%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, rgba(56, 189, 248, 0.04) 70%, rgba(14, 165, 233, 0.09) 100%) !important;
  backdrop-filter: blur(2px) contrast(115%) brightness(118%) saturate(135%) !important;
  -webkit-backdrop-filter: blur(2px) contrast(115%) brightness(118%) saturate(135%) !important;
  box-shadow:
    inset 0 1px 1.5px rgba(255, 255, 255, 0.3),
    inset 0 -0.5px 1px rgba(255, 255, 255, 0.15),
    0 0 12px rgba(56, 189, 248, 0.22),
    0 1px 4px rgba(56, 189, 248, 0.15) !important;
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease-out !important;
}
.preview-player[data-theme="water-droplet"] .group\\/liquid-btn:hover,
.preview-player[data-theme="water-droplet"] .group\\/center-buffering button:hover,
.preview-player[data-theme="water-droplet"] [data-slot="control"]:hover,
.preview-player[data-theme="water-droplet"] .media-fullscreen-button:hover {
  transform: scale(1.08) translateY(-1.5px) !important;
  border: none !important;
  outline: none !important;
  box-shadow:
    inset 0 1.25px 2px rgba(255, 255, 255, 0.45),
    inset 0 -0.75px 1.5px rgba(255, 255, 255, 0.22),
    0 0 18px rgba(56, 189, 248, 0.45),
    0 2px 8px rgba(56, 189, 248, 0.25) !important;
}
.preview-player[data-theme="water-droplet"] .group\\/play,
.preview-player[data-theme="water-droplet"] .group\\/center-buffering button:nth-child(2) {
  border: none !important;
  outline: none !important;
  background:
    radial-gradient(ellipse 38% 16% at 35% 16%, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 40%, transparent 70%),
    radial-gradient(ellipse 32% 15% at 65% 84%, rgba(255, 255, 255, 0.24) 0%, rgba(186, 230, 253, 0.1) 40%, transparent 70%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(56, 189, 248, 0.06) 70%, rgba(14, 165, 233, 0.12) 100%) !important;
  box-shadow:
    inset 0 1.25px 2px rgba(255, 255, 255, 0.35),
    inset 0 -0.75px 1px rgba(255, 255, 255, 0.18),
    0 0 14px rgba(56, 189, 248, 0.3),
    0 1px 6px rgba(56, 189, 248, 0.2) !important;
  color: #ffffff !important;
}
.preview-player[data-theme="water-droplet"] svg,
.preview-player[data-theme="water-droplet"] .player-icon-scale svg,
.preview-player[data-theme="water-droplet"] .group\\/mute svg,
.preview-player[data-theme="water-droplet"] .group\\/liquid-btn svg,
.preview-player[data-theme="water-droplet"] [data-slot="control"] svg,
.preview-player[data-theme="water-droplet"] .media-fullscreen-button svg,
.preview-player[data-theme="water-droplet"] .group\\/play svg {
  color: #ffffff !important;
  fill: currentColor !important;
  filter: none !important;
  -webkit-filter: none !important;
  border: none !important;
  outline: none !important;
  opacity: 0.95 !important;
}
.preview-player[data-theme="water-droplet"] .group\\/vol-pill {
  border-radius: 9999px !important;
  border: none !important;
  outline: none !important;
  background:
    radial-gradient(ellipse 35% 15% at 35% 16%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 70%),
    radial-gradient(ellipse 30% 14% at 65% 84%, rgba(255, 255, 255, 0.2) 0%, rgba(186, 230, 253, 0.08) 40%, transparent 70%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, rgba(56, 189, 248, 0.04) 70%, rgba(14, 165, 233, 0.09) 100%) !important;
  backdrop-filter: blur(2px) contrast(115%) brightness(118%) saturate(135%) !important;
  -webkit-backdrop-filter: blur(2px) contrast(115%) brightness(118%) saturate(135%) !important;
  box-shadow:
    inset 0 1px 1.5px rgba(255, 255, 255, 0.3),
    inset 0 -0.5px 1px rgba(255, 255, 255, 0.15),
    0 0 12px rgba(56, 189, 248, 0.22),
    0 1px 4px rgba(56, 189, 248, 0.15) !important;
}
.preview-player[data-theme="water-droplet"] .group\\/vol-pill div[class*="bg-white/20"] {
  height: 4px !important;
  border-radius: 9999px !important;
  background: rgba(255, 255, 255, 0.18) !important;
  border: none !important;
  box-shadow: inset 0 1px 1.5px rgba(255, 255, 255, 0.2) !important;
}
.preview-player[data-theme="water-droplet"] .group\\/vol-pill div[class*="bg-white/90"] {
  height: 4px !important;
  border-radius: 9999px !important;
  border: none !important;
  background: linear-gradient(90deg, #38bdf8 0%, #0ea5e9 70%, #bae6fd 100%) !important;
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.7) !important;
}
.preview-player[data-theme="water-droplet"] .volume-slider-thumb {
  width: 9px !important;
  height: 9px !important;
  border-radius: 50% !important;
  border: none !important;
  outline: none !important;
  background: radial-gradient(circle at 35% 25%, #ffffff 0%, #bae6fd 50%, #38bdf8 100%) !important;
  box-shadow: 0 0 6px rgba(56, 189, 248, 0.6) !important;
}
.preview-player[data-theme="water-droplet"] div[class*="media-slider-smooth"][class*="isolate"] {
  height: 4px !important;
  border-radius: 9999px !important;
  background: rgba(255, 255, 255, 0.18) !important;
  border: none !important;
  box-shadow: inset 0 1px 1.5px rgba(255, 255, 255, 0.2) !important;
}
.preview-player[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-buffer]"] {
  background: rgba(186, 230, 253, 0.25) !important;
  border-radius: 9999px !important;
  border: none !important;
}
.preview-player[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-fill]"] {
  background: linear-gradient(90deg, #38bdf8 0%, #0ea5e9 50%, #7dd3fc 85%, #bae6fd 100%) !important;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.7) !important;
  border-radius: 9999px !important;
  border: none !important;
}
.preview-player[data-theme="water-droplet"] .group\\/slider .media-thumb-smooth {
  width: 14px !important;
  height: 14px !important;
  border-radius: 50% !important;
  border: none !important;
  outline: none !important;
  background:
    radial-gradient(ellipse 35% 15% at 35% 20%, rgba(255, 255, 255, 0.5) 0%, transparent 60%),
    radial-gradient(circle at 50% 50%, #bae6fd 0%, #38bdf8 70%, #0284c7 100%) !important;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.6), inset 0 1px 1.5px rgba(255, 255, 255, 0.4) !important;
  opacity: 1 !important;
  display: block !important;
}
.preview-player[data-theme="water-droplet"] time-value,
.preview-player[data-theme="water-droplet"] div[class*="tabular-nums"] {
  color: #ffffff !important;
  text-shadow: 0 0 8px rgba(56, 189, 248, 0.75) !important;
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
  console.log('Successfully updated water-droplet with reduced north & south white!');
} else {
  console.warn('Could not match water-droplet block!');
}

fs.writeFileSync(cssPath, css, 'utf8');
console.log('preview.css written. Length:', css.length);

