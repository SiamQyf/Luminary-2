const { execSync } = require('child_process');
const fs = require('fs');

const htmlPath = 'd:/video player/skin 2/custom-skin/scratch/test_waveform_real.html';
const outPath = 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/test_waveform_real.png';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

try {
  execSync(`"${chromePath}" --headless --no-sandbox --disable-gpu --screenshot="${outPath}" --window-size=1000,700 "file:///${htmlPath}"`);
  console.log('Result:', fs.existsSync(outPath), fs.statSync(outPath).size);
} catch (e) {
  console.error('Error:', e.message);
}
