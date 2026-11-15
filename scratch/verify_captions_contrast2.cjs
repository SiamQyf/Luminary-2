const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-live-prof-contrast2';

  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9477',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html'
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9477/json/list', {
      headers: { Host: '127.0.0.1:9477' }
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

    const themesToTest = [
      'gamepad-white',
      'news-magazine',
      'clay-pastel',
      'swiss-intl',
      'polaroid-film',
      'porcelain-cobalt',
      'crystal',
      'water-droplet',
      'holo-prism',
      'frutiger-aero',
      'synthwave-80s'
    ];

    const results = [];

    for (const theme of themesToTest) {
      const evalRes = await send('Runtime.evaluate', {
        expression: `
          (() => {
            const player = document.querySelector('.preview-player');
            if (player) {
              player.setAttribute('data-theme', '${theme}');
            }
            document.documentElement.setAttribute('data-theme', '${theme}');

            let container = document.querySelector('[data-part="captions-container"]');
            if (!container) {
              container = document.createElement('div');
              container.setAttribute('data-part', 'captions-container');
              container.className = 'absolute inset-x-0 bottom-[90px] flex justify-center pointer-events-none z-30 px-4';
              document.querySelector('.preview-player .media-skin')?.appendChild(container);
            }

            container.innerHTML = \`
              <div data-part="caption-pill" class="inline-flex items-center justify-center px-4 py-2 rounded-[10px] text-current font-medium text-[15px]">
                <span data-part="caption-text" style="transform: translateY(-0.5px)">
                  <span id="test-dialogue">Dialogue subtitle text</span>
                  <span id="test-sfx" class="inline-flex items-center justify-center italic tracking-wide opacity-90 leading-none">[Applause]</span>
                  <span id="test-music" class="inline-flex items-center justify-center gap-1.5 leading-none">
                    <svg id="test-svg" viewBox="0 0 24 24" fill="currentColor" class="size-[0.95em] shrink-0 opacity-80"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
                    <span id="test-music-text" class="italic tracking-wide leading-none pe-0.5">Music</span>
                  </span>
                </span>
              </div>
            \`;

            const pill = container.querySelector('[data-part=\"caption-pill\"]');
            const dialogueSpan = document.getElementById('test-dialogue');
            const sfxSpan = document.getElementById('test-sfx');
            const musicText = document.getElementById('test-music-text');
            const musicSvg = document.getElementById('test-svg');

            const pillStyle = window.getComputedStyle(pill);

            return {
              theme: '${theme}',
              pillBg: pillStyle.backgroundColor,
              pillBgImage: pillStyle.backgroundImage.slice(0, 60),
              pillColor: pillStyle.color,
              dialogueColor: window.getComputedStyle(dialogueSpan).color,
              sfxColor: window.getComputedStyle(sfxSpan).color,
              musicTextColor: window.getComputedStyle(musicText).color,
              musicSvgFill: window.getComputedStyle(musicSvg).fill
            };
          })()
        `,
        returnByValue: true
      });

      results.push(evalRes.result.value);
    }

    console.log(JSON.stringify(results, null, 2));

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    proc.kill();
  }
}

main();
