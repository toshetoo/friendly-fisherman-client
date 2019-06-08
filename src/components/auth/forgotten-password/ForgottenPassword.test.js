const faker = require('faker');
const puppeteer = require('puppeteer');
const routes = require('../../../../test/test.cofig').routes;

//create global variables to be used in the beforeAll function
let browser
let page

beforeAll(async () => {

    jest.setTimeout(30000);
    // launch browser	
    browser = await puppeteer.launch(
        {
            headless: false, // headless mode set to false so browser opens up with visual feedback
            slowMo: 10, // how slow actions should be
            args: ['--start-fullscreen']
        }
    )
    // creates a new page in the opened browser	
    page = await browser.newPage()

    page.emulate({
        viewport: {
            width: 1900,
            height: 1300
        },
        userAgent: ''
    });


});

describe('Forgotten Password', () => {
    test('users can see the form', async () => {
        await page.goto(routes.public.forgottenPassword);
        await page.waitForSelector('.forgotten-password-holder');
    }, 1600000);

    test('users cannot request password with empty inputs', async () => {
        await page.goto(routes.public.forgottenPassword);
        await page.waitForSelector('.forgotten-password-holder');

        await page.click('button[type=submit]');
    }, 1600000);

    test('users should see error message on bad email', async () => {
        await page.goto(routes.public.forgottenPassword);
        await page.waitForSelector('.forgotten-password-holder');

        await page.click('input[name=email]')
        await page.type('input[name=email]', faker.internet.email())

        await page.click('button[type=submit]')

        await page.waitForSelector('.errors');
    }, 1600000);

    test('users should receive mail successfully', async () => {
        const accountDetails = {
            email: 'admin@ff.com'
        }

        await page.goto(routes.public.forgottenPassword);
        await page.waitForSelector('.forgotten-password-holder');

        await page.click('input[name=email]');
        await page.type('input[name=email]', accountDetails.email)

        await page.click('button[type=submit]');

        await page.waitForSelector('.text-success');
    }, 1600000);
});

// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close()
})