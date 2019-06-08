const faker = require('faker');
const puppeteer = require('puppeteer');
const routes = require('../../../../../test/test.cofig').routes;

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
    page = await browser.newPage();

    page.emulate({
        viewport: {
            width: 1900,
            height: 1300
        },
        userAgent: ''
    });

    await page.goto(routes.public.register);
});

const login = async () => {
    const username = 'admin';
    const pass = 'Qwerty123!';        
    await page.goto(routes.public.login);
    await page.waitForSelector('.login-component-container');

    await page.click('input[name=username]');
    await page.type('input[name=username]', username);
    await page.click('input[name=password]');
    await page.type('input[name=password]', pass);
    await page.click('button[type=submit]');
    await page.waitForSelector('.nav-profile-holder');
}

describe('Add Category', () => {
    test('users can see the form', async () => {
        await login();
        await page.goto(routes.private.admin.categories.add);
        await page.waitForSelector('.form-holder');
    }, 1600000);

    test('users cannot add category with empty inputs', async () => {
        await login();
        await page.goto(routes.private.admin.categories.add);
        await page.waitForSelector('.form-holder');

        await page.click('button[type=submit]');
    }, 1600000);

    test('users can create category', async () => {
        await login();
        await page.goto(routes.private.admin.categories.add);
        await page.waitForSelector('.form-holder');

        await page.click('input[name=name]', {clickCount: 3})
        await page.keyboard.press('Backspace')
        await page.type('input[name=name]', faker.random.word())

        await page.click('button[type=submit]');

        await page.waitForSelector('.categories-list');
    }, 1600000);

});

// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close()
})
