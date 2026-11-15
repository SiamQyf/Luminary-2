const { spawn } = require('child_process');
const fs = require('fs');

async function test() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-check-themes';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9495',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=translucent'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9495/json/list');
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

    // Wake up controls
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 640, y: 570 });
    await new Promise(r => setTimeout(r, 500));

    const themes = ['translucent', 'water-droplet', 'obsidian-gold', 'cyber-neon'];
    for (const th of themes) {
      await send('Runtime.evaluate', {
        expression: `(() => {
          document.documentElement.dataset.theme = '${th}';
          document.querySelectorAll('.preview-player').forEach(el => el.setAttribute('data-theme', '${th}'));
        })()`
      });
      await new Promise(r => setTimeout(r, 400));

      const pillInfo = await send('Runtime.evaluate', {
        expression: `(() => {
          const pill = document.querySelector('[class*="group/vol-pill"]');
          const r = pill.getBoundingClientRect();
          return { left: r.left, top: r.top, width: r.width, height: r.height };
        })()`,
        returnByValue: true
      });
      const pr = pillInfo.result.value;

      const shot = await send('Page.captureScreenshot', {
        format: 'png',
        clip: { x: pr.left - 5, y: pr.top - 5, width: pr.width + 10, height: pr.height + 10, scale: 2 }
      });
      fs.writeFileSync(`C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\theme_${th}_vol.png`, Buffer.from(shot.data, 'base64'));
    }

    console.log('Screenshots captured!');
    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
test();
