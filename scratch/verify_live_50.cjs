const http = require('http');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9230;
  
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    'http://localhost:5173/preview.html'
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

  const countRes = await send('Runtime.evaluate', {
    expression: `
      (() => {
        // Find style dropdown options in the shell
        const select = document.querySelector('select');
        return {
          title: document.title,
          hasPlayer: !!document.querySelector('.preview-player'),
          activeTheme: document.querySelector('.preview-player')?.getAttribute('data-theme')
        };
      })()
    `,
    returnByValue: true
  });

  console.log('Live Verification:', JSON.stringify(countRes.result.value, null, 2));

  ws.close();
  chromeProc.kill();
}

main().catch(console.error);
