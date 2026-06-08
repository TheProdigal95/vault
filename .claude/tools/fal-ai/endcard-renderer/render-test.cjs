const puppeteer = require('puppeteer');
const path = require('path');

async function render() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });
  
  const htmlPath1 = 'file://' + path.resolve(__dirname, 'ec-m1-v1.html');
  await page.goto(htmlPath1, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.resolve(__dirname, 'test-ec-m1.png') });
  
  const htmlPath2 = 'file://' + path.resolve(__dirname, 'ec-m2-v1.html');
  await page.goto(htmlPath2, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.resolve(__dirname, 'test-ec-m2.png') });
  
  await browser.close();
  console.log('Done!');
}
render();
