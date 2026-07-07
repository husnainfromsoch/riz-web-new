const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  // scroll through whole page slowly to trigger all animations
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += 400) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'scratch_full.png', fullPage: true });
  await browser.close();
})();
