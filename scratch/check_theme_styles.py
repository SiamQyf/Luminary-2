with open(r'd:\video player\custom-skin\src\video\shared\settings-menu.tsx', 'r', encoding='utf-8') as f:
    c = f.read()
import re
idx = c.find('export const THEME_STYLES')
print(c[idx:idx+1200])
