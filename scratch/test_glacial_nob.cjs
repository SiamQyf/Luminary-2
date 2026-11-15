const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function testGlacial() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9262;
  
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    'http://localhost:5173/preview.html?theme=glacial-permafrost'
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
      const curId = id++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === curId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: curId, method, params }));
    });
  }

  await new Promise(r => ws.onopen = r);

  await send('Page.enable');

  // Trigger volume pill open & seekbar position
  await send('Runtime.evaluate', {
    expression: `
      const volPill = document.querySelector('.group\\\\/vol-pill');
      if (volPill) {
        volPill.classList.add('w-[110px]!', 'pr-3!');
        const slider = volPill.querySelector('.horizontal-volume-slider');
        if (slider) {
          slider.style.width = '100%';
          slider.style.maxWidth = '100%';
          slider.style.opacity = '1';
          slider.style.pointerEvents = 'auto';
        }
      }
      const video = document.querySelector('video');
      if (video) {
        video.currentTime = 25;
      }
    `
  });

  await new Promise(r => setTimeout(r, 600));

  // Get bottom controls dock bounding box
  const barRes = await send('Runtime.evaluate', {
    expression: '(() => { const r = document.querySelector(\'[data-part="bottom-controls-bar"]\').getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; })()',
    returnByValue: true
  });
  const rect = barRes.result.value;

  const clip = {
    x: Math.max(0, rect.x - 20),
    y: Math.max(0, rect.y - 35),
    width: rect.width + 40,
    height: rect.height + 45,
    scale: 1
  };

  // 1. Current state with nobs
  const shot1 = await send('Page.captureScreenshot', { clip });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_with_nobs.png', Buffer.from(shot1.data, 'base64'));
  console.log('Saved glacial_with_nobs.png');

  // 2. Remove seekbar diamond knob (::before) + remove volume knob
  await send('Runtime.evaluate', {
    expression: `
      const style = document.createElement('style');
      style.id = 'glacial-clean';
      style.textContent = \`
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
      document.head.appendChild(style);
    `
  });
  await new Promise(r => setTimeout(r, 400));
  const shot2 = await send('Page.captureScreenshot', { clip });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_needle_no_diamond.png', Buffer.from(shot2.data, 'base64'));
  console.log('Saved glacial_needle_no_diamond.png');

  // 3. Remove entire seekbar thumb too (completely nob-less seekbar & volume)
  await send('Runtime.evaluate', {
    expression: `
      const style2 = document.createElement('style');
      style2.id = 'glacial-no-thumbs-at-all';
      style2.textContent = \`
        .preview-player[data-theme="glacial-permafrost"] .group\\\\/slider .media-thumb-smooth,
        :root[data-theme="glacial-permafrost"] .group\\\\/slider .media-thumb-smooth,
        :where(.media-skin)[data-theme="glacial-permafrost"] .group\\\\/slider .media-thumb-smooth {
          display: none !important;
        }
      \`;
      document.head.appendChild(style2);
    `
  });
  await new Promise(r => setTimeout(r, 400));
  const shot3 = await send('Page.captureScreenshot', { clip });
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_completely_nobless.png', Buffer.from(shot3.data, 'base64'));
  console.log('Saved glacial_completely_nobless.png');

  ws.close();
  chromeProc.kill();
}

testGlacial().catch(console.error);
