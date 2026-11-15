with open(r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'\[data-theme=["\']water-droplet["\']\]', text)]
print(f'Total matches: {len(matches)}')
for idx in matches:
    snippet = text[idx:idx+350].replace('\n', ' ')
    print(snippet[:120])
