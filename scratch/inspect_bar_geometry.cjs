const http = require('http');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9224;
  
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    'http://localhost:5173/preview.html?theme=monochrome-editorial'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const list = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json/list`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const page = list[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);

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

  const evalRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const bar = document.querySelector('[data-part="bottom-controls-bar"]');
        const player = document.querySelector('.preview-player');
        const mediaSkin = document.querySelector('.media-skin');
        const playBtn = document.querySelector('.group\\\\/play');
        const beforeStyle = window.getComputedStyle(bar, '::before');
        
        return {
          playerRect: player ? player.getBoundingClientRect() : null,
          skinRect: mediaSkin ? mediaSkin.getBoundingClientRect() : null,
          barRect: bar ? bar.getBoundingClientRect() : null,
          playBtnRect: playBtn ? playBtn.getBoundingClientRect() : null,
          before: {
            position: beforeStyle.position,
            top: beforeStyle.top,
            bottom: beforeStyle.bottom,
            left: beforeStyle.left,
            right: beforeStyle.right,
            height: beforeStyle.height,
            width: beforeStyle.width,
            zIndex: beforeStyle.zIndex,
            backgroundColor: beforeStyle.backgroundColor,
            backgroundImage: beforeStyle.backgroundImage
          }
        };
      })()
    `,
    returnByValue: true
  });

  console.log('Inspection:', JSON.stringify(evalRes.result.value, null, 2));

  ws.close();
  chromeProc.kill();
}

main().catch(console.error);
