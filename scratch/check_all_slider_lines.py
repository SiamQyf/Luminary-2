with open(r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'\[data-theme=["\']water-droplet["\']\][^{]*slider', text, re.IGNORECASE)]
for idx in matches:
    line_no = text[:idx].count('\n') + 1
    print(f'Line {line_no}: {text[idx:idx+100].strip()}')
