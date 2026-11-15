function makeWaveformSvg(height, heights) {
  const pitch = 4;
  const barWidth = 1.3;
  const rx = 0.65;
  const totalWidth = heights.length * pitch;
  
  let rects = '';
  for (let i = 0; i < heights.length; i++) {
    const h = heights[i];
    const x = +(i * pitch + (pitch - barWidth) / 2).toFixed(2);
    const y = +((height - h) / 2).toFixed(2);
    rects += `<rect x='${x}' y='${y}' width='${barWidth}' height='${h}' rx='${rx}' fill='white'/>`;
  }
  
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${totalWidth} ${height}' width='${totalWidth}' height='${height}'>${rects}</svg>`;
  return { svg, totalWidth, height, dataUri: `url("data:image/svg+xml,${encodeURIComponent(svg)}")` };
}

// 64-bar organic podcast speech waveform, height 14
const seekbarHeights = [
  3, 5, 8, 4, 11, 7, 3, 2,
  6, 12, 14, 10, 4, 2, 5, 9,
  13, 8, 12, 6, 3, 2, 7, 11,
  4, 2, 2, 5, 8, 13, 10, 4,
  7, 14, 13, 9, 5, 2, 3, 6,
  10, 12, 8, 4, 2, 6, 9, 13,
  14, 11, 7, 3, 2, 4, 8, 12,
  9, 6, 3, 2, 2, 3, 5, 7
];
const seekbarResult = makeWaveformSvg(14, seekbarHeights);

// 16-bar rising acoustic speech volume VU waveform, height 12
const volHeights = [2.5, 3.5, 4.5, 3.5, 6, 7.5, 6, 9, 10.5, 9, 11.5, 12, 11, 12, 12, 12];
const volResult = makeWaveformSvg(12, volHeights);

console.log('Seekbar 64-bar SVG:', seekbarResult.totalWidth, 'x', seekbarResult.height);
console.log('Volume 16-bar SVG:', volResult.totalWidth, 'x', volResult.height);
