import re

def remove_gta_vi_from_repo(repo_dir):
    print(f"Processing repo: {repo_dir}")
    
    # 1. preview.css
    css_path = f"{repo_dir}/apps/preview/src/frame/preview.css"
    with open(css_path, "r", encoding="utf-8") as f:
        css = f.read()
    
    # Remove block 1: .preview-player[data-theme="gta-vi"] .media-skin { ... }
    css = re.sub(
        r'\.preview-player\[data-theme="gta-vi"\] \.media-skin\s*\{[^}]*\}\s*',
        '',
        css
    )
    
    # Remove block 2: .preview-player[data-theme="gta-vi"] .volume-slider-thumb { ... }
    css = re.sub(
        r'\.preview-player\[data-theme="gta-vi"\] \.volume-slider-thumb\s*\{[^}]*\}\s*',
        '',
        css
    )
    
    # Remove block 3: /* 1. GTA VI VICE SUNSET ... */ up to /* 3. 80s SYNTHWAVE ... */
    css = re.sub(
        r'/\*\s*-+\s*\n\s*1\.\s*GTA VI VICE SUNSET[^*]*\*/.*?/\*\s*-+\s*\n\s*(?=3\.\s*80s SYNTHWAVE)',
        '',
        css,
        flags=re.DOTALL
    )
    
    # Remove block 4: caption styles
    css = re.sub(
        r'\.preview-player\[data-theme="gta-vi"\],\s*:root\[data-theme="gta-vi"\]\s*\{[^}]*\}\s*',
        '',
        css
    )
    
    # Remove block 5: bottom controls bar background
    css = re.sub(
        r'/\*\s*2\.\s*GTA VI\s*—[^*]*\*/\s*\.preview-player\[data-theme="gta-vi"\][^{]*\{[^}]*\}\s*',
        '',
        css
    )
    
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(css)
    print("preview.css updated")
    
    # 2. video-input.tsx
    input_path = f"{repo_dir}/apps/preview/src/frame/video-input.tsx"
    with open(input_path, "r", encoding="utf-8") as f:
        input_ts = f.read()
    
    input_ts = re.sub(r"\s*\{\s*id:\s*'gta-vi',\s*label:\s*'GTA VI'\s*\},?", "", input_ts)
    with open(input_path, "w", encoding="utf-8") as f:
        f.write(input_ts)
    print("video-input.tsx updated")
    
    # 3. ambient-background.tsx
    amb_path = f"{repo_dir}/apps/preview/src/shell/ambient-background.tsx"
    with open(amb_path, "r", encoding="utf-8") as f:
        amb = f.read()
    
    amb = re.sub(r"\s*'gta-vi':\s*\{[^}]*\},?", "", amb)
    with open(amb_path, "w", encoding="utf-8") as f:
        f.write(amb)
    print("ambient-background.tsx updated")
    
    # 4. logo.tsx
    logo_path = f"{repo_dir}/apps/preview/src/shell/logo.tsx"
    with open(logo_path, "r", encoding="utf-8") as f:
        logo = f.read()
    
    logo = re.sub(r"\s*'gta-vi':\s*\{.*?\n  \},", "", logo, flags=re.DOTALL)
    with open(logo_path, "w", encoding="utf-8") as f:
        f.write(logo)
    print("logo.tsx updated")
    
    # 5. navbar.tsx
    nav_path = f"{repo_dir}/apps/preview/src/shell/navbar.tsx"
    with open(nav_path, "r", encoding="utf-8") as f:
        nav = f.read()
    
    nav = nav.replace(", gta-vi", "")
    with open(nav_path, "w", encoding="utf-8") as f:
        f.write(nav)
    print("navbar.tsx updated")

remove_gta_vi_from_repo("d:/video player/skin 2/custom-skin")
remove_gta_vi_from_repo("d:/video player/custom-skin")
print("Done removing gta-vi from both repositories!")
