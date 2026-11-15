import os

old_target = '[data-part="bottom-controls-bar"]:not(.static!)'
new_target = '[data-part="bottom-controls-bar"]:not([class*="static"])'

for repo in [r'd:\video player\skin 2\custom-skin', r'd:\video player\custom-skin']:
    p = os.path.join(repo, 'apps', 'preview', 'src', 'frame', 'preview.css')
    with open(p, 'r', encoding='utf-8') as f:
        txt = f.read()
    if old_target in txt:
        txt = txt.replace(old_target, new_target)
        with open(p, 'w', encoding='utf-8') as f:
            f.write(txt)
        print(f"Fixed {p}")
    else:
        print(f"Target not found in {p}")
