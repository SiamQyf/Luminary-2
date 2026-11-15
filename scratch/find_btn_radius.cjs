const fs = require('fs');

for (let p = 1; p <= 4; p++) {
  const themes = require(`d:/video player/skin 2/custom-skin/scratch/creative_themes_part${p}.cjs`);
  themes.forEach(t => {
    if (t.btnRadius === '0px' || t.btnRadius === '0' || t.btnRadius === '1px' || t.btnRadius === '2px') {
      console.log(`Part ${p}: ${t.id} btnRadius=${t.btnRadius} btnBorder=${t.btnBorder} btnBg=${t.btnBg}`);
    }
  });
}
