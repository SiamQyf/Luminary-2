const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const outPath = 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/live_vol_hover.png';
  const port = 9223;
  
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    'http://localhost:5173/preview.html?theme=podcast-studio'
  ]);

  // Wait 1.5s for Chrome to start
  await new Promise(r => setTimeout(r, 1500));

  // Get WebSocket debugger URL
  const list = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json/list`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const page = list[0];
  console.log('Connected to page:', page.title);
  
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (event) => {
        const msg = JSON.parse(event.data.toString());
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await new Promise(r => ws.addEventListener('open', r, { once: true }));

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  // Wait for player to render
  await new Promise(r => setTimeout(r, 2000));

  // Get .group/vol-pill bounding box
  const boxRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const pill = document.querySelector('.group\\\\/vol-pill');
        if (!pill) return null;
        const rect = pill.getBoundingClientRect();
        return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
      })()
    `,
    returnByValue: true
  });
  console.log('Pill center:', boxRes.result.value);

  if (boxRes.result.value) {
    const { x, y } = boxRes.result.value;
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x,
      y
    });
  }

  // Wait 400ms for hover transition
  await new Promise(r => setTimeout(r, 400));

  // Take screenshot
  const scr = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(outPath, Buffer.from(scr.data, 'base64'));
  console.log('Screenshot saved to', outPath);

  ws.close();
  chromeProc.kill();
}

main().catch(console.error);
