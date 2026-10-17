import {test,expect} from '@playwright/test';
import {LoginPage} from '../../pages/loginPage'
import loginData from '../../test-data/loginData.json'
import {inventoryPage} from '../../pages/inventoryPage'
import inventoryData from '../../test-data/inventoryData.json'
test.describe('inventory Tests', () => {
    let login;
    let inventory;
    

    test.beforeEach(async({page})=>{
        login = new LoginPage(page);
        inventory = new inventoryPage(page);
        
        await  login.goto()
        await login.login(loginData.validUser.username, loginData.validUser.password);

        await expect(page).toHaveURL(/inventory/);
        await expect(page).toHaveTitle("Swag Labs")
    })
    test('TC_INV_001 - Verify inventory page after login',async({page})=>{
       
        await expect(inventory.menuIconSelector).toBeVisible()
        await expect (inventory.productSelector).toBeVisible()
    })
    test('TC_INV_002 - Verify all products are displayed',async({page})=>{
        
        
        const actualProducts =await inventory.productNamesLocator.allTextContents()
        console.log(actualProducts)
        await expect(inventory.productNamesLocator).toHaveCount(6) 
    })

    test('TC_INV_003 - Verify products name',async({page})=>{
       
        
       await expect(inventory.productNamesLocator).toHaveCount(6);
       const actualProducts =await inventory.productNamesLocator.allTextContents()
        expect(actualProducts).toEqual(inventoryData.products);

    })
     test('TC_INV_004 - Verify products Price',async({page})=>{
       
        
       await expect(inventory.productsPriceLocator).toHaveCount(6);
       const actualProductsPrice =await inventory.productsPriceLocator.allTextContents();
       console.log(actualProductsPrice)
        expect(actualProductsPrice).toEqual(inventoryData.price);

    })
test('TC_INV_005 - Verify products Image',async({page})=>{
       
    
        const productImage=await inventory.productImagesLocator;
       await expect(productImage).toHaveCount(6);
       for(const image of  await productImage.all() ){
         await expect(image).toBeVisible();
       }
})



test('TC_INV_006 - Verify cart count after adding one product to the cart',async({page})=>{
        
    
       const productName=inventoryData.products[0];
       await inventory.addProductToCart(productName);
       await expect(inventory.cartBadgelocator).toHaveText('1')

})
test('TC_INV_007 - Add multiple products', async ({ page }) => {

const selectedProducts=inventoryData.products.slice(0,4);
for(const productNames of selectedProducts){
    await inventory.addProductToCart(productNames);
}
await expect(inventory.cartBadgelocator).toHaveText(String(selectedProducts.length));




})
test('TC_INV_008 - Remove product from cart', async ({ page }) => {

   
    const product=inventoryData.products[0];
    await inventory.addProductToCart(product)
    await expect (inventory.cartBadgelocator).toHaveText('1');

    await inventory.removeProductFromCart(product)

    await expect(inventory.cartBadgelocator).not.toBeVisible()

})

test('TC_INV_009 -Verify product sorting A-Z', async ({ page }) => {

    
    
    await inventory.sortProductsAtoZ()
    const productNames=await inventory.getProductNames();
    const sortedNames=[...productNames].sort();
     expect (productNames ).toEqual(sortedNames) 
})
test('TC_INV_010 -Verify product sorting Z-A', async ({ page }) => {

    
    
    await inventory.sortProductsZtoA()
    const productNames=await inventory.getProductNames();
    const sortedNames=[...productNames].sort().reverse();
     expect (productNames ).toEqual(sortedNames) 
})
test('TC_INV_011 -Verify product sorting low to high price', async ({ page }) => {

    
    
    await inventory.sortPriceLowtoHigh()
    const prices=await inventory.getProductPrices();
    const numericPrices=prices.map(price=>Number(price.replace('$','')));
    const sortedPrices=[...numericPrices].sort((a,b)=>a-b);
    expect (numericPrices).toEqual (sortedPrices)
    

    
})
test('TC_INV_011 -Verify product sorting high to low price', async ({ page }) => {

   
    
    await inventory.sortPriceHightoLow()
    const prices=await inventory.getProductPrices();
    const numericPrices=prices.map(price=>Number(price.replace('$','')))
    const sortedPrices=[...numericPrices].sort((a,b)=>b-a)
    expect (numericPrices).toEqual(sortedPrices);
    

    
})
})