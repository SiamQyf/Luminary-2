const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testOptions() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9251;
  
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
  await new Promise(r => setTimeout(r, 500));

  const variants = [
    {
      name: 'v1_op04_c1',
      r: '0.38', g: '0.78', b: '1', op: '0.4'
    },
    {
      name: 'v2_op06_c1',
      r: '0.38', g: '0.78', b: '1', op: '0.6'
    },
    {
      name: 'v3_op04_c2_soft',
      r: '0.45', g: '0.82', b: '1', op: '0.4'
    },
    {
      name: 'v4_op06_c2_soft',
      r: '0.45', g: '0.82', b: '1', op: '0.6'
    },
    {
      name: 'v5_op06_c3_vivid',
      r: '0.25', g: '0.72', b: '1', op: '0.6'
    }
  ];

  for (const v of variants) {
    const css = `
      .preview-player[data-theme="crystal"] .group\\/liquid-btn::after,
      .preview-player[data-theme="crystal"] .group\\/center-buffering button::after,
      .preview-player[data-theme="crystal"] [data-slot="control"]::after,
      .preview-player[data-theme="crystal"] .media-fullscreen-button::after,
      .preview-player[data-theme="crystal"] .group\\/vol-pill::after {
        background-image:
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='c' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.048' numOctaves='3' seed='19' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 ${v.r} 0 0 0 0 ${v.g} 0 0 0 0 ${v.b} 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0 0 0.3 1 0.7 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)'/%3E%3C/svg%3E"),
          url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='c' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.048' numOctaves='3' seed='19' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 ${v.r} 0 0 0 0 ${v.g} 0 0 0 0 ${v.b} 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0 0 0.3 1 0.7 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23c)'/%3E%3C/svg%3E") !important;
        opacity: ${v.op} !important;
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

    await new Promise(r => setTimeout(r, 600));

    const shot = await send('Page.captureScreenshot', {
      clip: { x: rect.x - 10, y: rect.y - 10, width: rect.width + 20, height: rect.height + 20, scale: 2 }
    });
    fs.writeFileSync(`C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/crystal_${v.name}.png`, Buffer.from(shot.data, 'base64'));
    console.log('Saved crystal_' + v.name);
  }

  chromeProc.kill();
  process.exit(0);
}

testOptions().catch(e => {
  console.error(e);
  process.exit(1);
});
