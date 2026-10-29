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
