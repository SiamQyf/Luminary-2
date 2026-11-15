const http = require('http');
const { spawn } = require('child_process');

async function findBBox() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9249;
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    'http://localhost:5173/preview.html?theme=glacial-permafrost'
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
  await new Promise(r => setTimeout(r, 1000));

  const res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const dock = document.querySelector('[data-part="bottom-controls-bar"]');
        const player = document.querySelector('.preview-player');
        const slider = document.querySelector('.group\\\\/slider');
        return JSON.stringify({
          dock: dock ? dock.getBoundingClientRect() : null,
          player: player ? player.getBoundingClientRect() : null,
          slider: slider ? slider.getBoundingClientRect() : null,
        });
      })()
    `,
    returnByValue: true
  });

  console.log(res.result.value);
  ws.close();
  chromeProc.kill();
}

findBBox().catch(console.error);
