const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function run() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9250;
  
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    'http://localhost:5173/preview.html?theme=crystal'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  const list = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json/list`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const ws = new WebSocket(list[0].webSocketDebuggerUrl);
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
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 2, mobile: false });
  await new Promise(r => setTimeout(r, 1500));

  // awaken controls
  const barRes = await send('Runtime.evaluate', {
    expression: '(() => { const r = document.querySelector(\'[data-part="bottom-controls-bar"]\').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; })()',
    returnByValue: true
  });
  const rect = barRes.result.value;
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: rect.x + 50, y: rect.y + 20 });
  await new Promise(r => setTimeout(r, 800));

  const shot = await send('Page.captureScreenshot', {
    clip: { x: rect.x - 10, y: rect.y - 10, width: rect.width + 20, height: rect.height + 20, scale: 2 }
  });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/crystal_current.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved crystal_current.png');
  chromeProc.kill();
  process.exit(0);
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
