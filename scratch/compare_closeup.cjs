const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function compareCloseUp() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9253;
  
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

  const barRes = await send('Runtime.evaluate', {
    expression: '(() => { const r = document.querySelector(\'[data-part="bottom-controls-bar"]\').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; })()',
    returnByValue: true
  });
  const rect = barRes.result.value;
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: rect.x + 50, y: rect.y + 20 });
  await new Promise(r => setTimeout(r, 500));

  const btnRes = await send('Runtime.evaluate', {
    expression: '(() => { const r = document.querySelector(\'.group\\\\/liquid-btn\').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; })()',
    returnByValue: true
  });
  const btnRect = btnRes.result.value;

  for (const op of ['0.4', '0.5', '0.6']) {
    const css = `
      .preview-player[data-theme="crystal"] .group\\/liquid-btn::after,
      .preview-player[data-theme="crystal"] .group\\/center-buffering button::after,
      .preview-player[data-theme="crystal"] [data-slot="control"]::after,
      .preview-player[data-theme="crystal"] .media-fullscreen-button::after,
      .preview-player[data-theme="crystal"] .group\\/vol-pill::after {
        background-image:
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='c' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.048' numOctaves='3' seed='19' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.38 0 0 0 0 0.78 0 0 0 0 1 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0 0 0.3 1 0.7 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='c' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.048' numOctaves='3' seed='19' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.38 0 0 0 0 0.78 0 0 0 0 1 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0 0 0.3 1 0.7 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)'/%3E%3C/svg%3E") !important;
        opacity: ${op} !important;
        animation: 48s ease-in-out infinite crystal-prismatic-drift !important;
      }
    `;

    await send('Runtime.evaluate', {
      expression: `
        (() => {
          let s = document.getElementById('test-crystal-style');
          if (!s) {
            s = document.createElement('style');
            s.id = 'test-crystal-style';
            document.head.appendChild(s);
          }
          s.textContent = ${JSON.stringify(css)};
        })()
      `
    });

    await new Promise(r => setTimeout(r, 400));

    const shot = await send('Page.captureScreenshot', {
      clip: { x: btnRect.x - 6, y: btnRect.y - 6, width: btnRect.width + 12, height: btnRect.height + 12, scale: 3 }
    });
    fs.writeFileSync(`C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/crystal_btn_op${op}.png`, Buffer.from(shot.data, 'base64'));
  }

  chromeProc.kill();
  process.exit(0);
}

compareCloseUp().catch(e => {
  console.error(e);
  process.exit(1);
});
