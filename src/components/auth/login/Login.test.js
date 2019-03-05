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


})

describe('Login', () => {
    test('users can see the login form', async () => {
        await page.goto(routes.public.login);
        await page.waitForSelector('.login-component-container');
    }, 1600000);

    test('users cannot login with empty inputs', async () => {
        await page.goto(routes.public.login);
        await page.waitForSelector('.login-component-container');

        await page.click('button[type=submit]');
    }, 1600000);

    test('users cannot login with only email', async () => {
        await page.goto(routes.public.login);
        await page.waitForSelector('.login-component-container');

        await page.click('input[name=username]')
        await page.type('input[name=username]', faker.internet.email())

        await page.click('button[type=submit]');
    }, 1600000);

    test('users cannot login with only password', async () => {
        await page.goto(routes.public.login);
        await page.waitForSelector('.login-component-container');

        await page.click('input[name=password]')
        await page.type('input[name=password]', faker.random.word())

        await page.click('button[type=submit]');
    }, 1600000);

    test('users should see error message on bad credentials', async () => {
        await page.goto(routes.public.login);
        await page.waitForSelector('.login-component-container');

        await page.click('input[name=username]')
        await page.type('input[name=username]', faker.internet.email())
        await page.click('input[name=password]')
        await page.type('input[name=password]', faker.random.word())
        await page.click('button[type=submit]')

        await page.waitForSelector('.errors');
    }, 1600000);

    test('users should login successfully', async () => {
        const accountDetails = {
            username: faker.internet.userName(),
            email: faker.internet.email(),
            password: faker.internet.password() + faker.internet.userName() + faker.internet.ip(),
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName()
        }

        await page.goto(routes.public.register);
        await page.waitForSelector('.register-component-container');

        await page.click('input[name=username]');
        await page.type('input[name=username]', accountDetails.username)

        await page.click('input[name=email]');
        await page.type('input[name=email]', accountDetails.email)

        await page.click('input[name=password]');
        await page.type('input[name=password]', accountDetails.password)

        await page.click('input[name=firstName]');
        await page.type('input[name=firstName]', accountDetails.firstName)

        await page.click('input[name=lastName]');
        await page.type('input[name=lastName]', accountDetails.lastName)

        await page.click('button[type=submit]');

        await page.waitForSelector('.posts-holder');

        await page.goto(routes.public.login);
        await page.waitForSelector('.login-component-container');

        await page.click('input[name=username]');
        await page.type('input[name=username]', accountDetails.username);
        await page.click('input[name=password]');
        await page.type('input[name=password]', accountDetails.password);
        await page.click('button[type=submit]');
        await page.waitForSelector('.nav-profile-holder');
    }, 1600000);
});

// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close()
})