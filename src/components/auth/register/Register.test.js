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
        }
    )
    // creates a new page in the opened browser	
    page = await browser.newPage();

    page.emulate({
        viewport: {
            width: 1200,
            height: 700
        },
        userAgent: ''
    });

    await page.goto(routes.public.register);
})

describe('Register', () => {
    test('users can see the register form', async () => {
        await page.waitForSelector('.register-component-container');
    }, 1600000);

    test('users cannot register with empty inputs', async () => {
        await page.waitForSelector('.register-component-container');

        await page.click('button[type=submit]');
    }, 1600000);

    test('users cannot register with only email', async () => {
        await page.waitForSelector('.register-component-container');

        await page.click('input[name=username]')
        await page.type('input[name=username]', faker.internet.email())

        await page.click('button[type=submit]');
    }, 1600000);

    test('users cannot register with only username', async () => {
        await page.waitForSelector('.register-component-container');

        await page.click('input[name=username]')
        await page.type('input[name=username]', faker.random.word())

        await page.click('button[type=submit]');
    }, 1600000);

    test('users cannot register with only password', async () => {
        await page.waitForSelector('.register-component-container');

        await page.click('input[name=password]')
        await page.type('input[name=password]', faker.random.word())

        await page.click('button[type=submit]');
    }, 1600000);

    test('users cannot register with only firstName', async () => {
        await page.waitForSelector('.register-component-container');

        await page.click('input[name=firstName]')
        await page.type('input[name=firstName]', faker.random.word())

        await page.click('button[type=submit]');
    }, 1600000);

    test('users cannot register with only lastName', async () => {
        await page.waitForSelector('.register-component-container');

        await page.click('input[name=lastName]')
        await page.type('input[name=lastName]', faker.random.word())

        await page.click('button[type=submit]');
    }, 1600000);

    test('users should see error message on taken email', async () => {
        await page.waitForSelector('.register-component-container');

        await page.click('input[name=username]')
        await page.type('input[name=username]', faker.random.word())

        await page.click('input[name=email]')
        await page.type('input[name=email]', faker.internet.email())

        await page.click('input[name=password]')
        await page.type('input[name=password]', faker.random.word())

        await page.click('input[name=firstName]')
        await page.type('input[name=firstName]', faker.random.word())

        await page.click('input[name=lastName]')
        await page.type('input[name=lastName]', faker.random.word())

        await page.click('button[type=submit]')

        //TODO add check for msg
    }, 1600000);

    test('users should register successfully', async () => {
        // TODO use real values        
        await page.waitForSelector('.register-component-container');

        await page.click('input[name=username]')
        await page.type('input[name=username]', faker.random.word())

        await page.click('input[name=email]')
        await page.type('input[name=email]', faker.internet.email())

        await page.click('input[name=password]')
        await page.type('input[name=password]', faker.random.word())

        await page.click('input[name=firstName]')
        await page.type('input[name=firstName]', faker.random.word())

        await page.click('input[name=lastName]')
        await page.type('input[name=lastName]', faker.random.word())

        await page.click('button[type=submit]')

        //TODO add check for redirect
    }, 1600000);
});

// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close()
})