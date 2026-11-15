const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9239;
  
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
  await new Promise(r => setTimeout(r, 2000));

  // Set video time to 25% and hover volume pill
  await send('Runtime.evaluate', {
    expression: `
      const video = document.querySelector('video');
      if (video) video.currentTime = video.duration ? video.duration * 0.35 : 30;
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

  // Awaken controls by hovering over dock
  const barRes = await send('Runtime.evaluate', {
    expression: '(() => { const r = document.querySelector(\'[data-part="bottom-controls-bar"]\').getBoundingClientRect(); return { x: r.x + 50, y: r.y + 15 }; })()',
    returnByValue: true
  });
  if (barRes.result.value) {
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: barRes.result.value.x, y: barRes.result.value.y });
  }

  await new Promise(r => setTimeout(r, 800));

  // Get full dock + seekbar clip
  const dockRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const dock = document.querySelector('[data-part="bottom-controls-bar"]');
        const slider = document.querySelector('.group\\\\/slider');
        const dRect = dock.getBoundingClientRect();
        const sRect = slider ? slider.getBoundingClientRect() : dRect;
        const top = Math.min(dRect.top, sRect.top);
        const bottom = Math.max(dRect.bottom, sRect.bottom);
        const left = Math.min(dRect.left, sRect.left);
        const right = Math.max(dRect.right, sRect.right);
        return { x: left, y: top, width: right - left, height: bottom - top };
      })()
    `,
    returnByValue: true
  });
  const rect = dockRes.result.value;
  const clip = {
    x: Math.max(0, rect.x - 10),
    y: Math.max(0, rect.y - 10),
    width: rect.width + 20,
    height: rect.height + 20,
    scale: 2
  };

  // 1. Current state
  const shot1 = await send('Page.captureScreenshot', { format: 'png', clip });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_state_current.png', Buffer.from(shot1.data, 'base64'));
  console.log('Saved glacial_state_current.png');

  // 2. Option A: Clean Needle (remove diamond knob from seekbar needle + remove volume knob)
  await send('Runtime.evaluate', {
    expression: `
      const s = document.createElement('style');
      s.id = 'opt-a';
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
  const shot2 = await send('Page.captureScreenshot', { format: 'png', clip });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_state_needle_no_vol_knob.png', Buffer.from(shot2.data, 'base64'));
  console.log('Saved glacial_state_needle_no_vol_knob.png');

  // 3. Option B: Completely thumb-less (no seekbar thumb AND no volume thumb)
  await send('Runtime.evaluate', {
    expression: `
      const s2 = document.createElement('style');
      s2.id = 'opt-b';
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
  const shot3 = await send('Page.captureScreenshot', { format: 'png', clip });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_state_completely_thumbless.png', Buffer.from(shot3.data, 'base64'));
  console.log('Saved glacial_state_completely_thumbless.png');

  ws.close();
  chromeProc.kill();
}

main().catch(console.error);
