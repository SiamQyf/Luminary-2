const fs = require('fs');

function updateCssFile(filePath) {
  let css = fs.readFileSync(filePath, 'utf8');

  // 1. Crystal
  css = css.replace(
    /(\.preview-player\[data-theme="crystal"\]\s*\[data-part="caption-pill"\][^\{]*\{[\s\S]*?background:\s*)linear-gradient\(135deg,\s*rgba\(255,\s*255,\s*255,\s*0\.18\)[^;]+;/g,
    `$1linear-gradient(135deg, rgba(255, 255, 255, 0.20) 0%, rgba(192, 132, 252, 0.16) 50%, rgba(56, 189, 248, 0.18) 100%), rgba(10, 14, 24, 0.78) !important;`
  );

  // 2. Water Droplet
  css = css.replace(
    /(\.preview-player\[data-theme="water-droplet"\]\s*\[data-part="caption-pill"\][^\{]*\{[\s\S]*?background:\s*)linear-gradient\(180deg,\s*rgba\(255,\s*255,\s*255,\s*0\.28\)[^;]+;/g,
    `$1linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 70%), linear-gradient(0deg, rgba(255, 255, 255, 0.18) 0%, rgba(186, 230, 253, 0.08) 35%, transparent 70%), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0%, rgba(56, 189, 248, 0.06) 50%, rgba(14, 165, 233, 0.1) 100%), rgba(6, 18, 30, 0.76) !important;`
  );

  // 3. Holo Prism
  css = css.replace(
    /(\.preview-player\[data-theme="holo-prism"\]\s*\[data-part="caption-pill"\][^\{]*\{[\s\S]*?background:\s*)linear-gradient\(135deg,\s*rgba\(255,\s*255,\s*255,\s*0\.16\)[^;]+;/g,
    `$1linear-gradient(135deg, rgba(255, 255, 255, 0.18) 0%, rgba(147, 197, 253, 0.20) 50%, rgba(244, 114, 182, 0.20) 100%), rgba(14, 12, 28, 0.80) !important;`
  );

  // 4. Frutiger Aero
  css = css.replace(
    /(\.preview-player\[data-theme="frutiger-aero"\]\s*\[data-part="caption-pill"\][^\{]*\{[\s\S]*?background:\s*)linear-gradient\(180deg,\s*rgba\(255,\s*255,\s*255,\s*0\.25\)[^;]+;/g,
    `$1linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(14, 165, 233, 0.40) 60%, rgba(2, 132, 199, 0.80) 100%), rgba(3, 24, 48, 0.82) !important;`
  );

  // Light themes child styling:
  const lightThemes = [
    { id: 'gamepad-white', color: '#090714' },
    { id: 'news-magazine', color: '#141210' },
    { id: 'clay-pastel', color: '#2e1065' },
    { id: 'swiss-intl', color: '#1c1917' },
    { id: 'polaroid-film', color: '#18181b' },
    { id: 'porcelain-cobalt', color: '#1e3a8a' }
  ];

  for (const lt of lightThemes) {
    const childSelector = `[data-theme="${lt.id}"] [data-part="caption-pill"] *`;
    if (!css.includes(childSelector)) {
      // Find the rule for this theme and insert the child rule right after
      const pattern = new RegExp(
        `(\\.preview-player\\[data-theme="${lt.id}"\\]\\s*\\[data-part="caption-pill"[\\s\\S]*?\\})`,
        'g'
      );
      css = css.replace(pattern, (match) => {
        return `${match}\n\n.preview-player[data-theme="${lt.id}"] [data-part="caption-pill"] *,\n:root[data-theme="${lt.id}"] [data-part="caption-pill"] *,\n:where(.media-skin)[data-theme="${lt.id}"] [data-part="caption-pill"] * {\n  color: ${lt.color} !important;\n  fill: ${lt.color} !important;\n  text-shadow: none !important;\n}`;
      });
    }
  }

  fs.writeFileSync(filePath, css, 'utf8');
  console.log('Updated', filePath);
}

updateCssFile('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
updateCssFile('d:/video player/skin 2/custom-skin/src/skin.css');
