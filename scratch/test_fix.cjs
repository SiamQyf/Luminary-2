const http = require('http');
const { spawn } = require('child_process');

async function testFix() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9251;
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
        
        if (track) {
          track.style.position = 'absolute';
          track.style.left = '0';
          track.style.right = '0';
          track.style.width = '100%';
        }
        if (fill) {
          fill.style.position = 'absolute';
          fill.style.top = '0';
          fill.style.bottom = '0';
          fill.style.left = '0';
          fill.style.right = '0';
          fill.style.height = '100%';
        }
        
        const rTrack = track.getBoundingClientRect();
        const rFill = fill.getBoundingClientRect();
        return {
          track: { x: rTrack.x, y: rTrack.y, w: rTrack.width, h: rTrack.height },
          fill: { x: rFill.x, y: rFill.y, w: rFill.width, h: rFill.height }
        };
      })()
    `,
    returnByValue: true
  });

  console.log(JSON.stringify(res.result.value, null, 2));

  ws.close();
  chromeProc.kill();
}
testFix().catch(console.error);
