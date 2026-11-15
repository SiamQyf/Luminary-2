const { execSync } = require('child_process');
const fs = require('fs');

const htmlPath = 'd:/video player/skin 2/custom-skin/scratch/test_waveform_configs.html';
const outPath = 'd:/video player/skin 2/custom-skin/scratch/test_waveform_configs.png';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

try {
  execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${outPath}" --window-size=1000,700 "file:///${htmlPath}"`);
  console.log('Screenshot taken:', fs.existsSync(outPath), fs.statSync(outPath).size);
} catch (e) {
  console.error('Error:', e.message);
}
