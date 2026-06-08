const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dirs = [
  'T003-sleep-anim-v4',
  'T003-261day-anim-v4',
  'T003-save30-anim-v4'
];

const newRenders = {};

for (const dir of dirs) {
  const p = path.join('IM8/00 Assets/Animations', dir, 'index.html');
  if (fs.existsSync(p)) {
    let html = fs.readFileSync(p, 'utf8');
    // Replace the bottom padding with 288px (15% of 1920)
    html = html.replace(/padding:\s*90px\s*48px\s*100px;/, 'padding: 90px 48px 288px;');
    html = html.replace(/padding:\s*70px\s*48px\s*80px;/, 'padding: 70px 48px 288px;');
    fs.writeFileSync(p, html);
    
    console.log(`Rendering ${dir}...`);
    try {
      execSync(`cd "IM8/00 Assets/Animations/${dir}" && npm run render`, { stdio: 'inherit' });
      
      const renderDir = path.join('IM8/00 Assets/Animations', dir, 'renders');
      const renders = fs.readdirSync(renderDir).filter(f => f.endsWith('.mp4')).sort();
      if (renders.length > 0) {
        newRenders[`${dir}-video`] = path.join(renderDir, renders[renders.length - 1]);
      }
    } catch(e) {
      console.error(`Failed rendering ${dir}`);
    }
  }
}

// Update Canvas
const canvasPath = 'IM8/T003 Images.canvas';
if (fs.existsSync(canvasPath)) {
  const canvas = JSON.parse(fs.readFileSync(canvasPath, 'utf8'));
  let updated = false;
  canvas.nodes.forEach(node => {
    if (node.id === 'T003-sleep-anim-v4-video' && newRenders['T003-sleep-anim-v4-video']) {
      node.file = newRenders['T003-sleep-anim-v4-video'];
      updated = true;
    }
    if (node.id === 'T003-261day-anim-v4-video' && newRenders['T003-261day-anim-v4-video']) {
      node.file = newRenders['T003-261day-anim-v4-video'];
      updated = true;
    }
    if (node.id === 'T003-save30-anim-v4-video' && newRenders['T003-save30-anim-v4-video']) {
      node.file = newRenders['T003-save30-anim-v4-video'];
      updated = true;
    }
  });
  if (updated) {
    fs.writeFileSync(canvasPath, JSON.stringify(canvas, null, '\t'));
    console.log('Canvas updated with new margin renders.');
  }
}