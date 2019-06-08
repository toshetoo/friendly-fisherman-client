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

describe('Add Polls', () => {
    test('users can see the form', async () => {
        await login();
        await page.goto(routes.private.admin.polls.add);
        await page.waitForSelector('.form-holder');
    }, 1600000);

    test('users cannot add poll with empty inputs', async () => {
        await login();
        await page.goto(routes.private.admin.polls.add);
        await page.waitForSelector('.form-holder');

        await page.click('button[type=submit]');
    }, 1600000);

    test('users cannot add poll with only question', async () => {
        await login();
        await page.goto(routes.private.admin.polls.add);
        await page.waitForSelector('.form-holder');

        await page.click('input[name=question]', {clickCount: 3})
        await page.keyboard.press('Backspace')
        await page.type('input[name=question]', faker.random.word())

        await page.click('button[type=submit]');
    }, 1600000);

    test('users cannot add poll with only startDate', async () => {
        await login();
        await page.goto(routes.private.admin.polls.add);
        await page.waitForSelector('.form-holder');

        await page.click('input[name=createdOn]', {clickCount: 3})
        await page.keyboard.press('Backspace')
        await page.type('input[name=createdOn]', faker.random.word())

        await page.click('button[type=submit]');
    }, 1600000);

    test('users cannot add poll with only endDate', async () => {
        await login();
        await page.goto(routes.private.admin.polls.add);
        await page.waitForSelector('.form-holder');

        await page.click('input[name=endOn]', {clickCount: 3})
        await page.keyboard.press('Backspace')
        await page.type('input[name=endOn]', faker.random.word())

        await page.click('button[type=submit]');
    }, 1600000);

    test('users can add answers', async () => {
        await login();
        await page.goto(routes.private.admin.polls.add);
        await page.waitForSelector('.form-holder');        

        await page.click('button[type=button]');
        await page.click('button[type=button]');

        const answerCount = await page.$$('.poll-answer').length;
        expect(answerCount).toEqual(2);

    }, 1600000);


    test('users can create poll', async () => {
        await login();
        await page.goto(routes.private.admin.polls.add);
        await page.waitForSelector('.form-holder');

        await page.click('input[name=question]', {clickCount: 3})
        await page.keyboard.press('Backspace')
        await page.type('input[name=question]', faker.random.word())

        await page.click('input[name=startOn]', {clickCount: 3})
        await page.keyboard.press('Backspace')
        await page.type('input[name=startOn]', '06/19/2019')

        await page.click('input[name=endOn]', {clickCount: 3})
        await page.keyboard.press('Backspace')
        await page.type('input[name=endOn]', '06/25/2019')

        await page.click('button[type=button]');
        await page.click('button[type=button]');

        await page.click('input[name=0]', {clickCount: 3})
        await page.keyboard.press('Backspace')
        await page.type('input[name=0]', faker.random.word())

        await page.click('input[name=1]', {clickCount: 3})
        await page.keyboard.press('Backspace')
        await page.type('input[name=1]', faker.random.word())

        await page.click('button[type=submit]');

        await page.waitForSelector('.polls-list');
    }, 1600000);

});

// This function occurs after the result of each tests, it closes the browser
afterAll(() => {
    browser.close()
})
