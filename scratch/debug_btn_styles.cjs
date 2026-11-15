const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-live-prof-debug';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9499',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=synthwave-80s'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9499/json/list', {
      headers: { Host: '127.0.0.1:9499' }
    });
    const list = await listRes.json();
    const tab = list.find(t => t.type === 'page');
    if (!tab) return;

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

    await new Promise(r => setTimeout(r, 2000));

    const debugInfo = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          const btn = document.querySelector('button[aria-label*="Play"], .bottom-play-portrait-simple button');
          if (!btn) return 'Play button not found';
          const cs = window.getComputedStyle(btn);
          return {
            classes: btn.className,
            background: cs.background,
            backgroundColor: cs.backgroundColor,
            backgroundImage: cs.backgroundImage,
            border: cs.border,
            boxShadow: cs.boxShadow,
            parentTheme: document.querySelector('.preview-player')?.getAttribute('data-theme')
          };
        })()
      `
    });

    console.log('Button computed styles:', JSON.stringify(debugInfo.result.value, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

main();
