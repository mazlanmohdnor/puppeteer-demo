// const puppeteer = require('puppeteer');
const puppeteer = require("puppeteer-extra")
const randomUseragent = require('random-useragent');
const pluginStealth = require("puppeteer-extra-plugin-stealth");
puppeteer.use(pluginStealth());

(async () => {
    try {
        const args = [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
        ];

        const options = {
            args,
            headless: false,
            ignoreHTTPSErrors: true,
            userDataDir: './tmp'
        };

        const browser = await puppeteer.launch(options);
        const page = await browser.newPage();
        await page.setUserAgent(randomUseragent.getRandom())
        await page.setViewport({ width: 800, height: 600 })
        await page.goto('https://www.aftership.com/couriers/jne');

        await page.waitForSelector('body > main > div > section:nth-child(1) > div > h1');
        const element = await page.$("body > main > div > section:nth-child(1) > div > h1");
        const text = await page.evaluate(element => element.textContent, element);
        console.log('title', text);

        await page.waitForSelector('div.track-button-link > a');
        const dd = await page.evaluate(() => document.querySelector('div.track-button-link > a').textContent);
        console.log('tracking no', dd);

        await page.waitForNavigation();
        await page.evaluate(() => document.querySelector('#tracking_number ').textContent);
        await page.type('#tracking_number', 'World', { delay: 100 });
        console.log('btntext', response);


        // await page.waitForSelector('#tracking_number > input.text-input');
        // await page.type('#tracking_number > input.text-input', '012500387183819', { delay: 100 });
        // await page.click('#as_track');




        // await page.waitForSelector('.tracking-list > .tracking-item');
        // const sections = await page.$$('.tracking-item');

        // console.log('section:', sections.length);

        // const object = [];
        // for (let index = 0; index < sections.length; index++) {

        //     const section = sections[index];
        //     // const description = await section.$('.tracking-content');
        //     const text = await section.$eval('.tracking-content', element => element.textContent);
        //     console.log('description', text);

        // object.push({ name: btnName })
        // button.click();

        // await page.waitForSelector('.kVWrj');
        // const lis = await page.$$('.kVWrj');
        // const a = [];
        // for (const li of lis) {
        //     const name = await li.$eval('h2', h2 => h2.innerText);
        //     a.push(name);
        //     object[index].list = a;
        // }

        // }
        // console.log(object);

        // await browser.close();
    } catch (e) {
        console.log('our error', e);
    }

})();
