const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-live-prof-synth-variants';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9490',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=synthwave-80s'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9490/json/list', {
      headers: { Host: '127.0.0.1:9490' }
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

    // Move mouse over player to reveal controls
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: 640,
      y: 750
    });
    await new Promise(r => setTimeout(r, 600));

    // Function to apply CSS and take screenshot
    const applyAndCapture = async (name, cssRules) => {
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            let el = document.getElementById('synth-test-style');
            if (!el) {
              el = document.createElement('style');
              el.id = 'synth-test-style';
              document.head.appendChild(el);
            }
            el.innerHTML = \`${cssRules}\`;
          })()
        `
      });
      await new Promise(r => setTimeout(r, 500));
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\synth_${name}.png`, Buffer.from(shot.data, 'base64'));
      console.log(`Saved synth_${name}.png`);
    };

    // Style 1: Deep retrogrid dark purple background with neon magenta/violet border and soft amber highlight (matches seekbar track + neon aesthetic)
    const style1 = `
      .preview-player[data-theme="synthwave-80s"] .group\\/liquid-btn,
      .preview-player[data-theme="synthwave-80s"] .group\\/center-buffering button,
      .preview-player[data-theme="synthwave-80s"] [data-slot="control"],
      .preview-player[data-theme="synthwave-80s"] .media-fullscreen-button,
      .preview-player[data-theme="synthwave-80s"] .group\\/vol-pill {
        background-color: #110524 !important;
        background-image:
          radial-gradient(circle at 50% 15%, rgba(247, 37, 133, 0.22) 0%, rgba(114, 9, 183, 0.35) 50%, rgba(17, 5, 36, 0.98) 100%) !important;
        border: 1px solid rgba(247, 37, 133, 0.5) !important;
        box-shadow: inset 0 1px 1px rgba(253, 230, 138, 0.22), 0 0 8px rgba(247, 37, 133, 0.32), 0 2px 6px rgba(0, 0, 0, 0.75) !important;
        color: #ffffff !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }
      .preview-player[data-theme="synthwave-80s"] .group\\/liquid-btn:hover,
      .preview-player[data-theme="synthwave-80s"] .group\\/center-buffering button:hover,
      .preview-player[data-theme="synthwave-80s"] [data-slot="control"]:hover,
      .preview-player[data-theme="synthwave-80s"] .media-fullscreen-button:hover,
      .preview-player[data-theme="synthwave-80s"] .group\\/vol-pill:hover {
        background-color: #1b0738 !important;
        border-color: #f72585 !important;
        box-shadow: 0 0 12px rgba(247, 37, 133, 0.65), inset 0 1px 2px rgba(253, 230, 138, 0.35) !important;
      }
    `;
    await applyAndCapture('variant1_dark_neon', style1);

    // Style 2: Radiant seekbar gradient background (deep violet #7209b7 to hot magenta #f72585 to sunset amber #ffd166)
    const style2 = `
      .preview-player[data-theme="synthwave-80s"] .group\\/liquid-btn,
      .preview-player[data-theme="synthwave-80s"] .group\\/center-buffering button,
      .preview-player[data-theme="synthwave-80s"] [data-slot="control"],
      .preview-player[data-theme="synthwave-80s"] .media-fullscreen-button,
      .preview-player[data-theme="synthwave-80s"] .group\\/vol-pill {
        background: linear-gradient(135deg, #7209b7 0%, #f72585 58%, #ffd166 100%) !important;
        border: 1px solid rgba(255, 255, 255, 0.35) !important;
        box-shadow: 0 0 12px rgba(247, 37, 133, 0.65), 0 2px 8px rgba(0, 0, 0, 0.8) !important;
        color: #ffffff !important;
        backdrop-filter: none !important;
        -webkit-backdrop-filter: none !important;
      }
      .preview-player[data-theme="synthwave-80s"] .group\\/liquid-btn:hover,
      .preview-player[data-theme="synthwave-80s"] .group\\/center-buffering button:hover,
      .preview-player[data-theme="synthwave-80s"] [data-slot="control"]:hover,
      .preview-player[data-theme="synthwave-80s"] .media-fullscreen-button:hover,
      .preview-player[data-theme="synthwave-80s"] .group\\/vol-pill:hover {
        filter: brightness(1.15) !important;
        box-shadow: 0 0 18px rgba(247, 37, 133, 0.9), 0 0 8px rgba(253, 209, 102, 0.6) !important;
      }
    `;
    await applyAndCapture('variant2_full_gradient', style2);

    // Style 3: Seekbar fill gradient on Main Play Button, and dark neon seekbar backing on secondary buttons
    const style3 = `
      .preview-player[data-theme="synthwave-80s"] .group\\/liquid-btn,
      .preview-player[data-theme="synthwave-80s"] [data-slot="control"],
      .preview-player[data-theme="synthwave-80s"] .media-fullscreen-button,
      .preview-player[data-theme="synthwave-80s"] .group\\/vol-pill {
        background-color: #110524 !important;
        background-image:
          radial-gradient(circle at 50% 15%, rgba(247, 37, 133, 0.22) 0%, rgba(114, 9, 183, 0.35) 50%, rgba(17, 5, 36, 0.98) 100%) !important;
        border: 1px solid rgba(247, 37, 133, 0.5) !important;
        box-shadow: inset 0 1px 1px rgba(253, 230, 138, 0.22), 0 0 8px rgba(247, 37, 133, 0.32), 0 2px 6px rgba(0, 0, 0, 0.75) !important;
        color: #ffffff !important;
      }
      .preview-player[data-theme="synthwave-80s"] .media-md\\:flex > .group\\/liquid-btn:nth-child(3),
      .preview-player[data-theme="synthwave-80s"] .group\\/play,
      .preview-player[data-theme="synthwave-80s"] .group\\/center-buffering button:nth-child(2) {
        background: linear-gradient(135deg, #7209b7 0%, #f72585 58%, #ffd166 100%) !important;
        border: 1px solid rgba(255, 255, 255, 0.35) !important;
        box-shadow: 0 0 12px rgba(247, 37, 133, 0.7), 0 2px 8px rgba(0, 0, 0, 0.8) !important;
      }
      .preview-player[data-theme="synthwave-80s"] .group\\/liquid-btn:hover,
      .preview-player[data-theme="synthwave-80s"] [data-slot="control"]:hover,
      .preview-player[data-theme="synthwave-80s"] .media-fullscreen-button:hover,
      .preview-player[data-theme="synthwave-80s"] .group\\/vol-pill:hover {
        border-color: #f72585 !important;
        box-shadow: 0 0 12px rgba(247, 37, 133, 0.65) !important;
      }
    `;
    await applyAndCapture('variant3_accented_play', style3);

    // Style 4: Sleek Synthwave sunset gradient button with darker translucent blend (matches seekbar fill & thumb)
    const style4 = `
      .preview-player[data-theme="synthwave-80s"] .group\\/liquid-btn,
      .preview-player[data-theme="synthwave-80s"] .group\\/center-buffering button,
      .preview-player[data-theme="synthwave-80s"] [data-slot="control"],
      .preview-player[data-theme="synthwave-80s"] .media-fullscreen-button,
      .preview-player[data-theme="synthwave-80s"] .group\\/vol-pill {
        background: linear-gradient(180deg, #f72585 0%, #7209b7 65%, #3c096c 100%) !important;
        border: 1px solid rgba(253, 230, 138, 0.45) !important;
        box-shadow: 0 0 10px rgba(247, 37, 133, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.35) !important;
        color: #ffffff !important;
      }
      .preview-player[data-theme="synthwave-80s"] .group\\/liquid-btn:hover,
      .preview-player[data-theme="synthwave-80s"] .group\\/center-buffering button:hover,
      .preview-player[data-theme="synthwave-80s"] [data-slot="control"]:hover,
      .preview-player[data-theme="synthwave-80s"] .media-fullscreen-button:hover,
      .preview-player[data-theme="synthwave-80s"] .group\\/vol-pill:hover {
        box-shadow: 0 0 16px rgba(247, 37, 133, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.5) !important;
      }
    `;
    await applyAndCapture('variant4_sunset_magenta', style4);

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}

main();
