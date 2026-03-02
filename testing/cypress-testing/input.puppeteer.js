// input.puppeteer.js
const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 802,
            height: 633
        })
    }
    {
        const targetPage = page;
        await targetPage.goto('http://localhost:5173/');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(new) >>>> ::-p-aria([role=\\"button\\"])'),
            targetPage.locator('nav button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/nav/a/button)'),
            targetPage.locator(':scope >>> nav button')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 41,
                y: 26,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.flex-col > div.grid > div > div > div > div:nth-of-type(1) > div'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div/div[2]/div[1]/div/div/div/div[1]/div)'),
            targetPage.locator(':scope >>> div.flex-col > div.grid > div > div > div > div:nth-of-type(1) > div')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 232.875,
                y: 76,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('div.flex-col > div.grid > div > div > div > div:nth-of-type(1) > div'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div/div[2]/div[1]/div/div/div/div[1]/div)'),
            targetPage.locator(':scope >>> div.flex-col > div.grid > div > div > div > div:nth-of-type(1) > div')
        ])
            .setTimeout(timeout)
            .fill('cypress test');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('html'),
            targetPage.locator('::-p-xpath(/html)'),
            targetPage.locator(':scope >>> html')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 666,
                y: 333,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(# deep)'),
            targetPage.locator('body > div:nth-of-type(2) div:nth-of-type(6)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"radix-_r_1k_\\"]/div[2]/div[6])'),
            targetPage.locator(':scope >>> body > div:nth-of-type(2) div:nth-of-type(6)'),
            targetPage.locator('::-p-text(# deep)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 83,
                y: 25,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(link-to-home) >>>> ::-p-aria([role=\\"button\\"])'),
            targetPage.locator('a > button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/div/div[1]/a/button)'),
            targetPage.locator(':scope >>> a > button')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 10.875,
                y: 24,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
