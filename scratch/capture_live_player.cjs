const { execSync } = require('child_process');
const fs = require('fs');

const outPath = 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/live_podcast_player.png';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

// Vite preview frame is typically at http://localhost:5173/ or iframe with theme
// Let's test http://localhost:5173/frame.html?theme=podcast-studio or http://localhost:5173/?theme=podcast-studio
try {
  execSync(`"${chromePath}" --headless --no-sandbox --disable-gpu --screenshot="${outPath}" --window-size=1200,800 "http://localhost:5173/?theme=podcast-studio"`);
  console.log('Result:', fs.existsSync(outPath), fs.statSync(outPath).size);
} catch (e) {
  console.error('Error:', e.message);
}
