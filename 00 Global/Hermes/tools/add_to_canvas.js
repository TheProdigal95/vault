const fs = require('fs');
const path = require('path');

async function addToCanvas() {
  const args = process.argv.slice(2);
  const opts = {
    canvas: null,
    files: [],
    label: 'New Variants',
    promptFile: null
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--canvas': opts.canvas = args[++i]; break;
      case '--files': opts.files = args[++i].split(','); break;
      case '--label': opts.label = args[++i]; break;
      case '--prompt-file': opts.promptFile = args[++i]; break;
    }
  }

  if (!opts.canvas || opts.files.length === 0) {
    console.error("Usage: node add_to_canvas.js --canvas <path> --files <f1,f2> [--label <text>] [--prompt-file <path>]");
    process.exit(1);
  }

  let original;
  try {
    original = JSON.parse(fs.readFileSync(opts.canvas, 'utf8'));
  } catch(e) {
    original = { nodes: [], edges: [] };
  }

  // Find maximum Y to avoid overlaps
  let maxY = 0;
  original.nodes.forEach(n => {
    const bottom = n.y + (n.height || 0);
    if (bottom > maxY) maxY = bottom;
  });

  const startY = maxY + 100;
  const startX = 0;
  const imageStartX = opts.promptFile ? 850 : startX;

  const newNodes = [
    {
      "id": `label-${Date.now()}`,
      "type": "text",
      "text": `# ${opts.label}`,
      "x": startX,
      "y": startY,
      "width": 600,
      "height": 50,
      "color": "2"
    }
  ];

  if (opts.promptFile) {
    newNodes.push({
      "id": `prompt-${Date.now()}`,
      "type": "text",
      "text": fs.readFileSync(opts.promptFile, 'utf8'),
      "x": startX,
      "y": startY + 60,
      "width": 800,
      "height": 711
    });
  }

  opts.files.forEach((file, idx) => {
    newNodes.push({
      "id": `file-${Date.now()}-${idx}`,
      "type": "file",
      "file": file,
      "x": imageStartX + (idx * 450),
      "y": startY + 60,
      "width": 400,
      "height": 711
    });
  });

  original.nodes.push(...newNodes);
  fs.mkdirSync(path.dirname(opts.canvas), { recursive: true });
  fs.writeFileSync(opts.canvas, JSON.stringify(original, null, '\t'));
  console.log(`Canvas updated: ${opts.canvas}. Added ${opts.files.length} images.`);
}

addToCanvas();
