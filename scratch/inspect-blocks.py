import re

with open('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Let's inspect all CSS blocks that match .group\/vol-pill
blocks = re.findall(r'([^{]+group\\/vol-pill[^{]+\{[^}]+\})', css)
print(f"Total vol-pill blocks: {len(blocks)}")

blocks_with_height = []
for b in blocks:
    if 'height:' in b:
        # Find selector and height
        sel = b.split('{')[0].strip()
        h = re.findall(r'height:\s*([^;]+);', b)
        blocks_with_height.append((sel, h))

print(f"Blocks with height: {len(blocks_with_height)}")
for sel, h in blocks_with_height:
    print(f"{sel} -> {h}")

