import { chromium } from "playwright";
import { execSync } from "child_process";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const FFMPEG = resolve(ROOT, "node_modules/ffmpeg-static/ffmpeg.exe");
const VIDEO_PATH = resolve(ROOT, "scripts/demo-raw.webm");
const GIF_PATH = resolve(ROOT, "public/demo.gif");
const SCREENSHOT_PATH = resolve(ROOT, "public/hero-screenshot.png");

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: resolve(ROOT, "scripts"), size: { width: 1280, height: 720 } },
  });

  const page = await context.newPage();
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await sleep(1500);

  // Take a clean hero screenshot first
  await page.screenshot({ path: SCREENSHOT_PATH, fullPage: false });
  console.log("Hero screenshot saved");

  // Simulate strum interactions for the demo
  // Strum C chord (2, w, s, x) - fast sweep
  async function strumColumn(keys, delay = 40) {
    for (const key of keys) {
      await page.keyboard.down(key);
      await sleep(delay);
    }
    await sleep(100);
    for (const key of keys.reverse()) {
      await page.keyboard.up(key);
      await sleep(20);
    }
  }

  await sleep(500);

  // Strum Am (1, q, a, z)
  await strumColumn(["1", "q", "a", "z"], 35);
  await sleep(800);

  // Strum C (2, w, s, x)
  await strumColumn(["2", "w", "s", "x"], 35);
  await sleep(800);

  // Strum Em (3, e, d, "c")
  await strumColumn(["3", "e", "d", "c"], 35);
  await sleep(800);

  // Strum G (4, r, f, v)
  await strumColumn(["4", "r", "f", "v"], 35);
  await sleep(800);

  // Strum Dm (5, t, g, b)
  await strumColumn(["5", "t", "g", "b"], 35);
  await sleep(800);

  // Strum F (6, y, h, "n")
  await strumColumn(["6", "y", "h", "n"], 35);
  await sleep(1000);

  // Quick chord progression: Am - F - C - G
  await strumColumn(["1", "q", "a", "z"], 30);
  await sleep(500);
  await strumColumn(["6", "y", "h", "n"], 30);
  await sleep(500);
  await strumColumn(["2", "w", "s", "x"], 30);
  await sleep(500);
  await strumColumn(["4", "r", "f", "v"], 30);
  await sleep(1200);

  // Close to finalize video
  await context.close();
  await browser.close();

  // Find the recorded video file
  const { readdirSync } = await import("fs");
  const scripts = resolve(ROOT, "scripts");
  const videos = readdirSync(scripts).filter((f) => f.endsWith(".webm"));
  const videoFile = resolve(scripts, videos[videos.length - 1]);

  console.log("Video saved:", videoFile);

  // Convert to GIF using ffmpeg
  // Two-pass for good quality: palette generation + GIF encoding
  const paletteCmd = `"${FFMPEG}" -y -i "${videoFile}" -vf "fps=15,scale=800:-1:flags=lanczos,palettegen=max_colors=128" "${resolve(scripts, "palette.png")}"`;
  const gifCmd = `"${FFMPEG}" -y -i "${videoFile}" -i "${resolve(scripts, "palette.png")}" -lavfi "fps=15,scale=800:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3" "${GIF_PATH}"`;

  console.log("Generating palette...");
  execSync(paletteCmd, { stdio: "inherit" });

  console.log("Converting to GIF...");
  execSync(gifCmd, { stdio: "inherit" });

  console.log("Demo GIF saved to:", GIF_PATH);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
