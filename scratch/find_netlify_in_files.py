import os

search_dir = r"d:\video player"
matches = []

for root, dirs, files in os.walk(search_dir):
    if 'node_modules' in root or '.git' in root or 'dist' in root:
        continue
    for file in files:
        if file.endswith(('.txt', '.md', '.json', '.js', '.ts', '.py', '.cjs', '.mjs')):
            fp = os.path.join(root, file)
            try:
                with open(fp, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    if 'netlify.app' in content:
                        matches.append((fp, [line for line in content.splitlines() if 'netlify.app' in line]))
            except:
                pass

for fp, lines in matches:
    print(fp)
    for l in lines:
        print("  ", l[:120])
