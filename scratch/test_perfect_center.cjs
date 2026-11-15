const { spawn } = require('child_process');

async function test() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-test-perfect-center';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9482',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=timber'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9482/json/list');
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

    // Test injecting the fix
    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        // Reset volume icon left shift
        const style = document.createElement('style');
        style.id = 'fix-perfect-center';
        style.textContent = \`
          .group\\\\/mute svg {
            position: static !important;
            left: 0 !important;
            transform: none !important;
          }
          .group\\\\/vol-pill > button {
            height: 100% !important;
            width: auto !important;
            aspect-ratio: 1 / 1 !important;
          }
          .group\\\\/play svg {
            transform: none !important;
          }
        \`;
        document.head.appendChild(style);

        const themes = ['translucent', 'water-droplet', 'timber', 'obsidian-gold', 'gamepad-white', 'news-magazine', 'swiss-intl'];
        const results = {};

        themes.forEach(th => {
          document.documentElement.dataset.theme = th;
          document.querySelectorAll('.preview-player').forEach(el => el.setAttribute('data-theme', th));

          const pill = document.querySelector('[class*="group/vol-pill"]');
          const pRect = pill.getBoundingClientRect();
          const pSvg = pill.querySelector('svg');
          const psRect = pSvg.getBoundingClientRect();
          const pDiffX = (psRect.left + psRect.width / 2) - (pRect.left + pRect.width / 2);
          const pDiffY = (psRect.top + psRect.height / 2) - (pRect.top + pRect.height / 2);

          const playBtn = document.querySelector('.media-skin [data-part="bottom-controls-bar"] .group\\\\/play');
          const bRect = playBtn.getBoundingClientRect();
          const svgs = Array.from(playBtn.querySelectorAll('svg')).filter(s => s.getBoundingClientRect().width > 0);
          const sRect = svgs[0].getBoundingClientRect();
          const bDiffX = (sRect.left + sRect.width / 2) - (bRect.left + bRect.width / 2);
          const bDiffY = (sRect.top + sRect.height / 2) - (bRect.top + bRect.height / 2);

          results[th] = {
            volPillDiffX: Number(pDiffX.toFixed(3)),
            volPillDiffY: Number(pDiffY.toFixed(3)),
            playBtnDiffX: Number(bDiffX.toFixed(3)),
            playBtnDiffY: Number(bDiffY.toFixed(3))
          };
        });

        return results;
      })()`,
      returnByValue: true
    });

    console.log('Results with fix:', JSON.stringify(res.result.value, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
test();
