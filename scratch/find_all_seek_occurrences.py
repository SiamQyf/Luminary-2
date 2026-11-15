import re

files = [
    r"d:\video player\custom-skin\apps\preview\src\frame\preview.css",
    r"d:\video player\custom-skin\src\skin.css",
    r"d:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css",
    r"d:\video player\skin 2\custom-skin\src\skin.css"
]

for fp in files:
    with open(fp, "r", encoding="utf-8") as f:
        text = f.read()
    matches = list(re.finditer(r'data-theme="glacial-permafrost"\]\s*\.group\\/slider', text))
    print(f"File: {fp} - Count: {len(matches)}")
    for i, m in enumerate(matches):
        print(f"  Match {i} at {m.start()}: {text[m.start():m.start()+120].strip()}")
