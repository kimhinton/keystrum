import { chromium } from "playwright";
import { join } from "node:path";

const BASE = process.env.SCREENSHOT_BASE ?? "http://localhost:3000";
const PUBLIC = join(process.cwd(), "public");

const shots = [
  { path: "/", out: "hero-screenshot.png", viewport: { width: 1440, height: 900 } },
  { path: "/play", out: "play-screenshot.png", viewport: { width: 1440, height: 900 } },
  { path: "/chords", out: "chords-screenshot.png", viewport: { width: 1440, height: 900 } },
];

const browser = await chromium.launch();

for (const shot of shots) {
  const context = await browser.newContext({
    viewport: shot.viewport,
    deviceScaleFactor: 2,
    colorScheme: "dark",
  });
  const page = await context.newPage();
  const url = `${BASE}${shot.path}`;
  console.log(`loading ${url}...`);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(1500);
  const out = join(PUBLIC, shot.out);
  await page.screenshot({
    path: out,
    fullPage: false,
    clip: { x: 0, y: 0, width: shot.viewport.width, height: shot.viewport.height },
  });
  console.log(`  -> ${out}`);
  await context.close();
}

await browser.close();
console.log("done");
