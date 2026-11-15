const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testTheme(themeId, outName) {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9228;
  
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    `http://localhost:5173/preview.html?theme=${themeId}`
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const list = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json/list`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const page = list[0];
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

  await new Promise(r => setTimeout(r, 2000));

  // Hover pill to awaken controls
  const boxRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const pill = document.querySelector('.group\\\\/vol-pill') || document.querySelector('[data-part=\"bottom-controls-bar\"]');
        if (!pill) return null;
        const rect = pill.getBoundingClientRect();
        return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
      })()
    `,
    returnByValue: true
  });

  if (boxRes.result.value) {
    const { x, y } = boxRes.result.value;
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x,
      y
    });
  }

  await new Promise(r => setTimeout(r, 500));

  // Inspect bar and ::before
  const geom = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const bar = document.querySelector('[data-part=\"bottom-controls-bar\"]');
        const playBtn = document.querySelector('.bottom-play-portrait-simple') || document.querySelector('.group\\\\/play');
        const bRect = bar ? bar.getBoundingClientRect() : null;
        const pRect = playBtn ? playBtn.getBoundingClientRect() : null;
        const bStyle = bar ? window.getComputedStyle(bar, '::before') : null;
        
        return {
          bar: bRect ? { top: bRect.top, bottom: bRect.bottom, height: bRect.height, width: bRect.width } : null,
          play: pRect ? { top: pRect.top, bottom: pRect.bottom, height: pRect.height } : null,
          before: bStyle ? {
            position: bStyle.position,
            top: bStyle.top,
            bottom: bStyle.bottom,
            height: bStyle.height,
            zIndex: bStyle.zIndex,
            backgroundColor: bStyle.backgroundColor
          } : null
        };
      })()
    `,
    returnByValue: true
  });

  console.log(`[${themeId}] Geometry:`, JSON.stringify(geom.result.value, null, 2));

  // Screenshot bottom controls
  const bar = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const el = document.querySelector('[data-part=\"bottom-controls-bar\"]');
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
      })()
    `,
    returnByValue: true
  });

  if (bar.result.value) {
    const rect = bar.result.value;
    const clip = {
      x: Math.max(0, rect.x - 10),
      y: Math.max(0, rect.y - 15),
      width: rect.width + 20,
      height: rect.height + 25,
      scale: 2
    };

    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip
    });

    const outPath = `C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/${outName}.png`;
    fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
    console.log(`Saved screenshot to ${outName}.png`);
  }

  ws.close();
  chromeProc.kill();
}

async function run() {
  await testTheme('monochrome-editorial', 'live_monochrome_editorial_fixed');
  await testTheme('spectral-analyzer', 'live_spectral_analyzer_waveform');
  await testTheme('modular-synth', 'live_modular_synth_waveform');
  await testTheme('de-stijl-mondrian', 'live_mondrian_fixed');
}

run().catch(console.error);
