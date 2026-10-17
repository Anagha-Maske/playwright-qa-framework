import {test,expect} from '@playwright/test';
import {LoginPage} from '../../pages/loginPage'
import loginData from '../../test-data/loginData.json'
import inventoryData from '../../test-data/inventoryData.json'
import {inventoryPage} from '../../pages/inventoryPage'
import { productDetailsPage } from '../../pages/productDetailsPage';

test.describe('inventory Tests', () => {
    let login;
    let inventory;
    let details;
    

    test.beforeEach(async({page})=>{
        login = new LoginPage(page);
        inventory = new inventoryPage(page);
        details=new productDetailsPage(page);
        
        await  login.goto()
        await login.login(loginData.validUser.username, loginData.validUser.password);

        await expect(page).toHaveURL(/inventory/);
        await expect(page).toHaveTitle("Swag Labs")
    })
    test('TC_PROD_001 -Verify Product details page opens and displays the selected product information',async({page})=>{
       
        await inventory.clickProductName(inventoryData.productDetails.productName)
        await expect(page).toHaveURL(/inventory-item/);
        
    })
     test('TC_PROD_002 -Verify Product details page opens and displays the selected product information',async({page})=>{
        
        await inventory.clickProductName(inventoryData.productDetails.productName)
        
        await expect (details.productNameLocator).toHaveText(inventoryData.productDetails.productName)
    })

    test('TC_PROD_003 -Verify product price',async({page})=>{
        
        
        await inventory.clickProductName(inventoryData.productDetails.productName)
        
        await expect (details.productPriceLocator).toHaveText(inventoryData.productDetails.productPrice)
    })
    test('TC_PROD_004 -Verify product description',async({page})=>{
       
        await inventory.clickProductName(inventoryData.productDetails.productName)
        
        await expect (details.productDescriptionLocator).toHaveText(inventoryData.productDetails.productDescription)
    })

    test('TC_PROD_005 -verify Product added to cart from product details page',async({page})=>{
        
        
        await inventory.clickProductName(inventoryData.productDetails.productName)
        await details.addProductToCartFromDetailsPage();
        await expect(details.cartBadgelocator).toHaveText('1')
        
    })
     test('TC_PROD_006 -verify Remove product from product details page',async({page})=>{
       
        
        await inventory.clickProductName(inventoryData.productDetails.productName)
        await details.addProductToCartFromDetailsPage();
        await expect(details.cartBadgelocator).toHaveText('1')
        await details.removeProductFromDetailsPage();
        await expect(details.cartBadgelocator).not.toBeVisible()
        
    })
test('TC_PROD_007 -verify Navigate back to products',async({page})=>{
        
        await inventory.clickProductName(inventoryData.productDetails.productName)
         await expect(page).toHaveURL(/inventory-item/);
         await details.navigateBackToProducts();
         await expect(page).toHaveURL(/inventory/);
        
    })

})

