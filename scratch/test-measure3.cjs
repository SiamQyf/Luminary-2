const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-live-prof-measure3';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9465',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=synthwave-80s'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9465/json/list', {
      headers: { Host: '127.0.0.1:9465' }
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
          
          // Enhanced pill with inline-flex items-center justify-center
          const pill = document.createElement('div');
          pill.setAttribute('data-part', 'caption-pill');
          pill.className = 'inline-flex items-center justify-center max-w-[94%] sm:max-w-[84%] md:max-w-[72%] px-3.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2 rounded-[var(--media-caption-radius,10px)] backdrop-blur-[12px] text-white text-center font-sans font-medium text-[11.5px] sm:text-[13px] md:text-[14.5px] lg:text-[15px] select-none leading-none';
          pill.style.background = 'var(--media-caption-bg, rgba(8, 10, 15, 0.72))';
          pill.style.border = '1.5px solid #f43f5e';
          pill.style.boxShadow = '0 0 18px rgba(244, 63, 94, 0.45), inset 0 0 10px rgba(168, 85, 247, 0.25)';
          pill.style.color = '#fdf4ff';
          pill.style.textShadow = '0 0 8px rgba(244, 63, 94, 0.9), 0 0 16px rgba(168, 85, 247, 0.5)';

          // SVG music note icon: perfectly drawn & centered
          const noteSvg = \`
            <svg viewBox="0 0 16 16" fill="currentColor" class="size-[0.9em] shrink-0 opacity-80" aria-hidden="true" style="display:inline-block; vertical-align:middle;">
              <path d="M11.5 2.5a.75.75 0 0 0-.96.72v6.4a2.25 2.25 0 1 0 1.5 2.13V5.55l3-.8v3.87a2.25 2.25 0 1 0 1.5 2.13V2.5a.75.75 0 0 0-.54-.72l-4.5-1.2z" transform="scale(0.65) translate(0, 2)" />
            </svg>
          \`;

          const span = document.createElement('span');
          span.className = 'inline-flex items-center justify-center gap-1.5 italic tracking-wide text-white/95 leading-none';
          span.innerHTML = \`
            <span class="inline-flex items-center justify-center leading-none select-none text-[0.9em] opacity-80">♪</span>
            <span class="inline-block leading-none py-0.5">Music</span>
            <span class="inline-flex items-center justify-center leading-none select-none text-[0.9em] opacity-80">♪</span>
          \`;
          pill.appendChild(span);
          container.appendChild(pill);

          const pillRect = pill.getBoundingClientRect();
          const spanRect = span.getBoundingClientRect();

          return {
            pill: { top: pillRect.top, bottom: pillRect.bottom, height: pillRect.height, left: pillRect.left, right: pillRect.right, width: pillRect.width },
            span: { top: spanRect.top, bottom: spanRect.bottom, height: spanRect.height, left: spanRect.left, right: spanRect.right, width: spanRect.width },
            topPad: spanRect.top - pillRect.top,
            botPad: pillRect.bottom - spanRect.bottom,
            leftPad: spanRect.left - pillRect.left,
            rightPad: pillRect.right - spanRect.right,
          };
        })()
      `
    });

    console.log('Centered measurement:', JSON.stringify(evalRes.result.value, null, 2));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\centered_music_pill.png', Buffer.from(shot.data, 'base64'));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

main();
