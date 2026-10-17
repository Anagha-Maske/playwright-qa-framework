class productDetailsPage
{
    constructor(page){
        this.page=page;
       
        
        this.cartIconSelector=page.locator("#shopping_cart_container"); 
        this.productCardsLocator=page.locator(".inventory_item");
        this.productNameLocator=page.locator(".inventory_details_name");
        this.productImageLocator=page.locator(".inventory_details_img_container");
        this.productPriceLocator=page.locator(".inventory_details_price");
        this.addtocartButtonLocator=page.locator("button.btn_inventory");
        this.productTitleLocator=page.locator(".inventory_details_name");
        this.backToProductsLocator=page.locator("#back-to-products");
        this.inventoryContainerLocator=page.locator("#inventory_container");
        this.productDescriptionLocator=page.locator(".inventory_details_desc");
        this.cartBadgelocator=page.locator(".shopping_cart_badge");
        this.removeBtnLocator=page.locator(".btn_secondary");
        this.cartItemLocator=page.locator(".cart_item");

    }
    async addProductToCartFromDetailsPage(){
        await this.page.getByRole('button', { name: 'Add to cart' }).click();

    }
    async removeProductFromDetailsPage(){
      
      await this.page.getByRole('button', { name: 'Remove' }).click();
   
    }
    async navigateBackToProducts(){
        await this.backToProductsLocator.click();
    }



    }
module.exports ={productDetailsPage}
