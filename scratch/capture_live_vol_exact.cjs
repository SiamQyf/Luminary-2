const { execSync } = require('child_process');
const fs = require('fs');

const html = `<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="http://localhost:5173/src/skin.css">
<style>
body { background: #0c0e14; padding: 40px; font-family: sans-serif; }
</style>
</head>
<body data-theme="podcast-studio">
<div class="preview-player" data-theme="podcast-studio">
  <div class="media-skin" data-theme="podcast-studio" style="width: 500px; padding: 20px; background: #161822; border-radius: 16px;">
    <!-- Volume Pill with forced active expansion -->
    <div class="group/vol-pill relative flex h-[31.4px] shrink-0 items-center justify-start rounded-full overflow-hidden select-none isolate border-none outline-none w-[110px] pr-3" style="border: 1px solid rgba(245, 158, 11, 0.3);">
      <button class="relative z-10 size-[31.4px] shrink-0 grid place-items-center p-0 m-0 border-none bg-transparent cursor-pointer text-white">
        <span class="player-icon-scale relative z-10 size-full grid place-items-center text-white">
          <svg class="size-[17.1px] text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
        </span>
      </button>

      <div class="horizontal-volume-slider relative -left-[4px] z-10 flex h-full flex-1 items-center cursor-pointer outline-none w-full max-w-full opacity-100 pointer-events-auto">
        <div class="relative h-[2px] w-[calc(100%-1px)] rounded-full bg-white/20 overflow-hidden my-auto self-center">
          <div class="absolute inset-y-0 left-0 rounded-full bg-white/90 shadow-sm" style="width: 65%;"></div>
        </div>
        <div class="volume-slider-thumb absolute top-1/2 rounded-full pointer-events-none" style="left: 65%;"></div>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;

fs.writeFileSync('d:/video player/skin 2/custom-skin/scratch/test_live_vol_exact.html', html);

const outPath = 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/live_vol_exact.png';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
execSync(`"${chromePath}" --headless --no-sandbox --disable-gpu --screenshot="${outPath}" --window-size=600,300 "file:///d:/video player/skin 2/custom-skin/scratch/test_live_vol_exact.html"`);
console.log('Exact vol test taken:', fs.existsSync(outPath));
