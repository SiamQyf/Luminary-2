from PIL import Image

names = [
    'glacial_state_current',
    'glacial_state_needle_no_vol_knob',
    'glacial_state_completely_thumbless'
]

for n in names:
    im = Image.open(f'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/{n}.png')
    # Seekbar around 35% time is around x = im.width * 0.35 ≈ 1368
    sb_crop = im.crop((1250, 45, 1480, 115))
    sb_crop.save(f'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/{n}_zoom_sb.png')

    # Volume pill around x = 200 to 600, y = 100 to 220
    vol_crop = im.crop((200, 100, 600, 220))
    vol_crop.save(f'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/{n}_zoom_vol.png')

print('Detailed zoom crops saved!')
