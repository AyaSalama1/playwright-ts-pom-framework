import { Page, Locator } from '@playwright/test';

export class CheckoutYourInformationPage {
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly postalCodeField: Locator;
    readonly cancelBtn: Locator;
    readonly continueBtn: Locator;
    constructor(page: Page) {
        this.page = page;
        this.firstNameField = page.getByPlaceholder('First Name');
        this.lastNameField = page.getByPlaceholder('Last Name');
        this.postalCodeField = page.getByPlaceholder('Zip/Postal Code');
        this.cancelBtn = page.getByRole('button', {name: 'cancel'});
        this.continueBtn = page.locator('#continue');

    }

    async fillYourInfoAndClickContinue(firstName:string, lastName:string, postalCode:string){
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.postalCodeField.fill(postalCode);
        await this.continueBtn.click();

    }

}