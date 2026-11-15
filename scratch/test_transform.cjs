const http = require('http');
const { spawn } = require('child_process');

async function testTransform() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9253;
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

  await send('Runtime.evaluate', {
    expression: `
      const s = document.createElement('style');
      s.id = 'glacial-trough-test';
      s.textContent = \`
        .preview-player[data-theme="glacial-permafrost"] div[class*="media-slider-smooth"][class*="isolate"] {
          height: 8px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
        }
        .preview-player[data-theme="glacial-permafrost"] .group\\\\/slider .media-thumb-smooth {
          width: 3px !important;
          height: 20px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          margin-top: 0 !important;
        }
      \`;
      document.head.appendChild(s);
    `
  });

  const res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const thumb = document.querySelector('.group\\\\/slider .media-thumb-smooth');
        const track = document.querySelector('.group\\\\/slider div[class*="media-slider-smooth"][class*="isolate"]');
        const tb = thumb.getBoundingClientRect();
        const tr = track.getBoundingClientRect();
        const cs = window.getComputedStyle(thumb);
        return JSON.stringify({
          thumbBBox: tb,
          trackBBox: tr,
          thumbCenterY: tb.top + tb.height / 2,
          trackCenterY: tr.top + tr.height / 2,
          diff: (tb.top + tb.height / 2) - (tr.top + tr.height / 2),
          top: cs.top,
          transform: cs.transform
        }, null, 2);
      })()
    `,
    returnByValue: true
  });

  console.log(res.result.value);
  ws.close();
  chromeProc.kill();
}

testTransform().catch(console.error);
