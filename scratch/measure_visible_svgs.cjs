const { spawn } = require('child_process');

async function test() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-measure-centers2';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9496',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=translucent'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9496/json/list');
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

    const checkVisibleSvgs = await send('Runtime.evaluate', {
      expression: `(() => {
        const buttons = Array.from(document.querySelectorAll('.media-skin [data-part="bottom-controls-bar"] button'));
        return buttons.map(btn => {
          const bRect = btn.getBoundingClientRect();
          const svgs = Array.from(btn.querySelectorAll('svg')).filter(s => s.getBoundingClientRect().width > 0);
          if (svgs.length === 0) return { label: btn.getAttribute('aria-label') || btn.className, visibleSvg: false };
          const svg = svgs[0];
          const sRect = svg.getBoundingClientRect();
          const bCx = bRect.left + bRect.width / 2;
          const bCy = bRect.top + bRect.height / 2;
          const sCx = sRect.left + sRect.width / 2;
          const sCy = sRect.top + sRect.height / 2;
          return {
            label: btn.getAttribute('aria-label') || btn.className.split(' ').slice(0, 3).join(' '),
            bWidth: bRect.width.toFixed(2),
            bHeight: bRect.height.toFixed(2),
            sWidth: sRect.width.toFixed(2),
            sHeight: sRect.height.toFixed(2),
            diffX: (sCx - bCx).toFixed(3),
            diffY: (sCy - bCy).toFixed(3),
            svgClasses: svg.getAttribute('class')
          };
        });
      })()`,
      returnByValue: true
    });

    console.log('Visible SVGs in translucent:', JSON.stringify(checkVisibleSvgs.result.value, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
test();
