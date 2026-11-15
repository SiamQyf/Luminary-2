const fs = require('fs');
const part2 = require('./creative_themes_part2.cjs');
const mondrian = part2.find(t => t.id === 'de-stijl-mondrian');
console.log(JSON.stringify(mondrian, null, 2));
