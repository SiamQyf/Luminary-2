with open(r'd:\video player\skin 2\custom-skin\scratch\media-Cw0Daoyk.css', 'r', encoding='utf-8') as f:
    css = f.read()

import re
lines = [l for l in css.split('}') if 'media-time-slider' in l or 'seek' in l or 'track' in l]
for l in lines[:10]:
    print(l.strip()[:150])
    print('---')
