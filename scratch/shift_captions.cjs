const fs = require('fs');

function updateFile(p) {
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(
    /\/\* Universal Caption Text: Shift by -0\.5px in Y direction \*\/\r?\n\[data-part="caption-pill"\] > \[data-part="caption-text"\],\r?\n\[data-part="caption-text"\] \{\r?\n\s*transform: translateY\(-0\.5px\) !important;\r?\n\}/g,
    `/* Universal Caption Text: Shift by -0.25px in Y direction (brought down by .25px) */\n[data-part="caption-pill"] > [data-part="caption-text"],\n[data-part="caption-text"] {\n  transform: translateY(-0.25px) !important;\n}`
  );
  fs.writeFileSync(p, content, 'utf8');
  console.log('Updated', p);
}

updateFile('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
updateFile('d:/video player/skin 2/custom-skin/src/skin.css');
