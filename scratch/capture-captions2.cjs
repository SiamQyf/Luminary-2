const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-live-prof-captions2';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9450',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=translucent'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9450/json/list', {
      headers: { Host: '127.0.0.1:9450' }
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

    await new Promise(r => setTimeout(r, 2000));

    // Move mouse over player
    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: 640,
      y: 750
    });
    await new Promise(r => setTimeout(r, 800));

    // Click Settings Trigger
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('button[aria-label*="Settings"], button[aria-haspopup="menu"]');
          if (btn) btn.click();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 600));

    // Click "Caption Style" trigger inside the menu
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const items = Array.from(document.querySelectorAll('button, [role="menuitem"]'));
          const captionItem = items.find(el => el.textContent && el.textContent.includes('Caption Style'));
          if (captionItem) captionItem.click();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 600));

    // Capture Submenu screenshot showing the 10 designs
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\captions_10_submenu.png', Buffer.from(shot1.data, 'base64'));
    console.log('Captured captions_10_submenu.png');

    // Select "Retro Terminal"
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const radios = Array.from(document.querySelectorAll('[role="menuitemradio"]'));
          const terminal = radios.find(el => el.textContent && el.textContent.includes('Retro Terminal'));
          if (terminal) terminal.click();
        })()
      `
    });
    await new Promise(r => setTimeout(r, 600));

    // Advance video and capture green terminal caption pill
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const video = document.querySelector('video');
          if (video) {
            video.currentTime = 12;
            video.play();
          }
        })()
      `
    });
    await new Promise(r => setTimeout(r, 1200));

    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\captions_terminal_preview.png', Buffer.from(shot2.data, 'base64'));
    console.log('Captured captions_terminal_preview.png');

    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    proc.kill();
  }
}

main();
