const fs = require('fs');

const causticCss = `
/* ==========================================================================
   CAUSTIC & OPTICAL SHIMMER ICON BACKGROUND ANIMATIONS
   (Water Droplet, Crystal, Cosmic Nebula)
   Inspired by light-bending caustics with procedural interference networks
   ========================================================================== */

/* --- Universal Icon Stacking on Caustic Buttons --- */
.preview-player[data-theme="water-droplet"] .player-icon-scale,
.preview-player[data-theme="water-droplet"] .group\\/liquid-btn svg,
.preview-player[data-theme="water-droplet"] [data-slot="control"] svg,
.preview-player[data-theme="water-droplet"] .media-fullscreen-button svg,
.preview-player[data-theme="water-droplet"] .group\\/play svg,
.preview-player[data-theme="water-droplet"] .group\\/vol-pill svg,
.preview-player[data-theme="water-droplet"] .group\\/vol-pill > *,
.preview-player[data-theme="crystal"] .player-icon-scale,
.preview-player[data-theme="crystal"] .group\\/liquid-btn svg,
.preview-player[data-theme="crystal"] [data-slot="control"] svg,
.preview-player[data-theme="crystal"] .media-fullscreen-button svg,
.preview-player[data-theme="crystal"] .group\\/play svg,
.preview-player[data-theme="crystal"] .group\\/vol-pill svg,
.preview-player[data-theme="crystal"] .group\\/vol-pill > *,
.preview-player[data-theme="cosmic-nebula"] .player-icon-scale,
.preview-player[data-theme="cosmic-nebula"] .group\\/liquid-btn svg,
.preview-player[data-theme="cosmic-nebula"] [data-slot="control"] svg,
.preview-player[data-theme="cosmic-nebula"] .media-fullscreen-button svg,
.preview-player[data-theme="cosmic-nebula"] .group\\/play svg,
.preview-player[data-theme="cosmic-nebula"] .group\\/vol-pill svg,
.preview-player[data-theme="cosmic-nebula"] .group\\/vol-pill > *,
:root[data-theme="water-droplet"] svg,
:root[data-theme="crystal"] svg,
:root[data-theme="cosmic-nebula"] svg,
:where(.media-skin)[data-theme="water-droplet"] svg,
:where(.media-skin)[data-theme="crystal"] svg,
:where(.media-skin)[data-theme="cosmic-nebula"] svg {
  position: relative !important;
  z-index: 2 !important;
}

/* --------------------------------------------------------------------------
   1. WATER DROPLET: Liquid Sunlight Caustic Network Animation
   -------------------------------------------------------------------------- */
.preview-player[data-theme="water-droplet"] .group\\/liquid-btn,
.preview-player[data-theme="water-droplet"] .group\\/center-buffering button,
.preview-player[data-theme="water-droplet"] [data-slot="control"],
.preview-player[data-theme="water-droplet"] .media-fullscreen-button,
.preview-player[data-theme="water-droplet"] .group\\/vol-pill,
:root[data-theme="water-droplet"] .group\\/liquid-btn,
:root[data-theme="water-droplet"] .group\\/center-buffering button,
:root[data-theme="water-droplet"] [data-slot="control"],
:root[data-theme="water-droplet"] .media-fullscreen-button,
:root[data-theme="water-droplet"] .group\\/vol-pill,
:where(.media-skin)[data-theme="water-droplet"] .group\\/liquid-btn,
:where(.media-skin)[data-theme="water-droplet"] .group\\/center-buffering button,
:where(.media-skin)[data-theme="water-droplet"] [data-slot="control"],
:where(.media-skin)[data-theme="water-droplet"] .media-fullscreen-button,
:where(.media-skin)[data-theme="water-droplet"] .group\\/vol-pill {
  position: relative !important;
  overflow: hidden !important;
}

.preview-player[data-theme="water-droplet"] .group\\/liquid-btn::after,
.preview-player[data-theme="water-droplet"] .group\\/center-buffering button::after,
.preview-player[data-theme="water-droplet"] [data-slot="control"]::after,
.preview-player[data-theme="water-droplet"] .media-fullscreen-button::after,
.preview-player[data-theme="water-droplet"] .group\\/vol-pill::after,
:root[data-theme="water-droplet"] .group\\/liquid-btn::after,
:root[data-theme="water-droplet"] .group\\/center-buffering button::after,
:root[data-theme="water-droplet"] [data-slot="control"]::after,
:root[data-theme="water-droplet"] .media-fullscreen-button::after,
:root[data-theme="water-droplet"] .group\\/vol-pill::after,
:where(.media-skin)[data-theme="water-droplet"] .group\\/liquid-btn::after,
:where(.media-skin)[data-theme="water-droplet"] .group\\/center-buffering button::after,
:where(.media-skin)[data-theme="water-droplet"] [data-slot="control"]::after,
:where(.media-skin)[data-theme="water-droplet"] .media-fullscreen-button::after,
:where(.media-skin)[data-theme="water-droplet"] .group\\/vol-pill::after {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  border-radius: inherit !important;
  pointer-events: none !important;
  z-index: 1 !important;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='w' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.034' numOctaves='2' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.85 0 0 0 0 1 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0.1 0.7 1 0.4 0 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='w' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.034' numOctaves='2' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.85 0 0 0 0 1 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0.1 0.7 1 0.4 0 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)'/%3E%3C/svg%3E") !important;
  background-size: 220px 220px, 340px 340px !important;
  mix-blend-mode: plus-lighter !important;
  opacity: 0.65 !important;
  animation: 13s linear infinite water-caustic-drift !important;
  -webkit-mask: radial-gradient(circle at 40% 40%, #000 0%, #000 55%, transparent 95%) !important;
  mask: radial-gradient(circle at 40% 40%, #000 0%, #000 55%, transparent 95%) !important;
}

@keyframes water-caustic-drift {
  from { background-position: 0 0, 0 0; }
  to { background-position: 220px 110px, -340px -170px; }
}

/* --------------------------------------------------------------------------
   2. CRYSTAL: Prismatic Scintillation Lattice Animation
   -------------------------------------------------------------------------- */
.preview-player[data-theme="crystal"] .group\\/liquid-btn,
.preview-player[data-theme="crystal"] .group\\/center-buffering button,
.preview-player[data-theme="crystal"] [data-slot="control"],
.preview-player[data-theme="crystal"] .media-fullscreen-button,
.preview-player[data-theme="crystal"] .group\\/vol-pill,
:root[data-theme="crystal"] .group\\/liquid-btn,
:root[data-theme="crystal"] .group\\/center-buffering button,
:root[data-theme="crystal"] [data-slot="control"],
:root[data-theme="crystal"] .media-fullscreen-button,
:root[data-theme="crystal"] .group\\/vol-pill,
:where(.media-skin)[data-theme="crystal"] .group\\/liquid-btn,
:where(.media-skin)[data-theme="crystal"] .group\\/center-buffering button,
:where(.media-skin)[data-theme="crystal"] [data-slot="control"],
:where(.media-skin)[data-theme="crystal"] .media-fullscreen-button,
:where(.media-skin)[data-theme="crystal"] .group\\/vol-pill {
  position: relative !important;
  overflow: hidden !important;
}

.preview-player[data-theme="crystal"] .group\\/liquid-btn::after,
.preview-player[data-theme="crystal"] .group\\/center-buffering button::after,
.preview-player[data-theme="crystal"] [data-slot="control"]::after,
.preview-player[data-theme="crystal"] .media-fullscreen-button::after,
.preview-player[data-theme="crystal"] .group\\/vol-pill::after,
:root[data-theme="crystal"] .group\\/liquid-btn::after,
:root[data-theme="crystal"] .group\\/center-buffering button::after,
:root[data-theme="crystal"] [data-slot="control"]::after,
:root[data-theme="crystal"] .media-fullscreen-button::after,
:root[data-theme="crystal"] .group\\/vol-pill::after,
:where(.media-skin)[data-theme="crystal"] .group\\/liquid-btn::after,
:where(.media-skin)[data-theme="crystal"] .group\\/center-buffering button::after,
:where(.media-skin)[data-theme="crystal"] [data-slot="control"]::after,
:where(.media-skin)[data-theme="crystal"] .media-fullscreen-button::after,
:where(.media-skin)[data-theme="crystal"] .group\\/vol-pill::after {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  border-radius: inherit !important;
  pointer-events: none !important;
  z-index: 1 !important;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='c' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.048' numOctaves='3' seed='19' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.9 0 0 0 0 0.95 0 0 0 0 1 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0 0 0.3 1 0.7 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='c' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.048' numOctaves='3' seed='19' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.9 0 0 0 0 0.95 0 0 0 0 1 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0 0 0.3 1 0.7 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)'/%3E%3C/svg%3E") !important;
  background-size: 190px 190px, 280px 280px !important;
  mix-blend-mode: plus-lighter !important;
  opacity: 0.7 !important;
  animation: 17s linear infinite crystal-prismatic-drift !important;
  -webkit-mask: linear-gradient(135deg, #000 0%, #000 65%, transparent 100%) !important;
  mask: linear-gradient(135deg, #000 0%, #000 65%, transparent 100%) !important;
}

@keyframes crystal-prismatic-drift {
  from { background-position: 0 0, 0 0; }
  to { background-position: -190px 95px, 280px -140px; }
}

/* --------------------------------------------------------------------------
   3. COSMIC NEBULA: Interstellar Stardust Aurora Animation
   -------------------------------------------------------------------------- */
.preview-player[data-theme="cosmic-nebula"] .group\\/liquid-btn,
.preview-player[data-theme="cosmic-nebula"] .group\\/center-buffering button,
.preview-player[data-theme="cosmic-nebula"] [data-slot="control"],
.preview-player[data-theme="cosmic-nebula"] .media-fullscreen-button,
.preview-player[data-theme="cosmic-nebula"] .group\\/vol-pill,
:root[data-theme="cosmic-nebula"] .group\\/liquid-btn,
:root[data-theme="cosmic-nebula"] .group\\/center-buffering button,
:root[data-theme="cosmic-nebula"] [data-slot="control"],
:root[data-theme="cosmic-nebula"] .media-fullscreen-button,
:root[data-theme="cosmic-nebula"] .group\\/vol-pill,
:where(.media-skin)[data-theme="cosmic-nebula"] .group\\/liquid-btn,
:where(.media-skin)[data-theme="cosmic-nebula"] .group\\/center-buffering button,
:where(.media-skin)[data-theme="cosmic-nebula"] [data-slot="control"],
:where(.media-skin)[data-theme="cosmic-nebula"] .media-fullscreen-button,
:where(.media-skin)[data-theme="cosmic-nebula"] .group\\/vol-pill {
  position: relative !important;
  overflow: hidden !important;
  border-radius: 14px !important;
  background:
    radial-gradient(circle at 30% 25%, rgba(216, 180, 254, 0.22) 0%, transparent 55%),
    radial-gradient(circle at 75% 80%, rgba(236, 72, 153, 0.18) 0%, transparent 60%),
    linear-gradient(145deg, rgba(88, 28, 135, 0.35) 0%, rgba(30, 10, 60, 0.6) 100%),
    rgba(15, 6, 32, 0.6) !important;
  backdrop-filter: blur(14px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(14px) saturate(180%) !important;
  box-shadow:
    inset 0 1px 1.5px rgba(233, 213, 255, 0.4),
    inset 0 -1px 1.5px rgba(168, 85, 247, 0.25),
    0 0 14px rgba(168, 85, 247, 0.35),
    0 6px 20px rgba(0, 0, 0, 0.6) !important;
  border: 1px solid rgba(192, 132, 252, 0.35) !important;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease-out !important;
}

.preview-player[data-theme="cosmic-nebula"] .group\\/liquid-btn:hover,
.preview-player[data-theme="cosmic-nebula"] .group\\/center-buffering button:hover,
.preview-player[data-theme="cosmic-nebula"] [data-slot="control"]:hover,
.preview-player[data-theme="cosmic-nebula"] .media-fullscreen-button:hover,
.preview-player[data-theme="cosmic-nebula"] .group\\/vol-pill:hover {
  transform: scale(1.05) translateY(-1px) !important;
  box-shadow:
    inset 0 1px 2px rgba(255, 255, 255, 0.5),
    0 0 20px rgba(192, 132, 252, 0.6),
    0 8px 24px rgba(0, 0, 0, 0.7) !important;
}

.preview-player[data-theme="cosmic-nebula"] .group\\/liquid-btn::after,
.preview-player[data-theme="cosmic-nebula"] .group\\/center-buffering button::after,
.preview-player[data-theme="cosmic-nebula"] [data-slot="control"]::after,
.preview-player[data-theme="cosmic-nebula"] .media-fullscreen-button::after,
.preview-player[data-theme="cosmic-nebula"] .group\\/vol-pill::after,
:root[data-theme="cosmic-nebula"] .group\\/liquid-btn::after,
:root[data-theme="cosmic-nebula"] .group\\/center-buffering button::after,
:root[data-theme="cosmic-nebula"] [data-slot="control"]::after,
:root[data-theme="cosmic-nebula"] .media-fullscreen-button::after,
:root[data-theme="cosmic-nebula"] .group\\/vol-pill::after,
:where(.media-skin)[data-theme="cosmic-nebula"] .group\\/liquid-btn::after,
:where(.media-skin)[data-theme="cosmic-nebula"] .group\\/center-buffering button::after,
:where(.media-skin)[data-theme="cosmic-nebula"] [data-slot="control"]::after,
:where(.media-skin)[data-theme="cosmic-nebula"] .media-fullscreen-button::after,
:where(.media-skin)[data-theme="cosmic-nebula"] .group\\/vol-pill::after {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  border-radius: inherit !important;
  pointer-events: none !important;
  z-index: 1 !important;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.024' numOctaves='2' seed='42' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.85 0 0 0 0 0.45 0 0 0 0 1 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0.05 0.3 0.8 1 0.7 0.2 0 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.024' numOctaves='2' seed='42' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.85 0 0 0 0 0.45 0 0 0 0 1 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0.05 0.3 0.8 1 0.7 0.2 0 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E") !important;
  background-size: 240px 240px, 360px 360px !important;
  mix-blend-mode: plus-lighter !important;
  opacity: 0.65 !important;
  animation: 20s linear infinite cosmic-nebula-drift !important;
  -webkit-mask: radial-gradient(circle at 50% 50%, #000 20%, #000000bb 60%, transparent 95%) !important;
  mask: radial-gradient(circle at 50% 50%, #000 20%, #000000bb 60%, transparent 95%) !important;
}

@keyframes cosmic-nebula-drift {
  0% { background-position: 0 0, 0 0; }
  50% { background-position: 120px -80px, -180px 120px; }
  100% { background-position: 240px -160px, -360px 240px; }
}

@media (prefers-reduced-motion: reduce) {
  .preview-player[data-theme="water-droplet"] .group\\/liquid-btn::after,
  .preview-player[data-theme="water-droplet"] .group\\/vol-pill::after,
  .preview-player[data-theme="crystal"] .group\\/liquid-btn::after,
  .preview-player[data-theme="crystal"] .group\\/vol-pill::after,
  .preview-player[data-theme="cosmic-nebula"] .group\\/liquid-btn::after,
  .preview-player[data-theme="cosmic-nebula"] .group\\/vol-pill::after,
  :root[data-theme="water-droplet"] .group\\/liquid-btn::after,
  :root[data-theme="crystal"] .group\\/liquid-btn::after,
  :root[data-theme="cosmic-nebula"] .group\\/liquid-btn::after {
    animation: none !important;
  }
}
`;

