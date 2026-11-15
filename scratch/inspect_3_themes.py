with open(r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    css = f.read()

for theme in ['water-droplet', 'crystal', 'cosmic-nebula']:
    print(f"\n=================== THEME: {theme} ===================")
    lines = css.split('\n')
    in_block = False
    for i, line in enumerate(lines):
        if theme in line and ('liquid-btn' in line or 'center-buffering' in line or 'control' in line or 'fullscreen' in line or 'play' in line or 'icon' in line or 'vol-pill' in line):
            print(f"Line {i+1}: {line}")
            # print next 25 lines
            for j in range(i, min(len(lines), i+25)):
                print(lines[j])
                if '}' in lines[j]:
                    break
            print("---")
