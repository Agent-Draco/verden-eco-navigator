import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
  
  try {
    await page.goto('http://localhost:8085/home', { waitUntil: 'networkidle0', timeout: 8000 });
  } catch (e) {
    console.log('PAGE LOG:', 'Navigation timeout or error:', e.message);
  }
  
  const content = await page.content();
  console.log('PAGE HTML LENGTH:', content.length);
  const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML || 'NO ROOT');
  console.log('ROOT HTML:', rootHtml);
  
  await browser.close();
})();
