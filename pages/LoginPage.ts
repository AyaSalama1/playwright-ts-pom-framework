import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
export class LoginPage extends BasePage {
    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.userName = page.getByRole('textbox', {name: 'Username'});
        this.password = page.getByRole('textbox', {name: 'Password'});
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('[data-test="error"]');

    }

    async goto() {
        await this.navigateTo('');

    }
    async login(username: string, pw: string) {
        await this.userName.fill(username);
        await this.password.fill(pw);
        await this.loginBtn.click();
    }
}