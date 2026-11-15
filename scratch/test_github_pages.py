import urllib.request

urls = [
    'https://siamqyf.github.io/Luminary-The-Video-JS-Skin/',
    'https://siamqyf.github.io/Luminary-2/',
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, timeout=5)
        print(f'{url}: Status {res.status}')
    except Exception as e:
        print(f'{url}: Failed ({e})')
