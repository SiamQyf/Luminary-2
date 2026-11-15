import os
import shutil
import zipfile

dist_dir = r"d:\video player\skin 2\custom-skin\dist"
netlify_deploy_dir = r"d:\video player\netlify-deploy"

# Sync netlify-deploy directory
if os.path.exists(netlify_deploy_dir):
    shutil.rmtree(netlify_deploy_dir)
shutil.copytree(dist_dir, netlify_deploy_dir)

zip_destinations = [
    r"d:\video player\lol.zip",
    r"d:\video player\skin 2\custom-skin\lol.zip",
    r"d:\video player\custom-skin\lol.zip",
    r"d:\video player\skin 2\custom-skin\luminary-netlify.zip",
    r"d:\video player\luminary-netlify.zip"
]

for zip_path in zip_destinations:
    if os.path.exists(zip_path):
        os.remove(zip_path)
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(dist_dir):
            for file in files:
                full_path = os.path.join(root, file)
                rel_path = os.path.relpath(full_path, dist_dir)
                zipf.write(full_path, rel_path)
    print(f"Created {zip_path}: {os.path.getsize(zip_path)} bytes")

print("All zips created successfully!")

