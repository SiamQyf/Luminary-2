import os

CSS_RULES = """
/* ==========================================================================
   Scholarly Press Theme
   Ivory Paper, Hairline Ink Borders & Saffron Spindle Seekbar
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

/* Floating Bottom Controls Island */
.preview-player[data-theme="scholarly-press"] .media-skin [data-part="bottom-controls-bar"]:not(.static!) {
  background: #fdfdfb !important;
  border: 1.2px solid #1f1f1e !important;
  border-radius: 14px !important;
  margin: 0 16px 14px 16px !important;
  width: calc(100% - 32px) !important;
  padding: 8px 14px !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.08) !important;
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
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04) !important;
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
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2) !important;
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

/* Saffron Spindle Seekbar with Ink Baseline Axis */
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
  background: rgba(31, 31, 30, 0.45) !important;
  pointer-events: none !important;
  z-index: 0 !important;
}
.preview-player[data-theme="scholarly-press"] div[class*="media-slider-smooth"][class*="isolate"] {
  height: 11px !important;
  clip-path: ellipse(50% 50% at 50% 50%) !important;
  -webkit-clip-path: ellipse(50% 50% at 50% 50%) !important;
  background: rgba(31, 31, 30, 0.08) !important;
  border-radius: 0 !important;
  overflow: hidden !important;
  box-shadow: none !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border: none !important;
  z-index: 1 !important;
}
.preview-player[data-theme="scholarly-press"] div[class*="clip-media-x-[--media-slider-buffer]"] {
  background: rgba(230, 175, 51, 0.25) !important;
  border-radius: 0 !important;
}
.preview-player[data-theme="scholarly-press"] div[class*="clip-media-x-[--media-slider-fill]"] {
  background: #e6af33 !important;
  border-radius: 0 !important;
  box-shadow: none !important;
  opacity: 1 !important;
}
.preview-player[data-theme="scholarly-press"] .group\/slider .media-thumb-smooth {
  width: 3.5px !important;
  height: 13px !important;
  border-radius: 1px !important;
  background: #1f1f1e !important;
  border: none !important;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4) !important;
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
  color: #1f1f1e !important;
  font-family: 'Times New Roman', Times, 'Baskerville', 'Georgia', serif !important;
  font-size: 13.5px !important;
  font-weight: 500 !important;
  letter-spacing: 0.02em !important;
  text-shadow: none !important;
  filter: none !important;
  -webkit-filter: none !important;
}

/* Volume Pill */
.preview-player[data-theme="scholarly-press"] .group\/vol-pill {
  border-radius: 9999px !important;
  background: #ffffff !important;
  border: 1.2px solid #1f1f1e !important;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04) !important;
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
}
"""

AMBIENT_ENTRY = """  'scholarly-press': {
    bleed1: 'rgba(230, 175, 51, 0.25)',
    bleed2: 'rgba(245, 245, 240, 0.22)',
    bleed3: 'rgba(217, 119, 6, 0.18)',
    bleed4: 'rgba(31, 31, 30, 0.22)',
    strip1: '#e6af33',
    strip2: '#d97706',
    bit1: '#e6af33',
    bit2: '#fef3c7',
    bitGlow: 'rgba(230, 175, 51, 0.85)',
  },
"""

LOGO_ENTRY = """  'scholarly-press': {
    dark: {
      primary: '#e6af33',
      secondary: '#d97706',
      accent: '#fef3c7',
      gradient: 'linear-gradient(135deg, #fef3c7 15%, #e6af33 55%, #b45309 100%)',
      glow: 'rgba(230, 175, 51, 0.70)',
      iconGlow: 'rgba(230, 175, 51, 0.50)',
    },
    light: {
      primary: '#b45309',
      secondary: '#92400e',
      accent: '#78350f',
      gradient: 'linear-gradient(135deg, #d97706 0%, #b45309 60%, #78350f 100%)',
      glow: 'rgba(180, 83, 9, 0.20)',
      iconGlow: 'rgba(180, 83, 9, 0.15)',
    },
  },
"""

