with open(r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'data-theme="water-droplet"] .group\\/slider' in line:
        print(f'Line {i+1}: {line.strip()}')
