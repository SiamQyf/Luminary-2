with open(r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    css = f.read()

lines = css.split('\n')
for i, l in enumerate(lines):
    if 'liquid-btn' in l:
        print(f"Line {i+1}: {l[:100]}")
        if i > 200:
            break
