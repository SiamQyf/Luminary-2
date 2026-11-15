const path = require('path');
const part2 = require(path.join(__dirname, 'creative_themes_part2.cjs'));
for (const t of part2) {
  if (t.id.includes('mondrian') || t.id.includes('brutalist')) {
    console.log(t.id, t.dockBackdrop);
  }
}
