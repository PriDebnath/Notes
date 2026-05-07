const puppeteer = require('puppeteer'); // v23.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 716,
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
            targetPage.locator('::-p-aria(delete-21)'),
            targetPage.locator('div > div > div > div:nth-of-type(1) > div:nth-of-type(1) button.hover\\:text-destructive'),
            targetPage.locator('::-p-xpath(//*[@id=\\"root\\"]/div/main/div/div/div/div[1]/div[1]/a/div/div[2]/div/button[2])'),
            targetPage.locator(':scope >>> div > div > div > div:nth-of-type(1) > div:nth-of-type(1) button.hover\\:text-destructive')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 15,
                y: 10.015625,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(delete)'),
            targetPage.locator('div.flex-col-reverse > button'),
            targetPage.locator('::-p-xpath(//*[@id=\\"radix-_r_5c_\\"]/div[3]/button)'),
            targetPage.locator(':scope >>> div.flex-col-reverse > button'),
            targetPage.locator('::-p-text(Delete Note)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 46.703125,
                y: 16.5,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
