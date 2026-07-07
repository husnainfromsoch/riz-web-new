const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  const ids = ['consulting', 'projects', 'workshops'];
  for (const id of ids) {
    const info = await page.evaluate((id) => {
      const el = document.getElementById(id);
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      const row = el.querySelector('.svc-row');
      const rowRect = row ? row.getBoundingClientRect() : null;
      const maxw = el.querySelector('.max-w-site');
      const maxwRect = maxw ? maxw.getBoundingClientRect() : null;
      return {
        sectionHeight: rect.height,
        paddingTop: cs.paddingTop,
        paddingBottom: cs.paddingBottom,
        minHeight: cs.minHeight,
        display: cs.display,
        alignItems: cs.alignItems,
        rowHeight: rowRect ? rowRect.height : null,
        maxwHeight: maxwRect ? maxwRect.height : null,
      };
    }, id);
    console.log(id, JSON.stringify(info));
  }
  await browser.close();
})();
