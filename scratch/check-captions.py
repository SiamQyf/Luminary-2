import re

with open(r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    lines = f.readlines()

current_theme = None
theme_captions = {}
for i, l in enumerate(lines[7095:7355], 7096):
    if 'data-theme=' in l:
        m = re.search(r'data-theme="([^"]+)"', l)
        if m:
            current_theme = m.group(1)
            if current_theme not in theme_captions:
                theme_captions[current_theme] = []
    elif current_theme and '--media-caption' in l:
        theme_captions[current_theme].append(l.strip())

print(f'Found existing theme caption definitions for {len(theme_captions)} themes:')
for t, props in theme_captions.items():
    print(f'  {t}: {len(props)} properties')
