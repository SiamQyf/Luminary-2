const http = require('http');
const { spawn } = require('child_process');

async function inspect() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9245;
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

  const res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        function r(el) {
          if (!el) return null;
          const b = el.getBoundingClientRect();
          return { x: b.x, y: b.y, width: b.width, height: b.height };
        }
        const sb = document.querySelector('.group\\\\/slider');
        const thumb = document.querySelector('.group\\\\/slider .media-thumb-smooth');
        const volThumb = document.querySelector('.volume-slider-thumb');
        const volPill = document.querySelector('.group\\\\/vol-pill');
        const dock = document.querySelector('[data-part="bottom-controls-bar"]');
        return {
          sb: r(sb),
          thumb: r(thumb),
          thumbDisplay: thumb ? getComputedStyle(thumb).display : null,
          volThumb: r(volThumb),
          volThumbDisplay: volThumb ? getComputedStyle(volThumb).display : null,
          volPill: r(volPill),
          dock: r(dock)
        };
      })()
    `,
    returnByValue: true
  });
  console.log(JSON.stringify(res.result.value, null, 2));

  ws.close();
  chromeProc.kill();
}

inspect().catch(console.error);
