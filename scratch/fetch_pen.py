import urllib.request
import re
import json

url = 'https://codepen.io/Enrichr-Dev/pen/GgWPBVP'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})

try:
    with urllib.request.urlopen(req) as resp:
        content = resp.read().decode('utf-8', errors='ignore')
        print('Fetched length:', len(content))
        with open('scratch/pen.html', 'w', encoding='utf-8') as f:
            f.write(content)
        
        title_m = re.search(r'<title>(.*?)</title>', content)
        if title_m:
            print('Title:', title_m.group(1))

        # Check if pen json exists
        init_match = re.search(r'var\s+_init\s*=\s*({.*?});', content, re.DOTALL)
        if init_match:
            print('Found _init!')
        
        # Check __NEXT_DATA__ or similar
        next_data = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', content)
        if next_data:
            print('Found __NEXT_DATA__')

        # Also check .css and .js and .html endpoints
except Exception as e:
    print('Error fetching:', e)

for ext in ['.html', '.css', '.js']:
    u = f'https://codepen.io/Enrichr-Dev/pen/GgWPBVP{ext}'
    try:
        r = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(r) as resp:
            data = resp.read().decode('utf-8', errors='ignore')
            print(f'{ext}: length {len(data)}')
            with open(f'scratch/pen{ext}', 'w', encoding='utf-8') as f:
                f.write(data)
    except Exception as e:
        print(f'{ext} error: {e}')
