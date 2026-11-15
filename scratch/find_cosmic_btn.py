with open(r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
lines = css.split('\n')
for i, l in enumerate(lines):
    if 'data-theme="cosmic-nebula"' in l and any(k in l for k in ['btn', 'control', 'button']):
        print(f"Line {i+1}: {l}")
        for j in range(i, min(len(lines), i+20)):
            print(lines[j])
            if '}' in lines[j]:
                break
        print("---")
