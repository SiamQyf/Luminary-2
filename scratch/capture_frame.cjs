const http = require('http');
const { execSync } = require('child_process');
const fs = require('fs');

// Launch Chrome with remote debugging or direct screenshot with delay
const outPath = 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/live_podcast_frame.png';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

// In Chrome CLI: --virtual-time-budget=3000 allows the page to load scripts before screenshotting!
try {
  execSync(`"${chromePath}" --headless --no-sandbox --disable-gpu --virtual-time-budget=3000 --screenshot="${outPath}" --window-size=1200,800 "http://localhost:5173/preview.html?theme=podcast-studio"`);
  console.log('Result:', fs.existsSync(outPath), fs.statSync(outPath).size);
} catch (e) {
  console.error('Error:', e.message);
}
