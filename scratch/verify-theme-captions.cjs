const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-live-prof-verify';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9455',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=retro-terminal'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9455/json/list', {
      headers: { Host: '127.0.0.1:9455' }
    });
    const list = await listRes.json();
    const tab = list.find(t => t.type === 'page');
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

    await new Promise(r => setTimeout(r, 2500));

    // Move mouse over player to show controls
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: 640,
      y: 750
    });
    await new Promise(r => setTimeout(r, 600));

    // Open Settings Menu
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('button[aria-label*="Settings"], button[aria-haspopup="menu"]');
          if (btn) btn.click();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 600));

    // Capture Settings Menu (confirming no "Caption Style")
    const menuShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\settings_menu_no_caption_style.png', Buffer.from(menuShot.data, 'base64'));
    console.log('Captured settings_menu_no_caption_style.png');

    // Close Settings Menu by clicking outside
    await send('Input.dispatchMouseEvent', {
      type: 'mousePressed',
      button: 'left',
      clickCount: 1,
      x: 200,
      y: 200
    });
    await send('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      button: 'left',
      clickCount: 1,
      x: 200,
      y: 200
    });
    await new Promise(r => setTimeout(r, 400));

    // Function to inject simulated active caption
    const injectCaption = async (themeName) => {
      await send('Runtime.evaluate', {
        expression: `
          (() => {
            const player = document.querySelector('.preview-player');
            if (player) {
              player.setAttribute('data-theme', '${themeName}');
            }
            document.documentElement.setAttribute('data-theme', '${themeName}');
            
            // Check or create caption pill
            let container = document.querySelector('[data-part="captions-container"]');
            if (!container) {
              container = document.createElement('div');
              container.setAttribute('data-part', 'captions-container');
              container.className = 'absolute inset-x-0 bottom-[90px] flex justify-center pointer-events-none z-30 px-4';
              document.querySelector('.preview-player .media-skin')?.appendChild(container);
            }
            let pill = container.querySelector('[data-part="caption-pill"]');
            if (!pill) {
              pill = document.createElement('div');
              pill.setAttribute('data-part', 'caption-pill');
              pill.className = 'inline-block px-4 py-2 rounded-[var(--media-caption-radius,10px)] backdrop-blur-[12px] text-center font-medium text-[15px] select-none';
              pill.style.background = 'var(--media-caption-bg, rgba(8, 10, 15, 0.72))';
              pill.style.border = 'var(--media-caption-border-width, 1px) solid var(--media-caption-border, rgba(255, 255, 255, 0.15))';
              pill.style.boxShadow = 'var(--media-caption-shadow, 0 4px 16px rgba(0, 0, 0, 0.5))';
              pill.style.color = 'var(--media-caption-color, #ffffff)';
              pill.style.fontFamily = 'var(--media-caption-font, inherit)';
              pill.style.textShadow = 'var(--media-caption-text-shadow, 0 1px 2px rgba(0,0,0,0.95))';
              pill.style.filter = 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.85))';
              container.appendChild(pill);
            }
            pill.textContent = 'Here is the bespoke subtitle matching the ' + '${themeName}' + ' style';
          })()
        `
      });
      await new Promise(r => setTimeout(r, 400));
    };

    // 1. Retro Terminal
    await injectCaption('retro-terminal');
    const shotTerminal = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\caption_retro_terminal.png', Buffer.from(shotTerminal.data, 'base64'));
    console.log('Captured caption_retro_terminal.png');

    // 2. Obsidian Gold
    await injectCaption('obsidian-gold');
    const shotGold = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\caption_obsidian_gold.png', Buffer.from(shotGold.data, 'base64'));
    console.log('Captured caption_obsidian_gold.png');

    // 3. Cyber Neon
    await injectCaption('cyber-neon');
    const shotNeon = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\caption_cyber_neon.png', Buffer.from(shotNeon.data, 'base64'));
    console.log('Captured caption_cyber_neon.png');

    ws.close();
  } catch (err) {
    console.error('Error:', err);
  } finally {
    proc.kill();
  }
}

main();
