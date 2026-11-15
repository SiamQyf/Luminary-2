with open('d:/video player/skin 2/custom-skin/node_modules/@videojs/react/dist/dev/index.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'index_parts_exports$20' in line:
        print(f"Line {i+1}: {line.strip()[:100]}")
        # print 20 lines around
        for j in range(max(0, i-25), min(len(lines), i+10)):
            if 'exports$20' in lines[j] or 'VolumeSlider' in lines[j]:
                print(f"{j+1}: {lines[j].strip()[:100]}")

