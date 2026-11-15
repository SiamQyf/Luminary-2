const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function snapTheme(theme, outFile, seekSec = 35) {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9248;
  
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    `http://localhost:5173/preview.html?theme=${theme}`
  ]);

  await new Promise(r => setTimeout(r, 1600));

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
    deviceScaleFactor: 2,
    mobile: false
  });

  await new Promise(r => setTimeout(r, 1800));

  // Set video time to seekSec so seekbar fill is visible
  if (seekSec > 0) {
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const video = document.querySelector('video');
          if (video) {
            video.currentTime = ${seekSec};
          }
        })()
      `
    });
  }

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

  if (barRes.result.value) {
    const rect = barRes.result.value;
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
    fs.writeFileSync(outFile, Buffer.from(shot.data, 'base64'));
    console.log(`Saved ${outFile}`);
  }

  ws.close();
  chromeProc.kill();
}

async function main() {
  await snapTheme('water-droplet', 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/live_water_droplet_caustic.png', 45);
  await new Promise(r => setTimeout(r, 1000));
  await snapTheme('crystal', 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/live_crystal_caustic.png', 45);
  await new Promise(r => setTimeout(r, 1000));
  await snapTheme('cosmic-nebula', 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/live_cosmic_nebula_caustic.png', 45);
}

main().catch(console.error);
