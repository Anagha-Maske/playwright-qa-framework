import {test,expect} from '@playwright/test';
import {LoginPage} from '../../pages/loginPage';
import { cartPage } from '../../pages/cartPage';
import loginData from '../../test-data/loginData.json'
import {inventoryPage} from '../../pages/inventoryPage';
import { checkoutPage } from '../../pages/checkoutPage';
import { checkoutOverviewPage } from '../../pages/checkoutOverviewPage';
import inventoryData from '../../test-data/inventoryData.json'
import checkoutData from '../../test-data/checkoutData.json'
test.describe('Checkout Overview Tests', () => {

    let login;
    let inventory;
    let cart;
    let checkout;
    let overview;
   
    test.beforeEach(async({page})=>{
        login = new LoginPage(page);
                inventory = new inventoryPage(page);
                cart= new cartPage(page);
                checkout = new checkoutPage(page);
                overview = new checkoutOverviewPage(page);
               
         
        await  login.goto()
        await login.login(loginData.validUser.username, loginData.validUser.password);
        
    
     const productName=inventoryData.products[0];
            await inventory.addProductToCart(productName);
            await cart.openCartPage();
            await expect(cart.cartItemsLocator).toHaveCount(1);
            await cart.checkout()

            await expect(page).toHaveURL(/checkout-step-one/);
        const user = checkoutData.validUser;

        await checkout.enterCustomerInformation(
            user.firstName,
            user.lastName,
            user.postalCode
        );

        await checkout.clickContinue();

        await expect(page).toHaveURL(/checkout-step-two/);
    })

    test("TC_CHECK_007 - Verify selected product", async ({ page }) => {


    const expectedProduct = inventoryData.products[0];

    await expect(overview.productNameLocator)
        .toHaveText(expectedProduct);
});

test("TC_CHECK_008 - Verify product price", async ({ page }) => {

   
    await expect(overview.productPriceLocator)
        .toHaveText(inventoryData.productDetails.productPrice);
});
test("TC_CHECK_009 - Verify item total", async ({ page }) => {


    const productPrice = inventoryData.productDetails.productPrice;

    const expectedItemTotal = `Item total: ${productPrice}`;

    await expect(overview.itemTotalLocator)
        .toHaveText(expectedItemTotal);
});
test("TC_CHECK_010 - Verify tax", async ({ page }) => {
    
    
    await expect(overview.taxLocator).toBeVisible();
    await expect(overview.taxLocator).toContainText("Tax:");
});
test("TC_CHECK_011 - Verify total amount", async ({ page }) => {
    
    

    await expect(overview.totalLocator).toBeVisible();
    await expect(overview.totalLocator).toContainText("Total:");
});
test("TC_CHECK_012 - Click Cancel", async ({ page }) => {
    
    await overview.clickCancel();

    await expect(page).toHaveURL(/inventory/);
});
test("TC_CHECK_013 - Click Finish", async ({ page }) => {
  
    
    await overview.clickFinish();

    await expect(page).toHaveURL(/checkout-complete/);
    await expect(page.getByText("Thank you for your order!")).toBeVisible();
});

})
