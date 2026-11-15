import os

search_dir = r"d:\video player\custom-skin\apps\preview"
for root, dirs, files in os.walk(search_dir):
    for f in files:
        if f.endswith(('.tsx', '.ts', '.html')):
            fp = os.path.join(root, f)
            with open(fp, 'r', encoding='utf-8', errors='ignore') as file:
                content = file.read()
                if 'UsageGuide' in content or 'usage-guide' in content:
                    print(fp)
