with open(r'd:\video player\custom-skin\src\skin.css', 'r', encoding='utf-8') as f:
    c = f.read()

import re
for m in re.finditer(r'@media[^{]*prefers-reduced-motion[^{]*\{', c):
    idx = m.start()
    print('--- MATCH in skin.css ---')
    print(c[idx:idx+600])

with open(r'd:\video player\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    c2 = f.read()

for m in re.finditer(r'@media[^{]*prefers-reduced-motion[^{]*\{', c2):
    idx = m.start()
    print('--- MATCH in preview.css ---')
    print(c2[idx:idx+600])
