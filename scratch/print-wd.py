with open(r'd:\video player\skin 2\custom-skin\apps\preview\src\frame\preview.css', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('.preview-player[data-theme="water-droplet"] div[class*="media-slider-smooth"][class*="isolate"]')
if idx != -1:
    print(text[idx:idx+1500])
