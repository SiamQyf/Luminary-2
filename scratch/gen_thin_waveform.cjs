function makeWaveformSvg(height, heights) {
  const pitch = 4;
  const barWidth = 1.2;
  const rx = 0.6;
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

// 32-bar seekbar waveform, height 12
const seekbarHeights = [4, 7, 3, 5, 8, 5, 2, 4, 12, 4, 7, 3, 2, 12, 9, 2, 5, 3, 12, 9, 9, 2, 5, 2, 12, 10, 9, 2, 3, 7, 4, 8];
const seekbarResult = makeWaveformSvg(12, seekbarHeights);
console.log('Seekbar SVG Size:', seekbarResult.totalWidth, 'x', seekbarResult.height);
console.log('Seekbar Data URI length:', seekbarResult.dataUri.length);

// 12-bar volume waveform, height 10
const volHeights = [2, 3, 5, 3, 6, 8, 4, 7, 9, 6, 10, 8];
const volResult = makeWaveformSvg(10, volHeights);
console.log('Volume SVG Size:', volResult.totalWidth, 'x', volResult.height);
console.log('Volume Data URI length:', volResult.dataUri.length);
