const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testWaterTransparency() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9284;
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
  await new Promise(r => setTimeout(r, 1000));

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

  // 1. Before change
  const sBefore = await send('Page.captureScreenshot', { format: 'png', clip: clipDock });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/water_seekbar_before.png', Buffer.from(sBefore.data, 'base64'));

  // 2. Inject Candidate 50% Reduced Transparency Styles
  await send('Runtime.evaluate', {
    expression: `
      const s = document.createElement('style');
      s.id = 'water-50pct-transparency';
      s.textContent = \`
        /* Track: 50% reduced transparency (twice as dense/opaque) */
        .preview-player[data-theme="water-droplet"] div[class*="media-slider-smooth"][class*="isolate"] {
          background:
            radial-gradient(ellipse 40% 50% at 35% 15%, rgba(255, 255, 255, 0.40) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 80%),
            radial-gradient(ellipse 35% 50% at 65% 85%, rgba(186, 230, 253, 0.22) 0%, transparent 60%),
            linear-gradient(180deg, rgba(56, 189, 248, 0.14) 0%, rgba(14, 165, 233, 0.18) 100%),
            rgba(4, 18, 30, 0.50) !important;
          border: 1px solid rgba(186, 230, 253, 0.44) !important;
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.6),
            inset 0 -1px 1px rgba(2, 132, 199, 0.32),
            0 0 10px rgba(56, 189, 248, 0.32),
            0 2px 6px rgba(0, 0, 0, 0.5) !important;
        }

        .preview-player[data-theme="water-droplet"] div[class*="media-slider-smooth"][class*="isolate"]::after {
          opacity: 0.65 !important;
        }

        /* Buffer: 50% reduced transparency */
        .preview-player[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-buffer]"] {
          background: rgba(186, 230, 253, 0.36) !important;
        }

        /* Fill: 50% reduced transparency */
        .preview-player[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-fill]"] {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.16) 50%, transparent 100%),
            linear-gradient(90deg, rgba(14, 165, 233, 0.85) 0%, rgba(56, 189, 248, 0.92) 75%, rgba(186, 230, 253, 0.96) 100%) !important;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.75) !important;
        }

        .preview-player[data-theme="water-droplet"] div[class*="clip-media-x-[--media-slider-fill]"]::after {
          opacity: 0.90 !important;
        }

        /* Thumb / Knob: 50% reduced transparency */
        .preview-player[data-theme="water-droplet"] .group\\\\/slider .media-thumb-smooth {
          background:
            radial-gradient(ellipse 42% 18% at 35% 16%, rgba(255, 255, 255, 0.88) 0%, rgba(255, 255, 255, 0.32) 45%, transparent 75%),
            radial-gradient(ellipse 38% 16% at 65% 84%, rgba(255, 255, 255, 0.45) 0%, rgba(186, 230, 253, 0.2) 40%, transparent 75%),
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, rgba(56, 189, 248, 0.16) 60%, rgba(14, 165, 233, 0.32) 85%, rgba(2, 44, 75, 0.40) 100%) !important;
          box-shadow:
            inset 0 1px 1.5px rgba(255, 255, 255, 0.65),
            inset 0 -0.5px 1px rgba(255, 255, 255, 0.35),
            0 0 10px rgba(56, 189, 248, 0.6),
            0 1px 4px rgba(56, 189, 248, 0.35) !important;
        }
      \`;
      document.head.appendChild(s);
    `
  });

  await new Promise(r => setTimeout(r, 400));
  const sAfter = await send('Page.captureScreenshot', { format: 'png', clip: clipDock });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/water_seekbar_after.png', Buffer.from(sAfter.data, 'base64'));

  // Also full player view
  const clipPlayer = {
    x: 140,
    y: 75,
    width: 985,
    height: 560,
    scale: 2
  };
  const sFull = await send('Page.captureScreenshot', { format: 'png', clip: clipPlayer });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/water_seekbar_after_full.png', Buffer.from(sFull.data, 'base64'));
  console.log('Saved screenshots!');

  ws.close();
  chromeProc.kill();
}

testWaterTransparency().catch(console.error);
