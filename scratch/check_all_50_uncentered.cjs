const { spawn } = require('child_process');

async function test() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const profileDir = 'C:\\Users\\Siam\\.gemini\\antigravity\\brain\\06e192c4-a4cc-45e6-b8bd-a398f6f48bd4\\chrome-check-all-50';
  
  const proc = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9485',
    `--user-data-dir=${profileDir}`,
    '--disable-gpu',
    '--window-size=1280,900',
    'http://localhost:5173/preview.html?theme=translucent'
  ]);

  await new Promise(r => setTimeout(r, 2000));
  try {
    const listRes = await fetch('http://127.0.0.1:9485/json/list');
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

    // Get list of all themes
    const themesRes = await send('Runtime.evaluate', {
      expression: `(() => {
        const options = Array.from(document.querySelectorAll('select option, [role="menuitemradio"]'));
        // Alternatively hardcode list from preview.css
        return ['translucent', 'timber', 'pencil-sketch', 'cyber-neon', 'obsidian-gold', 'retro-terminal', 'plain', 'ceramic', 'molten-magma', 'synthwave-80s', 'cyberpunk-2077', 'sakura-blossom', 'cosmic-nebula', 'gamepad', 'gamepad-white', 'news-magazine', 'vinyl-turntable', 'blueprint', 'frutiger-aero', 'art-deco', 'clay-pastel', 'tactical-hud', 'matcha-zen', 'bauhaus', 'swiss-intl', 'ukiyo-e', 'bioluminescent', 'steampunk', 'candy-pop', 'polaroid-film', 'nordic-frost', 'crimson-cinema', 'pixel-8bit', 'linear-ticks', 'crystal', 'dot-matrix', 'liquid-mercury', 'aurora-borealis', 'solar-flare', 'amethyst-geode', 'cyber-deck', 'porcelain-cobalt', 'emerald-vault', 'vaporwave-sunset', 'carbon-stealth', 'holo-prism', 'deep-abyss', 'velvet-opera', 'glacial-permafrost', 'water-droplet', 'podcast-studio'];
      })()`,
      returnByValue: true
    });
    const themes = themesRes.result.value;

    const uncentered = {};

    for (const th of themes) {
      await send('Runtime.evaluate', {
        expression: `(() => {
          document.documentElement.dataset.theme = '${th}';
          document.querySelectorAll('.preview-player').forEach(el => el.setAttribute('data-theme', '${th}'));
        })()`
      });
      await new Promise(r => setTimeout(r, 100));

      const measurement = await send('Runtime.evaluate', {
        expression: `(() => {
          const buttons = Array.from(document.querySelectorAll('.media-skin [data-part="bottom-controls-bar"] button, .media-skin [data-part="bottom-controls-bar"] [class*="group/vol-pill"]'));
          const issues = [];
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
            const diffX = sCx - bCx;
            const diffY = sCy - bCy;
            if (Math.abs(diffX) > 0.1 || Math.abs(diffY) > 0.1) {
              issues.push({
                btn: btn.getAttribute('aria-label') || btn.className.split(' ').slice(0, 2).join(' '),
                diffX: Number(diffX.toFixed(3)),
                diffY: Number(diffY.toFixed(3)),
                bWidth: bRect.width,
                sWidth: sRect.width
              });
            }
          });
          return issues;
        })()`,
        returnByValue: true
      });

      if (measurement.result.value.length > 0) {
        uncentered[th] = measurement.result.value;
      }
    }

    console.log('Uncentered buttons count:', Object.keys(uncentered).length);
    console.log('Details:', JSON.stringify(uncentered, null, 2));

    ws.close();
  } catch (e) {
    console.error(e);
  } finally {
    proc.kill();
  }
}
test();
