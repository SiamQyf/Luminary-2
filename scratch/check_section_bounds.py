files = [
    r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css',
    r'd:\video player\skin 2\custom-skin\src\skin.css',
    r'd:\video player\custom-skin\apps\preview\src\frame\preview.css',
    r'd:\video player\custom-skin\src\skin.css',
]

header = '/* --- Water Droplet Animated Caustic Seekbar (Thinner & Styled Like Icon BG) --- */'

for p in files:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    start = c.find(header)
    end = c.find('/* --------------------------------------------------------------------------\n   2. CRYSTAL', start)
    if end == -1:
        end = c.find('/* --------------------------------------------------------------------------', start)
    print(f'=== {p} ===')
    print(f'Length of section: {end - start}')
    print(c[start:start+120])
    print('...')
    print(c[end-120:end])
