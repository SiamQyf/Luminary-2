const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testDeepAbyssVol() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9260;
  
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    'http://localhost:5173/preview.html?theme=deep-abyss'
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

  const css = `
    .preview-player[data-theme="deep-abyss"] .group\\/liquid-btn,
    .preview-player[data-theme="deep-abyss"] .group\\/center-buffering button,
    .preview-player[data-theme="deep-abyss"] [data-slot="control"],
    .preview-player[data-theme="deep-abyss"] .media-fullscreen-button,
    .preview-player[data-theme="deep-abyss"] .group\\/vol-pill {
      position: relative !important;
      overflow: hidden !important;
    }

    .preview-player[data-theme="deep-abyss"] .group\\/liquid-btn::after,
    .preview-player[data-theme="deep-abyss"] .group\\/center-buffering button::after,
    .preview-player[data-theme="deep-abyss"] [data-slot="control"]::after,
    .preview-player[data-theme="deep-abyss"] .media-fullscreen-button::after,
    .preview-player[data-theme="deep-abyss"] .group\\/vol-pill::after {
      content: "" !important;
      position: absolute !important;
      inset: 0 !important;
      border-radius: inherit !important;
      pointer-events: none !important;
      z-index: 1 !important;
      background-image:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='warp' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.038 0.012' numOctaves='3' seed='88' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.13 0 0 0 0 0.83 0 0 0 0 0.93 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0 0.8 1 0.2 0 0 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23warp)'/%3E%3C/svg%3E"),
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='weft' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.014 0.042' numOctaves='3' seed='142' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.05 0 0 0 0 0.6 0 0 0 0 0.8 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0 0 0.9 1 0.3 0 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23weft)'/%3E%3C/svg%3E") !important;
      background-size: 180px 180px, 220px 220px !important;
      mix-blend-mode: plus-lighter !important;
      opacity: 0.6 !important;
      animation: 32s ease-in-out infinite deep-abyss-threads-weave !important;
      -webkit-mask: radial-gradient(circle at 45% 45%, #000 0%, #000 65%, transparent 100%) !important;
      mask: radial-gradient(circle at 45% 45%, #000 0%, #000 65%, transparent 100%) !important;
    }

    .preview-player[data-theme="deep-abyss"] .media-skin [data-part="bottom-controls-bar"]::after {
      content: "" !important;
      position: absolute !important;
      inset: 0 !important;
      border-radius: inherit !important;
      pointer-events: none !important;
      z-index: 0 !important;
      background-image:
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='warp' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.038 0.012' numOctaves='3' seed='88' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.13 0 0 0 0 0.83 0 0 0 0 0.93 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0 0.8 1 0.2 0 0 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23warp)'/%3E%3C/svg%3E"),
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='weft' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.014 0.042' numOctaves='3' seed='142' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.05 0 0 0 0 0.6 0 0 0 0 0.8 1 0 0 0 0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0 0 0.9 1 0.3 0 0 0 0'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23weft)'/%3E%3C/svg%3E") !important;
      background-size: 360px 120px, 480px 140px !important;
      mix-blend-mode: plus-lighter !important;
      opacity: 0.18 !important;
      animation: 38s ease-in-out infinite deep-abyss-dock-weave !important;
      -webkit-mask: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 40%, #000 100%) !important;
      mask: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.5) 40%, #000 100%) !important;
    }

    @keyframes deep-abyss-threads-weave {
      0% { background-position: 0px 0px, 0px 0px; }
      50% { background-position: 140px -70px, -120px 90px; }
      100% { background-position: 0px 0px, 0px 0px; }
    }

    @keyframes deep-abyss-dock-weave {
      0% { background-position: 0px 0px, 0px 0px; }
      50% { background-position: 240px -40px, -200px 50px; }
      100% { background-position: 0px 0px, 0px 0px; }
    }
  `;

  await send('Runtime.evaluate', {
    expression: `
      (() => {
        let s = document.createElement('style');
        s.textContent = ${JSON.stringify(css)};
        document.head.appendChild(s);
      })()
    `
  });

  // hover over volume pill to expand it
  const volRes = await send('Runtime.evaluate', {
    expression: '(() => { const r = document.querySelector(\'.group\\\\/vol-pill\').getBoundingClientRect(); return { x: r.x + r.width/2, y: r.y + r.height/2 }; })()',
    returnByValue: true
  });
  const volCenter = volRes.result.value;
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: volCenter.x, y: volCenter.y });
  await new Promise(r => setTimeout(r, 600));

  const barRes = await send('Runtime.evaluate', {
    expression: '(() => { const r = document.querySelector(\'[data-part="bottom-controls-bar"]\').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; })()',
    returnByValue: true
  });
  const rect = barRes.result.value;

  const shot = await send('Page.captureScreenshot', {
    clip: { x: rect.x - 10, y: rect.y - 10, width: rect.width + 20, height: rect.height + 20, scale: 2 }
  });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/deep_abyss_vol_expanded.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved deep_abyss_vol_expanded.png');

  chromeProc.kill();
  process.exit(0);
}

testDeepAbyssVol().catch(e => {
  console.error(e);
  process.exit(1);
});
