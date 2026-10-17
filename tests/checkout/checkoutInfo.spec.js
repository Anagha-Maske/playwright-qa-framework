import {test,expect} from '@playwright/test';
import {LoginPage} from '../../pages/loginPage';
import { cartPage } from '../../pages/cartPage';
import loginData from '../../test-data/loginData.json'
import {inventoryPage} from '../../pages/inventoryPage'
import { checkoutPage } from '../../pages/checkoutPage';
import inventoryData from '../../test-data/inventoryData.json'
import checkoutData from '../../test-data/checkoutData.json'
test.describe('Checkout information Tests', () => {

    let login;
    let inventory;
    let cart;
    let checkout;
    
    test.beforeEach(async({page})=>{
                login = new LoginPage(page);
                inventory = new inventoryPage(page);
                cart= new cartPage(page);
                checkout = new checkoutPage(page);
                
        await  login.goto()
        await login.login(loginData.validUser.username, loginData.validUser.password);
        await expect(page).toHaveURL(/inventory/);
        await expect(page).toHaveTitle("Swag Labs");
        
    
     const productName=inventoryData.products[0];
            await inventory.addProductToCart(productName);
            await cart.openCartPage();
            await expect(cart.cartItemsLocator).toHaveCount(1);
            await cart.checkout()

            await expect(page).toHaveURL(/checkout-step-one/);
    })

    test("TC_CHECK_001 - Checkout with valid information", async ({ page }) => {

        
        const user = checkoutData.validUser;

        await checkout.enterCustomerInformation(
            user.firstName,
            user.lastName,
            user.postalCode
        );

        await checkout.clickContinue();

        await expect(page).toHaveURL(/checkout-step-two/);
    });


    test("TC_CHECK_002 - First Name blank", async ({ page }) => {

     
        
        await checkout.enterCustomerInformation(
            checkoutData.allBlank.firstName,
            checkoutData.validUser.lastName,
            checkoutData.validUser.postalCode
        );

        await checkout.clickContinue();

        await expect(checkout.errorMessageLocator)
            .toHaveText(checkoutData.emptyFirstNameError);
    });
    test("TC_CHECK_003 - last Name blank", async ({ page }) => {

        
        

        await checkout.enterCustomerInformation(
            checkoutData.validUser.firstName,
            checkoutData.allBlank.lastName,
            checkoutData.validUser.postalCode
        );

        await checkout.clickContinue();

        await expect(checkout.errorMessageLocator)
            .toHaveText(checkoutData.emptyLastNameError);
    });
    test("TC_CHECK_004 - Postal Code blank", async ({ page }) => {

        
        

        await checkout.enterCustomerInformation(
            checkoutData.validUser.firstName,
            checkoutData.validUser.lastName,
            checkoutData.allBlank.postalCode
        );

        await checkout.clickContinue();

        await expect(checkout.errorMessageLocator)
            .toHaveText(checkoutData.emptyPostalCodeError);
    });
    test("TC_CHECK_004 - All checkout fields blank", async ({ page }) => {

     
        

        await checkout.enterCustomerInformation(
            checkoutData.allBlank.firstName,
            checkoutData.allBlank.lastName,
            checkoutData.allBlank.postalCode
        );

        await checkout.clickContinue();

        await expect(checkout.errorMessageLocator)
            .toHaveText(checkoutData.emptyFirstNameError);
    });
test("TC_CHECK_006 - Verify entered customer information", async ({ page }) => {

 
    const user = checkoutData.validUser;

    await checkout.enterCustomerInformation(
        user.firstName,
        user.lastName,
        user.postalCode
    );

    // Verify entered values
    await expect(checkout.firstNameLocator)
        .toHaveValue(user.firstName);

    await expect(checkout.lastNameLocator)
        .toHaveValue(user.lastName);

    await expect(checkout.postalCodeLocator)
        .toHaveValue(user.postalCode);

    await checkout.clickContinue();

    await expect(page).toHaveURL(/checkout-step-two/);
});



})