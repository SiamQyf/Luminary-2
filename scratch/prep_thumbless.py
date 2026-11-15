from PIL import Image

im3 = Image.open('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_real_completely_thumbless.png')
c3 = im3.crop((0, 0, im3.width, im3.height))
c3.save('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_completely_thumbless.png')

print('Saved glacial_completely_thumbless.png!')
