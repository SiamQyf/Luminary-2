const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function snap() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9246;
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
  await new Promise(r => setTimeout(r, 1500));

  // Expand volume pill and advance video to 40%
  await send('Runtime.evaluate', {
    expression: `
      const video = document.querySelector('video');
      if (video) video.currentTime = 45;
      const pill = document.querySelector('.group\\\\/vol-pill');
      if (pill) {
        pill.classList.add('w-[110px]!', 'pr-3!');
        const slider = pill.querySelector('.horizontal-volume-slider');
        if (slider) {
          slider.style.width = '100%';
          slider.style.maxWidth = '100%';
          slider.style.opacity = '1';
          slider.style.pointerEvents = 'auto';
        }
      }
    `
  });

  // Awaken controls
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 200, y: 490 });
  await new Promise(r => setTimeout(r, 600));

  const clip = {
    x: 20,
    y: 465,
    width: 710,
    height: 65,
    scale: 2
  };

  // 1. Current state
  const s1 = await send('Page.captureScreenshot', { format: 'png', clip });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_real_current.png', Buffer.from(s1.data, 'base64'));
  console.log('Saved glacial_real_current.png');

  // 2. Remove seekbar diamond knob (::before) + remove volume diamond knob
  await send('Runtime.evaluate', {
    expression: `
      const s = document.createElement('style');
      s.id = 'opt-needle';
      s.textContent = \`
        .preview-player[data-theme="glacial-permafrost"] .group\\\\/slider .media-thumb-smooth::before,
        :root[data-theme="glacial-permafrost"] .group\\\\/slider .media-thumb-smooth::before,
        :where(.media-skin)[data-theme="glacial-permafrost"] .group\\\\/slider .media-thumb-smooth::before {
          display: none !important;
          content: none !important;
        }
        .preview-player[data-theme="glacial-permafrost"] .volume-slider-thumb,
        :root[data-theme="glacial-permafrost"] .volume-slider-thumb,
        :where(.media-skin)[data-theme="glacial-permafrost"] .volume-slider-thumb {
          display: none !important;
        }
      \`;
      document.head.appendChild(s);
    `
  });
  await new Promise(r => setTimeout(r, 400));
  const s2 = await send('Page.captureScreenshot', { format: 'png', clip });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_real_needle_clean.png', Buffer.from(s2.data, 'base64'));
  console.log('Saved glacial_real_needle_clean.png');

  // 3. Completely thumbless seekbar too
  await send('Runtime.evaluate', {
    expression: `
      const s2 = document.createElement('style');
      s2.id = 'opt-thumbless';
      s2.textContent = \`
        .preview-player[data-theme="glacial-permafrost"] .group\\\\/slider .media-thumb-smooth,
        :root[data-theme="glacial-permafrost"] .group\\\\/slider .media-thumb-smooth,
        :where(.media-skin)[data-theme="glacial-permafrost"] .group\\\\/slider .media-thumb-smooth {
          display: none !important;
        }
      \`;
      document.head.appendChild(s2);
    `
  });
  await new Promise(r => setTimeout(r, 400));
  const s3 = await send('Page.captureScreenshot', { format: 'png', clip });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_real_completely_thumbless.png', Buffer.from(s3.data, 'base64'));
  console.log('Saved glacial_real_completely_thumbless.png');

  ws.close();
  chromeProc.kill();
}

snap().catch(console.error);
