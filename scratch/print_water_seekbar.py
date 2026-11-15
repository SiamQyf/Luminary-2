with open(r"d:\video player\custom-skin\apps\preview\src\frame\preview.css", "r", encoding="utf-8") as f:
    text = f.read()

start = text.find('.preview-player[data-theme="water-droplet"] .group\\/slider,')
end = text.find('/* --------------------------------------------------------------------------\n   2. C')

print("START:", start, "END:", end)
print(text[start:end])
