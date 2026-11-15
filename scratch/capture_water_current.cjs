const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function captureWaterDroplet() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9280;
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    'http://localhost:5173/preview.html?theme=water-droplet'
  ]);

  await new Promise(r => setTimeout(r, 1500));
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
  await new Promise(r => setTimeout(r, 1200));

  await send('Runtime.evaluate', {
    expression: `
      const video = document.querySelector('video');
      if (video) video.currentTime = 42;
      const pill = document.querySelector('.group\\\\/vol-pill');
      if (pill) {
        pill.classList.add('w-[110px]!', 'pr-3!');
        const slider = pill.querySelector('.horizontal-volume-slider');
        if (slider) {
          slider.style.width = '100%';
          slider.style.maxWidth = '100%';
          slider.style.opacity = '1';
        }
      }
    `
  });

  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 200, y: 585 });
  await new Promise(r => setTimeout(r, 600));

  const clipDock = {
    x: 140,
    y: 550,
    width: 980,
    height: 75,
    scale: 2
  };

  const sDock = await send('Page.captureScreenshot', { format: 'png', clip: clipDock });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/water_droplet_current_dock.png', Buffer.from(sDock.data, 'base64'));
  console.log('Saved water_droplet_current_dock.png');

  ws.close();
  chromeProc.kill();
}

captureWaterDroplet().catch(console.error);
