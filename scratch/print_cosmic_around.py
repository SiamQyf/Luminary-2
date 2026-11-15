with open(r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    css = f.read()

lines = css.split('\n')
for i in range(3640, 3660):
    print(lines[i])
