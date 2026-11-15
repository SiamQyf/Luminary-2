const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function checkPen() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const port = 9255;
  
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    'https://codepen.io/Enrichr-Dev/pen/GgWPBVP'
  ]);

  await new Promise(r => setTimeout(r, 3000));

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
  await new Promise(r => setTimeout(r, 3000));

  const res = await send('Runtime.evaluate', {
    expression: '(() => { return { title: document.title, url: window.location.href, bodyText: document.body.innerText.slice(0, 1000) }; })()',
    returnByValue: true
  });
  console.log('Result:', JSON.stringify(res, null, 2));

  // Screenshot the pen
  const shot = await send('Page.captureScreenshot', {});
  fs.writeFileSync('C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/codepen_page.png', Buffer.from(shot.data, 'base64'));
  console.log('Saved codepen_page.png');

  chromeProc.kill();
  process.exit(0);
}

checkPen().catch(e => {
  console.error(e);
  process.exit(1);
});
