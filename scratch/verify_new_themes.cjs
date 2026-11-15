const part1 = require('./themes_data_part1.cjs');
const part2 = require('./themes_data_part2.cjs');
const part3 = require('./themes_data_part3.cjs');
const part4 = require('./themes_data_part4.cjs');

const allNew = [...part1, ...part2, ...part3, ...part4];

console.log('Total new themes loaded:', allNew.length);

const requiredKeys = [
  'id', 'label', 'frameBorder', 'frameRadius', 'frameShadow',
  'btnRadius', 'btnBg', 'btnBorder', 'btnShadow', 'btnHoverBorder', 'btnHoverShadow',
  'playBg', 'playBorder', 'playShadow', 'iconColor', 'playIconColor', 'iconFilter',
  'volPillBg', 'volPillBorder', 'volTrackBg', 'volTrackBorder', 'volFillBg', 'volThumbStyle',
  'seekTrackBg', 'seekTrackBorder', 'seekBufferBg', 'seekFillBg', 'seekThumbStyle',
  'timeColor', 'timeFont', 'menuBg', 'menuBorder', 'menuRadius', 'menuShadow',
  'menuItemHoverBg', 'menuItemHoverColor', 'captionBg', 'captionBorder', 'captionRadius',
  'captionShadow', 'captionColor', 'captionTextShadow', 'ambientPalette', 'logoPalette'
];

const ids = new Set();
let errors = 0;

allNew.forEach((theme, idx) => {
  if (ids.has(theme.id)) {
    console.error(`Duplicate ID: ${theme.id}`);
    errors++;
  }
  ids.add(theme.id);

  for (const k of requiredKeys) {
    if (theme[k] === undefined) {
      console.error(`Theme ${theme.id} missing key: ${k}`);
      errors++;
    }
  }

  // Check frame border opacity rule: must be 0.3333
  if (!theme.frameBorder.includes('0.3333')) {
    console.error(`Theme ${theme.id} frameBorder must have 0.3333 opacity, got: ${theme.frameBorder}`);
    errors++;
  }

  // Check no comic sans
  if (JSON.stringify(theme).toLowerCase().includes('comic sans')) {
    console.error(`Theme ${theme.id} violates comic sans rule!`);
    errors++;
  }
});

console.log('Validation finished. Errors:', errors);
if (errors === 0) {
  console.log('All 50 new themes passed 100% strict verification!');
  allNew.forEach((t, i) => console.log(`${i + 51}: ${t.label} (${t.id})`));
}
