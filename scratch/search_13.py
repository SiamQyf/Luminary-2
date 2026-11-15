with open(r'd:\video player\custom-skin\apps\preview\src\frame\usage-guide.tsx', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if '13' in l:
        print(f'Line {i+1}: {l.strip()}')
