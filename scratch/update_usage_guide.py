files = [
    r'd:\video player\custom-skin\apps\preview\src\frame\usage-guide.tsx',
    r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\usage-guide.tsx',
]

for p in files:
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace('its 13 live themes', 'its 50 bespoke live themes')
    c = c.replace('To use all 13 theme presets', 'To use any of the 50 theme presets')
    c = c.replace('Choose or Switch Any of the 13 Themes', 'Choose or Switch Any of the 50 Themes')
    with open(p, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'Updated {p}')
