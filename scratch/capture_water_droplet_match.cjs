const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function snapWaterDroplet() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9260;
  
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

  // Set video time to 45s so seekbar fill is visible
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
    // Mouse move to awaken
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: rect.x + 50,
      y: rect.y + 20
    });
  }

  await new Promise(r => setTimeout(r, 800));

  if (barRes.result.value) {
    const rect = barRes.result.value;
    // 1. Full bar shot
    const fullClip = {
      x: Math.max(0, rect.x - 10),
      y: Math.max(0, rect.y - 15),
      width: rect.width + 20,
      height: rect.height + 25,
      scale: 2
    };

    const shot1 = await send('Page.captureScreenshot', {
      format: 'png',
      clip: fullClip
    });
    const outFile1 = 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/live_water_droplet_caustic.png';
    fs.writeFileSync(outFile1, Buffer.from(shot1.data, 'base64'));
    console.log(`Saved ${outFile1}`);

    // 2. Hover over volume pill to reveal volume slider and thumb
    const volRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const vol = document.querySelector('.group\\\\/vol-pill');
          if (!vol) return null;
          const r = vol.getBoundingClientRect();
          return { x: r.x + r.width/2, y: r.y + r.height/2 };
        })()
      `,
      returnByValue: true
    });

    if (volRes.result.value) {
      await send('Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x: volRes.result.value.x,
        y: volRes.result.value.y
      });
      await new Promise(r => setTimeout(r, 600));

      const shot2 = await send('Page.captureScreenshot', {
        format: 'png',
        clip: fullClip
      });
      const outFile2 = 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/live_water_droplet_vol_expanded.png';
      fs.writeFileSync(outFile2, Buffer.from(shot2.data, 'base64'));
      console.log(`Saved ${outFile2}`);
    }
  }

  ws.close();
  chromeProc.kill();
}

snapWaterDroplet().catch(console.error);
