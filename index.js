const puppeteer = require('puppeteer');

(async () => {
    try {
        const args = [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
        ];

        const options = {
            args,
            headless: true,
            ignoreHTTPSErrors: true,
            userDataDir: './tmp'
        };

        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();

        await page.goto('https://experts.shopify.com/');
        await page.waitForSelector('._3OHLp');
        const sections = await page.$$('._3OHLp');

        const object = [];
        for (let index = 0; index < sections.length; index++) {
            await page.goto('https://experts.shopify.com/');
            await page.waitForSelector('._3OHLp');
            const sections = await page.$$('._3OHLp');

            const section = sections[index];
            const button = await section.$('._1GdgP');
            const btnName = await button.$eval('h3', h3 => h3.innerText);
            object.push({ name: btnName })
            button.click();

            await page.waitForSelector('.kVWrj');
            const lis = await page.$$('.kVWrj');
            const a = [];
            for (const li of lis) {
                const name = await li.$eval('h2', h2 => h2.innerText);
                a.push(name);
                object[index].list = a;
            }

        }
        console.log(object);

        await browser.close();
    } catch (e) {
        console.log('our error', e);
    }

})();
