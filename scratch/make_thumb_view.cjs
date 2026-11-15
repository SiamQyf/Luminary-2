const fs = require('fs');

// We can crop with a canvas or sharp or jimp if available, or write an html viewer
const html = `
<!DOCTYPE html>
<html>
<body style="margin: 0; background: #03080f; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh;">
  <div style="overflow: hidden; width: 600px; height: 120px; border: 1px solid #7dd3fc; border-radius: 8px;">
    <img src="file:///C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/glacial_played_live.png" style="margin-left: -200px; margin-top: -30px; transform: scale(1.6); transform-origin: top left;" />
  </div>
</body>
</html>
`;

fs.writeFileSync('skin 2/custom-skin/scratch/view_thumb.html', html, 'utf8');
