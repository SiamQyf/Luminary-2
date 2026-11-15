with open(r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    css = f.read()

lines = css.split('\n')
for i, l in enumerate(lines):
    if 'data-theme="water-droplet"' in l and ('media-slider-smooth' in l or 'slider-fill' in l or 'slider-buffer' in l or 'media-thumb-smooth' in l):
        print(f"Line {i+1}: {l}")
        for j in range(i, min(len(lines), i+20)):
            print(lines[j])
            if '}' in lines[j]:
                break
        print("---")
