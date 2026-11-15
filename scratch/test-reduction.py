import re

with open('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css', 'r', encoding='utf-8') as f:
    css = f.read()

# Pattern for volume pill track / fill height
def replacer(match):
    prefix = match.group(1)
    val_str = match.group(2)
    val = float(val_str)
    new_val = max(1.0, val - 0.5)
    # format new_val (e.g. 3.5 -> 3.5, 4.0 -> 4)
    formatted = f"{new_val:g}"
    suffix = match.group(3)
    return f"{prefix}{formatted}px{suffix}"

# Match height in vol-pill div rules
# Example: .group\/vol-pill div[class*="bg-white/20"] { ... height: 4px !important; ... }
vol_rule_pattern = re.compile(r'(\.group\\/vol-pill[^{]*div\[class\*="bg-white/(?:20|90)"\]\s*\{[^}]*?height:\s*)([0-9]+(?:\.[0-9]+)?)px([^;}]*;)', re.DOTALL)

matches = vol_rule_pattern.findall(css)
print(f"Found {len(matches)} matches")
for m in matches[:10]:
    print(f"Rule prefix ends with height:, val={m[1]}px, suffix={m[2]}")

