import sharp from "sharp";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

const root = process.cwd();
const RES_ANDROID = join(root, "android/app/src/main/res");
const RES_IOS = join(root, "ios/App/App/Assets.xcassets");
const RES_OUT_IOS_ICON = join(RES_IOS, "AppIcon.appiconset");
const RES_OUT_IOS_SPLASH = join(RES_IOS, "Splash.imageset");

const ICON_SQUARE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <rect width="1024" height="1024" fill="#0b0b0f"/>
  <g fill="#ff6b35">
    <rect x="240" y="140" width="160" height="724" rx="16"/>
    <polygon points="400,400 600,400 780,180 580,180"/>
    <polygon points="400,604 600,604 780,824 580,824"/>
  </g>
</svg>`;

const ICON_FOREGROUND_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 432" width="432" height="432">
  <g fill="#ff6b35" transform="translate(85.5 85.5) scale(0.2549)">
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

const bgXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#0b0b0f</color>
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

console.log("native assets generated — Android mipmaps/drawables + iOS AppIcon + Splash");
