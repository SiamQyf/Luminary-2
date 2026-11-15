import os

CSS_RULES = """/* ==========================================================================
   Scholarly Press Theme
   Transparent Skin Background, Saffron Spindle Seekbar & White Ink Buttons
   ========================================================================== */
.preview-player[data-theme="scholarly-press"],
.preview-player[data-theme="scholarly-press"] .media-skin {
  border-radius: 14px !important;
}
.preview-player[data-theme="scholarly-press"] .media-skin {
  border: 1.5px solid rgba(31, 31, 30, 0.3333) !important;
  outline: none !important;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18) !important;
}

/* Bottom Controls Bar (Transparent Background - Removed Skin BG) */
.preview-player[data-theme="scholarly-press"] .media-skin [data-part="bottom-controls-bar"] {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  margin: 0 !important;
  width: 100% !important;
}
.preview-player[data-theme="scholarly-press"] .media-skin [data-part="bottom-controls-bar"]::before {
  display: none !important;
}

/* Perfect Circular Buttons */
.preview-player[data-theme="scholarly-press"] .group\/liquid-btn,
.preview-player[data-theme="scholarly-press"] .group\/center-buffering button,
.preview-player[data-theme="scholarly-press"] [data-slot="control"],
.preview-player[data-theme="scholarly-press"] .media-fullscreen-button,
.preview-player[data-theme="scholarly-press"] .group\/play {
  border-radius: 50% !important;
  background-color: #ffffff !important;
  border: 1.2px solid #1f1f1e !important;
  color: #1f1f1e !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25) !important;
  transition: background-color 0.15s ease, border-color 0.15s ease, transform 0.15s ease !important;
}
.preview-player[data-theme="scholarly-press"] .group\/liquid-btn:hover,
.preview-player[data-theme="scholarly-press"] [data-slot="control"]:hover,
.preview-player[data-theme="scholarly-press"] .media-fullscreen-button:hover,
.preview-player[data-theme="scholarly-press"] .group\/play:hover,
.preview-player[data-theme="scholarly-press"] .group\/center-buffering button:hover {
  background-color: #f5f5f2 !important;
  border-color: #000000 !important;
}
.preview-player[data-theme="scholarly-press"] .group\/center-buffering button {
  background: #ffffff !important;
  border: 1.2px solid #1f1f1e !important;
  color: #1f1f1e !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35) !important;
}

/* Deep Ink Vector Icons (High Contrast Light Theme - Filter: None) */
.preview-player[data-theme="scholarly-press"] .player-icon-scale svg,
.preview-player[data-theme="scholarly-press"] .group\/mute svg,
.preview-player[data-theme="scholarly-press"] .group\/liquid-btn svg,
.preview-player[data-theme="scholarly-press"] [data-slot="control"] svg,
.preview-player[data-theme="scholarly-press"] .group\/play svg,
.preview-player[data-theme="scholarly-press"] .media-fullscreen-button svg,
.preview-player[data-theme="scholarly-press"] .group\/center-buffering svg {
  color: #1f1f1e !important;
  filter: none !important;
  -webkit-filter: none !important;
}

/* Saffron Spindle Seekbar with Baseline Axis */
.preview-player[data-theme="scholarly-press"] .group\/slider {
  position: relative !important;
  height: 18px !important;
  display: flex !important;
  align-items: center !important;
}
.preview-player[data-theme="scholarly-press"] .group\/slider::before {
  content: "" !important;
  position: absolute !important;
  left: 0 !important;
  right: 0 !important;
  top: 50% !important;
  transform: translateY(5.5px) !important;
  height: 1px !important;
  background: rgba(255, 255, 255, 0.45) !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.6) !important;
  pointer-events: none !important;
  z-index: 0 !important;
}
.preview-player[data-theme="scholarly-press"] div[class*="media-slider-smooth"][class*="isolate"] {
  height: 11px !important;
  clip-path: ellipse(50% 50% at 50% 50%) !important;
  -webkit-clip-path: ellipse(50% 50% at 50% 50%) !important;
  background: rgba(255, 255, 255, 0.2) !important;
  border-radius: 0 !important;
  overflow: hidden !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: none !important;
  z-index: 1 !important;
}
.preview-player[data-theme="scholarly-press"] div[class*="clip-media-x-[--media-slider-buffer]"] {
  background: rgba(230, 175, 51, 0.3) !important;
  border-radius: 0 !important;
}
.preview-player[data-theme="scholarly-press"] div[class*="clip-media-x-[--media-slider-fill]"] {
  background: #e6af33 !important;
  border-radius: 0 !important;
  box-shadow: 0 0 10px rgba(230, 175, 51, 0.5) !important;
  opacity: 1 !important;
}
.preview-player[data-theme="scholarly-press"] .group\/slider .media-thumb-smooth {
  width: 3.5px !important;
  height: 14px !important;
  border-radius: 1px !important;
  background: #ffffff !important;
  border: none !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.7) !important;
  opacity: 0 !important;
  transition: opacity 0.15s ease !important;
  z-index: 2 !important;
}
.preview-player[data-theme="scholarly-press"] .group\/slider:hover .media-thumb-smooth,
.preview-player[data-theme="scholarly-press"] .group\/slider[data-dragging] .media-thumb-smooth {
  opacity: 1 !important;
}

/* Classic Academic Serif Typography for Time Display */
.preview-player[data-theme="scholarly-press"] time-value,
.preview-player[data-theme="scholarly-press"] div[class*="tabular-nums"],
.preview-player[data-theme="scholarly-press"] div[class*="tabular-nums"] span {
  color: #ffffff !important;
  font-family: 'Times New Roman', Times, 'Baskerville', 'Georgia', serif !important;
  font-size: 13.5px !important;
  font-weight: 500 !important;
  letter-spacing: 0.02em !important;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.85) !important;
  filter: none !important;
  -webkit-filter: none !important;
}

/* Volume Pill */
.preview-player[data-theme="scholarly-press"] .group\/vol-pill {
  border-radius: 9999px !important;
  background: #ffffff !important;
  border: 1.2px solid #1f1f1e !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25) !important;
}
.preview-player[data-theme="scholarly-press"] .group\/vol-pill div[class*="bg-white/20"] {
  height: 3.5px !important;
  border-radius: 9999px !important;
  background: rgba(31, 31, 30, 0.15) !important;
  border: 0.5px solid rgba(31, 31, 30, 0.25) !important;
}
.preview-player[data-theme="scholarly-press"] .group\/vol-pill div[class*="bg-white/90"] {
  height: 3.5px !important;
  border-radius: 9999px !important;
  background: #e6af33 !important;
}
.preview-player[data-theme="scholarly-press"] .volume-slider-thumb {
  width: 8px !important;
  height: 8px !important;
  border-radius: 50% !important;
  background: #1f1f1e !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
}

/* Popover Settings Menu */
.preview-player[data-theme="scholarly-press"] [role="menu"],
:root[data-theme="scholarly-press"] [role="menu"] {
  background: #ffffff !important;
  border: 1.2px solid #1f1f1e !important;
  border-radius: 12px !important;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.14) !important;
  color: #1f1f1e !important;
  padding: 6px !important;
}
.preview-player[data-theme="scholarly-press"] .group\/menu-btn:hover,
.preview-player[data-theme="scholarly-press"] .group\/menu-radio:hover,
:root[data-theme="scholarly-press"] [role="menuitem"]:hover,
:root[data-theme="scholarly-press"] [role="menuitemradio"]:hover {
  background: #f4f4f0 !important;
  border-radius: 8px !important;
  color: #000000 !important;
}
.preview-player[data-theme="scholarly-press"] [role="menu"] svg,
:root[data-theme="scholarly-press"] [role="menu"] svg {
  color: #1f1f1e !important;
  filter: none !important;
}

/* Tooltips */
.preview-player[data-theme="scholarly-press"] [role="tooltip"],
:root[data-theme="scholarly-press"] [role="tooltip"] {
  background: #ffffff !important;
  border: 1.2px solid #1f1f1e !important;
  color: #1f1f1e !important;
  border-radius: 6px !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12) !important;
  font-size: 11px !important;
  font-weight: 500 !important;
}

/* Top Controls */
.preview-player[data-theme="scholarly-press"] [data-part="top-controls-bar"] [data-slot="control"] {
  border-radius: 50% !important;
  background-color: #ffffff !important;
  border: 1.2px solid #1f1f1e !important;
  color: #1f1f1e !important;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25) !important;
}
"""

REPOS = [
    r'd:\video player\skin 2\custom-skin',
    r'd:\video player\custom-skin',
]

start_marker = "/* ==========================================================================\n   Scholarly Press Theme"
end_marker = "/* Universal Volume Bar Length Adjustment (-1px) */"

for repo in REPOS:
    p_path = os.path.join(repo, 'apps', 'preview', 'src', 'frame', 'preview.css')
    with open(p_path, 'r', encoding='utf-8') as f:
        txt = f.read()
    
    idx_start = txt.find(start_marker)
    if idx_start != -1:
        idx_end = txt.find(end_marker, idx_start)
        if idx_end != -1:
            txt = txt[:idx_start] + CSS_RULES + "\n" + txt[idx_end:]
            print(f"Replaced scholarly block in {p_path}")
        else:
            print(f"End marker not found in {p_path}")
    else:
        print(f"Start marker not found in {p_path}")
        
    with open(p_path, 'w', encoding='utf-8') as f:
        f.write(txt)

print("Applied transparent skin background to both repos!")
