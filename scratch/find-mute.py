import os, glob

for root, dirs, files in os.walk('d:/video player/skin 2/custom-skin/node_modules/@videojs'):
    for f in files:
        if f.endswith('.js') and 'mute-button' in f:
            print(os.path.join(root, f))

