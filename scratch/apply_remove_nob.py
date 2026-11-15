import re

files = [
    r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css',
    r'd:\video player\skin 2\custom-skin\src\skin.css',
    r'd:\video player\custom-skin\apps\preview\src\frame\preview.css',
    r'd:\video player\custom-skin\src\skin.css'
]

# Regex patterns that handle any whitespace and line endings:
sb_pattern = re.compile(
    r'(\.preview-player\[data-theme="glacial-permafrost"\] \.group\\/slider \.media-thumb-smooth::before,\s*'
    r':root\[data-theme="glacial-permafrost"\] \.group\\/slider \.media-thumb-smooth::before,\s*'
    r':where\(\.media-skin\)\[data-theme="glacial-permafrost"\] \.group\\/slider \.media-thumb-smooth::before\s*\{[^}]+\})',
    re.MULTILINE
)

sb_replacement = '''.preview-player[data-theme="glacial-permafrost"] .group\/slider .media-thumb-smooth::before,
.preview-player[data-theme="glacial-permafrost"] .group\/slider .media-thumb-smooth::after,
:root[data-theme="glacial-permafrost"] .group\/slider .media-thumb-smooth::before,
:root[data-theme="glacial-permafrost"] .group\/slider .media-thumb-smooth::after,
:where(.media-skin)[data-theme="glacial-permafrost"] .group\/slider .media-thumb-smooth::before,
:where(.media-skin)[data-theme="glacial-permafrost"] .group\/slider .media-thumb-smooth::after {
  display: none !important;
  content: none !important;
}'''

vol_pattern = re.compile(
    r'(\.preview-player\[data-theme="glacial-permafrost"\] \.volume-slider-thumb,\s*'
    r':root\[data-theme="glacial-permafrost"\] \.volume-slider-thumb,\s*'
    r':where\(\.media-skin\)\[data-theme="glacial-permafrost"\] \.volume-slider-thumb\s*\{[^}]+\})',
    re.MULTILINE
)

vol_replacement = '''.preview-player[data-theme="glacial-permafrost"] .volume-slider-thumb,
:root[data-theme="glacial-permafrost"] .volume-slider-thumb,
:where(.media-skin)[data-theme="glacial-permafrost"] .volume-slider-thumb {
  display: none !important;
}'''

for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()

    sb_matches = sb_pattern.findall(content)
    vol_matches = vol_pattern.findall(content)

    print(f, 'sb matches:', len(sb_matches), 'vol matches:', len(vol_matches))

    new_content = sb_pattern.sub(sb_replacement, content)
    new_content = vol_pattern.sub(vol_replacement, new_content)

    with open(f, 'w', encoding='utf-8') as fp:
        fp.write(new_content)
    print('Updated', f)
