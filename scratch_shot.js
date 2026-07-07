const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  await page.locator('#consulting').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'scratch_consulting.png', fullPage: false });
  await page.screenshot({ path: 'scratch_full.png', fullPage: true });
  await browser.close();
})();
