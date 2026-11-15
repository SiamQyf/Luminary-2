import re

path = 'd:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css'
with open(path, 'r', encoding='utf-8') as f:
    css = f.read()

# We need to find every .group\/vol-pill ... div[class*="bg-white/(?:20|90)"] block and decrease height by 0.5px
def replace_block(match):
    block = match.group(0)
    def repl_h(h_match):
        prefix = h_match.group(1)
        val = float(h_match.group(2))
        suffix = h_match.group(3)
        new_val = max(1.0, val - 0.5)
        formatted = f"{new_val:g}"
        return f"{prefix}{formatted}px{suffix}"
    
    # replace height: Xpx
    new_block = re.sub(r'(height:\s*)([0-9]+(?:\.[0-9]+)?)px([^;}]*;)', repl_h, block)
    return new_block

# Regex to match the vol-pill rule blocks
rule_pattern = re.compile(r'(\.preview-player[^{]*group\\/vol-pill[^{]*div\[class\*="bg-white/(?:20|90)"\]\s*\{[^}]+\})')

matches = rule_pattern.findall(css)
print(f"Matched rules: {len(matches)}")

new_css = rule_pattern.sub(replace_block, css)

# Verify differences
diff_count = 0
for m in matches:
    new_m = replace_block(re.match(r'.*', m, re.DOTALL))
    if m != new_m:
        diff_count += 1
        # print first 5 diffs
        if diff_count <= 5:
            print(f"OLD:\n{m}\nNEW:\n{new_m}\n---")

print(f"Total modified rules: {diff_count}")

