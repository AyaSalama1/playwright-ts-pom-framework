import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
test('E2E shopping test', async ({ page }) => {
const loginPage = new LoginPage(page);
const productPage = new ProductsPage(page);
await loginPage.goto();
await loginPage.login("standard_user","secret_sauce");
await productPage.addToCart(1);
await expect(productPage.shoppingCartBadge).toBeVisible();


});

