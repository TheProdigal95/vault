import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function run() {
  const basePath = '../../../';
  const bgPath = path.join(basePath, 'Elevate/00 Assets/T003/David_Ad_19/Var1/variant-1.png');
  const fgPath = path.join(basePath, 'elevate_screenshot.png');
  const outPath = path.join(basePath, 'Elevate/00 Assets/T003/David_Ad_19/Var1/variant-1-composite.png');

  const bg = sharp(bgPath);
  const metadata = await bg.metadata();
  console.log("Background dimensions:", metadata.width, "x", metadata.height);

  const fg = await sharp(fgPath)
    .resize({ width: 640, height: 400, fit: 'fill' })
    .toBuffer();

  const left = Math.floor((metadata.width - 640) / 2);
  const top = Math.floor((metadata.height - 400) / 2) - 100;

  await bg.composite([{ input: fg, left, top }]).toFile(outPath);
  console.log("Composited at", left, top);
}
run();
