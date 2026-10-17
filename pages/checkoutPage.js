class checkoutPage
{
    constructor(page){
        this.page=page;
         this.firstNameLocator = page.locator("#first-name");
        this.lastNameLocator = page.locator("#last-name");
        this.postalCodeLocator = page.locator("#postal-code");

        // Buttons
        this.continueLocator = page.locator("#continue");
        this.cancelLocator = page.locator("#cancel");

        // Error message
        this.errorMessageLocator = page.locator('[data-test="error"]');
    }
    async enterCustomerInformation(firstName, lastName, postalCode) {
        await this.firstNameLocator.fill(firstName);
        await this.lastNameLocator.fill(lastName);
        await this.postalCodeLocator.fill(postalCode);
    }

    async clickContinue() {
        await this.continueLocator.click();
    }
 
     async clickCancel() {
        await this.cancelLocator.click();
    }
}
module.exports={checkoutPage}