import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutYourInformationPage } from '../pages/CheckoutYourInformationPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage';

test('E2E shopping test', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const productIndex = 0;
    const checkoutYourInformationPage = new CheckoutYourInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");

    await productPage.addToCart(productIndex);
    await expect(productPage.shoppingCartBadge).toBeVisible();
    const selectedProductName = await productPage.getProductName(productIndex);
    const selectedProducPtrice = await productPage.getProductPrice(productIndex);
    console.log(`Selected Product: ${selectedProductName} - Price: ${selectedProducPtrice}`);

    await productPage.goToCart();
    const cartProductName = await cartPage.getCartItemName(0);
    expect(cartProductName).toBe(selectedProductName);

    await cartPage.clickCheckout();
    await checkoutYourInformationPage.fillYourInfoAndClickContinue('Aya', 'Salama', '12345');
    await checkoutOverviewPage.clickFinish();

    const successMessage = await checkoutCompletePage.getSuccessMessage();
    expect(successMessage).toBe('Thank you for your order!');
    await checkoutCompletePage.BackToProductsPage();
});

