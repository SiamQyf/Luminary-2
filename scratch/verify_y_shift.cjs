const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-live-prof-yshift';

  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9488',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html'
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9488/json/list', {
      headers: { Host: '127.0.0.1:9488' }
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
    await new Promise((r) => setTimeout(r, 1500));

    const evalRes = await send('Runtime.evaluate', {
      expression: `
        (() => {
          let container = document.querySelector('[data-part="captions-container"]');
          if (!container) {
            container = document.createElement('div');
            container.setAttribute('data-part', 'captions-container');
            container.className = 'absolute inset-x-0 bottom-[90px] flex justify-center pointer-events-none z-30 px-4';
            document.querySelector('.preview-player .media-skin')?.appendChild(container);
          }
          container.innerHTML = \`
            <div data-part="caption-pill" class="inline-flex items-center justify-center px-4 py-2 rounded-[10px] text-current font-medium text-[15px]">
              <span data-part="caption-text" class="inline-flex flex-col items-center justify-center -translate-y-[0.25px]">
                <span>Sample text</span>
              </span>
            </div>
          \`;

          const textEl = container.querySelector('[data-part=\"caption-text\"]');
          const comp = window.getComputedStyle(textEl);
          return {
            transform: comp.transform
          };
        })()
      `,
      returnByValue: true
    });

    console.log('Computed transform on caption-text:', evalRes.result.value);

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    proc.kill();
  }
}

main();
