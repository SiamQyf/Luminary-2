const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-live-prof-variants';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9470',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,1000',
    'http://localhost:5173/preview.html?theme=synthwave-80s'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9470/json/list', {
      headers: { Host: '127.0.0.1:9470' }
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

    // Test page with side-by-side comparison
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          let testContainer = document.getElementById('test-variants');
          if (!testContainer) {
            testContainer = document.createElement('div');
            testContainer.id = 'test-variants';
            testContainer.style.cssText = 'position:fixed; top:80px; left:50%; transform:translateX(-50%); z-index:99999; display:flex; flex-direction:column; gap:20px; align-items:center; background:rgba(10,5,20,0.95); padding:30px; border-radius:16px; border:1px solid #f43f5e; box-shadow:0 0 30px rgba(0,0,0,0.9);';
            document.body.appendChild(testContainer);
          }

          // Single Eighth Note SVG (classic music note)
          const singleNoteSvg = \`
            <svg viewBox="0 0 24 24" fill="currentColor" class="size-[1.1em] shrink-0" aria-hidden="true" style="display:inline-block; vertical-align:middle;">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          \`;

          // Beamed Double Note SVG (beamed eighth notes)
          const beamedNoteSvg = \`
            <svg viewBox="0 0 24 24" fill="currentColor" class="size-[1.1em] shrink-0" aria-hidden="true" style="display:inline-block; vertical-align:middle;">
              <path d="M19.5 3.5h-9a1.5 1.5 0 0 0-1.5 1.5V14.2c-.6-.35-1.3-.55-2-.55-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4V7.5h8.5V14.2c-.6-.35-1.3-.55-2-.55-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4V5a1.5 1.5 0 0 0-1.5-1.5z" />
            </svg>
          \`;

          const pillBaseStyle = 'display:inline-flex; align-items:center; justify-content:center; padding:8px 18px; border-radius:8px; background:linear-gradient(135deg, rgba(20, 10, 35, 0.92) 0%, rgba(10, 5, 20, 0.96) 100%); border:1.5px solid #f43f5e; box-shadow:0 0 18px rgba(244, 63, 94, 0.45); color:#fdf4ff; font-family:sans-serif; font-size:15px; font-weight:600; line-height:1; user-select:none;';

          testContainer.innerHTML = \`
            <div style="color:#aaa; font-size:12px; font-family:monospace; margin-bottom:5px;">V1: Perfectly Centered with Single Note SVG</div>
            <div style="\${pillBaseStyle}">
              <span style="display:inline-flex; align-items:center; justify-content:center; gap:8px;">
                <span style="display:inline-flex; align-items:center; justify-content:center; opacity:0.85; transform:translateY(0.5px);">\${singleNoteSvg}</span>
                <span style="font-style:italic; letter-spacing:0.04em; padding-right:1px;">Music</span>
                <span style="display:inline-flex; align-items:center; justify-content:center; opacity:0.85; transform:translateY(0.5px);">\${singleNoteSvg}</span>
              </span>
            </div>

            <div style="color:#aaa; font-size:12px; font-family:monospace; margin-bottom:5px;">V2: Perfectly Centered with Beamed Note SVG</div>
            <div style="\${pillBaseStyle}">
              <span style="display:inline-flex; align-items:center; justify-content:center; gap:8px;">
                <span style="display:inline-flex; align-items:center; justify-content:center; opacity:0.85;">\${beamedNoteSvg}</span>
                <span style="font-style:italic; letter-spacing:0.04em; padding-right:1px;">Music</span>
                <span style="display:inline-flex; align-items:center; justify-content:center; opacity:0.85;">\${beamedNoteSvg}</span>
              </span>
            </div>

            <div style="color:#aaa; font-size:12px; font-family:monospace; margin-bottom:5px;">V3: Perfectly Centered with Standard Glyph ♪ (Fixed baseline offset & flex centering)</div>
            <div style="\${pillBaseStyle}">
              <span style="display:inline-flex; align-items:center; justify-content:center; gap:8px; line-height:1;">
                <span style="display:inline-flex; align-items:center; justify-content:center; font-style:normal; font-size:13px; opacity:0.85; transform:translateY(-1px);">♪</span>
                <span style="font-style:italic; letter-spacing:0.04em; padding-right:2px; line-height:1;">Music</span>
                <span style="display:inline-flex; align-items:center; justify-content:center; font-style:normal; font-size:13px; opacity:0.85; transform:translateY(-1px);">♪</span>
              </span>
            </div>
          \`;
        })()
      `
    });

    await new Promise(r => setTimeout(r, 600));

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\variants_comparison.png', Buffer.from(shot.data, 'base64'));
    console.log('Saved variants_comparison.png');

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

main();
