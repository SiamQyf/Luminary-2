const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testLiveTrough() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9255;
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

  // Set video time to 42s and expand volume pill for full dock context
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

  // Inject candidate Icy Crest and Trough Path styles
  await send('Runtime.evaluate', {
    expression: `
      const s = document.createElement('style');
      s.id = 'glacial-trough-test';
      s.textContent = \`
        /* Seekbar track: Carved Icy Trough Path */
        .preview-player[data-theme="glacial-permafrost"] div[class*="media-slider-smooth"][class*="isolate"] {
          height: 8px !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          border-radius: 4px !important;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(186, 230, 253, 0.18) 35%, transparent 65%),
            linear-gradient(180deg, #020710 0%, #061322 100%) !important;
          border: 1px solid rgba(186, 230, 253, 0.45) !important;
          box-shadow:
            inset 0 1.5px 3px rgba(0, 0, 0, 0.95),
            inset 0 -1px 2px rgba(125, 211, 252, 0.2),
            0 0 10px rgba(56, 189, 248, 0.25),
            0 1px 0 rgba(255, 255, 255, 0.15) !important;
          -webkit-mask-image: none !important;
          mask-image: none !important;
          overflow: hidden !important;
          transition: height 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease-out, box-shadow 0.2s ease-out !important;
        }

        .preview-player[data-theme="glacial-permafrost"] .group\\\\/slider:hover div[class*="media-slider-smooth"][class*="isolate"],
        .preview-player[data-theme="glacial-permafrost"] .group\\\\/slider[data-dragging] div[class*="media-slider-smooth"][class*="isolate"] {
          height: 11px !important;
          border-color: rgba(224, 242, 254, 0.75) !important;
          box-shadow:
            inset 0 1.5px 3px rgba(0, 0, 0, 0.95),
            inset 0 -1px 2px rgba(125, 211, 252, 0.35),
            0 0 18px rgba(125, 211, 252, 0.5),
            0 1px 0 rgba(255, 255, 255, 0.25) !important;
        }

        /* Buffer: Frosted pack ice */
        .preview-player[data-theme="glacial-permafrost"] div[class*="clip-media-x-[--media-slider-buffer]"] {
          border-radius: 3px !important;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(125, 211, 252, 0.25) 50%, rgba(56, 189, 248, 0.15) 100%) !important;
        }

        /* Fill: Glacial melt stream with radiant icy crest */
        .preview-player[data-theme="glacial-permafrost"] div[class*="clip-media-x-[--media-slider-fill]"] {
          border-radius: 3px !important;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(186, 230, 253, 0.7) 25%, transparent 60%),
            linear-gradient(90deg, #0284c7 0%, #0ea5e9 40%, #38bdf8 75%, #ffffff 100%) !important;
          box-shadow:
            0 0 14px rgba(56, 189, 248, 0.9),
            0 0 4px #ffffff,
            inset 0 1px 1px #ffffff !important;
          filter: none !important;
          opacity: 1 !important;
        }

        /* Thumb: 3px pure crystal ice needle (knob-less) */
        .preview-player[data-theme="glacial-permafrost"] .group\\\\/slider .media-thumb-smooth {
          width: 3px !important;
          height: 20px !important;
          top: 50% !important;
          transform: none !important;
          rotate: 0deg !important;
          border-radius: 1.5px !important;
          background: #ffffff !important;
          border: none !important;
          box-shadow:
            0 0 12px rgba(125, 211, 252, 1),
            0 0 3px #ffffff,
            0 0 20px rgba(56, 189, 248, 0.85),
            0 2px 6px rgba(0, 0, 0, 0.95) !important;
          opacity: 1 !important;
          display: block !important;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
        }

        .preview-player[data-theme="glacial-permafrost"] .group\\\\/slider:hover .media-thumb-smooth,
        .preview-player[data-theme="glacial-permafrost"] .group\\\\/slider[data-dragging] .media-thumb-smooth {
          height: 24px !important;
          scale: 1 !important;
          box-shadow:
            0 0 16px rgba(125, 211, 252, 1),
            0 0 5px #ffffff,
            0 0 26px rgba(56, 189, 248, 1),
            0 2px 8px rgba(0, 0, 0, 0.95) !important;
        }

        .preview-player[data-theme="glacial-permafrost"] .group\\\\/slider .media-thumb-smooth::before,
        .preview-player[data-theme="glacial-permafrost"] .group\\\\/slider .media-thumb-smooth::after {
          display: none !important;
          content: none !important;
        }
      \`;
      document.head.appendChild(s);
    `
  });

  // Awaken controls by hovering over dock
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 200, y: 585 });
  await new Promise(r => setTimeout(r, 600));

  const clip = {
    x: 140,
    y: 550,
    width: 980,
    height: 75,
    scale: 2
  };

  // 1. Resting state
  const s1 = await send('Page.captureScreenshot', { format: 'png', clip });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_live_trough_resting.png', Buffer.from(s1.data, 'base64'));
  console.log('Saved glacial_live_trough_resting.png');

  // 2. Hovered state over seekbar
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 550, y: 590 });
  await new Promise(r => setTimeout(r, 400));
  const s2 = await send('Page.captureScreenshot', { format: 'png', clip });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_live_trough_hover.png', Buffer.from(s2.data, 'base64'));
  console.log('Saved glacial_live_trough_hover.png');

  ws.close();
  chromeProc.kill();
}

testLiveTrough().catch(console.error);
