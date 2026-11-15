const { spawn } = require('child_process');

async function test() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-measure-centers';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9494',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=translucent'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9494/json/list');
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

    const themes = ['translucent', 'water-droplet', 'gamepad-white', 'news-magazine', 'podcast-studio', 'swiss-intl'];
    const report = {};

    for (const th of themes) {
      await send('Runtime.evaluate', {
        expression: `(() => {
          document.documentElement.dataset.theme = '${th}';
          document.querySelectorAll('.preview-player').forEach(el => el.setAttribute('data-theme', '${th}'));
        })()`
      });
      await new Promise(r => setTimeout(r, 300));

      const measurement = await send('Runtime.evaluate', {
        expression: `(() => {
          const buttons = Array.from(document.querySelectorAll('.media-skin [data-part="bottom-controls-bar"] button, .media-skin [data-part="bottom-controls-bar"] [class*="group/vol-pill"]'));
          return buttons.map(btn => {
            const bRect = btn.getBoundingClientRect();
            const svg = btn.querySelector('svg');
            if (!svg) return { name: btn.getAttribute('aria-label') || btn.className, hasSvg: false };
            const sRect = svg.getBoundingClientRect();
            const bCx = bRect.left + bRect.width / 2;
            const bCy = bRect.top + bRect.height / 2;
            const sCx = sRect.left + sRect.width / 2;
            const sCy = sRect.top + sRect.height / 2;
            return {
              label: btn.getAttribute('aria-label') || btn.className.split(' ').slice(0, 2).join(' '),
              btnWidth: bRect.width,
              btnHeight: bRect.height,
              svgWidth: sRect.width,
              svgHeight: sRect.height,
              diffX: sCx - bCx,
              diffY: sCy - bCy
            };
          });
        })()`,
        returnByValue: true
      });
      report[th] = measurement.result.value;
    }

    console.log('Report:', JSON.stringify(report, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
test();
