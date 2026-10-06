import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItemName: Locator;
    readonly checkoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItemName = page.locator('.inventory_item_name');
        this.checkoutBtn = page.getByRole('button', {name : 'checkout'});
        //page.locator('#checkout');
    }

    async getCartItemName(productIndex: number) {
        const itemName = await this.cartItemName.nth(productIndex).textContent();
        return itemName;
    }

    async clickCheckout() {
        await this.checkoutBtn.click();
    }
}