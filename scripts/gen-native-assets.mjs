import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const RES_ANDROID = join(root, "android/app/src/main/res");
const RES_IOS = join(root, "ios/App/App/Assets.xcassets");
const RES_OUT_IOS_ICON = join(RES_IOS, "AppIcon.appiconset");
const RES_OUT_IOS_SPLASH = join(RES_IOS, "Splash.imageset");

// V2 "Dark Stage" strum-burst — matches src/app/apple-icon.tsx.

// Square icon (iOS + Android legacy launcher): 1024x1024 with #18181F bg + strum-burst.
const ICON_SQUARE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 130" width="1024" height="1024">
  <rect width="130" height="130" fill="#18181F"/>
  <circle cx="32" cy="44" r="16" fill="#FF3864"/>
  <circle cx="72" cy="30" r="11" fill="#FFC857"/>
  <rect x="60" y="58" width="28" height="28" rx="8" fill="#7B2CBF"/>
  <circle cx="98" cy="82" r="13" fill="#2EC4B6"/>
  <rect x="22" y="80" width="22" height="22" rx="6" fill="#FFC857" transform="rotate(15 33 91)"/>
  <circle cx="76" cy="106" r="8" fill="#FF3864"/>
</svg>`;

// Android adaptive icon foreground: 432x432 viewBox, design occupies center ~66% (safe zone).
// 130 * 2.2 = 286 → offset (432-286)/2 = 73.
const ICON_FOREGROUND_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 432" width="432" height="432">
  <g transform="translate(73 73) scale(2.2)">
    <circle cx="32" cy="44" r="16" fill="#FF3864"/>
    <circle cx="72" cy="30" r="11" fill="#FFC857"/>
    <rect x="60" y="58" width="28" height="28" rx="8" fill="#7B2CBF"/>
    <circle cx="98" cy="82" r="13" fill="#2EC4B6"/>
    <rect x="22" y="80" width="22" height="22" rx="6" fill="#FFC857" transform="rotate(15 33 91)"/>
    <circle cx="76" cy="106" r="8" fill="#FF3864"/>
  </g>
</svg>`;

// Splash: #0E0E12 bg + centered strum-burst at ~40% of canvas.
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

const iconBuf = Buffer.from(ICON_SQUARE_SVG);
const foregroundBuf = Buffer.from(ICON_FOREGROUND_SVG);
const splashBuf = Buffer.from(SPLASH_SVG);

const androidSizes = {
  "mipmap-mdpi": { icon: 48, foreground: 108 },
  "mipmap-hdpi": { icon: 72, foreground: 162 },
  "mipmap-xhdpi": { icon: 96, foreground: 216 },
  "mipmap-xxhdpi": { icon: 144, foreground: 324 },
  "mipmap-xxxhdpi": { icon: 192, foreground: 432 },
};

for (const [bucket, sizes] of Object.entries(androidSizes)) {
  const dir = join(RES_ANDROID, bucket);
  mkdirSync(dir, { recursive: true });
  await sharp(iconBuf)
    .resize(sizes.icon, sizes.icon)
    .png()
    .toFile(join(dir, "ic_launcher.png"));
  await sharp(iconBuf)
    .resize(sizes.icon, sizes.icon)
    .png()
    .toFile(join(dir, "ic_launcher_round.png"));
  await sharp(foregroundBuf)
    .resize(sizes.foreground, sizes.foreground)
    .png()
    .toFile(join(dir, "ic_launcher_foreground.png"));
}

const splashPortSizes = {
  "drawable": 2732,
  "drawable-port-mdpi": 480,
  "drawable-port-hdpi": 800,
  "drawable-port-xhdpi": 1280,
  "drawable-port-xxhdpi": 1600,
  "drawable-port-xxxhdpi": 1920,
  "drawable-land-mdpi": 480,
  "drawable-land-hdpi": 800,
  "drawable-land-xhdpi": 1280,
  "drawable-land-xxhdpi": 1600,
  "drawable-land-xxxhdpi": 1920,
};
for (const [bucket, size] of Object.entries(splashPortSizes)) {
  const dir = join(RES_ANDROID, bucket);
  mkdirSync(dir, { recursive: true });
  await sharp(splashBuf)
    .resize(size, size, { fit: "cover" })
    .png()
    .toFile(join(dir, "splash.png"));
}

// Adaptive icon background color — matches apple-icon surface #18181F (V2).
const bgXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#18181F</color>
</resources>
`;
writeFileSync(
  join(RES_ANDROID, "values/ic_launcher_background.xml"),
  bgXml,
  "utf8"
);

mkdirSync(RES_OUT_IOS_ICON, { recursive: true });
await sharp(iconBuf)
  .resize(1024, 1024)
  .png()
  .toFile(join(RES_OUT_IOS_ICON, "AppIcon-512@2x.png"));

mkdirSync(RES_OUT_IOS_SPLASH, { recursive: true });
await sharp(splashBuf)
  .resize(2732, 2732)
  .png()
  .toFile(join(RES_OUT_IOS_SPLASH, "splash-2732x2732.png"));
await sharp(splashBuf)
  .resize(2732, 2732)
  .png()
  .toFile(join(RES_OUT_IOS_SPLASH, "splash-2732x2732-1.png"));
await sharp(splashBuf)
  .resize(2732, 2732)
  .png()
  .toFile(join(RES_OUT_IOS_SPLASH, "splash-2732x2732-2.png"));

console.log("native assets generated — Android mipmaps/drawables + iOS AppIcon + Splash — V2 strum-burst");
