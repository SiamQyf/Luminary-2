for (let p = 1; p <= 4; p++) {
  const themes = require(`d:/video player/skin 2/custom-skin/scratch/creative_themes_part${p}.cjs`);
  themes.forEach(t => {
    if (t.dockBackdrop) {
      const hasSolidColor = t.dockBackdrop.includes('background-color') || t.dockBackdrop.includes('#000') || t.dockBackdrop.includes('#fff') || t.dockBackdrop.includes('border-top');
      console.log(`Part ${p} [${t.id}]: solid=${hasSolidColor} => ${t.dockBackdrop.trim().replace(/\s+/g, ' ').slice(0, 80)}`);
    } else {
      console.log(`Part ${p} [${t.id}]: NO dockBackdrop!`);
    }
  });
}
