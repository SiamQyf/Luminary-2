from PIL import Image

names = [
    'glacial_state_current',
    'glacial_state_needle_no_vol_knob',
    'glacial_state_completely_thumbless'
]

# We want to crop from y=40 to y=250, x=0 to 1920 (or image width)
images = [Image.open(f'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/{n}.png') for n in names]

# Let's crop dock + seekbar: y=50 to y=240
crops = [im.crop((0, 50, min(im.width, 1920), 240)) for im in images]

total_height = sum(c.height for c in crops) + 20 * (len(crops) - 1)
max_width = max(c.width for c in crops)

comp = Image.new('RGB', (max_width, total_height), (10, 15, 25))
y_offset = 0
for c in crops:
    comp.paste(c, (0, y_offset))
    y_offset += c.height + 20

comp.save('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_nob_comparison.png')
print('Comparison saved to glacial_nob_comparison.png, size:', comp.size)
