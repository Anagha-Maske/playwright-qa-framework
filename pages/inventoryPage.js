class inventoryPage
{
    constructor(page){
        this.page=page;
        this.menuIconSelector=page.locator("#react-burger-menu-btn");
        this.productSelector=page.locator(".title");
       // this.productList=page.$$(".inventory_item_name");
        this.appLogoSelector=page.locator(".app_logo");
        this.cartIconSelector=page.locator("#shopping_cart_container");
        this.logoutButtonSelector=page.locator("#logout_sidebar_link");
        this.sortDropdownselector=page.locator(".product_sort_container");
        this.productCardsLocator=page.locator(".inventory_item");
        this.productNamesLocator=page.locator(".inventory_item_name");
        this.productImagesLocator=page.locator("a .inventory_item_img");
        this.productsPriceLocator=page.locator(".inventory_item_price");
        this.addtocartButtonLocator=page.locator("button.btn_inventory");
        this.productTitleLocator=page.locator(".inventory_details_name");
        this.backToProductsLocator=page.locator("#back-to-products");
        this.inventoryContainerLocator=page.locator("#inventory_container");
        this.productDescriptionLocator=page.locator(".inventory_details_desc");
        this.cartBadgelocator=page.locator(".shopping_cart_badge");
        this.removeBtnLocator=page.locator(".btn_secondary");
        this.cartItemLocator=page.locator(".cart_item");

    }
    async addProductToCart(productName){
      const product = await this.productCardsLocator.filter({hasText:productName})
     
      await product.getByRole('button', { name: 'Add to cart' }).click();
   
    }
    async removeProductFromCart(productName){
      const product = await this.productCardsLocator.filter({hasText:productName})
     
      await product.getByRole('button', { name: 'Remove' }).click();
   
    }
    async sortProductsAtoZ(){
      await this.sortDropdownselector.selectOption({value:'az'})

    }
    async sortProductsZtoA(){
      await this.sortDropdownselector.selectOption({value:'za'})

    }
    async sortPriceLowtoHigh(){
      await this.sortDropdownselector.selectOption({value:'lohi'})

    }
    async sortPriceHightoLow(){
      await this.sortDropdownselector.selectOption({value:'hilo'})

    }
    async getProductNames(){
      //await this.productNamesLocator.first().waitFor({state:'visible'})
      return await this.productNamesLocator.allTextContents()
    }
    async getProductPrices(){
      //await this.productNamesLocator.first().waitFor({state:'visible'})
      return await this.productsPriceLocator.allTextContents()
    }
    async clickProductName(productName){
      await this.page.getByText(productName,{exact:true}).click();
    }
    

    
}
module.exports ={inventoryPage}
