import os

base_dirs = [
    r'd:\video player\skin 2\custom-skin',
    r'd:\video player\custom-skin'
]

for base in base_dirs:
    # 1. mute-button.tsx
    mute_path = os.path.join(base, 'src', 'video', 'shared', 'mute-button.tsx')
    if os.path.exists(mute_path):
        with open(mute_path, 'r', encoding='utf-8') as f:
            content = f.read()
        old_str = "size-[19.3px] text-white relative -left-[1px]"
        new_str = "size-[19.3px] text-white"
        if old_str in content:
            content = content.replace(old_str, new_str)
            with open(mute_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated {mute_path}')
        else:
            print(f'old_str not found in {mute_path}')

    # 2. volume-pill.tsx
    vol_path = os.path.join(base, 'src', 'video', 'shared', 'volume-pill.tsx')
    if os.path.exists(vol_path):
        with open(vol_path, 'r', encoding='utf-8') as f:
            content = f.read()
        old_str = 'className="size-[17.1px] text-white relative -left-[1px]"'
        new_str = 'className="size-[17.1px] text-white"'
        if old_str in content:
            content = content.replace(old_str, new_str)
            with open(vol_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Updated {vol_path}')
        else:
            print(f'old_str not found in {vol_path}')

    # 3. preview.css
    prev_path = os.path.join(base, 'apps', 'preview', 'src', 'frame', 'preview.css')
    if os.path.exists(prev_path):
        with open(prev_path, 'r', encoding='utf-8') as f:
            content = f.read()
        old_block = """/* ==========================================================================
   Volume Icon Optical Center: 1px left shift
   ========================================================================== */
.preview-player .group\\/mute svg {
  position: relative;
  left: -1px;
}"""
        old_block_crlf = """/* ==========================================================================\r\n   Volume Icon Optical Center: 1px left shift\r\n   ========================================================================== */\r\n.preview-player .group\\/mute svg {\r\n  position: relative;\r\n  left: -1px;\r\n}"""
        if old_block in content:
            content = content.replace(old_block, "")
            with open(prev_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Removed block from {prev_path}')
        elif old_block_crlf in content:
            content = content.replace(old_block_crlf, "")
            with open(prev_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Removed CRLF block from {prev_path}')
        else:
            # Try replacing just .group/mute svg rule
            rule = ".preview-player .group\\/mute svg {\n  position: relative;\n  left: -1px;\n}"
            rule_crlf = ".preview-player .group\\/mute svg {\r\n  position: relative;\r\n  left: -1px;\r\n}"
            if rule in content:
                content = content.replace(rule, "")
                with open(prev_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f'Removed rule from {prev_path}')
            elif rule_crlf in content:
                content = content.replace(rule_crlf, "")
                with open(prev_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f'Removed rule CRLF from {prev_path}')
            else:
                print(f'Not found in {prev_path}')

    # 4. skin.css
    skin_path = os.path.join(base, 'src', 'skin.css')
    if os.path.exists(skin_path):
        with open(skin_path, 'r', encoding='utf-8') as f:
            content = f.read()
        old_block = """:where(.media-skin) .group\\/mute svg {
  position: relative;
  left: -1px;
}"""
        old_block_crlf = """:where(.media-skin) .group\\/mute svg {\r\n  position: relative;\r\n  left: -1px;\r\n}"""
        if old_block in content:
            content = content.replace(old_block, "")
            with open(skin_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Removed block from {skin_path}')
        elif old_block_crlf in content:
            content = content.replace(old_block_crlf, "")
            with open(skin_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f'Removed CRLF block from {skin_path}')
        else:
            print(f'Not found in {skin_path}')
