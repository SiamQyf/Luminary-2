files = [
    r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css',
    r'd:\video player\skin 2\custom-skin\src\skin.css',
    r'd:\video player\custom-skin\apps\preview\src\frame\preview.css',
    r'd:\video player\custom-skin\src\skin.css',
]

header = '/* --- Water Droplet Animated Caustic Seekbar (Thinner & Styled Like Icon BG) --- */'

new_block = """/* --- Water Droplet Animated Caustic Seekbar (Thinner & Styled Like Icon BG) --- */
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
    radial-gradient(ellipse 40% 50% at 35% 15%, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 80%),
    radial-gradient(ellipse 35% 50% at 65% 85%, rgba(186, 230, 253, 0.22) 0%, transparent 60%),
    linear-gradient(180deg, rgba(56, 189, 248, 0.14) 0%, rgba(14, 165, 233, 0.18) 100%),
    rgba(4, 18, 30, 0.50) !important;
  backdrop-filter: blur(14px) saturate(160%) !important;
  -webkit-backdrop-filter: blur(14px) saturate(160%) !important;
  border: 1px solid rgba(186, 230, 253, 0.44) !important;
  box-shadow:
    inset 0 1px 1px rgba(255, 255, 255, 0.6),
    inset 0 -1px 1px rgba(2, 132, 199, 0.32),
    0 0 10px rgba(56, 189, 248, 0.32),
    0 2px 6px rgba(0, 0, 0, 0.5) !important;
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
  opacity: 0.65 !important;
  animation: 26s ease-in-out infinite water-caustic-sway !important;
}

.preview-player[data-theme="water-droplet"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"],
:root[data-theme="water-droplet"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"],
:where(.media-skin)[data-theme="water-droplet"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"] {
  height: 5.5px !important;
  box-shadow:
    inset 0 1px 1.5px rgba(255, 255, 255, 0.7),
    inset 0 -1px 1.5px rgba(2, 132, 199, 0.45),
    0 0 14px rgba(56, 189, 248, 0.45),
    0 3px 8px rgba(0, 0, 0, 0.6) !important;
}

.preview-player[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-buffer]"],
:root[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-buffer]"],
:where(.media-skin)[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-buffer]"] {
  position: absolute !important;
  top: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  background: rgba(186, 230, 253, 0.36) !important;
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
    linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.16) 50%, transparent 100%),
    linear-gradient(90deg, rgba(14, 165, 233, 0.85) 0%, rgba(56, 189, 248, 0.92) 75%, rgba(186, 230, 253, 0.96) 100%) !important;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.75) !important;
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
  opacity: 0.90 !important;
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
    radial-gradient(ellipse 42% 18% at 35% 16%, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.32) 45%, transparent 75%),
    radial-gradient(ellipse 38% 16% at 65% 84%, rgba(255, 255, 255, 0.45) 0%, rgba(186, 230, 253, 0.2) 40%, transparent 75%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(56, 189, 248, 0.16) 60%, rgba(14, 165, 233, 0.32) 85%, rgba(2, 44, 75, 0.40) 100%) !important;
  backdrop-filter: blur(2px) contrast(115%) brightness(118%) saturate(135%) !important;
  -webkit-backdrop-filter: blur(2px) contrast(115%) brightness(118%) saturate(135%) !important;
  box-shadow:
    inset 0 1px 1.5px rgba(255, 255, 255, 0.65),
    inset 0 -0.5px 1px rgba(255, 255, 255, 0.35),
    0 0 10px rgba(56, 189, 248, 0.6),
    0 1px 4px rgba(56, 189, 248, 0.35) !important;
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
    inset 0 1.25px 2px rgba(255, 255, 255, 0.8),
    inset 0 -0.75px 1.5px rgba(255, 255, 255, 0.45),
    0 0 14px rgba(56, 189, 248, 0.75),
    0 1px 5px rgba(56, 189, 248, 0.4) !important;
}
"""

next_header = '/* --------------------------------------------------------------------------\n   2. CRYSTAL'

for p in files:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    start = c.find(header)
    end = c.find(next_header, start)
    if start == -1 or end == -1:
        print(f'Error finding bounds in {p}')
        continue
    updated = c[:start] + new_block + '\n\n\n' + c[end:]
    with open(p, 'w', encoding='utf-8') as f:
        f.write(updated)
    print(f'Successfully updated {p}')
