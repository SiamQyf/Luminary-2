const fs = require('fs');

function removeShift(p) {
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(
    /\/\* Universal Caption Text: Shift by -0\.25px in Y direction \(brought down by \.25px\) \*\/\r?\n\[data-part="caption-pill"\] > \[data-part="caption-text"\],\r?\n\[data-part="caption-text"\] \{\r?\n\s*transform: translateY\(-0\.25px\) !important;\r?\n\}\r?\n\r?\n?/g,
    ''
  );
  // Also fallback if any variation
  content = content.replace(
    /\/\* Universal Caption Text: Shift by [^\*]+\*\/\r?\n\[data-part="caption-pill"\] > \[data-part="caption-text"\],\r?\n\[data-part="caption-text"\] \{\r?\n\s*transform: [^;]+!important;\r?\n\}\r?\n\r?\n?/g,
    ''
  );
  fs.writeFileSync(p, content, 'utf8');
  console.log('Cleaned', p);
}

removeShift('d:/video player/skin 2/custom-skin/apps/preview/src/frame/preview.css');
removeShift('d:/video player/skin 2/custom-skin/src/skin.css');
