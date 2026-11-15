with open(r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    css = f.read()

lines = css.split('\n')
for i, l in enumerate(lines):
    if ('data-theme="water-droplet"' in l or 'data-theme="crystal"' in l or 'data-theme="cosmic-nebula"' in l) and ('vol-pill' in l or 'mute' in l):
        print(f"Line {i+1}: {l}")
        for j in range(i, min(len(lines), i+15)):
            print(lines[j])
            if '}' in lines[j]:
                break
        print("---")
