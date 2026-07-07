const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1200 } });
  await page.goto('http://localhost:3000/services', { waitUntil: 'networkidle' });
  await page.locator('#consulting').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const info = await page.evaluate(() => {
    const section = document.getElementById('consulting');
    const textCol = section.querySelector('.svc-row-text');
    const ul = textCol.querySelector('ul');
    const btn = textCol.querySelector('a, button');
    const children = Array.from(textCol.children).map(c => {
      const r = c.getBoundingClientRect();
      const cs = getComputedStyle(c);
      return { tag: c.tagName, class: c.className, top: r.top, height: r.height, opacity: cs.opacity, display: cs.display };
    });
    return { textColRect: textCol.getBoundingClientRect(), children };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();
