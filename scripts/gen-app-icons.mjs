import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { resolve, join } from "node:path";

const RES = resolve(process.cwd(), "resources");
mkdirSync(RES, { recursive: true });

const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" fill="#0b0b0f"/>
  <g fill="#ff6b35">
    <rect x="240" y="140" width="160" height="724" rx="16"/>
    <polygon points="400,400 600,400 780,180 580,180"/>
    <polygon points="400,604 600,604 780,824 580,824"/>
  </g>
</svg>`;

const SPLASH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2732 2732" width="2732" height="2732">
  <rect width="2732" height="2732" fill="#0b0b0f"/>
  <g transform="translate(601 613) scale(1.5)">
    <g fill="#ff6b35">
      <rect x="240" y="140" width="160" height="724" rx="16"/>
      <polygon points="400,400 600,400 780,180 580,180"/>
      <polygon points="400,604 600,604 780,824 580,824"/>
    </g>
  </g>
</svg>`;

await sharp(Buffer.from(ICON_SVG)).png().toFile(join(RES, "icon.png"));
await sharp(Buffer.from(SPLASH_SVG)).png().toFile(join(RES, "splash.png"));
console.log("wrote resources/icon.png (1024x1024) + resources/splash.png (2732x2732)");
