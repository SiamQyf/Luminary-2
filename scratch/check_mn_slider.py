with open(r'd:\video player\skin 2\custom-skin\scratch\media-Cw0Daoyk.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
matches = re.findall(r'(\.mn\s[^{]*slider[^{]*\{[^{}]*\})', css)
for m in matches:
    print(m[:200])
    print('---')
matches2 = re.findall(r'(\.mn\s[^{]*seek[^{]*\{[^{}]*\})', css)
for m in matches2:
    print(m[:200])
    print('---')
