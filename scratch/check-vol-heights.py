import re

with open('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'r', encoding='utf-8') as f:
    content = f.read()

pattern = re.compile(r'(\.preview-player\[data-theme="([^"]+)"\][^{]*\.group\\/vol-pill[^{]*div\[class\*="bg-white/(?:20|90)"\]\s*\{[^}]+\})')
matches = pattern.findall(content)
print(f'Total matches: {len(matches)}')
themes = {}
for full, theme in matches:
    h = re.findall(r'height:\s*([^;!]+)', full)
    themes.setdefault(theme, []).append((full[:60], h))

for t, entries in sorted(themes.items()):
    print(t, [e[1] for e in entries])

