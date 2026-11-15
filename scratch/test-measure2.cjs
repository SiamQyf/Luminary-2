const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-live-prof-measure2';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9462',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=synthwave-80s'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9462/json/list', {
      headers: { Host: '127.0.0.1:9462' }
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

    await new Promise(r => setTimeout(r, 1500));

    const evalRes = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          let container = document.querySelector('[data-part="captions-container"]');
          if (!container) {
            container = document.createElement('div');
            container.setAttribute('data-part', 'captions-container');
            container.className = 'absolute inset-x-0 bottom-[90px] flex justify-center pointer-events-none z-30 px-4';
            document.querySelector('.preview-player .media-skin')?.appendChild(container);
          }
          container.innerHTML = '';
          
          const pill = document.createElement('div');
          pill.setAttribute('data-part', 'caption-pill');
          pill.className = 'inline-block max-w-[94%] px-4 py-2 rounded-[var(--media-caption-radius,10px)] backdrop-blur-[12px] text-white text-center font-sans font-medium text-[16px]';
          pill.style.background = 'var(--media-caption-bg, rgba(8, 10, 15, 0.72))';
          pill.style.border = '1.5px solid #f43f5e';
          pill.style.color = '#fdf4ff';

          const span = document.createElement('span');
          span.className = 'inline-flex items-center justify-center gap-1 italic tracking-wide leading-tight';
          span.innerHTML = '<span class="note-left text-[11px] opacity-75 font-normal select-none">♪</span><span class="music-text">Music</span><span class="note-right text-[11px] opacity-75 font-normal select-none">♪</span>';
          pill.appendChild(span);
          container.appendChild(pill);

          const left = span.querySelector('.note-left').getBoundingClientRect();
          const mid = span.querySelector('.music-text').getBoundingClientRect();
          const right = span.querySelector('.note-right').getBoundingClientRect();

          return {
            left: { top: left.top, height: left.height, width: left.width, right: left.right },
            mid: { top: mid.top, height: mid.height, width: mid.width, left: mid.left, right: mid.right },
            right: { top: right.top, height: right.height, width: right.width, left: right.left },
            gapLeft: mid.left - left.right,
            gapRight: right.left - mid.right
          };
        })()
      `
    });

    console.log('Detailed child rects:', JSON.stringify(evalRes.result.value, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

main();
