for (let i = 1; i <= 4; i++) {
  const p = require(`d:/video player/skin 2/custom-skin/scratch/creative_themes_part${i}.cjs`);
  console.log(`Part ${i} (${p.length} themes):`, p.map(t => t.id).join(', '));
}
