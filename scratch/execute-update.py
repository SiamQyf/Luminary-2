import re

def update_css_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        css = f.read()

    # 1. Update the 64 volume bar rule blocks (-0.5px height)
    def replace_block(match):
        block = match.group(0)
        def repl_h(h_match):
            prefix = h_match.group(1)
            val = float(h_match.group(2))
            suffix = h_match.group(3)
            new_val = max(1.0, val - 0.5)
            formatted = f"{new_val:g}"
            return f"{prefix}{formatted}px{suffix}"
        
        return re.sub(r'(height:\s*)([0-9]+(?:\.[0-9]+)?)px([^;}]*;)', repl_h, block)

    rule_pattern = re.compile(r'(\.preview-player[^{]*group\\/vol-pill[^{]*div\[class\*="bg-white/(?:20|90)"\]\s*\{[^}]+\})')
    css = rule_pattern.sub(replace_block, css)

    # 2. Add universal volume bar max-width reduction if not already present
    universal_rule = (
        "\n/* Universal Volume Bar Length Adjustment (-0.5px) */\n"
        ".group\\/vol-pill div[class*=\"bg-white/20\"] {\n"
        "  max-width: calc(100% - 0.5px) !important;\n"
        "}\n"
    )
    if "Universal Volume Bar Length Adjustment (-0.5px)" not in css:
        # insert before the 14 special themes or near vol-pill base
        css = css + universal_rule

    # 3. Restyle Water Droplet Volume Knob (.volume-slider-thumb)
    water_vol_thumb_old = re.search(r'\.preview-player\[data-theme="water-droplet"\] \.volume-slider-thumb\s*\{[^}]+\}', css)
    if water_vol_thumb_old:
        water_vol_thumb_new = (
            '.preview-player[data-theme="water-droplet"] .volume-slider-thumb {\n'
            '  width: 9.5px !important;\n'
            '  height: 9.5px !important;\n'
            '  border-radius: 50% !important;\n'
            '  border: none !important;\n'
            '  outline: none !important;\n'
            '  background:\n'
            '    radial-gradient(ellipse 42% 18% at 35% 16%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.18) 45%, transparent 75%),\n'
            '    radial-gradient(ellipse 38% 16% at 65% 84%, rgba(255, 255, 255, 0.3) 0%, rgba(186, 230, 253, 0.1) 40%, transparent 75%),\n'
            '    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(56, 189, 248, 0.08) 60%, rgba(14, 165, 233, 0.18) 85%, rgba(2, 44, 75, 0.22) 100%) !important;\n'
            '  backdrop-filter: blur(2px) contrast(115%) brightness(118%) saturate(135%) !important;\n'
            '  -webkit-backdrop-filter: blur(2px) contrast(115%) brightness(118%) saturate(135%) !important;\n'
            '  box-shadow:\n'
            '    inset 0 1px 1.5px rgba(255, 255, 255, 0.45),\n'
            '    inset 0 -0.5px 1px rgba(255, 255, 255, 0.2),\n'
            '    0 0 8px rgba(56, 189, 248, 0.4),\n'
            '    0 1px 3px rgba(56, 189, 248, 0.2) !important;\n'
            '  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease-out !important;\n'
            '}\n'
            '.preview-player[data-theme="water-droplet"] .group\\/vol-pill:hover .volume-slider-thumb,\n'
            '.preview-player[data-theme="water-droplet"] .group\\/vol-pill[data-dragging] .volume-slider-thumb {\n'
            '  transform: translate(-50%, -50%) scale(1.15) !important;\n'
            '  box-shadow:\n'
            '    inset 0 1.25px 2px rgba(255, 255, 255, 0.6),\n'
            '    inset 0 -0.75px 1.5px rgba(255, 255, 255, 0.3),\n'
            '    0 0 12px rgba(56, 189, 248, 0.55),\n'
            '    0 1px 5px rgba(56, 189, 248, 0.25) !important;\n'
            '}'
        )
        css = css[:water_vol_thumb_old.start()] + water_vol_thumb_new + css[water_vol_thumb_old.end():]
        print(f"Updated water-droplet volume-slider-thumb in {path}")

    # 4. Restyle Water Droplet Seek Knob (.group\/slider .media-thumb-smooth)
    water_seek_thumb_old = re.search(r'\.preview-player\[data-theme="water-droplet"\] \.group\\/slider \.media-thumb-smooth\s*\{[^}]+\}', css)
    if water_seek_thumb_old:
        water_seek_thumb_new = (
            '.preview-player[data-theme="water-droplet"] .group\\/slider .media-thumb-smooth {\n'
            '  width: 14px !important;\n'
            '  height: 14px !important;\n'
            '  border-radius: 50% !important;\n'
            '  border: none !important;\n'
            '  outline: none !important;\n'
            '  background:\n'
            '    radial-gradient(ellipse 42% 18% at 35% 16%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.18) 45%, transparent 75%),\n'
            '    radial-gradient(ellipse 38% 16% at 65% 84%, rgba(255, 255, 255, 0.3) 0%, rgba(186, 230, 253, 0.1) 40%, transparent 75%),\n'
            '    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.04) 0%, rgba(56, 189, 248, 0.08) 60%, rgba(14, 165, 233, 0.18) 85%, rgba(2, 44, 75, 0.22) 100%) !important;\n'
            '  backdrop-filter: blur(2px) contrast(115%) brightness(118%) saturate(135%) !important;\n'
            '  -webkit-backdrop-filter: blur(2px) contrast(115%) brightness(118%) saturate(135%) !important;\n'
            '  box-shadow:\n'
            '    inset 0 1px 1.5px rgba(255, 255, 255, 0.45),\n'
            '    inset 0 -0.5px 1px rgba(255, 255, 255, 0.2),\n'
            '    0 0 12px rgba(56, 189, 248, 0.4),\n'
            '    0 1px 4px rgba(56, 189, 248, 0.2) !important;\n'
            '  opacity: 1 !important;\n'
            '  display: block !important;\n'
            '  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease-out !important;\n'
            '}\n'
            '.preview-player[data-theme="water-droplet"] .group\\/slider:hover .media-thumb-smooth,\n'
            '.preview-player[data-theme="water-droplet"] .group\\/slider[data-dragging] .media-thumb-smooth {\n'
            '  transform: scale(1.18) !important;\n'
            '  box-shadow:\n'
            '    inset 0 1.25px 2px rgba(255, 255, 255, 0.6),\n'
            '    inset 0 -0.75px 1.5px rgba(255, 255, 255, 0.3),\n'
            '    0 0 18px rgba(56, 189, 248, 0.6),\n'
            '    0 2px 7px rgba(56, 189, 248, 0.3) !important;\n'
            '}'
        )
        css = css[:water_seek_thumb_old.start()] + water_seek_thumb_new + css[water_seek_thumb_old.end():]
        print(f"Updated water-droplet seek-thumb in {path}")

    with open(path, 'w', encoding='utf-8') as f:
        f.write(css)
    print(f"Successfully written {path}")

update_css_file('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css')
update_css_file('d:/video player/custom-skin/apps/preview/src/frame/preview.css')

