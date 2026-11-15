const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-podcast-prof';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9467',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=podcast-studio'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9467/json/list');
    const list = await listRes.json();
    const tab = list.find(t => t.type === 'page');
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

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

    await send('Runtime.enable');
    await send('Page.enable');
    await send('DOM.enable');

    await new Promise(r => setTimeout(r, 2000));

    // Move mouse over player to reveal controls and title
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: 640,
      y: 570
    });

    await new Promise(r => setTimeout(r, 800));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const buffer = Buffer.from(shot.data, 'base64');
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\podcast_preview.png', buffer);
    console.log('Saved podcast_preview.png');

    // Click settings button to capture menu
    await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('button[aria-label="Settings"], button[title="Settings"], [data-part="settings-button"]');
        if (btn) btn.click();
        else {
          const allBtns = Array.from(document.querySelectorAll('button'));
          const s = allBtns.find(b => b.innerHTML.includes('svg') && b.innerHTML.includes('path') && b.getAttribute('aria-haspopup') === 'menu');
          if (s) s.click();
        }
      })()`
    });

    await new Promise(r => setTimeout(r, 800));

    const shotSettings = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\podcast_settings.png', Buffer.from(shotSettings.data, 'base64'));
    console.log('Saved podcast_settings.png');

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
main();
