// Accessibility audit — runs axe-core via Playwright against the live
// production site. WCAG 2.1 A + AA rules by default.
//
// Usage:
//   node scripts/axe-check.mjs               # production
//   AXE_BASE_URL=http://localhost:3000 node scripts/axe-check.mjs   # local
//
// Exit codes:
//   0 — no violations
//   1 — at least one violation
//   2 — script error (bad URL, browser launch fail, etc.)

import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const BASE = process.env.AXE_BASE_URL ?? "https://keystrum.app";
const PATHS = ["/", "/me", "/chords", "/chords/c-major", "/play/rising-sun", "/about"];

const RUN_AT = new Date().toISOString();
console.log(`axe-core accessibility check @ ${RUN_AT}`);
console.log(`base: ${BASE}`);
console.log(`pages: ${PATHS.length}`);
console.log("");

let browser;
try {
  browser = await chromium.launch();
} catch (err) {
  console.error("Failed to launch chromium:", err.message);
  process.exit(2);
}

let totalViolations = 0;
const summary = [];

for (const path of PATHS) {
  const url = `${BASE}${path}`;
  // axe-core/playwright requires a context-owned page (not browser.newPage()).
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const count = results.violations.length;
    totalViolations += count;
    summary.push({ url, count, violations: results.violations });
    if (count === 0) {
      console.log(`OK  ${url}`);
    } else {
      console.log(`✗   ${url} — ${count} violation${count === 1 ? "" : "s"}`);
      for (const v of results.violations) {
        console.log(`      [${v.impact}] ${v.id}: ${v.description}`);
        for (const node of v.nodes.slice(0, 2)) {
          console.log(`        target: ${node.target.join(", ")}`);
        }
      }
    }
  } catch (err) {
    console.error(`ERR ${url}: ${err.message}`);
    totalViolations += 1;
  } finally {
    await context.close();
  }
}

await browser.close();

console.log("");
console.log(`---`);
console.log(`Total: ${totalViolations} WCAG 2.1 A/AA violation${totalViolations === 1 ? "" : "s"} across ${PATHS.length} pages.`);
process.exit(totalViolations > 0 ? 1 : 0);
