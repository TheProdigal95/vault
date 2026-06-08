const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const animations = [
  {
    name: 'T003-sleep-anim',
    label: '# EC-M3 v3 — Sleep Stat (Replicated 1:1)',
    base: 'IM8/00 Assets/Animations/T003-sleep-anim-vbg'
  },
  {
    name: 'T003-save30-anim',
    label: '# EC-O2 v3 — Save 30% (Replicated 1:1)',
    base: 'IM8/00 Assets/Animations/T003-save30-anim-vbg'
  },
  {
    name: 'T003-261day-anim',
    label: '# EC-G4 v3 — $2.61 A Day (Replicated 1:1)',
    base: 'IM8/00 Assets/Animations/T003-261day-anim-vbg'
  }
];

const newNodes = [];
let startX = 14500;

for (const anim of animations) {
  const v3Dir = `IM8/00 Assets/Animations/${anim.name}-v3`;
  
  // 1. Create directory
  if (!fs.existsSync(v3Dir)) {
    fs.mkdirSync(v3Dir, { recursive: true });
  }

  // 2. Copy all broll and bg-video.mp4 from vbg
  const filesToCopy = ['bg-video.mp4', 'broll-1.mp4', 'broll-2.mp4', 'broll-3.mp4', 'broll-4.mp4', 'broll-5.mp4', 'broll-6.mp4'];
  for (const file of filesToCopy) {
    const srcPath = path.join(anim.base, file);
    const destPath = path.join(v3Dir, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  }

  // 3. Copy and patch HTML
  const srcHtmlPath = path.join(anim.base, 'index.html');
  if (fs.existsSync(srcHtmlPath)) {
    let html = fs.readFileSync(srcHtmlPath, 'utf8');
    // Ensure all videos have data-volume="0" to mute audio completely
    html = html.replace(/<video/g, '<video data-volume="0"');
    fs.writeFileSync(path.join(v3Dir, 'index.html'), html);
  }

  // 4. Create package.json and hyperframes.json
  fs.writeFileSync(path.join(v3Dir, 'package.json'), JSON.stringify({
    name: `${anim.name}-v3`,
    private: true,
    type: "module",
    scripts: {
      "check": "npx --yes hyperframes@0.5.3 lint && npx --yes hyperframes@0.5.3 validate && npx --yes hyperframes@0.5.3 inspect",
      "render": "npx --yes hyperframes@0.5.3 render"
    }
  }, null, 2));

  fs.writeFileSync(path.join(v3Dir, 'hyperframes.json'), JSON.stringify({
    "$schema": "https://hyperframes.heygen.com/schema/hyperframes.json",
    "registry": "https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry",
    "paths": { "blocks": "compositions", "components": "compositions/components", "assets": "assets" }
  }, null, 2));

  // 5. Render
  console.log(`Rendering ${anim.name}-v3...`);
  try {
    execSync(`cd "${v3Dir}" && npm run render`, { stdio: 'inherit' });
  } catch(e) {
    console.error(`Failed to render ${anim.name}-v3`);
  }

  // 6. Find generated video
  const renderDir = path.join(v3Dir, 'renders');
  if (fs.existsSync(renderDir)) {
    const renders = fs.readdirSync(renderDir).filter(f => f.endsWith('.mp4')).sort();
    if (renders.length > 0) {
      const latestRender = renders[renders.length - 1];
      const videoPath = path.join(renderDir, latestRender);

      newNodes.push({"id": `${anim.name}-v3-label`, "type": "text", "text": anim.label, "x": startX, "y": 7000, "width": 600, "height": 40, "color": "4"});
      newNodes.push({"id": `${anim.name}-v3-video`, "type": "file", "file": videoPath, "x": startX, "y": 7050, "width": 400, "height": 711});
      
      startX += 650; // Increased spacing to prevent overlap
    }
  }
}

// 7. Update Canvas
const canvasPath = 'IM8/T003 Images.canvas';
if (fs.existsSync(canvasPath)) {
  const canvas = JSON.parse(fs.readFileSync(canvasPath, 'utf8'));
  canvas.nodes.push(...newNodes);
  fs.writeFileSync(canvasPath, JSON.stringify(canvas, null, '\t'));
  console.log('Canvas updated with new v3 animations.');
}
