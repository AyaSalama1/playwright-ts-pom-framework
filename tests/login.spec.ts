import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Feature Tests', () => {

    test('Positive login test - valid credentails', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login("standard_user", "secret_sauce");
        await expect(page).toHaveURL(/inventory/);
    });

    test('Negative login test - invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login("standard_user", "invalid_pw");
        await expect(loginPage.errorMessage).toBeVisible();
        const errorMsg = await loginPage.errorMessage.textContent();
        expect(errorMsg).toContain('Epic sadface: Username and password do not match any user in this service');

    });

});