function replaceCausticInFiles() {
  const files = [
    'd:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css',
    'd:/video player/custom-skin/apps/preview/src/frame/preview.css',
    'd:/video player/skin 2/custom-skin/src/skin.css',
    'd:/video player/custom-skin/src/skin.css'
  ];

  for (const f of files) {
    let content = fs.readFileSync(f, 'utf8');
    const startMarker = '/* ==========================================================================\n   CAUSTIC & OPTICAL SHIMMER ICON BACKGROUND ANIMATIONS';
    const startMarkerCRLF = '/* ==========================================================================\r\n   CAUSTIC & OPTICAL SHIMMER ICON BACKGROUND ANIMATIONS';
    
    let sIdx = content.indexOf(startMarker);
    if (sIdx === -1) sIdx = content.indexOf(startMarkerCRLF);

    if (sIdx !== -1) {
      // Find where next comment starts
      const nextComment = content.indexOf('/* ==========================================================================', sIdx + 50);
      if (nextComment !== -1) {
        content = content.slice(0, sIdx) + content.slice(nextComment);
      }
    }

    const target = '/* ==========================================================================\n   GLACIAL PERMAFROST: Arctic Crystalline Ice Columns';
    const targetCRLF = '/* ==========================================================================\r\n   GLACIAL PERMAFROST: Arctic Crystalline Ice Columns';
    
    let tIdx = content.indexOf(target);
    if (tIdx === -1) tIdx = content.indexOf(targetCRLF);

    if (tIdx === -1) {
      console.error('Target marker not found in', f);
      continue;
    }

    const newContent = content.slice(0, tIdx) + causticCss.trim() + '\n\n' + content.slice(tIdx);
    fs.writeFileSync(f, newContent, 'utf8');
    console.log('Replaced in', f);
  }
}

replaceCausticInFiles();
