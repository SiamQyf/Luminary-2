import re

water_caustic_seek_css = """
/* --- Water Droplet Animated Caustic Seekbar (Thinner & Styled Like Icon BG) --- */
.preview-player[data-theme="water-droplet"] .group\\/slider,
:root[data-theme="water-droplet"] .group\\/slider,
:where(.media-skin)[data-theme="water-droplet"] .group\\/slider {
  height: 24px !important;
}

.preview-player[data-theme="water-droplet"] div[class*="media-slider-smooth"][class*="isolate"],
:root[data-theme="water-droplet"] div[class*="media-slider-smooth"][class*="isolate"],
:where(.media-skin)[data-theme="water-droplet"] div[class*="media-slider-smooth"][class*="isolate"] {
  height: 3.5px !important;
  position: absolute !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  border-radius: 9999px !important;
  overflow: hidden !important;
  background:
    radial-gradient(ellipse 40% 50% at 35% 15%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 80%),
    radial-gradient(ellipse 35% 50% at 65% 85%, rgba(186, 230, 253, 0.1) 0%, transparent 60%),
    linear-gradient(180deg, rgba(56, 189, 248, 0.06) 0%, rgba(14, 165, 233, 0.08) 100%),
    rgba(4, 18, 30, 0.25) !important;
  backdrop-filter: blur(14px) saturate(160%) !important;
  -webkit-backdrop-filter: blur(14px) saturate(160%) !important;
  border: 1px solid rgba(186, 230, 253, 0.22) !important;
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.4),
    inset 0 -1px 1px rgba(2, 132, 199, 0.18),
    0 0 8px rgba(56, 189, 248, 0.18),
    0 2px 6px rgba(0, 0, 0, 0.4) !important;
  transition: height 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease-out !important;
}

.preview-player[data-theme="water-droplet"] div[class*="media-slider-smooth"][class*="isolate"]::after,
:root[data-theme="water-droplet"] div[class*="media-slider-smooth"][class*="isolate"]::after,
:where(.media-skin)[data-theme="water-droplet"] div[class*="media-slider-smooth"][class*="isolate"]::after {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  border-radius: inherit !important;
  pointer-events: none !important;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='w' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.034' numOctaves='2' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.85 0 0 0 0 1 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0.1 0.7 1 0.4 0 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='w' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.034' numOctaves='2' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.85 0 0 0 0 1 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0.1 0.7 1 0.4 0 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)'/%3E%3C/svg%3E") !important;
  background-size: 160px 40px, 240px 60px !important;
  mix-blend-mode: plus-lighter !important;
  opacity: 0.45 !important;
  animation: 26s ease-in-out infinite water-caustic-sway !important;
}

.preview-player[data-theme="water-droplet"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"],
:root[data-theme="water-droplet"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"],
:where(.media-skin)[data-theme="water-droplet"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"] {
  height: 5.5px !important;
  box-shadow:
    inset 0 1px 1.5px rgba(255, 255, 255, 0.5),
    inset 0 -1px 1.5px rgba(2, 132, 199, 0.3),
    0 0 12px rgba(56, 189, 248, 0.35),
    0 3px 8px rgba(0, 0, 0, 0.5) !important;
}

.preview-player[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-buffer]"],
:root[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-buffer]"],
:where(.media-skin)[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-buffer]"] {
  position: absolute !important;
  top: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  background: rgba(186, 230, 253, 0.18) !important;
  border-radius: 9999px !important;
  border: none !important;
}

.preview-player[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-fill]"],
:root[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-fill]"],
:where(.media-skin)[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-fill]"] {
  position: absolute !important;
  top: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  border-radius: 9999px !important;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 100%),
    linear-gradient(90deg, rgba(14, 165, 233, 0.65) 0%, rgba(56, 189, 248, 0.8) 75%, rgba(186, 230, 253, 0.9) 100%) !important;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.5) !important;
  overflow: hidden !important;
  border: none !important;
}

.preview-player[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-fill]"]::after,
:root[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-fill]"]::after,
:where(.media-skin)[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-fill]"]::after {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  border-radius: inherit !important;
  background-image:
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='w' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.034' numOctaves='2' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.85 0 0 0 0 1 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0.1 0.7 1 0.4 0 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='w' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.034' numOctaves='2' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.85 0 0 0 0 1 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0.1 0.7 1 0.4 0 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)'/%3E%3C/svg%3E") !important;
  background-size: 160px 40px, 240px 60px !important;
  mix-blend-mode: plus-lighter !important;
  opacity: 0.75 !important;
  animation: 20s ease-in-out infinite water-caustic-sway !important;
}

/* Water Droplet Knob: Exactly styled like the Volume Knob */
.preview-player[data-theme="water-droplet"] .group\\/slider .media-thumb-smooth,
:root[data-theme="water-droplet"] .group\\/slider .media-thumb-smooth,
:where(.media-skin)[data-theme="water-droplet"] .group\\/slider .media-thumb-smooth {
  width: 9.5px !important;
  height: 9.5px !important;
  top: 50% !important;
  border-radius: 50% !important;
  border: none !important;
  outline: none !important;
  background:
    radial-gradient(ellipse 42% 18% at 35% 16%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.18) 45%, transparent 75%),
    radial-gradient(ellipse 38% 16% at 65% 84%, rgba(255, 255, 255, 0.3) 0%, rgba(186, 230, 253, 0.1) 40%, transparent 75%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(56, 189, 248, 0.08) 60%, rgba(14, 165, 233, 0.18) 85%, rgba(2, 44, 75, 0.22) 100%) !important;
  backdrop-filter: blur(2px) contrast(115%) brightness(118%) saturate(135%) !important;
  -webkit-backdrop-filter: blur(2px) contrast(115%) brightness(118%) saturate(135%) !important;
  box-shadow:
    inset 0 1px 1.5px rgba(255, 255, 255, 0.45),
    inset 0 -0.5px 1px rgba(255, 255, 255, 0.2),
    0 0 8px rgba(56, 189, 248, 0.4),
    0 1px 3px rgba(56, 189, 248, 0.2) !important;
  opacity: 1 !important;
  display: block !important;
  overflow: visible !important;
  transition: scale 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease-out !important;
}

.preview-player[data-theme="water-droplet"] .group\\/slider:hover .media-thumb-smooth,
.preview-player[data-theme="water-droplet"] .group\\/slider[data-dragging] .media-thumb-smooth,
:root[data-theme="water-droplet"] .group\\/slider:hover .media-thumb-smooth,
:root[data-theme="water-droplet"] .group\\/slider[data-dragging] .media-thumb-smooth {
  scale: 1.25 !important;
  box-shadow:
    inset 0 1.25px 2px rgba(255, 255, 255, 0.6),
    inset 0 -0.75px 1.5px rgba(255, 255, 255, 0.3),
    0 0 12px rgba(56, 189, 248, 0.55),
    0 1px 5px rgba(56, 189, 248, 0.25) !important;
}
"""

