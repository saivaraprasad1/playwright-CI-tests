import {test,expect} from '@playwright/test';
import {LoginPage} from '../pages/loginpage';

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