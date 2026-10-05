import { Page, Locator } from '@playwright/test';
export class GoogleSearchPage{
    readonly page: Page;
    readonly searchInput: Locator;

    constructor(page: Page){
        this.page = page;
        this.searchInput = page.locator('[name="q"]');
    }

    async goto(){
        await this.page.goto('https://www.google.com');

    }
async searchFor (text:string){
    await this.searchInput.fill(text);
    await this.searchInput.press('Enter');
}
}