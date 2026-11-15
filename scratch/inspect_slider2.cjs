const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-slider-prof';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9471',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=podcast-studio'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9471/json/list');
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
            resolve(data);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await send('Runtime.enable');
    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const track = document.querySelector('div[class*="media-slider-smooth"]');
        return {
          trackHtml: track ? track.outerHTML : null,
          trackParent: track ? track.parentElement.outerHTML.slice(0, 400) : null
        };
      })()`,
      returnByValue: true
    });
    console.log(JSON.stringify(res.result.result.value, null, 2));
    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
main();