refined_caustic_css = """/* ==========================================================================
   CAUSTIC & OPTICAL SHIMMER ICON BACKGROUND ANIMATIONS
   (Water Droplet, Crystal, Cosmic Nebula)
   High-transparency light-bending glass with subtle procedural caustics
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
   1. WATER DROPLET: Translucent Liquid Sunlight Caustic Animation
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
  border-radius: 9999px !important;
  background:
    radial-gradient(ellipse 40% 25% at 35% 15%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.03) 50%, transparent 80%),
    radial-gradient(ellipse 35% 20% at 65% 85%, rgba(186, 230, 253, 0.1) 0%, transparent 60%),
    linear-gradient(180deg, rgba(56, 189, 248, 0.06) 0%, rgba(14, 165, 233, 0.08) 100%),
    rgba(4, 18, 30, 0.25) !important;
  backdrop-filter: blur(14px) saturate(160%) !important;
  -webkit-backdrop-filter: blur(14px) saturate(160%) !important;
  box-shadow:
    inset 0 1px 1.5px rgba(255, 255, 255, 0.4),
    inset 0 -1px 1.5px rgba(2, 132, 199, 0.18),
    0 0 10px rgba(56, 189, 248, 0.18),
    0 4px 14px rgba(0, 0, 0, 0.4) !important;
  border: 1px solid rgba(186, 230, 253, 0.22) !important;
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
  background-size: 200px 200px, 320px 320px !important;
  mix-blend-mode: plus-lighter !important;
  opacity: 0.45 !important;
  animation: 28s ease-in-out infinite water-caustic-sway !important;
  -webkit-mask: radial-gradient(circle at 40% 40%, #000 0%, #000 50%, transparent 95%) !important;
  mask: radial-gradient(circle at 40% 40%, #000 0%, #000 50%, transparent 95%) !important;
}

/* Water Caustic Reversing Sway (Decelerates smoothly near edge, then reverses without ending/restarting) */
@keyframes water-caustic-sway {
  0% {
    background-position: 0px 0px, 0px 0px;
  }
  50% {
    background-position: 180px 45px, -220px -50px;
  }
  100% {
    background-position: 0px 0px, 0px 0px;
  }
}

""" + water_caustic_seek_css + """

/* --------------------------------------------------------------------------
   2. CRYSTAL: Translucent Optical Quartz Scintillation
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
  border-radius: 12px !important;
  background:
    radial-gradient(ellipse 45% 25% at 30% 15%, rgba(255, 255, 255, 0.22) 0%, transparent 60%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(186, 230, 253, 0.05) 100%),
    rgba(8, 12, 20, 0.25) !important;
  backdrop-filter: blur(16px) saturate(170%) !important;
  -webkit-backdrop-filter: blur(16px) saturate(170%) !important;
  box-shadow:
    inset 0 1px 1.5px rgba(255, 255, 255, 0.45),
    inset 0 -1px 1px rgba(186, 230, 253, 0.15),
    0 0 12px rgba(186, 230, 253, 0.15),
    0 4px 14px rgba(0, 0, 0, 0.45) !important;
  border: 1px solid rgba(255, 255, 255, 0.25) !important;
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
  opacity: 0.45 !important;
  animation: 26s ease-in-out infinite crystal-prismatic-drift !important;
  -webkit-mask: linear-gradient(135deg, #000 0%, #000 60%, transparent 100%) !important;
  mask: linear-gradient(135deg, #000 0%, #000 60%, transparent 100%) !important;
}

@keyframes crystal-prismatic-drift {
  0% { background-position: 0 0, 0 0; }
  50% { background-position: -160px 80px, 220px -110px; }
  100% { background-position: 0 0, 0 0; }
}

/* --------------------------------------------------------------------------
   3. COSMIC NEBULA: Translucent Deep Space Stardust Aurora
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
    radial-gradient(circle at 30% 20%, rgba(216, 180, 254, 0.16) 0%, transparent 55%),
    radial-gradient(circle at 75% 85%, rgba(236, 72, 153, 0.10) 0%, transparent 55%),
    linear-gradient(180deg, rgba(168, 85, 247, 0.08) 0%, rgba(107, 33, 168, 0.10) 60%, rgba(59, 7, 100, 0.14) 100%),
    rgba(12, 6, 24, 0.28) !important;
  backdrop-filter: blur(16px) saturate(170%) brightness(1.04) !important;
  -webkit-backdrop-filter: blur(16px) saturate(170%) brightness(1.04) !important;
  box-shadow:
    inset 0 1px 1.5px rgba(233, 213, 255, 0.35),
    inset 0 -1px 1px rgba(147, 51, 234, 0.15),
    0 0 12px rgba(168, 85, 247, 0.2),
    0 4px 14px rgba(0, 0, 0, 0.5) !important;
  border: 1px solid rgba(216, 180, 254, 0.22) !important;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease-out !important;
}

.preview-player[data-theme="cosmic-nebula"] .group\\/liquid-btn:hover,
.preview-player[data-theme="cosmic-nebula"] .group\\/center-buffering button:hover,
.preview-player[data-theme="cosmic-nebula"] [data-slot="control"]:hover,
.preview-player[data-theme="cosmic-nebula"] .media-fullscreen-button:hover,
.preview-player[data-theme="cosmic-nebula"] .group\\/vol-pill:hover {
  transform: scale(1.04) translateY(-1px) !important;
  box-shadow:
    inset 0 1px 2px rgba(255, 255, 255, 0.5),
    0 0 16px rgba(192, 132, 252, 0.4),
    0 6px 18px rgba(0, 0, 0, 0.6) !important;
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
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.026' numOctaves='2' seed='42' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.7 0 0 0 0 0.4 0 0 0 0 0.95 0.9 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0.1 0.6 1 0.5 0 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.026' numOctaves='2' seed='42' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.7 0 0 0 0 0.4 0 0 0 0 0.95 0.9 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0.1 0.6 1 0.5 0 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E") !important;
  background-size: 220px 220px, 340px 340px !important;
  mix-blend-mode: plus-lighter !important;
  opacity: 0.38 !important;
  animation: 30s ease-in-out infinite cosmic-nebula-drift !important;
  -webkit-mask: radial-gradient(circle at 50% 50%, #000 15%, #000000aa 55%, transparent 95%) !important;
  mask: radial-gradient(circle at 50% 50%, #000 15%, #000000aa 55%, transparent 95%) !important;
}

@keyframes cosmic-nebula-drift {
  0% { background-position: 0 0, 0 0; }
  50% { background-position: 180px -110px, -240px 160px; }
  100% { background-position: 0 0, 0 0; }
}

@media (prefers-reduced-motion: reduce) {
  .preview-player[data-theme="water-droplet"] .group\\/liquid-btn::after,
  .preview-player[data-theme="water-droplet"] .group\\/vol-pill::after,
  .preview-player[data-theme="water-droplet"] div[class*="media-slider-smooth"][class*="isolate"]::after,
  .preview-player[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-fill]"]::after,
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
"""

