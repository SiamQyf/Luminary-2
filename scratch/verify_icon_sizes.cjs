const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-live-prof-iconsize2';

  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9499',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html'
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9499/json/list', {
      headers: { Host: '127.0.0.1:9499' }
    });
    const list = await listRes.json();
    const tab = list.find((t) => t.type === 'page');
    if (!tab) {
      console.log('No page tab found');
      return;
    }

    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

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

    await send('Page.enable');
    await send('Runtime.enable');
    await new Promise((r) => setTimeout(r, 2000));

    const evalRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          // Volume horn SVG
          const volSvg = document.querySelector('.player-icon-scale svg');
          // Captions SVG
          const capSvg = document.querySelector('button[aria-label*="Caption"] svg, button[aria-label*="caption"] svg');
          // Cast SVG
          const castSvg = document.querySelector('button[aria-label*="Cast"] svg, button[aria-label*="cast"] svg');

          const getInfo = (el) => {
            if (!el) return null;
            const r = el.getBoundingClientRect();
            const cs = window.getComputedStyle(el);
            return {
              className: el.getAttribute('class'),
              computedWidth: cs.width,
              computedHeight: cs.height,
              rectWidth: r.width,
              rectHeight: r.height
            };
          };

          return {
            volume: getInfo(volSvg),
            captions: getInfo(capSvg),
            cast: getInfo(castSvg)
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Measured icon sizes:', JSON.stringify(evalRes.result.value, null, 2));

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    proc.kill();
  }
}

main();
