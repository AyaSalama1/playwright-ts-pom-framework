import { Page, Locator } from '@playwright/test';
export class ProductsPage {
    readonly page: Page;
    readonly productNameLink: Locator;
    readonly productName: Locator;
    readonly productPrice: Locator;
    readonly addToCartBtns: Locator;
    readonly shoppingCartBadge: Locator;
    constructor(page: Page) {
        this.page = page;
        this.productNameLink = page.locator('[id="item_0_title_link"]');
        this.productName = page.locator('.inventory_item_name');
        this.productPrice = page.locator('[class="inventory_item_price"]');
        this.addToCartBtns = page.locator('button[id^="add-to-cart"]');
        this.shoppingCartBadge = page.locator('[class="shopping_cart_badge"]');
    }

    async addToCart(productIndex: number) {
        await this.addToCartBtns.nth(productIndex).click();
    }
    async getProductName(productIndex: number) {
        const productText = await this.productName.nth(productIndex).textContent();
        return productText;
    }

    async getProductPrice(productIndex: number) {
        const productPrice = await this.productPrice.nth(productIndex).textContent();
        return productPrice;
    }

}