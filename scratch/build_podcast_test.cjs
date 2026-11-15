const fs = require('fs');

// 50 bar relative heights from Image 1
const H50 = [
  0.302, 0.605, 0.302, 0.209, 0.395, 0.767, 0.465, 0.209, 0.209, 0.209,
  1.0,   0.535, 0.209, 0.721, 0.535, 0.302, 0.163, 0.163, 0.442, 1.0,
  0.791, 0.14,  0.256, 0.581, 0.209, 0.163, 1.0,   0.674, 0.907, 0.163,
  0.395, 0.442, 0.163, 0.163, 1.0,   0.907, 0.535, 0.837, 0.163, 0.279,
  0.163, 0.628, 0.349, 0.814, 0.14,  0.279, 0.163, 0.488, 0.163, 0.163
];

// Progress Seekbar Waveform:
// Let's test step = 6px (totalW = 300px) and step = 7px (totalW = 350px)
function makeSeekbarSvg(step, barW, totalH, rx) {
  const totalW = step * H50.length;
  let rects = '';
  for (let i = 0; i < H50.length; i++) {
    const rel = H50[i];
    const minH = 1.6;
    const bh = Math.max(minH, Math.round((minH + rel * (totalH - minH)) * 10) / 10);
    const by = Math.round(((totalH - bh) / 2) * 10) / 10;
    const bx = Math.round((i * step + (step - barW) / 2) * 10) / 10;
    rects += `<rect x='${bx}' y='${by}' width='${barW}' height='${bh}' rx='${rx}' fill='white'/>`;
  }
  return {
    svg: `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${totalW} ${totalH}' width='${totalW}' height='${totalH}'>${rects}</svg>`,
    totalW,
    totalH
  };
}

// Volume Slider Crescendo:
// 13 bars across 65px width (step = 5px, barW = 1.4px)
function makeVolumeSvg(width = 65, totalH = 9, barW = 1.4, numBars = 13, rx = 0.7) {
  const step = width / numBars;
  let rects = '';
  for (let i = 0; i < numBars; i++) {
    const t = i / (numBars - 1); // 0 to 1
    // crescendo curve: slight power curve for audio taper (t^1.2)
    const curve = Math.pow(t, 1.15);
    const minH = 1.8;
    const bh = Math.round((minH + curve * (totalH - minH)) * 10) / 10;
    const by = Math.round(((totalH - bh) / 2) * 10) / 10;
    const bx = Math.round((i * step + (step - barW) / 2) * 10) / 10;
    rects += `<rect x='${bx}' y='${by}' width='${barW}' height='${bh}' rx='${rx}' fill='white'/>`;
  }
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${totalH}' width='${width}' height='${totalH}'>${rects}</svg>`;
}

function toDataUri(svg) {
  return 'data:image/svg+xml;utf8,' + svg.replace(/#/g, '%23').replace(/'/g, "%27").replace(/"/g, "%22").replace(/ /g, "%20").replace(/</g, "%3C").replace(/>/g, "%3E");
}

const seek6 = makeSeekbarSvg(6, 1.4, 9, 0.7);
const seek7 = makeSeekbarSvg(7, 1.5, 9, 0.75);
const volSvg = makeVolumeSvg(65, 9, 1.4, 13, 0.7);

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body { background: #0c0e14; color: #fff; font-family: sans-serif; padding: 40px; }
.card {
  background: #141721;
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 30px;
  max-width: 800px;
}
.title { font-size: 14px; font-weight: 600; color: #fbbf24; margin-bottom: 16px; }
.seekbar-row {
  display: flex;
  align-items: center;
  position: relative;
  height: 24px;
  margin-bottom: 20px;
}
.seekbar-track {
  position: relative;
  width: 100%;
  height: 9px;
  background: rgba(255, 255, 255, 0.3);
}
.seekbar-fill {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 42%;
  background: linear-gradient(90deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%);
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.85);
}
.playhead-needle {
  position: absolute;
  left: 42%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 15px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.95), 0 1px 3px rgba(0, 0, 0, 0.7);
  z-index: 10;
}

.vol-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(20, 20, 24, 0.9);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 9999px;
  padding: 6px 14px 6px 10px;
}
.vol-icon {
  width: 18px;
  height: 18px;
  fill: #fbbf24;
}
.vol-track-wrap {
  width: 65px;
  height: 9px;
  position: relative;
}
.vol-track {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  position: relative;
}
.vol-fill {
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 70%;
  background: linear-gradient(90deg, #d97706 0%, #f59e0b 60%, #fbbf24 100%);
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.8);
}
.vol-thumb {
  position: absolute;
  left: 70%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 13px;
  background: #fff;
  border-radius: 1px;
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.95);
  z-index: 5;
}
</style>
</head>
<body>

<div class="card">
  <div class="title">Option 1: Seekbar Step 6px (Repeat 300px) + Volume Slider (65px 13-bar crescendo)</div>
  <div class="seekbar-row">
    <div class="seekbar-track" style="mask-image: url('${toDataUri(seek6.svg)}'); -webkit-mask-image: url('${toDataUri(seek6.svg)}'); mask-size: 300px 9px; -webkit-mask-size: 300px 9px; mask-repeat: repeat-x; -webkit-mask-repeat: repeat-x;">
      <div class="seekbar-fill"></div>
    </div>
    <div class="playhead-needle"></div>
  </div>
  
  <div class="vol-pill">
    <svg class="vol-icon" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
    <div class="vol-track-wrap">
      <div class="vol-track" style="mask-image: url('${toDataUri(volSvg)}'); -webkit-mask-image: url('${toDataUri(volSvg)}'); mask-size: 65px 9px; -webkit-mask-size: 65px 9px; mask-repeat: no-repeat; -webkit-mask-repeat: no-repeat;">
        <div class="vol-fill"></div>
      </div>
      <div class="vol-thumb"></div>
    </div>
  </div>
</div>

<div class="card">
  <div class="title">Option 2: Seekbar Step 7px (Repeat 350px) + Volume Slider (65px 13-bar crescendo)</div>
  <div class="seekbar-row">
    <div class="seekbar-track" style="mask-image: url('${toDataUri(seek7.svg)}'); -webkit-mask-image: url('${toDataUri(seek7.svg)}'); mask-size: 350px 9px; -webkit-mask-size: 350px 9px; mask-repeat: repeat-x; -webkit-mask-repeat: repeat-x;">
      <div class="seekbar-fill"></div>
    </div>
    <div class="playhead-needle"></div>
  </div>
  
  <div class="vol-pill">
    <svg class="vol-icon" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
    <div class="vol-track-wrap">
      <div class="vol-track" style="mask-image: url('${toDataUri(volSvg)}'); -webkit-mask-image: url('${toDataUri(volSvg)}'); mask-size: 65px 9px; -webkit-mask-size: 65px 9px; mask-repeat: no-repeat; -webkit-mask-repeat: no-repeat;">
        <div class="vol-fill"></div>
      </div>
      <div class="vol-thumb"></div>
    </div>
  </div>
</div>

</body>
</html>`;

fs.writeFileSync('d:/video player/skin 2/custom-skin/scratch/test_podcast_redesign.html', html);
console.log('Wrote test_podcast_redesign.html');

const { execSync } = require('child_process');
const outPath = 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/test_podcast_redesign.png';
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
execSync(`"${chromePath}" --headless --no-sandbox --disable-gpu --screenshot="${outPath}" --window-size=1000,750 "file:///d:/video player/skin 2/custom-skin/scratch/test_podcast_redesign.html"`);
console.log('Screenshot taken!');

