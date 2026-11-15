const { spawn } = require('child_process');

async function test() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-debug-volpill';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9484',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=timber'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9484/json/list');
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

    const debug = await send('Runtime.evaluate', {
      expression: `(() => {
        const pill = document.querySelector('[class*="group/vol-pill"]');
        const muteBtn = pill.querySelector('button');
        const svg = pill.querySelector('svg');

        const pRect = pill.getBoundingClientRect();
        const mRect = muteBtn.getBoundingClientRect();
        const sRect = svg.getBoundingClientRect();

        const pCS = window.getComputedStyle(pill);
        const mCS = window.getComputedStyle(muteBtn);

        return {
          pill: {
            left: pRect.left,
            width: pRect.width,
            borderLeft: pCS.borderLeftWidth,
            borderRight: pCS.borderRightWidth,
            paddingLeft: pCS.paddingLeft,
            paddingRight: pCS.paddingRight,
            boxSizing: pCS.boxSizing
          },
          muteBtn: {
            left: mRect.left,
            width: mRect.width,
            marginLeft: mCS.marginLeft,
            marginRight: mCS.marginRight,
            leftStyle: mCS.left,
            position: mCS.position
          },
          svg: {
            left: sRect.left,
            width: sRect.width,
            center: sRect.left + sRect.width / 2
          },
          pillCenter: pRect.left + pRect.width / 2,
          svgCenter: sRect.left + sRect.width / 2,
          diff: (sRect.left + sRect.width / 2) - (pRect.left + pRect.width / 2)
        };
      })()`,
      returnByValue: true
    });

    console.log('Timber debug:', JSON.stringify(debug.result.value, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
test();
