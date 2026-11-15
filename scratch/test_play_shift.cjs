const { spawn } = require('child_process');

async function test() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-test-play-center';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9478',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=translucent'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9478/json/list');
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

    // Pause video so play triangle is visible
    await send('Runtime.evaluate', {
      expression: `(() => {
        const v = document.querySelector('video');
        if (v) v.pause();
      })()`
    });
    await new Promise(r => setTimeout(r, 400));

    const check = await send('Runtime.evaluate', {
      expression: `(() => {
        const btn = document.querySelector('.media-skin [data-part="bottom-controls-bar"] .group\\\\/play');
        const bRect = btn.getBoundingClientRect();
        const svgs = Array.from(btn.querySelectorAll('svg')).filter(s => s.getBoundingClientRect().width > 0);
        if (!svgs.length) return { error: 'no visible svg' };
        const svg = svgs[0];
        const sRectBefore = svg.getBoundingClientRect();

        const bCx = bRect.left + bRect.width / 2;
        const bCy = bRect.top + bRect.height / 2;

        svg.style.setProperty('transform', 'none', 'important');
        const sRectAfter = svg.getBoundingClientRect();

        return {
          svgName: svg.innerHTML.substring(0, 30),
          withTranslate: {
            diffX: (sRectBefore.left + sRectBefore.width / 2) - bCx,
            diffY: (sRectBefore.top + sRectBefore.height / 2) - bCy
          },
          withoutTranslate: {
            diffX: (sRectAfter.left + sRectAfter.width / 2) - bCx,
            diffY: (sRectAfter.top + sRectAfter.height / 2) - bCy
          }
        };
      })()`,
      returnByValue: true
    });

    console.log('Play triangle centering comparison:', JSON.stringify(check.result.value, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
test();
