const fs = require('fs');

const H50 = [0.302, 0.605, 0.302, 0.209, 0.395, 0.767, 0.465, 0.209, 0.209, 0.209, 1.0, 0.535, 0.209, 0.721, 0.535, 0.302, 0.163, 0.163, 0.442, 1.0, 0.791, 0.14, 0.256, 0.581, 0.209, 0.163, 1.0, 0.674, 0.907, 0.163, 0.395, 0.442, 0.163, 0.163, 1.0, 0.907, 0.535, 0.837, 0.163, 0.279, 0.163, 0.628, 0.349, 0.814, 0.14, 0.279, 0.163, 0.488, 0.163, 0.163];

function makeSvg(step, barW, totalH, roundCap = false) {
  const totalW = step * H50.length;
  let rects = '';
  for (let i = 0; i < H50.length; i++) {
    const rel = H50[i];
    const bh = Math.max(1.5, Math.round(rel * totalH * 10) / 10);
    const by = Math.round(((totalH - bh) / 2) * 10) / 10;
    const bx = Math.round((i * step + (step - barW) / 2) * 10) / 10;
    const rx = roundCap ? (barW / 2).toFixed(2) : '0';
    rects += `<rect x='${bx}' y='${by}' width='${barW}' height='${bh}' rx='${rx}' fill='white'/>`;
  }
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${totalW} ${totalH}' width='${totalW}' height='${totalH}'>${rects}</svg>`;
}

// Write an HTML file where mask works 100%
const svgA = makeSvg(6, 1.2, 9, true);
const svgB = makeSvg(6, 1.5, 9, false);
const svgC = makeSvg(7, 1.4, 9, true);
const svgD = makeSvg(8, 1.5, 10, true);

function toDataUri(svg) {
  return 'data:image/svg+xml;utf8,' + svg.replace(/#/g, '%23').replace(/'/g, "%27").replace(/"/g, "%22").replace(/ /g, "%20").replace(/</g, "%3C").replace(/>/g, "%3E");
}

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body { background: #0f1117; color: #fff; font-family: sans-serif; padding: 30px; }
.row { margin-bottom: 25px; }
.label { font-size: 13px; color: #94a3b8; margin-bottom: 6px; }
.track-wrap {
  width: 700px;
  height: 24px;
  display: flex;
  align-items: center;
  position: relative;
  background: rgba(255, 255, 255, 0.04);
  padding: 0 10px;
  border-radius: 6px;
}
.waveform {
  width: 100%;
  position: relative;
  mask-repeat: repeat-x;
  -webkit-mask-repeat: repeat-x;
}
.fill {
  position: absolute;
  left: 0; top: 0; bottom: 0; width: 45%;
  background: linear-gradient(90deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%);
  box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
}
.unfilled {
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  background: rgba(255, 255, 255, 0.3);
}
.playhead {
  position: absolute;
  left: calc(10px + (700px - 20px) * 0.45);
  top: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 14px;
  background: #fff;
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.9);
  border-radius: 1px;
  z-index: 5;
}
</style>
</head>
<body>
<h2>Waveform Preview Tests</h2>

<div class="row">
  <div class="label">Config A: step=6px, barW=1.2px, height=9px, round=true (Repeat 300px)</div>
  <div class="track-wrap">
    <div class="waveform" style="height: 9px; mask-image: url('${toDataUri(svgA)}'); -webkit-mask-image: url('${toDataUri(svgA)}'); mask-size: 300px 9px; -webkit-mask-size: 300px 9px;">
      <div class="unfilled"></div>
      <div class="fill"></div>
    </div>
    <div class="playhead"></div>
  </div>
</div>

<div class="row">
  <div class="label">Config B: step=6px, barW=1.5px, height=9px, round=false (Repeat 300px)</div>
  <div class="track-wrap">
    <div class="waveform" style="height: 9px; mask-image: url('${toDataUri(svgB)}'); -webkit-mask-image: url('${toDataUri(svgB)}'); mask-size: 300px 9px; -webkit-mask-size: 300px 9px;">
      <div class="unfilled"></div>
      <div class="fill"></div>
    </div>
    <div class="playhead"></div>
  </div>
</div>

<div class="row">
  <div class="label">Config C: step=7px, barW=1.4px, height=9px, round=true (Repeat 350px)</div>
  <div class="track-wrap">
    <div class="waveform" style="height: 9px; mask-image: url('${toDataUri(svgC)}'); -webkit-mask-image: url('${toDataUri(svgC)}'); mask-size: 350px 9px; -webkit-mask-size: 350px 9px;">
      <div class="unfilled"></div>
      <div class="fill"></div>
    </div>
    <div class="playhead"></div>
  </div>
</div>

<div class="row">
  <div class="label">Config D: step=8px, barW=1.5px, height=10px, round=true (Repeat 400px)</div>
  <div class="track-wrap">
    <div class="waveform" style="height: 10px; mask-image: url('${toDataUri(svgD)}'); -webkit-mask-image: url('${toDataUri(svgD)}'); mask-size: 400px 10px; -webkit-mask-size: 400px 10px;">
      <div class="unfilled"></div>
      <div class="fill"></div>
    </div>
    <div class="playhead"></div>
  </div>
</div>

</body>
</html>`;

fs.writeFileSync('d:/video player/skin 2/custom-skin/scratch/test_waveform_real.html', html);
console.log('Wrote test_waveform_real.html');
