import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { resolve, join } from "node:path";

const RES = resolve(process.cwd(), "resources");
mkdirSync(RES, { recursive: true });

// V2 "Dark Stage" strum-burst design — matches src/app/apple-icon.tsx.
// viewBox 130x130, rendered at 1024x1024 by sharp.
const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130" width="1024" height="1024">
  <rect width="130" height="130" fill="#18181F"/>
  <circle cx="32" cy="44" r="16" fill="#FF3864"/>
  <circle cx="72" cy="30" r="11" fill="#FFC857"/>
  <rect x="60" y="58" width="28" height="28" rx="8" fill="#7B2CBF"/>
  <circle cx="98" cy="82" r="13" fill="#2EC4B6"/>
  <rect x="22" y="80" width="22" height="22" rx="6" fill="#FFC857" transform="rotate(15 33 91)"/>
  <circle cx="76" cy="106" r="8" fill="#FF3864"/>
</svg>`;

// Splash: #0E0E12 full-canvas bg, centered strum-burst at ~40% width (1093px of 2732px).
// 130 * 8.4 = 1092 → centered at (2732-1092)/2 = 820.
const SPLASH_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2732 2732" width="2732" height="2732">
  <rect width="2732" height="2732" fill="#0E0E12"/>
  <g transform="translate(820 820) scale(8.4)">
    <circle cx="32" cy="44" r="16" fill="#FF3864"/>
    <circle cx="72" cy="30" r="11" fill="#FFC857"/>
    <rect x="60" y="58" width="28" height="28" rx="8" fill="#7B2CBF"/>
    <circle cx="98" cy="82" r="13" fill="#2EC4B6"/>
    <rect x="22" y="80" width="22" height="22" rx="6" fill="#FFC857" transform="rotate(15 33 91)"/>
    <circle cx="76" cy="106" r="8" fill="#FF3864"/>
  </g>
</svg>`;

await sharp(Buffer.from(ICON_SVG)).png().toFile(join(RES, "icon.png"));
await sharp(Buffer.from(SPLASH_SVG)).png().toFile(join(RES, "splash.png"));
console.log("wrote resources/icon.png (1024x1024) + resources/splash.png (2732x2732) — V2 strum-burst");
