exports. LoginPage = class LoginPage{

      constructor(page) {
        this.page = page;
        this.username = page.getByPlaceholder('Username');
        this.password = page.getByPlaceholder('Password');
        this.logout = page.locator('#login-button');
      }

     async url() {
        await this.page.goto('https://www.saucedemo.com/');
     } 

     async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.logout.click();
     }
}   