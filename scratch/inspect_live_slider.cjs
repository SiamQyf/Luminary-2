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

  
  const res = await send('Runtime.evaluate', {
    expression: (() => {
      const slider = document.querySelector('.group\\/slider');
      if (!slider) return 'No slider found';
      return JSON.stringify({
        sliderClass: slider.className,
        children: Array.from(slider.querySelectorAll('*')).map(el => ({
          tag: el.tagName,
          classes: el.className,
          part: el.getAttribute('data-part')
        }))
      }, null, 2);
    }).toString() + '()'
  });
  console.log(res && res.result ? res.result.value : res);
ws.close();
  chromeProc.kill();
}

snap().catch(console.error);
