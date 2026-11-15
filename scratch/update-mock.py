import os

p = r"d:\video player\skin 2\custom-skin\scratch\verify-scholarly.html"
with open(p, "r", encoding="utf-8") as f:
    txt = f.read()

txt = txt.replace('class="media-slider-smooth group/slider relative', 'style="--media-slider-fill: 60%; --media-slider-buffer: 85%;" class="media-slider-smooth group/slider relative')

with open(p, "w", encoding="utf-8") as f:
    f.write(txt)

print("Updated mock")
