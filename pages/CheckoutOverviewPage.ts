import { Page, Locator } from '@playwright/test';

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly finishBtn: Locator;
    constructor(page: Page) {
        this.page = page;
        this.finishBtn = page.getByRole('button', { name: 'finish' });

    }
    async clickFinish() {
        await this.finishBtn.click();
    }
}
