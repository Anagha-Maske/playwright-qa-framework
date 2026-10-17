import {test,expect} from '@playwright/test';
import {LoginPage} from '../../pages/loginPage';
import { cartPage } from '../../pages/cartPage';
import loginData from '../../test-data/loginData.json'
import {inventoryPage} from '../../pages/inventoryPage'
import { checkoutPage } from '../../pages/checkoutPage';
import { checkoutOverviewPage } from '../../pages/checkoutOverviewPage';
import { orderConfirmationPage } from '../../pages/orderConfirmationPage';
import inventoryData from '../../test-data/inventoryData.json'
import checkoutData from '../../test-data/checkoutData.json'

test.describe('Order Confirmation Tests', () => {

    let login;
    let inventory;
    let cart;
    let checkout;
    let overview;
    let orderConfirmation;

    test.beforeEach(async ({ page }) => {

        login = new LoginPage(page);
        inventory = new inventoryPage(page);
        cart= new cartPage(page);
        checkout = new checkoutPage(page);
        overview = new checkoutOverviewPage(page);
        orderConfirmation = new orderConfirmationPage(page);

        // Login
        
        await  login.goto();
        await login.login(loginData.validUser.username, loginData.validUser.password);

        // Add product
        const productName=inventoryData.products[0];
        await inventory.addProductToCart(productName);
       

        // Go to cart
        await cart.openCartPage();
        

        // Checkout
         await cart.checkout()

        // Customer information
        const user = checkoutData.validUser;

        await checkout.enterCustomerInformation(
            user.firstName,
            user.lastName,
            user.postalCode
        );

        await checkout.clickContinue();

        // Complete order
        await overview.clickFinish();
        
    });


    test('TC_ORDER_001 - Complete successful order', async () => {

        await expect(orderConfirmation.confirmationMessage)
            .toBeVisible();

    });


    test('TC_ORDER_002 - Verify confirmation message', async () => {

        await expect(orderConfirmation.confirmationMessage)
            .toHaveText(checkoutData.orderConfirmationMessage);

    });


    test('TC_ORDER_003 - Verify Back Home button', async ({ page }) => {

        await orderConfirmation.clickBackHome();

        await expect(page)
            .toHaveURL(/inventory\.html/);

    });


    test('TC_ORDER_004 - Verify cart after successful order', async () => {

        await expect(orderConfirmation.cartBadge)
            .not.toBeVisible();

    });

});