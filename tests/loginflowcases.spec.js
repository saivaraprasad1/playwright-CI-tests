import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/loginpage';
import userdata from '../testdata/userdata.json';

    userdata.forEach(user => {
        test(`Testing with user: ${user.username}`, async ({page}) => {
            const login = new LoginPage(page);
            await login.url();
            await login.login(user.username, user.password);
        });
    });


test('valid credentials', async ({page}) => {
    const login = new LoginPage(page);
    await login.url();
    await login.login('standard_user','secret_sauce');
    await expect(page).toHaveTitle('Swag Labs');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    const threelines = await page.locator('#react-burger-menu-btn');
    await threelines.click();
    await page.locator('#logout_sidebar_link').click();
})

test('invalid credentials', async ({page}) => {
    const login = new LoginPage(page);
    await login.url();
    await login.login('invalid_user','invalid_password');
    const error = await page.locator('[data-test="error"]');
    console.log(await error.textContent());
    await expect(error).toHaveText('Epic sadface: Username and password do not match any user in this service');
})

test('Add to cart scenario', async ({page}) => {
    const login = new LoginPage(page);
    await login.url();
    await login.login('standard_user','secret_sauce');
    await expect(page).toHaveTitle('Swag Labs');
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await page.locator('//a[@aria-label="Cart, 2 items"]').click();
    await page.locator('#checkout').click();
    await page.locator('#first-name').fill('John');
    await page.locator('#last-name').fill('Doe');
    await page.locator('#postal-code').fill('12345');
    await page.locator('#continue').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await page.locator('#finish').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');

})