files = [
    r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css',
    r'd:\video player\custom-skin\apps\preview\src\frame\preview.css',
    r'd:\video player\skin 2\custom-skin\src\skin.css',
    r'd:\video player\custom-skin\src\skin.css'
]

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    
    start_marker = '/* ==========================================================================\n   CAUSTIC & OPTICAL SHIMMER ICON BACKGROUND ANIMATIONS'
    start_marker_crlf = '/* ==========================================================================\r\n   CAUSTIC & OPTICAL SHIMMER ICON BACKGROUND ANIMATIONS'
    
    s_idx = content.find(start_marker)
    if s_idx == -1:
        s_idx = content.find(start_marker_crlf)
    
    if s_idx != -1:
        # Find next comment
        next_comm = content.find('/* ==========================================================================', s_idx + 50)
        if next_comm != -1:
            content = content[:s_idx] + content[next_comm:]
            
    target = '/* ==========================================================================\n   GLACIAL PERMAFROST: Arctic Crystalline Ice Columns'
    target_crlf = '/* ==========================================================================\r\n   GLACIAL PERMAFROST: Arctic Crystalline Ice Columns'
    
    t_idx = content.find(target)
    if t_idx == -1:
        t_idx = content.find(target_crlf)
        
    if t_idx == -1:
        u_idx = content.find('Universal Silky-Smooth Progress Knob')
        if u_idx != -1:
            t_idx = content.rfind('/* ==========================================================================', 0, u_idx)
            
    if t_idx == -1:
        print('Target not found in', f)
        continue
        
    new_content = content[:t_idx] + refined_caustic_css.strip() + '\n\n' + content[t_idx:]
    with open(f, 'w', encoding='utf-8') as fp:
        fp.write(new_content)
    print('Updated', f)
