const { spawn } = require('child_process');
const fs = require('fs');

async function test() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-vol-shift';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9487',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=water-droplet'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9487/json/list');
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

    // Get pill
    const evalPill = await send('Runtime.evaluate', {
      expression: `(() => {
        const pill = document.querySelector('[class*="group/vol-pill"]');
        const rect = pill.getBoundingClientRect();
        return { left: rect.left, top: rect.top };
      })()`,
      returnByValue: true
    });
    const p = evalPill.result.value;

    // Hover over pill
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: p.left + 15, y: p.top + 15 });
    await new Promise(r => setTimeout(r, 600));

    // Test 1: left: -2px
    await send('Runtime.evaluate', {
      expression: `(() => {
        const s = document.querySelector('.horizontal-volume-slider');
        s.style.setProperty('left', '-2px', 'important');
      })()`,
    });
    await new Promise(r => setTimeout(r, 300));

    const withLeftMinus2 = await send('Runtime.evaluate', {
      expression: `(() => {
        const toObj = (r) => r ? ({ left: r.left, right: r.right, width: r.width }) : null;
        const s = document.querySelector('.horizontal-volume-slider');
        const t = s ? s.querySelector('[class*="bg-white/20"]') : null;
        const th = s ? s.querySelector('.volume-slider-thumb') : null;
        const pill = document.querySelector('[class*="group/vol-pill"]');
        const svg = pill ? pill.querySelector('svg') : null;
        return {
          pill: toObj(pill.getBoundingClientRect()),
          svg: toObj(svg.getBoundingClientRect()),
          slider: toObj(s.getBoundingClientRect()),
          track: toObj(t.getBoundingClientRect()),
          thumb: toObj(th.getBoundingClientRect()),
        };
      })()`,
      returnByValue: true
    });
    console.log('With left: -2px !important:', JSON.stringify(withLeftMinus2.result.value, null, 2));

    // Also check when video is muted (thumb at 0%)
    await send('Runtime.evaluate', {
      expression: `(() => {
        const v = document.querySelector('video');
        if (v) v.muted = true;
      })()`,
    });
    await new Promise(r => setTimeout(r, 300));

    const mutedInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const toObj = (r) => r ? ({ left: r.left, right: r.right, width: r.width }) : null;
        const s = document.querySelector('.horizontal-volume-slider');
        const t = s ? s.querySelector('[class*="bg-white/20"]') : null;
        const th = s ? s.querySelector('.volume-slider-thumb') : null;
        const pill = document.querySelector('[class*="group/vol-pill"]');
        const svg = pill ? pill.querySelector('svg') : null;
        return {
          svg: toObj(svg.getBoundingClientRect()),
          slider: toObj(s.getBoundingClientRect()),
          track: toObj(t.getBoundingClientRect()),
          thumb: toObj(th.getBoundingClientRect()),
        };
      })()`,
      returnByValue: true
    });
    console.log('Muted (thumb at 0%) with left: -2px !important:', JSON.stringify(mutedInfo.result.value, null, 2));

    const pillRect = await send('Runtime.evaluate', {
      expression: `(() => {
        const pill = document.querySelector('[class*="group/vol-pill"]');
        const r = pill.getBoundingClientRect();
        return { left: r.left, top: r.top, width: r.width, height: r.height };
      })()`,
      returnByValue: true
    });
    const pr = pillRect.result.value;

    const shotMuted = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: pr.left - 10, y: pr.top - 10, width: pr.width + 20, height: pr.height + 20, scale: 2 }
    });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\test_left_minus_2_muted.png', Buffer.from(shotMuted.data, 'base64'));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
test();
