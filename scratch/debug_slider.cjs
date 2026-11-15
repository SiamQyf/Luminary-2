const http = require('http');
const { spawn } = require('child_process');

async function debugSlider() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9250;
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
  await new Promise(r => setTimeout(r, 2000));

  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const video = document.querySelector('video');
        if (video) video.currentTime = 45;
      })()
    `
  });

  await new Promise(r => setTimeout(r, 800));

  const res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const slider = document.querySelector('.group\\\\/slider');
        const track = slider ? slider.querySelector('.isolate') : null;
        const fill = slider ? slider.querySelector('[class*=\"clip-media-x-[--media-slider-fill]\"]') : null;
        const thumb = slider ? slider.querySelector('.media-thumb-smooth') : null;
        
        function getInfo(el, name) {
          if (!el) return { name, exists: false };
          const s = window.getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return {
            name,
            exists: true,
            rect: { x: r.x, y: r.y, w: r.width, h: r.height },
            display: s.display,
            visibility: s.visibility,
            opacity: s.opacity,
            height: s.height,
            width: s.width,
            position: s.position,
            top: s.top,
            left: s.left,
            background: s.background,
            clipPath: s.clipPath,
            zIndex: s.zIndex,
            overflow: s.overflow
          };
        }

        return {
          sliderInfo: getInfo(slider, 'slider'),
          trackInfo: getInfo(track, 'track'),
          fillInfo: getInfo(fill, 'fill'),
          thumbInfo: getInfo(thumb, 'thumb')
        };
      })()
    `,
    returnByValue: true
  });

  console.log(JSON.stringify(res.result.value, null, 2));

  ws.close();
  chromeProc.kill();
}
debugSlider().catch(console.error);
