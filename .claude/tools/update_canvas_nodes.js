const fs = require('fs');
const path = require('path');

const canvasPath = 'IM8/T003 Images.canvas';
let original;
try {
  original = JSON.parse(fs.readFileSync(canvasPath, 'utf8'));
} catch(e) {
  console.error("Could not read canvas JSON");
  process.exit(1);
}

// Find maximum Y to avoid overlaps
let maxY = -Infinity;
original.nodes.forEach(n => {
  const bottom = n.y + n.height;
  if (bottom > maxY) maxY = bottom;
});

const startY = maxY + 100; // Add some padding

const newNodes = [
  {"id":"anim-save30-v2-label","type":"text","text":"# EC-O2 v2 — Heavy Bold Sans (Save 30%)","x":8520,"y":startY,"width":600,"height":40,"color":"2"},
  {"id":"anim-save30-v2-video","type":"file","file":"IM8/00 Assets/Animations/T003-save30-anim-v2/renders/T003-save30-anim-v2_2026-05-11_00-17-01.mp4","x":8520,"y":startY + 50,"width":400,"height":711},

  {"id":"anim-261day-v2-label","type":"text","text":"# EC-G4 v2 — Condensed Bold Sans ($2.61 A Day)","x":8940,"y":startY,"width":600,"height":40,"color":"2"},
  {"id":"anim-261day-v2-video","type":"file","file":"IM8/00 Assets/Animations/T003-261day-anim-v2/renders/T003-261day-anim-v2_2026-05-11_00-17-01.mp4","x":8940,"y":startY + 50,"width":400,"height":711},

  {"id":"anim-sleep-v2-label","type":"text","text":"# EC-M3 v2 — Geometric Bold Sans (Better Sleep)","x":9360,"y":startY,"width":600,"height":40,"color":"2"},
  {"id":"anim-sleep-v2-video","type":"file","file":"IM8/00 Assets/Animations/T003-sleep-anim-v2/renders/T003-sleep-anim-v2_2026-05-11_00-17-01.mp4","x":9360,"y":startY + 50,"width":400,"height":711}
];

original.nodes.push(...newNodes);
fs.writeFileSync(canvasPath, JSON.stringify(original, null, '\t'));
console.log(`Canvas updated. Added nodes starting at Y: ${startY}`);
