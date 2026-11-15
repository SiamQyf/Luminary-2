with open(r"d:\video player\custom-skin\apps\preview\src\frame\preview.css", "r", encoding="utf-8") as f:
    text = f.read()

import re
matches = list(re.finditer(r'data-theme="water-droplet"\].*?opacity', text, re.DOTALL))
print("Count:", len(matches))
for m in matches[:5]:
    start = max(0, m.start() - 30)
    end = min(len(text), m.start() + 250)
    print("--- MATCH ---")
    print(text[start:end])
