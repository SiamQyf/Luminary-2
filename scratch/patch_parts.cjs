const fs = require('fs');
const path = require('path');

// Update part2.cjs
const p2Path = path.join(__dirname, 'creative_themes_part2.cjs');
let p2 = require(p2Path);

for (const t of p2) {
  if (t.id === 'brutalist-concrete') {
    t.dockBackdrop = `
      background-image:
        repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0 1px, transparent 1px 30px),
        linear-gradient(180deg, rgba(31, 41, 55, 0) 0%, rgba(31, 41, 55, 0.7) 45%, #111827 100%);
      background-size: 30px 100%, 100% 100%;
      box-shadow: inset 0 1px 0 #374151;
    `;
  }
  if (t.id === 'de-stijl-mondrian') {
    t.seekTrackBg = 'repeating-linear-gradient(90deg, #000000 0 2px, #ffffff 2px 20px)';
    t.dockBackdrop = `
      background-image:
        linear-gradient(90deg, transparent 0% 55%, rgba(239, 68, 68, 0.18) 55% 72%, rgba(234, 179, 8, 0.18) 72% 86%, rgba(37, 99, 235, 0.18) 86% 100%),
        linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.65) 35%, rgba(2, 6, 23, 0.96) 75%, #020617 100%);
      background-size: 100% 100%, 100% 100%;
      box-shadow: inset 0 1px 0 rgba(239, 68, 68, 0.35);
    `;
    t.timeColor = '#f8fafc';
  }
}
fs.writeFileSync(p2Path, 'module.exports = ' + JSON.stringify(p2, null, 2) + ';\n', 'utf8');
console.log('Updated part2.cjs');

// Update part3.cjs
const p3Path = path.join(__dirname, 'creative_themes_part3.cjs');
let p3 = require(p3Path);

for (const t of p3) {
  if (t.id === 'artisan-leather') {
    t.dockBackdrop = `
      background-image:
        repeating-linear-gradient(0deg, rgba(251, 191, 36, 0.03) 0 1px, transparent 1px 12px),
        linear-gradient(180deg, rgba(41, 16, 2, 0) 0%, rgba(41, 16, 2, 0.7) 45%, #180901 100%);
      background-size: 100% 12px, 100% 100%;
      box-shadow: inset 0 1px 0 rgba(251, 191, 36, 0.3);
    `;
  }
  if (t.id === 'reel-to-reel') {
    t.dockBackdrop = `
      background-image:
        repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0 1px, transparent 1px 20px),
        linear-gradient(180deg, rgba(31, 41, 55, 0) 0%, rgba(31, 41, 55, 0.7) 45%, #111827 100%);
      background-size: 20px 100%, 100% 100%;
      box-shadow: inset 0 1px 0 #374151;
    `;
  }
  if (t.id === 'modular-synth') {
    t.dockBackdrop = `
      background-image:
        radial-gradient(circle at 10px 10px, rgba(234, 179, 8, 0.1) 2px, transparent 2.5px),
        linear-gradient(180deg, rgba(31, 41, 55, 0) 0%, rgba(31, 41, 55, 0.7) 45%, #111827 100%);
      background-size: 20px 20px, 100% 100%;
      box-shadow: inset 0 1px 0 #374151;
    `;
  }
  if (t.id === 'fender-tweed') {
    t.dockBackdrop = `
      background-image:
        repeating-linear-gradient(45deg, rgba(217, 119, 6, 0.05) 0 2px, transparent 2px 6px),
        repeating-linear-gradient(-45deg, rgba(120, 53, 15, 0.05) 0 2px, transparent 2px 6px),
        linear-gradient(180deg, rgba(35, 20, 10, 0) 0%, rgba(35, 20, 10, 0.7) 45%, #180d05 100%);
      background-size: 6px 6px, 6px 6px, 100% 100%;
      box-shadow: inset 0 1px 0 #78350f;
    `;
  }
  if (t.id === 'synth-matrix-green') {
    t.dockBackdrop = `
      background-image:
        repeating-linear-gradient(180deg, rgba(34, 197, 94, 0.03) 0px, rgba(34, 197, 94, 0.03) 1px, transparent 1px, transparent 3px),
        linear-gradient(180deg, rgba(3, 17, 6, 0) 0%, rgba(3, 17, 6, 0.7) 45%, #020904 100%);
      background-size: 100% 3px, 100% 100%;
      box-shadow: inset 0 1px 0 rgba(34, 197, 94, 0.3);
    `;
  }
  if (t.id === 'acid-techno-303') {
    t.dockBackdrop = `
      background-image:
        repeating-linear-gradient(90deg, rgba(234, 179, 8, 0.04) 0 1px, transparent 1px 16px),
        linear-gradient(180deg, rgba(30, 41, 59, 0) 0%, rgba(30, 41, 59, 0.7) 45%, #0b111e 100%);
      background-size: 16px 100%, 100% 100%;
      box-shadow: inset 0 1px 0 #334155;
    `;
  }
  if (t.id === 'glitch-cyberpunk') {
    t.dockBackdrop = `
      background-image:
        repeating-linear-gradient(180deg, rgba(236, 72, 153, 0.03) 0px, rgba(236, 72, 153, 0.03) 1px, transparent 1px, transparent 3px),
        linear-gradient(180deg, rgba(24, 8, 22, 0) 0%, rgba(24, 8, 22, 0.7) 45%, #0d040c 100%);
      background-size: 100% 3px, 100% 100%;
      box-shadow: inset 0 1px 0 #ec4899;
    `;
  }
}
fs.writeFileSync(p3Path, 'module.exports = ' + JSON.stringify(p3, null, 2) + ';\n', 'utf8');
console.log('Updated part3.cjs');

