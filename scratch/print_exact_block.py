p = r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css'
header = '/* --- Water Droplet Animated Caustic Seekbar (Thinner & Styled Like Icon BG) --- */'

with open(p, 'r', encoding='utf-8') as f:
    c = f.read()

start = c.find(header)
end = c.find('/* --------------------------------------------------------------------------\n   2. CRYSTAL', start)
print(c[start:end])
