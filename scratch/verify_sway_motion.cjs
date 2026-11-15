const http = require('http');
const { spawn } = require('child_process');

async function testAnimationCycle() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9262;
  
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

  console.log('Sampling background-position over time to verify reversing sway...');

  for (let i = 0; i < 6; i++) {
    const res = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const track = document.querySelector('.isolate');
          if (!track) return 'NO TRACK';
          const style = window.getComputedStyle(track, '::after');
          return {
            animationName: style.animationName,
            animationDuration: style.animationDuration,
            animationTimingFunction: style.animationTimingFunction,
            animationIterationCount: style.animationIterationCount,
            bgPos: style.backgroundPosition
          };
        })()
      `,
      returnByValue: true
    });
    console.log(`Sample ${i} (t = ${i * 3}s):`, res.result.value);
    await new Promise(r => setTimeout(r, 3000));
  }

  ws.close();
  chromeProc.kill();
}

testAnimationCycle().catch(console.error);
