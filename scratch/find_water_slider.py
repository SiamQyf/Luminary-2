with open(r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'\[data-theme=["\']water-droplet["\']\][^\{]*slider', text, re.IGNORECASE)]
print(f'Matches with slider: {len(matches)}')
for idx in matches:
    print('---')
    print(text[idx:idx+400])
