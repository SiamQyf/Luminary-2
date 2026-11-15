const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function snapSpeaker() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9265;
  
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    'http://localhost:5173/preview.html?theme=water-droplet'
  ]);

  await new Promise(r => setTimeout(r, 1600));

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

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false
  });

  await new Promise(r => setTimeout(r, 1800));

  // Set video time to 45s
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const video = document.querySelector('video');
        if (video) video.currentTime = 45;
      })()
    `
  });

  await new Promise(r => setTimeout(r, 1000));

  // Awaken controls
  const barRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('[data-part="bottom-controls-bar"]');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      })()
    `,
    returnByValue: true
  });

  if (barRes.result.value) {
    const rect = barRes.result.value;
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: rect.x + 50,
      y: rect.y + 20
    });
  }

  await new Promise(r => setTimeout(r, 800));

  // Get exact bounding rect of the mute button and its SVG
  const iconRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const btn = document.querySelector('.group\\\\/mute') || document.querySelector('.group\\\\/vol-pill button');
        const svg = btn ? btn.querySelector('svg') : null;
        if (!btn || !svg) return null;
        const bRect = btn.getBoundingClientRect();
        const sRect = svg.getBoundingClientRect();
        const btnCenter = bRect.x + bRect.width / 2;
        const svgCenter = sRect.x + sRect.width / 2;
        return {
          btnRect: bRect,
          svgRect: sRect,
          btnCenterX: btnCenter,
          svgCenterX: svgCenter,
          diffX: svgCenter - btnCenter
        };
      })()
    `,
    returnByValue: true
  });
  console.log('Speaker icon centering evaluation:', iconRes.result.value);

  if (barRes.result.value) {
    const rect = barRes.result.value;
    // Capture close-up of play and volume buttons
    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: Math.max(0, rect.x - 5),
        y: Math.max(0, rect.y - 10),
        width: 140,
        height: rect.height + 20,
        scale: 2
      }
    });
    const outFile = 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/speaker_recenter_close_up.png';
    fs.writeFileSync(outFile, Buffer.from(shot.data, 'base64'));
    console.log(`Saved ${outFile}`);
  }

  ws.close();
  chromeProc.kill();
}

snapSpeaker().catch(console.error);
