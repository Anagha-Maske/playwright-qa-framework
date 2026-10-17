class cartPage
{
    constructor(page){
        this.page=page;
       
        
        this.continueShoppingBtnLocator=page.locator("#continue-shopping")
        this.checkoutBtnLocator=page.locator("#checkout");
        this.cartIconSelector=page.locator("#shopping_cart_container");
        this.cartItemsLocator=page.locator(".cart_item")
        this.cartItemNameLocator=page.locator(".inventory_item_name")
        this.cartItemDescriptionLocator=page.locator(".inventory_item_desc")
        this.cartItemPriceLocator=page.locator(".inventory_item_price")
        

        

    }
    async openCartPage(){
        await this.cartIconSelector.click()

        }
        async removeProductFromCart(productName){
      const product = await this.cartItemsLocator.filter({hasText:productName})
     
      await product.getByRole('button', { name: 'Remove' }).click();
   
    }
         async continueShopping() {
        await this.continueShoppingBtnLocator.click();
    }

    async checkout() {
        await this.checkoutBtnLocator.click();
    }

}
module.exports = { cartPage };