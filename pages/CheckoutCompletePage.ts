import { Page, Locator } from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly successHeader: Locator;
    readonly backToHomeBtn: Locator;
    readonly generatePDFOrder: Locator;

    constructor(page: Page) {
        this.page = page;
        this.successHeader = page.locator('.complete-header');
        this.backToHomeBtn = page.getByRole('button', { name: 'Back Home' });
        this.generatePDFOrder = page.getByRole('button', { name: 'Generate PDF order' });
    }
    async getSuccessMessage() {
        return await this.successHeader.textContent();
    }

    async BackToProductsPage() {
        await this.backToHomeBtn.click();

    }

    async generateTheOrderPDF() {
        await this.generatePDFOrder.click();

    }
}
