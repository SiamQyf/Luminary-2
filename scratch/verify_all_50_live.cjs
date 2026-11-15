const { spawn } = require('child_process');
const fs = require('fs');

async function test() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-verify-live-50';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9477',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=translucent'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9477/json/list');
    const list = await listRes.json();
    const tab = list.find(t => t.type === 'page');
    const ws = new WebSocket(tab.webSocketDebuggerUrl);
    await new Promise(r => ws.onopen = r);

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

    await send('Runtime.enable');
    await send('Page.enable');

    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 640, y: 570 });
    await new Promise(r => setTimeout(r, 600));

    // Pause video
    await send('Runtime.evaluate', {
      expression: `(() => {
        const v = document.querySelector('video');
        if (v) v.pause();
      })()`
    });
    await new Promise(r => setTimeout(r, 400));

    const themes = [
      'translucent', 'timber', 'pencil-sketch', 'cyber-neon', 'obsidian-gold', 'retro-terminal',
      'plain', 'ceramic', 'molten-magma', 'synthwave-80s', 'cyberpunk-2077', 'sakura-blossom',
      'cosmic-nebula', 'gamepad', 'gamepad-white', 'news-magazine', 'vinyl-turntable', 'blueprint',
      'frutiger-aero', 'art-deco', 'clay-pastel', 'tactical-hud', 'matcha-zen', 'bauhaus',
      'swiss-intl', 'ukiyo-e', 'bioluminescent', 'steampunk', 'candy-pop', 'polaroid-film',
      'nordic-frost', 'crimson-cinema', 'pixel-8bit', 'linear-ticks', 'crystal', 'dot-matrix',
      'liquid-mercury', 'aurora-borealis', 'solar-flare', 'amethyst-geode', 'cyber-deck',
      'porcelain-cobalt', 'emerald-vault', 'vaporwave-sunset', 'carbon-stealth', 'holo-prism',
      'deep-abyss', 'velvet-opera', 'glacial-permafrost', 'water-droplet', 'podcast-studio'
    ];

    const deviations = {};

    for (const th of themes) {
      await send('Runtime.evaluate', {
        expression: `(() => {
          document.documentElement.dataset.theme = '${th}';
          document.querySelectorAll('.preview-player').forEach(el => el.setAttribute('data-theme', '${th}'));
        })()`
      });
      await new Promise(r => setTimeout(r, 60));

      const measurement = await send('Runtime.evaluate', {
        expression: `(() => {
          const buttons = Array.from(document.querySelectorAll('.media-skin [data-part="bottom-controls-bar"] button, .media-skin [data-part="bottom-controls-bar"] [class*="group/vol-pill"]'));
          const list = [];
          buttons.forEach(btn => {
            const bRect = btn.getBoundingClientRect();
            if (bRect.width === 0 || bRect.height === 0) return;
            const svgs = Array.from(btn.querySelectorAll('svg')).filter(s => s.getBoundingClientRect().width > 0);
            if (svgs.length === 0) return;
            const svg = svgs[0];
            const sRect = svg.getBoundingClientRect();
            const bCx = bRect.left + bRect.width / 2;
            const bCy = bRect.top + bRect.height / 2;
            const sCx = sRect.left + sRect.width / 2;
            const sCy = sRect.top + sRect.height / 2;
            const diffX = Math.abs(sCx - bCx);
            const diffY = Math.abs(sCy - bCy);
            // Ignore minor subpixel rounding < 0.05px
            if (diffX > 0.05 || diffY > 0.05) {
              list.push({
                label: btn.getAttribute('aria-label') || btn.className.split(' ').slice(0, 2).join(' '),
                diffX: Number((sCx - bCx).toFixed(3)),
                diffY: Number((sCy - bCy).toFixed(3))
              });
            }
          });
          return list;
        })()`,
        returnByValue: true
      });

      if (measurement.result.value.length > 0) {
        deviations[th] = measurement.result.value;
      }
    }

    console.log('Themes with any deviation > 0.05px:', Object.keys(deviations).length);
    if (Object.keys(deviations).length > 0) {
      console.log('Deviations:', JSON.stringify(deviations, null, 2));
    } else {
      console.log('PERFECT! 0 deviations across all 51 themes!');
    }

    // Capture visual confirmation of translucent, timber, and water-droplet
    for (const th of ['translucent', 'timber', 'water-droplet', 'gamepad-white']) {
      await send('Runtime.evaluate', {
        expression: `(() => {
          document.documentElement.dataset.theme = '${th}';
          document.querySelectorAll('.preview-player').forEach(el => el.setAttribute('data-theme', '${th}'));
        })()`
      });
      await new Promise(r => setTimeout(r, 200));

      const playPill = await send('Runtime.evaluate', {
        expression: `(() => {
          const bar = document.querySelector('.media-skin [data-part="bottom-controls-bar"]');
          const r = bar.getBoundingClientRect();
          return { left: r.left, top: r.top, width: 140, height: r.height };
        })()`,
        returnByValue: true
      });
      const pr = playPill.result.value;

      const shot = await send('Page.captureScreenshot', {
        format: 'png',
        clip: { x: pr.left, y: pr.top - 5, width: pr.width, height: pr.height + 10, scale: 2 }
      });
      fs.writeFileSync(`C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\centered_${th}.png`, Buffer.from(shot.data, 'base64'));
    }

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
test();
