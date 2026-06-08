import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

async function overlayLogo() {
  const args = process.argv.slice(2);
  const opts = {
    bg: null,
    logo: null,
    out: null,
    color: 'white', // default
    x: 40, // default x per Lifeforce spec
    y: 290, // default y per Lifeforce spec
    width: 180 // default width for "small" logo
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--bg': opts.bg = args[++i]; break;
      case '--logo': opts.logo = args[++i]; break;
      case '--out': opts.out = args[++i]; break;
      case '--color': opts.color = args[++i]; break;
      case '--x': opts.x = parseInt(args[++i], 10); break;
      case '--y': opts.y = parseInt(args[++i], 10); break;
      case '--width': opts.width = parseInt(args[++i], 10); break;
    }
  }

  if (!opts.bg || !opts.logo || !opts.out) {
    console.error("Usage: node overlay_logo.js --bg <path> --logo <path> --out <path> [--x <num>] [--y <num>] [--width <num>] [--color white|black]");
    process.exit(1);
  }

  try {
    const bg = sharp(opts.bg);
    let logo = sharp(opts.logo);
    
    logo = logo.resize({ width: opts.width, fit: 'inside' });
    
    // If black is requested, we can negate the white logo (assuming the source is a white logo with alpha)
    if (opts.color === 'black') {
      // Negating a white logo with transparency turns the white to black, but also inverts alpha if not careful.
      // Easiest is to extract alpha, negate RGB, then re-attach alpha.
      const { data, info } = await logo.raw().toBuffer({ resolveWithObject: true });
      for (let i = 0; i < data.length; i += info.channels) {
        data[i] = 255 - data[i];       // R
        data[i+1] = 255 - data[i+1];   // G
        data[i+2] = 255 - data[i+2];   // B
      }
      logo = sharp(data, { raw: info });
    }

    const logoBuffer = await logo.toBuffer();

    await bg
      .composite([{ input: logoBuffer, left: opts.x, top: opts.y }])
      .toFile(opts.out);

    console.log(`Successfully overlaid logo on ${opts.bg} -> ${opts.out}`);
  } catch (err) {
    console.error(`Overlay failed: ${err.message}`);
    process.exit(1);
  }
}

overlayLogo();
