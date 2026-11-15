from PIL import Image

im1 = Image.open('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_real_current.png')
im2 = Image.open('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_real_needle_clean.png')

# Let's crop both to see the bottom controls bar clearly
# Image is 1420 x 130
c1 = im1.crop((0, 0, im1.width, im1.height))
c1.save('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_before_nob_removal.png')

c2 = im2.crop((0, 0, im2.width, im2.height))
c2.save('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_after_nob_removal.png')

print('Images saved for artifact review!')
