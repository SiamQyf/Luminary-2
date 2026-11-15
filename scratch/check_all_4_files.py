files = [
    r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css',
    r'd:\video player\skin 2\custom-skin\src\skin.css',
    r'd:\video player\custom-skin\apps\preview\src\frame\preview.css',
    r'd:\video player\custom-skin\src\skin.css',
]

target = '/* --- Water Droplet Animated Caustic Seekbar (Thinner & Styled Like Icon BG) --- */'

for p in files:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    print(f'{p}: present? {target in c}')
