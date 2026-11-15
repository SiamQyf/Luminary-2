for (let p = 1; p <= 4; p++) {
  const themes = require(`d:/video player/skin 2/custom-skin/scratch/creative_themes_part${p}.cjs`);
  for (const t of themes) {
    const json = JSON.stringify(t);
    if (json.includes('cross') || json.includes('plus') || json.includes('grid') || json.includes('blueprint') || json.includes('square') || json.includes('nasa') || json.includes('quantum') || json.includes('calc')) {
      console.log(`Part ${p} match:`, t.id, t.name);
    }
  }
}
