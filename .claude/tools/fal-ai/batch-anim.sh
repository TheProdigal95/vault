#!/bin/bash
# Batch animation generation for IM8 background textures
# Applies winning principles: immediate motion, edge-to-edge, camera movement, organic action

BASE="/Users/marce/Library/Mobile Documents/iCloud~md~obsidian/Documents/Reach Digital"
BG="$BASE/IM8/00 Assets/Statics/energy-textured/backgrounds"
OUT="$BG/anim-tests"
TOOL="$BASE/.claude/tools/fal-ai/generate-video.js"

run_gen() {
  local name="$1"
  local src="$2"
  local outdir="$3"
  local prompt="$4"
  echo ">>> Starting: $name"
  node "$TOOL" \
    --first-frame "$src" \
    --prompt "$prompt" \
    --output "$outdir" \
    --model kling \
    --duration 5s 2>&1 | while read line; do echo "[$name] $line"; done
  echo "<<< Done: $name"
}

# 1. Cell dividing (v5)
run_gen "cell-dividing-v5" \
  "$BG/bg-cell-dividing.png" \
  "$OUT/cell-dividing-kling-v5" \
  "Microscope footage beginning immediately from frame one: slow steady camera push-in toward the dividing cell, internal vesicles and organelles slowly churning within both lobes, tiny bubbles gently rising through the surrounding blue fluid across the entire frame, subtle light caustics rippling continuously edge to edge, the cell membrane softly pulsating, ambient particles drifting throughout the scene from all directions" &

# 2. Mitochondria (v5)
run_gen "mitochondria-v5" \
  "$BG/bg-mitochondria.png" \
  "$OUT/mitochondria-kling-v5" \
  "Electron microscope footage beginning immediately from the first frame: slow gentle camera drift across densely packed mitochondria, cristae membrane folds softly undulating with metabolic rhythm, tiny luminous particles flowing through intercellular spaces, warm bioluminescent pulses traveling through the tissue edge to edge, the entire organic surface gently breathing with continuous living motion" &

# 3. Coral botanical (v2)
run_gen "coral-botanical-v2" \
  "$BG/bg-coral-botanical.png" \
  "$OUT/coral-botanical-kling-v2" \
  "Underwater macro footage beginning immediately from frame one: soft current gently swaying the coral branches continuously throughout the frame, tiny luminous particles and organic spores slowly drifting across the entire scene edge to edge, branches subtly oscillating back and forth, slow camera drift forward into the coral, warm ambient light gently flickering, the soft background slowly shifting and breathing" &

# 4. Coral branch (v2)
run_gen "coral-branch-v2" \
  "$BG/bg-coral-branch.png" \
  "$OUT/coral-branch-kling-v2" \
  "Underwater macro footage beginning immediately from frame one: gentle ocean current slowly swaying the coral branch, tiny suspended particles drifting across the full frame edge to edge continuously, coral polyps subtly extending and retracting, slow camera drift upward past the branch, ambient light slowly shifting through the water column, the entire scene alive with underwater movement including the background" &

# 5. Collagen fibers (v2)
run_gen "collagen-fibers-v2" \
  "$BG/bg-collagen-fibers.png" \
  "$OUT/collagen-fibers-kling-v2" \
  "Fluorescence microscope footage beginning immediately from frame one: luminous blue collagen fibers slowly flowing and undulating like silk strands in gentle current, golden highlights shimmering as light shifts across the fiber surface edge to edge, slow camera push forward into the dense fiber network, the entire mass of strands gently rippling with fluid organic motion reaching every edge of the frame" &

# 6. Cordyceps (v2)
run_gen "cordyceps-v2" \
  "$BG/bg-cordyceps.png" \
  "$OUT/cordyceps-kling-v2" \
  "Extreme macro footage beginning immediately from frame one: golden organic web-like fungal tissue slowly breathing with subtle expansion and contraction, translucent membranes gently pulsing, warm light slowly traveling through the fibrous structure edge to edge, slow camera drift across the textured surface, the entire frame alive with organic cellular movement reaching every edge" &

# 7. Enoki cluster (v2)
run_gen "enoki-cluster-v2" \
  "$BG/bg-enoki-cluster.png" \
  "$OUT/enoki-cluster-kling-v2" \
  "Macro footage beginning immediately from frame one: enoki mushroom stems gently swaying as if in soft underwater current, slow camera push-in through the dense cluster, individual stems subtly shifting and oscillating independently, soft ambient light slowly traveling across the white caps, the entire cluster alive with gentle organic movement visible at every edge of the frame" &

# 8. Leaf stomata (v2)
run_gen "leaf-stomata-v2" \
  "$BG/bg-leaf-stomata.png" \
  "$OUT/leaf-stomata-kling-v2" \
  "Microscope footage beginning immediately from frame one: stomata pores slowly breathing open and closed with transpiration rhythm, the green cellular grid gently pulsing with life, tiny moisture droplets slowly forming and traveling on the surface, slow camera drift across the leaf surface, the entire cellular network moving edge to edge with continuous organic breathing motion" &

echo "All 8 generations launched in parallel. Waiting for completion..."
wait
echo "=== ALL GENERATIONS COMPLETE ==="
