import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import testData from '../testData.json';


test.describe('Login Feature Tests', () => {

    test('Positive login test - valid credentails', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        await expect(page).toHaveURL(/inventory/);
    });

    test('Negative login test - invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(testData.invalidUser.username, testData.invalidUser.password);
        await expect(loginPage.errorMessage).toBeVisible();
        const errorMsg = await loginPage.errorMessage.textContent();
        expect(errorMsg).toContain('Epic sadface: Username and password do not match any user in this service');

    });

    test('Failed login with locked out user', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(testData.lockedUser.username, testData.lockedUser.password);
        const errorMsg = await loginPage.errorMessage.textContent();
        expect(errorMsg).toContain('Epic sadface: Sorry, this user has been locked out.');
    });

});
