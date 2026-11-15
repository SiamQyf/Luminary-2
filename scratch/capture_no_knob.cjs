const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 2 });
  const page = await context.newPage();

  await page.goto('http://localhost:5173/preview.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    document.querySelector('.preview-player')?.setAttribute('data-theme', 'water-droplet');
    document.documentElement.setAttribute('data-theme', 'water-droplet');
  });
  await page.waitForTimeout(500);

  // Hover over volume pill
  const volPill = page.locator('.group\\/vol-pill');
  await volPill.hover();
  await page.waitForTimeout(400);

  // Capture current state with volume knob
  await volPill.screenshot({ path: 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/scratch/vol_with_knob.png' });

  // Hide volume slider thumb
  await page.addStyleTag({
    content: `
      .preview-player[data-theme="water-droplet"] .volume-slider-thumb {
        display: none !important;
      }
    `
  });
  await page.waitForTimeout(200);

  // Capture state with volume knob hidden
  await volPill.screenshot({ path: 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/scratch/vol_without_knob.png' });

  // Also capture the bottom controls bar showing seekbar and volume pill
  const bottomBar = page.locator('[data-part="bottom-controls-bar"]');
  if (await bottomBar.count() > 0) {
    await bottomBar.screenshot({ path: 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/scratch/bottom_bar_vol_no_knob.png' });
  }

  // Also test hiding seekbar knob as well
  await page.addStyleTag({
    content: `
      .preview-player[data-theme="water-droplet"] .group\\/slider .media-thumb-smooth {
        display: none !important;
      }
    `
  });
  await page.waitForTimeout(200);
  if (await bottomBar.count() > 0) {
    await bottomBar.screenshot({ path: 'C:/Users/Siam/.gemini/antigravity/brain/06e192c4-a4cc-45e6-b8bd-a398f6f48bd4/scratch/bottom_bar_both_no_knob.png' });
  }

  await browser.close();
  console.log('Screenshots captured successfully!');
})();
