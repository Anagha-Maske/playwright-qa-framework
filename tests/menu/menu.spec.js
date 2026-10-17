import {test,expect} from '@playwright/test';
 import { LoginPage } from '../../pages/loginPage';
 import { menuPage } from '../../pages/menuPage';
 import loginData from '../../test-data/loginData.json'


test.describe('Hamburger Menu Tests', () => {

    let login;
    let menu;

    test.beforeEach(async ({ page }) => {

        login = new LoginPage(page);
        menu = new menuPage(page);

        await  login.goto();
        await login.login(loginData.validUser.username,loginData.validUser.password);
    });


    test('TC_MENU_001 - Open hamburger menu', async () => {

        await menu.openMenu();

        await expect(menu.menuContainer)
            .toBeVisible();
    });


    test('TC_MENU_002 - Click All Items', async ({ page }) => {

        await menu.openMenu();
        await menu.clickAllItems();

        await expect(page)
            .toHaveURL(/inventory\.html/);
    });


    test('TC_MENU_003 - Click About', async ({ page }) => {

        await menu.openMenu();
        await menu.clickAbout();

        await expect(page)
            .toHaveURL(/saucelabs\.com/);
    });


    test('TC_MENU_004 - Click Logout', async ({ page }) => {

        await menu.openMenu();
        await menu.clickLogout();

        await expect(page)
            .toHaveURL(/saucedemo\.com/);

        await expect(page.locator('#login-button'))
            .toBeVisible();
    });


    test('TC_MENU_005 - Close hamburger menu', async () => {

        await menu.openMenu();

        await expect(menu.menuContainer)
            .toBeVisible();

        await menu.closeMenuPanel();

        await expect(menu.menuContainer)
            .not.toBeVisible();
    });

});