// Update part4.cjs
const p4Path = path.join(__dirname, 'creative_themes_part4.cjs');
let p4 = require(p4Path);

for (const t of p4) {
  if (t.id === 'e-ink-kindle') {
    t.seekTrackBg = 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0 1.5px, transparent 1.5px 5px)';
    t.seekFillBg = 'repeating-linear-gradient(90deg, #ffffff 0 1.5px, transparent 1.5px 5px)';
    t.dockBackdrop = `
      background-image:
        repeating-radial-gradient(circle, rgba(255, 255, 255, 0.04) 0 0.5px, transparent 0.5px 3px),
        linear-gradient(180deg, rgba(24, 24, 27, 0) 0%, rgba(24, 24, 27, 0.6) 40%, rgba(24, 24, 27, 0.95) 75%, #18181b 100%);
      background-size: 3px 3px, 100% 100%;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
    `;
    t.timeColor = '#f4f4f5';
  }
  if (t.id === 'monochrome-editorial') {
    t.seekTrackBg = 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0 1.5px, transparent 1.5px 6px)';
    t.seekFillBg = 'repeating-linear-gradient(90deg, #ffffff 0 1.5px, transparent 1.5px 6px)';
    t.seekThumbStyle = `
      width: 2.5px !important;
      height: 18px !important;
      border-radius: 1px !important;
      background: #ffffff !important;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.95), 0 1px 3px rgba(0, 0, 0, 0.8) !important;
    `;
    t.volTrackBg = 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0 1.5px, transparent 1.5px 5px)';
    t.volFillBg = 'repeating-linear-gradient(90deg, #ffffff 0 1.5px, transparent 1.5px 5px)';
    t.dockBackdrop = `
      background-image:
        repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.04) 0 1px, transparent 1px 8px),
        linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 30%, rgba(0, 0, 0, 0.96) 70%, #000000 100%);
      background-size: 8px 100%, 100% 100%;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25);
    `;
    t.timeColor = '#ffffff';
  }
  if (t.id === 'aerospace-titanium') {
    t.dockBackdrop = `
      background-image:
        repeating-linear-gradient(90deg, rgba(148, 163, 184, 0.03) 0 1px, transparent 1px 24px),
        linear-gradient(180deg, rgba(30, 41, 59, 0) 0%, rgba(30, 41, 59, 0.7) 45%, #0b1120 100%);
      background-size: 24px 100%, 100% 100%;
      box-shadow: inset 0 1px 0 rgba(148, 163, 184, 0.3);
    `;
  }
}
fs.writeFileSync(p4Path, 'module.exports = ' + JSON.stringify(p4, null, 2) + ';\n', 'utf8');
console.log('Updated part4.cjs');
