const { spawn } = require('child_process');

async function test() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-test-all-buttons';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9481',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=timber'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9481/json/list');
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

    // Inject fix
    await send('Runtime.evaluate', {
      expression: `(() => {
        const style = document.createElement('style');
        style.id = 'fix-perfect-center';
        style.textContent = \`
          .group\\\\/mute svg {
            position: static !important;
            left: 0 !important;
            transform: none !important;
          }
          .group\\\\/vol-pill > button {
            height: 100% !important;
            width: auto !important;
            aspect-ratio: 1 / 1 !important;
          }
          .group\\\\/play svg {
            transform: none !important;
          }
        \`;
        document.head.appendChild(style);
      })()`
    });

    const themes = ['translucent', 'water-droplet', 'timber', 'pencil-sketch', 'cyber-neon', 'obsidian-gold', 'retro-terminal', 'plain', 'ceramic', 'molten-magma', 'synthwave-80s', 'cyberpunk-2077', 'sakura-blossom', 'cosmic-nebula', 'gamepad', 'gamepad-white', 'news-magazine', 'vinyl-turntable', 'blueprint', 'frutiger-aero', 'art-deco', 'clay-pastel', 'tactical-hud', 'matcha-zen', 'bauhaus', 'swiss-intl', 'ukiyo-e', 'bioluminescent', 'steampunk', 'candy-pop', 'polaroid-film', 'nordic-frost', 'crimson-cinema', 'pixel-8bit', 'linear-ticks', 'crystal', 'dot-matrix', 'liquid-mercury', 'aurora-borealis', 'solar-flare', 'amethyst-geode', 'cyber-deck', 'porcelain-cobalt', 'emerald-vault', 'vaporwave-sunset', 'carbon-stealth', 'holo-prism', 'deep-abyss', 'velvet-opera', 'glacial-permafrost', 'podcast-studio'];
    const issues = {};

    for (const th of themes) {
      await send('Runtime.evaluate', {
        expression: `(() => {
          document.documentElement.dataset.theme = '${th}';
          document.querySelectorAll('.preview-player').forEach(el => el.setAttribute('data-theme', '${th}'));
        })()`
      });
      await new Promise(r => setTimeout(r, 50));

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
        issues[th] = measurement.result.value;
      }
    }

    console.log('Themes with any button > 0.05px off center:', Object.keys(issues).length);
    if (Object.keys(issues).length > 0) {
      console.log('Issues:', JSON.stringify(issues, null, 2));
    } else {
      console.log('ALL 50 THEMES HAVE PERFECTLY CENTERED ICONS ON ALL BUTTONS!');
    }

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
test();
