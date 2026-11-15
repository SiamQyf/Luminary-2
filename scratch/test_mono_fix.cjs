const http = require('http');
const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
  const outPath = 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/test_mono_fix.png';
  const port = 9225;
  
  const chromeProc = spawn(chromePath, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    `--remote-debugging-port=${port}`,
    'http://localhost:5173/preview.html?theme=monochrome-editorial'
  ]);

  await new Promise(r => setTimeout(r, 1500));

  const list = await new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}/json/list`, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });

  const page = list[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      const handler = (event) => {
        const msg = JSON.parse(event.data.toString());
        if (msg.id === msgId) {
          ws.removeEventListener('message', handler);
          resolve(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await new Promise(r => ws.addEventListener('open', r, { once: true }));

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false
  });

  await new Promise(r => setTimeout(r, 2000));

  // Inject the fixed style into the page
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const style = document.createElement('style');
        style.id = 'mono-fix-test';
        style.textContent = \`
          .preview-player[data-theme="monochrome-editorial"] .media-skin [data-part="bottom-controls-bar"]:not(.static\\\\!)::before,
          :root[data-theme="monochrome-editorial"] .media-skin [data-part="bottom-controls-bar"]:not(.static\\\\!)::before,
          :where(.media-skin)[data-theme="monochrome-editorial"] [data-part="bottom-controls-bar"]:not(.static\\\\!)::before {
            content: "" !important;
            position: absolute !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            top: 0 !important;
            height: 100% !important;
            max-height: none !important;
            pointer-events: none !important;
            border-radius: inherit !important;
            z-index: -1 !important;
            opacity: 0.95 !important;
            background-color: transparent !important;
            background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 30%, rgba(0, 0, 0, 0.98) 70%, #000000 100%) !important;
            background-size: 100% 100% !important;
            box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
          }
        \`;
        document.head.appendChild(style);
        return 'Style injected';
      })()
    `
  });

  await new Promise(r => setTimeout(r, 400));

  const scr = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync(outPath, Buffer.from(scr.data, 'base64'));
  console.log('Screenshot saved to', outPath);

  ws.close();
  chromeProc.kill();
}

main().catch(console.error);
