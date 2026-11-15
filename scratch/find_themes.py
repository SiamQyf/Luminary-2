import re

with open(r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    content = f.read()

themes = set(re.findall(r'\[data-theme=["\']([^"\']+)["\']\]', content))
print("Matching themes found:")
for t in sorted(themes):
    if any(k in t for k in ['water', 'droplet', 'cryst', 'cosm', 'nebu', 'aqua', 'frost', 'prism', 'ice']):
        print(" -", t)
