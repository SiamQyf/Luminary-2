const { spawn } = require('child_process');
const fs = require('fs');

async function test() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-vol-levels';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9489',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=water-droplet'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9489/json/list');
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

    // Get pill position
    const evalPill = await send('Runtime.evaluate', {
      expression: `(() => {
        const pill = document.querySelector('[class*="group/vol-pill"]');
        const rect = pill.getBoundingClientRect();
        return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
      })()`,
      returnByValue: true
    });
    const p = evalPill.result.value;

    // Hover over pill
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: p.left + 15, y: p.top + 15 });
    await new Promise(r => setTimeout(r, 600));

    // Set video.volume = 0.2 and muted = false
    await send('Runtime.evaluate', {
      expression: `(() => {
        const v = document.querySelector('video');
        if (v) {
          v.muted = false;
          v.volume = 0.2;
        }
      })()`,
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

    const shot20 = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: pr.left - 10, y: pr.top - 10, width: pr.width + 20, height: pr.height + 20, scale: 2 }
    });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\vol_20pct_live.png', Buffer.from(shot20.data, 'base64'));

    // Now mute the video
    await send('Runtime.evaluate', {
      expression: `(() => {
        const v = document.querySelector('video');
        if (v) {
          v.muted = true;
        }
      })()`,
    });
    await new Promise(r => setTimeout(r, 400));

    const shotMuted = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: pr.left - 10, y: pr.top - 10, width: pr.width + 20, height: pr.height + 20, scale: 2 }
    });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\vol_muted_live.png', Buffer.from(shotMuted.data, 'base64'));

    // Full player view
    const shotFull = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 200, y: 550, width: 880, height: 80, scale: 2 }
    });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\bottom_bar_live_vol.png', Buffer.from(shotFull.data, 'base64'));

    console.log('Successfully captured vol_20pct_live.png, vol_muted_live.png, and bottom_bar_live_vol.png');
    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
test();
