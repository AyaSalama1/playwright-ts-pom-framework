import { Page, Locator } from '@playwright/test';
export class LoginPage{
    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page){
        this.page = page;
        this.userName = page.locator('[id="user-name"]');
        this.password = page.locator('[id="password"]');
        this.loginBtn = page.locator('[id="login-button"]');

    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com');

    }
async login (username:string, pw:string){
    await this.userName.fill(username);
    await this.password.fill(pw);
    await this.loginBtn.click();
}
}