import re

target_files = [
    r"d:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css",
    r"d:\video player\skin 2\custom-skin\src\skin.css",
    r"d:\video player\custom-skin\apps\preview\src\frame\preview.css",
    r"d:\video player\custom-skin\src\skin.css"
]

new_block = """/* Seekbar track: Carved Icy Crest and Trough Path */
.preview-player[data-theme="glacial-permafrost"] div[class*="media-slider-smooth"][class*="isolate"],
:root[data-theme="glacial-permafrost"] div[class*="media-slider-smooth"][class*="isolate"],
:where(.media-skin)[data-theme="glacial-permafrost"] div[class*="media-slider-smooth"][class*="isolate"] {
  height: 8px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  border-radius: 4px !important;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(186, 230, 253, 0.18) 35%, transparent 65%),
    linear-gradient(180deg, #020710 0%, #061322 100%) !important;
  border: 1px solid rgba(186, 230, 253, 0.45) !important;
  box-shadow:
    inset 0 1.5px 3px rgba(0, 0, 0, 0.95),
    inset 0 -1px 2px rgba(125, 211, 252, 0.2),
    0 0 10px rgba(56, 189, 248, 0.25),
    0 1px 0 rgba(255, 255, 255, 0.15) !important;
  -webkit-mask-image: none !important;
  mask-image: none !important;
  overflow: hidden !important;
  transition: height 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease-out, box-shadow 0.2s ease-out !important;
}

.preview-player[data-theme="glacial-permafrost"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"],
.preview-player[data-theme="glacial-permafrost"] .group\\/slider[data-dragging] div[class*="media-slider-smooth"][class*="isolate"],
:root[data-theme="glacial-permafrost"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"],
:root[data-theme="glacial-permafrost"] .group\\/slider[data-dragging] div[class*="media-slider-smooth"][class*="isolate"],
:where(.media-skin)[data-theme="glacial-permafrost"] .group\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"],
:where(.media-skin)[data-theme="glacial-permafrost"] .group\\/slider[data-dragging] div[class*="media-slider-smooth"][class*="isolate"] {
  height: 11px !important;
  border-color: rgba(224, 242, 254, 0.75) !important;
  box-shadow:
    inset 0 1.5px 3px rgba(0, 0, 0, 0.95),
    inset 0 -1px 2px rgba(125, 211, 252, 0.35),
    0 0 18px rgba(125, 211, 252, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.25) !important;
}

/* Buffer: Frosted pack ice */
.preview-player[data-theme="glacial-permafrost"] div[class*="clip-media-x-[--media-slider-buffer]"],
:root[data-theme="glacial-permafrost"] div[class*="clip-media-x-[--media-slider-buffer]"],
:where(.media-skin)[data-theme="glacial-permafrost"] div[class*="clip-media-x-[--media-slider-buffer]"] {
  border-radius: 3px !important;
  background-color: transparent !important;
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(125, 211, 252, 0.25) 50%, rgba(56, 189, 248, 0.15) 100%) !important;
}

/* Fill: Glacial melt stream with radiant icy crest */
.preview-player[data-theme="glacial-permafrost"] div[class*="clip-media-x-[--media-slider-fill]"],
:root[data-theme="glacial-permafrost"] div[class*="clip-media-x-[--media-slider-fill]"],
:where(.media-skin)[data-theme="glacial-permafrost"] div[class*="clip-media-x-[--media-slider-fill]"] {
  border-radius: 3px !important;
  background-color: transparent !important;
  background-image:
    linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(186, 230, 253, 0.7) 25%, transparent 60%),
    linear-gradient(90deg, #0284c7 0%, #0ea5e9 40%, #38bdf8 75%, #ffffff 100%) !important;
  box-shadow:
    0 0 14px rgba(56, 189, 248, 0.9),
    0 0 4px #ffffff,
    inset 0 1px 1px #ffffff !important;
  filter: none !important;
  opacity: 1 !important;
}

/* Thumb: 3px pure crystal ice needle (knob-less) */
.preview-player[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth,
:root[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth,
:where(.media-skin)[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth {
  width: 3px !important;
  height: 20px !important;
  top: 50% !important;
  transform: none !important;
  rotate: 0deg !important;
  border-radius: 1.5px !important;
  background: #ffffff !important;
  border: none !important;
  box-shadow:
    0 0 12px rgba(125, 211, 252, 1),
    0 0 3px #ffffff,
    0 0 20px rgba(56, 189, 248, 0.85),
    0 2px 6px rgba(0, 0, 0, 0.95) !important;
  opacity: 1 !important;
  display: block !important;
  overflow: visible !important;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.preview-player[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::before,
.preview-player[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::after,
:root[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::before,
:root[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::after,
:where(.media-skin)[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::before,
:where(.media-skin)[data-theme="glacial-permafrost"] .group\\/slider .media-thumb-smooth::after {
  display: none !important;
  content: none !important;
}

.preview-player[data-theme="glacial-permafrost"] .group\\/slider:hover .media-thumb-smooth,
.preview-player[data-theme="glacial-permafrost"] .group\\/slider[data-dragging] .media-thumb-smooth,
:root[data-theme="glacial-permafrost"] .group\\/slider:hover .media-thumb-smooth,
:root[data-theme="glacial-permafrost"] .group\\/slider[data-dragging] .media-thumb-smooth,
:where(.media-skin)[data-theme="glacial-permafrost"] .group\\/slider:hover .media-thumb-smooth,
:where(.media-skin)[data-theme="glacial-permafrost"] .group\\/slider[data-dragging] .media-thumb-smooth {
  height: 24px !important;
  scale: 1 !important;
  box-shadow:
    0 0 16px rgba(125, 211, 252, 1),
    0 0 5px #ffffff,
    0 0 26px rgba(56, 189, 248, 1),
    0 2px 8px rgba(0, 0, 0, 0.95) !important;
}"""

# Pattern to replace: from the track rule up to the end of the slider hover media-thumb-smooth rule
pattern = re.compile(
    r'\.preview-player\[data-theme="glacial-permafrost"\] div\[class\*="media-slider-smooth"\]\[class\*="isolate"\].*?'
    r':root\[data-theme="glacial-permafrost"\] \.group\\/slider\[data-dragging\] \.media-thumb-smooth\s*\{[^}]*\}',
    re.DOTALL
)

for fp in target_files:
    with open(fp, "r", encoding="utf-8") as f:
        content = f.read()
    
    m = pattern.search(content)
    if not m:
        print(f"FAILED TO MATCH in {fp}")
        continue
    
    print(f"Matched {len(m.group(0))} chars in {fp}")
    new_content = pattern.sub(new_block, content, count=1)
    with open(fp, "w", encoding="utf-8") as f:
        f.write(new_content)
    print(f"Successfully updated {fp}")
