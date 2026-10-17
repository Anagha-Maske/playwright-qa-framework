export class orderConfirmationPage {
    constructor(page){
        this.page=page;

        this.confirmationMessage = page.locator('.complete-header');
        this.backHomeButton = page.locator('#back-to-products');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }
    async getConfirmationMessage(){
        return await this.confirmationMessage.textContent();
    }
    async clickBackHome() {
        await this.backHomeButton.click();
    }
     
}
module.exports={orderConfirmationPage};