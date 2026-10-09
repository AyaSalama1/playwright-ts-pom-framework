import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import testData from '../testData.json';


test.describe('Login Feature Tests', () => {
    let loginPage: LoginPage;
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });
    test('Positive login test - valid credentails', async ({ page }) => {
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        await expect(page).toHaveURL(/inventory/);
    });

    test('Negative login test - invalid password', async ({ page }) => {
        await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
        expect(loginPage.errorMessage).toBeVisible();
        const errorMsg = await loginPage.errorMessage.textContent();
        expect(errorMsg).toContain('Epic sadface: Username and password do not match any user in this service');

    });

    test('Failed login with locked out user with soft assertion', async ({ page }) => {
        await loginPage.login(testData.lockedUser.username, testData.lockedUser.password);
        await expect.soft(page.locator('[data-test="error"]')).toBeVisible();
        const titleText = await page.locator('.login_logo').textContent();
        expect(titleText).toContain('Swag Labs');
    });

});
