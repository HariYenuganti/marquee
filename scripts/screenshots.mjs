/**
 * Regenerate README screenshots from the branch preview URL.
 *
 * One-time util — not part of the app runtime. Run after design changes:
 *
 *     npx playwright install chromium    # if you haven't already
 *     node scripts/screenshots.mjs
 *
 * Uses Vercel's `_vercel_share` token to bypass deployment protection on the
 * first page load (sets an auth cookie the rest of the session reuses). To
 * refresh the token, call the `get_access_to_vercel_url` Vercel MCP tool.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE =
  'https://marquee-git-claude-crazy-nobel-2a0705-hari-yenugantis-projects.vercel.app';
const BYPASS_TOKEN = 'PQ7AhXrruirzpsEiKYsFclvKxb1S67ih';
const OUT = './public/screenshots';

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1400, height: 900 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

// Prime the auth cookie via Vercel's shareable-link token.
await page.goto(`${BASE}/?_vercel_share=${BYPASS_TOKEN}`, {
  waitUntil: 'networkidle',
});

const targets = [
  { path: '/', file: 'home.png', settle: 1500 },
  { path: '/events/all', file: 'events.png', settle: 2000 },
  { path: '/event/low-country-blues-revue', file: 'event-detail.png', settle: 2500 },
];

for (const { path, file, settle } of targets) {
  const url = `${BASE}${path}`;
  console.log(`→ ${url}`);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(settle); // give fonts + picsum images a beat
  await page.screenshot({ path: `${OUT}/${file}`, fullPage: false });
  console.log(`  saved ${OUT}/${file}`);
}

await browser.close();
console.log('\nDone — 3 screenshots written to', OUT);
