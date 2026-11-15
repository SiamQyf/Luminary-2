const fs = require('fs');
const { spawn } = require('child_process');

async function main() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-live-prof-captions';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9448',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=translucent'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  try {
    const listRes = await fetch('http://127.0.0.1:9448/json/list', {
      headers: { Host: '127.0.0.1:9448' }
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
    const clickSettings = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const btn = document.querySelector('button[aria-label*="Settings"], button[aria-haspopup="menu"]');
          if (btn) {
            btn.click();
            return true;
          }
          return false;
        })()
      `,
      returnByValue: true
    });
    console.log('Clicked settings button:', clickSettings?.result?.value);
    await new Promise(r => setTimeout(r, 600));

    // Capture Settings Menu screenshot
    const shot1 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\captions_settings_menu.png', Buffer.from(shot1.data, 'base64'));
    console.log('Captured captions_settings_menu.png');

    // Click "Caption Style" trigger inside the menu
    const clickCaptionMenu = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const items = Array.from(document.querySelectorAll('button, [role="menuitem"]'));
          const captionItem = items.find(el => el.textContent && el.textContent.includes('Caption Style'));
          if (captionItem) {
            captionItem.click();
            return true;
          }
          return false;
        })()
      `,
      returnByValue: true
    });
    console.log('Clicked Caption Style submenu:', clickCaptionMenu?.result?.value);
    await new Promise(r => setTimeout(r, 600));

    // Capture Submenu screenshot showing all 5 designs
    const shot2 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\captions_submenu.png', Buffer.from(shot2.data, 'base64'));
    console.log('Captured captions_submenu.png');

    // Select "Retro Yellow"
    const selectRetro = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const radios = Array.from(document.querySelectorAll('[role="menuitemradio"]'));
          const retro = radios.find(el => el.textContent && el.textContent.includes('Retro Yellow'));
          if (retro) {
            retro.click();
            return true;
          }
          return false;
        })()
      `,
      returnByValue: true
    });
    console.log('Selected Retro Yellow:', selectRetro?.result?.value);
    await new Promise(r => setTimeout(r, 600));

    // Close menu by clicking video to see the caption pill
    await send('Runtime.evaluate', {
      expression: `
        (() => {
          const video = document.querySelector('video');
          if (video) {
            video.currentTime = 12;
            video.play();
          }
          // Also force activeText in CaptionsDisplay or inspect caption-pill
          const pill = document.querySelector('[data-part="caption-pill"]');
          return pill ? { style: pill.getAttribute('data-caption-style'), text: pill.textContent } : 'no pill yet';
        })()
      `,
      returnByValue: true
    });

    await new Promise(r => setTimeout(r, 1200));

    const shot3 = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\captions_active_preview.png', Buffer.from(shot3.data, 'base64'));
    console.log('Captured captions_active_preview.png');

    ws.close();
  } catch (err) {
    console.error('Error during capture:', err);
  } finally {
    proc.kill();
  }
}

main();
