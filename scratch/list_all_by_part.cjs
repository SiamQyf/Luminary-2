const fs = require('fs');
const part1 = require('./creative_themes_part1.cjs');
const part2 = require('./creative_themes_part2.cjs');
const part3 = require('./creative_themes_part3.cjs');
const part4 = require('./creative_themes_part4.cjs');

console.log('Themes in Part 1:');
part1.forEach(t => console.log(' ', t.id, '-', t.label));

console.log('\nThemes in Part 2:');
part2.forEach(t => console.log(' ', t.id, '-', t.label));

console.log('\nThemes in Part 3:');
part3.forEach(t => console.log(' ', t.id, '-', t.label));

console.log('\nThemes in Part 4:');
part4.forEach(t => console.log(' ', t.id, '-', t.label));
