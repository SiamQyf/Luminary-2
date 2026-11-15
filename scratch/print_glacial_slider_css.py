with open(r"d:\video player\custom-skin\apps\preview\src\frame\preview.css", "r", encoding="utf-8") as f:
    text = f.read()

start = text.find('.preview-player[data-theme="glacial-permafrost"] .group\\/slider,')
end = text.find('.preview-player[data-theme="glacial-permafrost"] .group\\/vol-pill div[class*="bg-white/20"]')

print("START:", start, "END:", end)
print(text[start:end])
