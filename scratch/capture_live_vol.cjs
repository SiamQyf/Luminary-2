const { execSync } = require('child_process');
const fs = require('fs');

// We can use a test HTML page that renders the player DOM or use CDP / puppeteer script
// Or simpler: open a page that forces .group/vol-pill to have class hover / expanded
const html = `<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="http://localhost:5173/src/skin.css">
<style>
body { background: #0c0e14; padding: 40px; }
</style>
</head>
<body data-theme="podcast-studio">
<div class="preview-player" data-theme="podcast-studio">
  <div class="media-skin" data-theme="podcast-studio" style="width: 500px; padding: 20px; background: #161822; border-radius: 16px;">
    <!-- Volume Pill in expanded state -->
    <div class="group/vol-pill hover" style="display: inline-flex; align-items: center; width: 110px; height: 31.4px; padding-right: 12px; border-radius: 9999px; background: linear-gradient(180deg, rgba(30, 34, 44, 0.9) 0%, rgba(18, 20, 26, 0.95) 100%); border: 1px solid rgba(245, 158, 11, 0.28);">
      <div style="width: 31.4px; height: 31.4px; display: grid; place-items: center;">
        <svg viewBox="0 0 24 24" style="width: 17px; height: 17px; fill: #ffffff;"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
      </div>
      <div class="horizontal-volume-slider" style="flex: 1; height: 100%; display: flex; align-items: center; position: relative;">
        <div class="rounded-full w-full" style="position: relative; width: 65px; height: 9px;">
          <div class="bg-white/90" style="position: absolute; left: 0; top: 0; bottom: 0; width: 65%;"></div>
        </div>
        <div class="volume-slider-thumb" style="position: absolute; left: 65%;"></div>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync('d:/video player/skin 2/custom-skin/scratch/test_live_vol.html', html);

const outPath = 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/live_vol_test.png';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
execSync(`"${chromePath}" --headless --no-sandbox --disable-gpu --screenshot="${outPath}" --window-size=600,400 "file:///d:/video player/skin 2/custom-skin/scratch/test_live_vol.html"`);
console.log('Live vol test screenshot taken:', fs.existsSync(outPath));
