with open(r'd:\video player\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = list(re.finditer(r'data-theme="glacial-permafrost"\]\s*\.group\\/slider', text))
for m in matches:
    print('Match at:', m.start())
    print(text[m.start()-100:m.start()+2500])
