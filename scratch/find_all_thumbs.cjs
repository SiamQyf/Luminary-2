for (let p = 1; p <= 4; p++) {
  const themes = require(`d:/video player/skin 2/custom-skin/scratch/creative_themes_part${p}.cjs`);
  themes.forEach(t => {
    if (t.seekThumbStyle && t.seekThumbStyle.includes('data:image/svg')) {
      console.log(`Part ${p} [${t.id}] has SVG thumb`);
    } else if (t.seekThumbStyle) {
      console.log(`Part ${p} [${t.id}] seekThumbStyle: ${t.seekThumbStyle.replace(/\s+/g, ' ')}`);
    }
  });
}
