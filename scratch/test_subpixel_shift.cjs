const { spawn } = require('child_process');

async function test() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-test-shift';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9499',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=translucent'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9499/json/list');
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

    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 640, y: 570 });
    await new Promise(r => setTimeout(r, 600));

    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        try {
          const svg = document.querySelector('.group\\\\/mute svg');
          if (!svg) return { error: 'svg not found' };
          const r1 = svg.getBoundingClientRect();
          
          const style = document.createElement('style');
          style.id = 'test-opt-shift';
          style.textContent = \`
            .preview-player:not([data-theme="water-droplet"]) .group\\\\/mute svg,
            :root:not([data-theme="water-droplet"]) .group\\\\/mute svg,
            :where(.media-skin):not([data-theme="water-droplet"]) .group\\\\/mute svg {
              position: relative;
              left: -0.25px !important;
            }
            .preview-player[data-theme="water-droplet"] .group\\\\/mute svg,
            :root[data-theme="water-droplet"] .group\\\\/mute svg,
            :where(.media-skin)[data-theme="water-droplet"] .group\\\\/mute svg {
              position: relative;
              left: 0px !important;
            }
          \`;
          document.head.appendChild(style);

          const r2 = svg.getBoundingClientRect();

          document.documentElement.dataset.theme = 'water-droplet';
          document.querySelectorAll('.preview-player').forEach(el => el.setAttribute('data-theme', 'water-droplet'));

          const rWater = svg.getBoundingClientRect();

          return {
            translucent_before: r1.left,
            translucent_after: r2.left,
            diff_translucent: r2.left - r1.left,
            water_droplet: rWater.left,
            diff_water: rWater.left - r1.left
          };
        } catch (e) {
          return { error: e.message };
        }
      })()`,
      returnByValue: true
    });
    console.log('Eval result:', JSON.stringify(res, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
test();
