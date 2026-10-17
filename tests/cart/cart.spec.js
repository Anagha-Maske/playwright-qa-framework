import {test,expect} from '@playwright/test';
import {LoginPage} from '../../pages/loginPage'
import { cartPage } from '../../pages/cartPage';
import loginData from '../../test-data/loginData.json'
import inventoryData from '../../test-data/inventoryData.json'
import {inventoryPage} from '../../pages/inventoryPage'

test.describe('Cart Tests', () => {
    let login;
    let inventory;
    let cart;
   

    test.beforeEach(async({page})=>{
        login = new LoginPage(page);
        inventory = new inventoryPage(page);
        cart= new cartPage(page);
        
         
        await  login.goto()
        await login.login(loginData.validUser.username, loginData.validUser.password);

        await expect(page).toHaveURL(/inventory/);
        await expect(page).toHaveTitle("Swag Labs")
    })
    test("TC_CART_001  verify empty cart",async({page})=>{
        
        await cart.openCartPage();
        await expect(cart.cartItemsLocator).toHaveCount(0)


    })
    test("TC_CART_002 verify single selected products displayed in cart",async({page})=>{
            
        
            const productName=inventoryData.products[0];
            await inventory.addProductToCart(productName);
            await cart.openCartPage();
            await expect(cart.cartItemsLocator).toHaveCount(1);
            


    })
     test("TC_CART_003 verify multiple Selected product displayed in cart",async({page})=>{
           
        
            const selectedProducts=inventoryData.products.slice(0,4);
            for(const productNames of selectedProducts){
                await inventory.addProductToCart(productNames);
            }
            await expect(inventory.cartBadgelocator).toHaveText(String(selectedProducts.length));


            await cart.openCartPage();
          
            await expect(cart.cartItemsLocator).toHaveCount(4);
            
     })
     test("TC_CART_004 Verify product name in cart",async({page})=>{
            
            const productName=inventoryData.products[0];
            await inventory.addProductToCart(productName);
            await cart.openCartPage();
            await expect(cart.cartItemsLocator).toHaveCount(1);
            await expect(cart.cartItemNameLocator).toHaveText(productName);

     })
     test("TC_CART_005 Verify product price in cart",async({page})=>{
           
        
            const productName=inventoryData.products[0];
            await inventory.addProductToCart(productName);
            await cart.openCartPage();
            await expect(cart.cartItemsLocator).toHaveCount(1);
            await expect(cart.cartItemPriceLocator).toHaveText(inventoryData.productDetails.productPrice);

     })
      test("TC_CART_006 Verify Remove product from cart",async({page})=>{
            
            const productName=inventoryData.products[0];
            await inventory.addProductToCart(productName);
            await cart.openCartPage();
            await expect(cart.cartItemsLocator).toHaveCount(1);
            await cart.removeProductFromCart(productName);
            await expect(cart.cartItemsLocator).toHaveCount(0)
            await expect(inventory.cartBadgelocator).toHaveCount(0);

     })
     test("TC_CART_007 Verify cart badge count",async({page})=>{
           
        
            const selectedProducts=inventoryData.products.slice(0,4);
            for(const productNames of selectedProducts){
                await inventory.addProductToCart(productNames);
            }
           
            await expect(inventory.cartBadgelocator).toHaveText(String(selectedProducts.length));


            await cart.openCartPage();
             await cart.removeProductFromCart(inventoryData.products[2]);
            await expect(cart.cartItemsLocator).toHaveCount(3);
            await expect(inventory.cartBadgelocator).toHaveText("3");;
            
     })
     test("TC_CART_008 - Continue shopping", async ({ page }) => {
    
    await cart.openCartPage();

    await cart.continueShopping();

    await expect(page).toHaveURL(/inventory/);
});
test("TC_CART_009 - Checkout", async ({ page }) => {
   
    
     const productName=inventoryData.products[0];
            await inventory.addProductToCart(productName);
            await cart.openCartPage();
            await expect(cart.cartItemsLocator).toHaveCount(1);
            await cart.checkout()

    await expect(page).toHaveURL(/checkout/);
});









})