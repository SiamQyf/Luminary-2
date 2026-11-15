const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-live-prof-fix';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9480',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=synthwave-80s'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9480/json/list', {
      headers: { Host: '127.0.0.1:9480' }
    });
    const list = await listRes.json();
    const tab = list.find(t => t.type === 'page');
    if (!tab) return;

    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        const handler = (evt) => {
          const data = JSON.parse(evt.data);
          if (data.id === msgId) {
            ws.removeEventListener('message', handler);
            resolve(data.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Page.enable');
    await send('Runtime.enable');

    await new Promise(r => setTimeout(r, 2500));

    // Wait for video and captions to mount, or seek to 0s where [Music] is in mad-max
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const v = document.querySelector('video');
          if (v) {
            v.currentTime = 1.0;
            v.play().catch(() => {});
          }
        })()
      `
    });

    await new Promise(r => setTimeout(r, 1200));

    // Capture Screenshot of live player with caption
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\live_centered_captions.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved live_centered_captions.png');

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

main();
