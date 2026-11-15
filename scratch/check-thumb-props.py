import os

target = 'd:/video player/skin 2/custom-skin/node_modules/@videojs'
for root, dirs, files in os.walk(target):
    for f in files:
        if f.endswith('.js'):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                txt = fp.read()
                if 'thumbProps' in txt:
                    print(f"Found in {p}")
                    for line in txt.splitlines():
                        if 'thumbProps' in line:
                            print("  ", line[:120])

