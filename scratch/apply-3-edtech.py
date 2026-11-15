# -*- coding: utf-8 -*-
import os, sys

def update_repo(repo_dir):
    print(f"Updating repository: {repo_dir}")
    
    # 1. Update video-input.tsx
    vi_path = os.path.join(repo_dir, "apps", "preview", "src", "frame", "video-input.tsx")
    with open(vi_path, "r", encoding="utf-8") as f:
        vi_content = f.read()
    
    new_style_options = """  { id: 'water-droplet', label: 'Water Droplet' },
  { id: 'glacial-permafrost', label: 'Glacial Permafrost' },
  // E-Learning, EdTech & Universities
  { id: 'academic-lecture', label: 'Academic Lecture', subtitle: 'Collegiate Navy & Chapter Amber' },
  { id: 'study-highlighter', label: 'Study Highlighter', subtitle: 'Cornell Notes & Fluorescent Chisel' },
  { id: 'campus-library', label: 'Campus Library', subtitle: 'Bankers Lamp Emerald & Brass' },"""
    
    if "id: 'academic-lecture'" not in vi_content:
        old_opts = "  { id: 'water-droplet', label: 'Water Droplet' },\n  { id: 'glacial-permafrost', label: 'Glacial Permafrost' },"
        if old_opts in vi_content:
            vi_content = vi_content.replace(old_opts, new_style_options)
            with open(vi_path, "w", encoding="utf-8") as f:
                f.write(vi_content)
            print("  -> Updated video-input.tsx")
        else:
            print("  -> ERROR: Target options not found in video-input.tsx")
    else:
        print("  -> video-input.tsx already contains academic-lecture")

    # 2. Update ambient-background.tsx
    ab_path = os.path.join(repo_dir, "apps", "preview", "src", "shell", "ambient-background.tsx")
    with open(ab_path, "r", encoding="utf-8") as f:
        ab_content = f.read()

    ambient_palettes = """  'glacial-permafrost': {
    bleed1: 'rgba(125, 211, 252, 0.24)',
    bleed2: 'rgba(56, 189, 248, 0.20)',
    bleed3: 'rgba(224, 242, 254, 0.16)',
    bleed4: 'rgba(6, 14, 26, 0.20)',
    strip1: '#38bdf8',
    strip2: '#e0f2fe',
    bit1: '#38bdf8',
    bit2: '#ffffff',
    bitGlow: 'rgba(125, 211, 252, 0.75)',
  },
  // E-Learning, EdTech & Universities
  'academic-lecture': {
    bleed1: 'rgba(59, 130, 246, 0.26)',
    bleed2: 'rgba(37, 99, 235, 0.22)',
    bleed3: 'rgba(245, 158, 11, 0.18)',
    bleed4: 'rgba(11, 19, 41, 0.25)',
    strip1: '#3b82f6',
    strip2: '#f59e0b',
    bit1: '#60a5fa',
    bit2: '#fbbf24',
    bitGlow: 'rgba(59, 130, 246, 0.80)',
  },
  'study-highlighter': {
    bleed1: 'rgba(250, 204, 21, 0.28)',
    bleed2: 'rgba(56, 189, 248, 0.20)',
    bleed3: 'rgba(254, 240, 138, 0.18)',
    bleed4: 'rgba(17, 24, 39, 0.25)',
    strip1: '#facc15',
    strip2: '#38bdf8',
    bit1: '#fef08a',
    bit2: '#38bdf8',
    bitGlow: 'rgba(250, 204, 21, 0.85)',
  },
  'campus-library': {
    bleed1: 'rgba(16, 185, 129, 0.26)',
    bleed2: 'rgba(251, 191, 36, 0.20)',
    bleed3: 'rgba(5, 150, 105, 0.18)',
    bleed4: 'rgba(4, 34, 26, 0.26)',
    strip1: '#10b981',
    strip2: '#fbbf24',
    bit1: '#a7f3d0',
    bit2: '#fbbf24',
    bitGlow: 'rgba(16, 185, 129, 0.80)',
  },"""

    if "'academic-lecture':" not in ab_content:
        old_ab = """  'glacial-permafrost': {
    bleed1: 'rgba(125, 211, 252, 0.24)',
    bleed2: 'rgba(56, 189, 248, 0.20)',
    bleed3: 'rgba(224, 242, 254, 0.16)',
    bleed4: 'rgba(6, 14, 26, 0.20)',
    strip1: '#38bdf8',
    strip2: '#e0f2fe',
    bit1: '#38bdf8',
    bit2: '#ffffff',
    bitGlow: 'rgba(125, 211, 252, 0.75)',
  },"""
        if old_ab in ab_content:
            ab_content = ab_content.replace(old_ab, ambient_palettes)
            with open(ab_path, "w", encoding="utf-8") as f:
                f.write(ab_content)
            print("  -> Updated ambient-background.tsx")
        else:
            print("  -> ERROR: Target glacial-permafrost not found in ambient-background.tsx")
    else:
        print("  -> ambient-background.tsx already contains academic-lecture")

    # 3. Update logo.tsx
    logo_path = os.path.join(repo_dir, "apps", "preview", "src", "shell", "logo.tsx")
    with open(logo_path, "r", encoding="utf-8") as f:
        logo_content = f.read()

    logo_palettes = """  'glacial-permafrost': {
    dark: {
      primary: '#38bdf8',
      secondary: '#7dd3fc',
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 20%, #7dd3fc 55%, #0284c7 100%)',
      glow: 'rgba(56, 189, 248, 0.65)',
      iconGlow: 'rgba(56, 189, 248, 0.50)',
    },
    light: {
      primary: '#0284c7',
      secondary: '#0369a1',
      accent: '#082f49',
      gradient: 'linear-gradient(135deg, #0284c7 15%, #0369a1 60%, #082f49 100%)',
      glow: 'rgba(2, 132, 199, 0.28)',
      iconGlow: 'rgba(3, 105, 161, 0.22)',
    },
  },
  // E-Learning, EdTech & Universities
  'academic-lecture': {
    dark: {
      primary: '#3b82f6',
      secondary: '#f59e0b',
      accent: '#dbeafe',
      gradient: 'linear-gradient(135deg, #60a5fa 15%, #3b82f6 55%, #1d4ed8 100%)',
      glow: 'rgba(59, 130, 246, 0.65)',
      iconGlow: 'rgba(59, 130, 246, 0.50)',
    },
    light: {
      primary: '#1d4ed8',
      secondary: '#d97706',
      accent: '#0f172a',
      gradient: 'linear-gradient(135deg, #1d4ed8 15%, #2563eb 60%, #0f172a 100%)',
      glow: 'rgba(29, 78, 216, 0.28)',
      iconGlow: 'rgba(217, 119, 6, 0.22)',
    },
  },
  'study-highlighter': {
    dark: {
      primary: '#facc15',
      secondary: '#38bdf8',
      accent: '#fef08a',
      gradient: 'linear-gradient(135deg, #fef08a 15%, #facc15 55%, #eab308 100%)',
      glow: 'rgba(250, 204, 21, 0.70)',
      iconGlow: 'rgba(250, 204, 21, 0.55)',
    },
    light: {
      primary: '#ca8a04',
      secondary: '#0284c7',
      accent: '#111827',
      gradient: 'linear-gradient(135deg, #ca8a04 15%, #eab308 60%, #111827 100%)',
      glow: 'rgba(202, 138, 4, 0.28)',
      iconGlow: 'rgba(2, 132, 199, 0.22)',
    },
  },
  'campus-library': {
    dark: {
      primary: '#10b981',
      secondary: '#fbbf24',
      accent: '#a7f3d0',
      gradient: 'linear-gradient(135deg, #a7f3d0 15%, #10b981 55%, #047857 100%)',
      glow: 'rgba(16, 185, 129, 0.65)',
      iconGlow: 'rgba(16, 185, 129, 0.50)',
    },
    light: {
      primary: '#047857',
      secondary: '#d97706',
      accent: '#064e3b',
      gradient: 'linear-gradient(135deg, #047857 15%, #059669 60%, #064e3b 100%)',
      glow: 'rgba(4, 120, 87, 0.28)',
      iconGlow: 'rgba(217, 119, 6, 0.22)',
    },
  },"""

    if "'academic-lecture':" not in logo_content:
        old_logo = """  'glacial-permafrost': {
    dark: {
      primary: '#38bdf8',
      secondary: '#7dd3fc',
      accent: '#ffffff',
      gradient: 'linear-gradient(135deg, #ffffff 20%, #7dd3fc 55%, #0284c7 100%)',
      glow: 'rgba(56, 189, 248, 0.65)',
      iconGlow: 'rgba(56, 189, 248, 0.50)',
    },
    light: {
      primary: '#0284c7',
      secondary: '#0369a1',
      accent: '#082f49',
      gradient: 'linear-gradient(135deg, #0284c7 15%, #0369a1 60%, #082f49 100%)',
      glow: 'rgba(2, 132, 199, 0.28)',
      iconGlow: 'rgba(3, 105, 161, 0.22)',
    },
  },"""
        if old_logo in logo_content:
            logo_content = logo_content.replace(old_logo, logo_palettes)
            with open(logo_path, "w", encoding="utf-8") as f:
                f.write(logo_content)
            print("  -> Updated logo.tsx")
        else:
            print("  -> ERROR: Target glacial-permafrost not found in logo.tsx")
    else:
        print("  -> logo.tsx already contains academic-lecture")

    # 4. Update preview.css
    css_path = os.path.join(repo_dir, "apps", "preview", "src", "frame", "preview.css")
    with open(css_path, "r", encoding="utf-8") as f:
        css_content = f.read()

    # Frame borders at 0.3333 opacity strictly per user rules
    border_rules = """
.preview-player[data-theme="academic-lecture"],
.preview-player[data-theme="academic-lecture"] .media-skin {
  border-radius: 12px !important;
}
.preview-player[data-theme="academic-lecture"] .media-skin {
  border: 1.5px solid rgba(59, 130, 246, 0.3333) !important;
  outline: none !important;
  box-shadow:
    inset 0 0 20px rgba(37, 99, 235, 0.15),
    0 0 0 1px #070d1e,
    0 24px 55px rgba(0, 0, 0, 0.95) !important;
}

.preview-player[data-theme="study-highlighter"],
.preview-player[data-theme="study-highlighter"] .media-skin {
  border-radius: 10px !important;
}
.preview-player[data-theme="study-highlighter"] .media-skin {
  border: 1.5px solid rgba(250, 204, 21, 0.3333) !important;
  outline: none !important;
  box-shadow:
    inset 0 0 20px rgba(250, 204, 21, 0.12),
    0 0 0 1px #0f172a,
    0 24px 55px rgba(0, 0, 0, 0.94) !important;
}

.preview-player[data-theme="campus-library"],
.preview-player[data-theme="campus-library"] .media-skin {
  border-radius: 12px !important;
}
.preview-player[data-theme="campus-library"] .media-skin {
  border: 1.5px solid rgba(16, 185, 129, 0.3333) !important;
  outline: none !important;
  box-shadow:
    inset 0 0 22px rgba(6, 78, 59, 0.3),
    0 0 0 1px #021a14,
    0 24px 55px rgba(0, 0, 0, 0.95) !important;
}
"""

    if 'data-theme="academic-lecture"' not in css_content:
        target_border_anchor = """.preview-player[data-theme="glacial-permafrost"] .media-skin {
  border: 1.5px solid rgba(125, 211, 252, 0.3333) !important;
  outline: none !important;
  box-shadow:
    inset 0 0 20px rgba(125, 211, 252, 0.1),
    0 0 0 1px #060e1a,
    0 24px 54px rgba(0, 0, 0, 0.92) !important;
}"""
        if target_border_anchor in css_content:
            css_content = css_content.replace(target_border_anchor, target_border_anchor + "\n" + border_rules)
            print("  -> Added frame border rules to preview.css")
        else:
            print("  -> ERROR: Target border anchor not found in preview.css")

    # Read full theme CSS rules
    edtech_css_path = r"d:\video player\skin 2\custom-skin\scratch\edtech-3-themes.css"
    with open(edtech_css_path, "r", encoding="utf-8") as f:
        themes_css = f.read()
    
    target_theme_anchor = "/* Universal Volume Bar Length Adjustment (-1px) */"
    if "/* 15. ACADEMIC LECTURE (academic-lecture)" not in css_content:
        if target_theme_anchor in css_content:
            css_content = css_content.replace(target_theme_anchor, themes_css + "\n\n" + target_theme_anchor)
            with open(css_path, "w", encoding="utf-8") as f:
                f.write(css_content)
            print("  -> Added full theme CSS blocks to preview.css")
        else:
            print("  -> ERROR: Target theme anchor not found in preview.css")
    else:
        print("  -> preview.css already contains academic-lecture")

if __name__ == "__main__":
    update_repo(r"d:\video player\skin 2\custom-skin")
    update_repo(r"d:\video player\custom-skin")
    print("All repositories updated with 3 education themes!")
