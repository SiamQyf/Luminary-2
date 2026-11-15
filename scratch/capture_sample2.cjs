const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-creative-prof2';
  
  const themes = ['astrolabe-celestial', 'bamboo-grove', 'arctic-aurora-ice', 'wabi-sabi-kintsugi'];

  for (const theme of themes) {
    console.log(`Capturing theme: ${theme}`);
    const proc = spawn(chromePath, [
      '--headless=new',
      '--remote-debugging-port=9499',
      `--user-data-dir=${profileDir}_${theme}`,
      '--disable-gpu',
      '--window-size=1280,800',
      `http://localhost:5173/preview.html?theme=${theme}`
    ]);

    await new Promise(r => setTimeout(r, 2200));

    try {
      const listRes = await fetch('http://127.0.0.1:9499/json/list');
      const list = await listRes.json();
      const tab = list.find(t => t.type === 'page');
      if (!tab) {
        console.log('No tab found');
        proc.kill();
        continue;
      }
      const ws = new WebSocket(tab.webSocketDebuggerUrl);
      await new Promise(r => ws.onopen = r);

      let id = 1;
      function send(method, params = {}) {
        return new Promise((resolve) => {
          const msgId = id++;
          const handler = (evt) => {
            const data = JSON.parse(evt.data);
            if (data.id === msgId) {
              ws.removeEventListener('message', handler);
              resolve(data.result);
            }
          };
          ws.addEventListener('message', handler);
          ws.send(JSON.stringify({ id: msgId, method, params }));
        });
      }

      await send('Page.enable');
      await send('Runtime.enable');

      await new Promise(r => setTimeout(r, 1200));

      const screenshot = await send('Page.captureScreenshot', { format: 'png' });
      const outPath = `C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/theme_${theme}.png`;
      fs.writeFileSync(outPath, Buffer.from(screenshot.data, 'base64'));
      console.log(`Saved screenshot to ${outPath}`);

      ws.close();
    } catch (err) {
      console.error(`Error capturing ${theme}:`, err.message);
    } finally {
      proc.kill();
      await new Promise(r => setTimeout(r, 800));
    }
  }

  console.log('Finished capturing second batch!');
}

main();
