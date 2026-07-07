const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const widths = [1920, 1366, 1280, 1024, 820, 390];
  for (const w of widths) {
    const page = await browser.newPage({ viewport: { width: w, height: 900 } });
    await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
    const height = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < height; y += 300) {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(80);
    }
    await page.waitForTimeout(300);
    const ids = ['consulting', 'projects', 'workshops'];
    const data = {};
    for (const id of ids) {
      data[id] = await page.evaluate((id) => {
        const el = document.getElementById(id);
        const rect = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        const row = el.querySelector('.svc-row');
        const rowRect = row.getBoundingClientRect();
        return { sectionHeight: rect.height, padTop: cs.paddingTop, padBottom: cs.paddingBottom, rowHeight: rowRect.height, minHeight: cs.minHeight };
      }, id);
    }
    console.log(w, JSON.stringify(data));
    await page.close();
  }
  await browser.close();
})();
