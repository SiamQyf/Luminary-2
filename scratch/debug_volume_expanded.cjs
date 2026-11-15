const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-vol-debug';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9477',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=water-droplet'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9477/json/list');
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

    // Wake up controls
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 640, y: 570 });
    await new Promise(r => setTimeout(r, 500));

    // Get mute button position
    const evalPill = await send('Runtime.evaluate', {
      expression: `(() => {
        const pill = document.querySelector('[class*="group/vol-pill"]');
        const muteBtn = pill ? pill.querySelector('button') : null;
        const rect = pill.getBoundingClientRect();
        return {
          pill: { left: rect.left, top: rect.top, width: rect.width, height: rect.height },
          muteBtn: muteBtn ? muteBtn.getBoundingClientRect() : null
        };
      })()`,
      returnByValue: true
    });
    console.log('Pill & MuteBtn (collapsed):', JSON.stringify(evalPill.result.value, null, 2));

    // Hover over pill to expand it
    const p = evalPill.result.value.pill;
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: p.left + 15,
      y: p.top + 15
    });
    await new Promise(r => setTimeout(r, 600));

    // Inspect expanded state while UNMUTED
    const unmutedInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const toObj = (r) => r ? ({ left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height }) : null;
        const pill = document.querySelector('[class*="group/vol-pill"]');
        const muteBtn = pill ? pill.querySelector('button') : null;
        const svg = muteBtn ? muteBtn.querySelector('svg') : null;
        const horn = svg ? svg.querySelector('g:first-of-type') : null;
        const wave = svg ? svg.querySelector('g:nth-of-type(2)') : null;
        const xMark = svg ? svg.querySelector('g:nth-of-type(3)') : null;
        const slider = document.querySelector('.horizontal-volume-slider');
        const track = slider ? slider.querySelector('[class*="bg-white/20"]') : null;
        const thumb = slider ? slider.querySelector('.volume-slider-thumb') : null;
        return {
          pill: toObj(pill ? pill.getBoundingClientRect() : null),
          muteBtn: toObj(muteBtn ? muteBtn.getBoundingClientRect() : null),
          svg: toObj(svg ? svg.getBoundingClientRect() : null),
          horn: toObj(horn ? horn.getBoundingClientRect() : null),
          wave: toObj(wave ? wave.getBoundingClientRect() : null),
          xMark: toObj(xMark ? xMark.getBoundingClientRect() : null),
          slider: toObj(slider ? slider.getBoundingClientRect() : null),
          track: toObj(track ? track.getBoundingClientRect() : null),
          thumb: toObj(thumb ? thumb.getBoundingClientRect() : null),
        };
      })()`,
      returnByValue: true
    });
    console.log('Unmuted Expanded Info:', JSON.stringify(unmutedInfo.result.value, null, 2));

    // Screenshot unmuted expanded
    let r = unmutedInfo.result.value.pill;
    let shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: r.left - 10, y: r.top - 10, width: r.width + 20, height: r.height + 20, scale: 2 }
    });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\current_unmuted_expanded.png', Buffer.from(shot.data, 'base64'));

    // Now click mute button to mute
    await send('Input.dispatchMouseEvent', {
      type: 'mousePressed',
      button: 'left',
      clickCount: 1,
      x: p.left + 15,
      y: p.top + 15
    });
    await send('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      button: 'left',
      clickCount: 1,
      x: p.left + 15,
      y: p.top + 15
    });
    await new Promise(r => setTimeout(r, 600));

    // Inspect muted expanded
    const mutedInfo = await send('Runtime.evaluate', {
      expression: `(() => {
        const toObj = (r) => r ? ({ left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height }) : null;
        const pill = document.querySelector('[class*="group/vol-pill"]');
        const muteBtn = pill ? pill.querySelector('button') : null;
        const svg = muteBtn ? muteBtn.querySelector('svg') : null;
        const slider = document.querySelector('.horizontal-volume-slider');
        const track = slider ? slider.querySelector('[class*="bg-white/20"]') : null;
        const thumb = slider ? slider.querySelector('.volume-slider-thumb') : null;
        return {
          pill: toObj(pill ? pill.getBoundingClientRect() : null),
          muteBtn: toObj(muteBtn ? muteBtn.getBoundingClientRect() : null),
          svg: toObj(svg ? svg.getBoundingClientRect() : null),
          slider: toObj(slider ? slider.getBoundingClientRect() : null),
          track: toObj(track ? track.getBoundingClientRect() : null),
          thumb: toObj(thumb ? thumb.getBoundingClientRect() : null),
        };
      })()`,
      returnByValue: true
    });
    console.log('Muted Expanded Info:', JSON.stringify(mutedInfo.result.value, null, 2));

    r = mutedInfo.result.value.pill;
    shot = await send('Page.captureScreenshot', {
      format: 'png',
      clip: { x: r.left - 10, y: r.top - 10, width: r.width + 20, height: r.height + 20, scale: 2 }
    });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\current_muted_expanded.png', Buffer.from(shot.data, 'base64'));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
main();