STYLE_ENTRY = "  { id: 'scholarly-press', label: 'Scholarly Press', subtitle: 'Ivory Paper & Saffron Spindle' },\n"

REPOS = [
    r'd:\video player\skin 2\custom-skin',
    r'd:\video player\custom-skin',
]

for repo in REPOS:
    print(f"Applying to {repo}...")
    
    # 1. video-input.tsx
    v_path = os.path.join(repo, 'apps', 'preview', 'src', 'frame', 'video-input.tsx')
    with open(v_path, 'r', encoding='utf-8') as f:
        v_text = f.read()
    if 'scholarly-press' not in v_text:
        target = "  { id: 'glacial-permafrost', label: 'Glacial Permafrost' },\n"
        if target in v_text:
            v_text = v_text.replace(target, target + STYLE_ENTRY)
        else:
            # fallback
            target2 = "{ id: 'glacial-permafrost', label: 'Glacial Permafrost' },"
            v_text = v_text.replace(target2, target2 + "\n" + STYLE_ENTRY)
        with open(v_path, 'w', encoding='utf-8') as f:
            f.write(v_text)
        print(f"  Updated {v_path}")
    else:
        print(f"  scholarly-press already in {v_path}")

    # 2. ambient-background.tsx
    a_path = os.path.join(repo, 'apps', 'preview', 'src', 'shell', 'ambient-background.tsx')
    with open(a_path, 'r', encoding='utf-8') as f:
        a_text = f.read()
    if 'scholarly-press' not in a_text:
        target = "  'glacial-permafrost': {\n"
        # Find the end of glacial-permafrost entry
        idx = a_text.find(target)
        if idx != -1:
            end_brace = a_text.find("  },\n};", idx)
            if end_brace != -1:
                insert_pos = end_brace + len("  },\n")
                a_text = a_text[:insert_pos] + AMBIENT_ENTRY + a_text[insert_pos:]
            else:
                end_brace2 = a_text.find("  },", idx)
                insert_pos = end_brace2 + len("  },\n")
                a_text = a_text[:insert_pos] + AMBIENT_ENTRY + a_text[insert_pos:]
        with open(a_path, 'w', encoding='utf-8') as f:
            f.write(a_text)
        print(f"  Updated {a_path}")
    else:
        print(f"  scholarly-press already in {a_path}")

    # 3. logo.tsx
    l_path = os.path.join(repo, 'apps', 'preview', 'src', 'shell', 'logo.tsx')
    with open(l_path, 'r', encoding='utf-8') as f:
        l_text = f.read()
    if 'scholarly-press' not in l_text:
        target = "  'glacial-permafrost': {\n"
        idx = l_text.find(target)
        if idx != -1:
            end_brace = l_text.find("  },\n};", idx)
            if end_brace != -1:
                insert_pos = end_brace + len("  },\n")
                l_text = l_text[:insert_pos] + LOGO_ENTRY + l_text[insert_pos:]
        with open(l_path, 'w', encoding='utf-8') as f:
            f.write(l_text)
        print(f"  Updated {l_path}")
    else:
        print(f"  scholarly-press already in {l_path}")

    # 4. preview.css
    p_path = os.path.join(repo, 'apps', 'preview', 'src', 'frame', 'preview.css')
    with open(p_path, 'r', encoding='utf-8') as f:
        p_text = f.read()
    if 'data-theme="scholarly-press"' not in p_text:
        target_marker = "/* Universal Volume Bar Length Adjustment (-1px) */"
        if target_marker in p_text:
            p_text = p_text.replace(target_marker, CSS_RULES + "\n" + target_marker)
        else:
            p_text += "\n" + CSS_RULES
        with open(p_path, 'w', encoding='utf-8') as f:
            f.write(p_text)
        print(f"  Updated {p_path}")
    else:
        print(f"  scholarly-press already in {p_path}")

print("Done applying theme!")
