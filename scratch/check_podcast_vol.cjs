const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-podcast-prof';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9468',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=podcast-studio'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9468/json/list');
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

    // First wake up controls
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: 640,
      y: 570
    });

    await new Promise(r => setTimeout(r, 600));

    // Hover over volume pill
    const evalRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const pill = document.querySelector('[class*="group/vol-pill"]');
        if (!pill) return { err: 'no pill' };
        const rect = pill.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      })()`,
      returnByValue: true
    });

    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: evalRes.result.value.x,
      y: evalRes.result.value.y
    });

    await new Promise(r => setTimeout(r, 800));

    const sliderInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const toObj = (r) => r ? ({ x: r.x, y: r.y, width: r.width, height: r.height, left: r.left, right: r.right }) : null;
        const pill = document.querySelector('[class*="group/vol-pill"]');
        return {
          pillRect: toObj(pill ? pill.getBoundingClientRect() : null),
        };
      })()`,
      returnByValue: true
    });

    const r = sliderInfo.result.value.pillRect;
    const shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: {
        x: r.x - 5,
        y: r.y - 5,
        width: r.width + 10,
        height: r.height + 10,
        scale: 2
      }
    });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\podcast_vol_pill.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved podcast_vol_pill.png');

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
main();
