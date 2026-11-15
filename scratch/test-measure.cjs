const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-live-prof-measure';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9460',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=synthwave-80s'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9460/json/list', {
      headers: { Host: '127.0.0.1:9460' }
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

    // Get measurements of caption pill and its children
    const evalRes = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `
        (() => {
          // Find or create pill
          let container = document.querySelector('[data-part="captions-container"]');
          if (!container) {
            container = document.createElement('div');
            container.setAttribute('data-part', 'captions-container');
            container.className = 'absolute inset-x-0 bottom-[90px] flex justify-center pointer-events-none z-30 px-4';
            document.querySelector('.preview-player .media-skin')?.appendChild(container);
          }
          container.innerHTML = '';
          
          // Original style pill
          const pill = document.createElement('div');
          pill.setAttribute('data-part', 'caption-pill');
          pill.className = 'inline-block max-w-[94%] sm:max-w-[84%] md:max-w-[72%] px-2.5 py-1 sm:px-3.5 sm:py-1.5 md:px-4 md:py-2 rounded-[var(--media-caption-radius,10px)] backdrop-blur-[12px] backdrop-saturate-[160%] backdrop-contrast-[105%] text-white text-center font-sans font-medium text-[11.5px] sm:text-[13px] md:text-[14.5px] lg:text-[16px] tracking-[0.01em] select-none';
          pill.style.background = 'var(--media-caption-bg, rgba(8, 10, 15, 0.72))';
          pill.style.border = 'var(--media-caption-border-width, 1.5px) solid var(--media-caption-border, rgba(255, 255, 255, 0.15))';
          pill.style.boxShadow = 'var(--media-caption-shadow, 0 4px 16px rgba(0, 0, 0, 0.5))';
          pill.style.color = 'var(--media-caption-color, #ffffff)';
          pill.style.fontFamily = 'var(--media-caption-font, inherit)';
          pill.style.textShadow = 'var(--media-caption-text-shadow, 0 1px 2px rgba(0,0,0,0.95))';
          pill.style.filter = 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))';

          const span = document.createElement('span');
          span.className = 'inline-flex items-center justify-center gap-1 italic tracking-wide text-white/95 leading-tight';
          span.innerHTML = '<span class="text-[10px] sm:text-[11px] opacity-75 font-normal select-none">♪</span><span>Music</span><span class="text-[10px] sm:text-[11px] opacity-75 font-normal select-none">♪</span>';
          pill.appendChild(span);
          container.appendChild(pill);

          const pillRect = pill.getBoundingClientRect();
          const spanRect = span.getBoundingClientRect();
          const childrenRects = Array.from(span.children).map(c => c.getBoundingClientRect());

          return {
            pill: { top: pillRect.top, bottom: pillRect.bottom, height: pillRect.height, left: pillRect.left, right: pillRect.right, width: pillRect.width },
            span: { top: spanRect.top, bottom: spanRect.bottom, height: spanRect.height, left: spanRect.left, right: spanRect.right, width: spanRect.width },
            topPad: spanRect.top - pillRect.top,
            botPad: pillRect.bottom - spanRect.bottom,
            leftPad: spanRect.left - pillRect.left,
            rightPad: pillRect.right - spanRect.right,
            children: childrenRects
          };
        })()
      `
    });

    console.log('Original measurement:', JSON.stringify(evalRes.result.value, null, 2));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\original_music_pill.png', Buffer.from(shot.data, 'base64'));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

main();
