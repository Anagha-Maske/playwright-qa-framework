import {test,expect} from '@playwright/test';
import {LoginPage} from '../../pages/loginPage'
import loginData from '../../test-data/loginData.json'
test.describe('Login Tests', () => {
let login;
    test.beforeEach(async({page})=>{
         login=new LoginPage(page);
        await  login.goto()

    })
    test('TC_LOGIN_001 Login with valid username and password', async ({ page }) => {

       await login.login(loginData.validUser.username, loginData.validUser.password);

        await expect(page).toHaveURL(/inventory/);
        await expect(page).toHaveTitle("Swag Labs")

    })
    test('TC_LOGIN_002 Login with invalid username', async ({ page }) => {

        
        await login.login(loginData.invalidUser.username,loginData.validUser.password);

        await expect (login.errorMessage).toBeVisible()
        await expect (login.errorMessage).toContainText(loginData.errorMessage)        
    })
    test('TC_LOGIN_003 Login with invalid Password',async({page})=>{
       
        await login.login(loginData.validUser.username,loginData.invalidUser.password)
        await expect(login.errorMessage).toBeVisible()
        await expect (login.errorMessage).toContainText(loginData.errorMessage)
    })
    test('TC_LOGIN_004 Login with blank username/password',async({page})=>{
        
        
        await login.login(loginData.emptyUser.username,loginData.emptyUser.password);
        await expect(login.errorMessage).toBeVisible();
        await expect(login.errorMessage).toContainText(loginData.emptyUsername_ErrorMessage)
       
    })
    test('TC_LOGIN_005 Login with blank username',async({page})=>{
       
        
        await login.login(loginData.emptyUser.username,loginData.validUser.password);
        await expect(login.errorMessage).toBeVisible();
        await expect(login.errorMessage).toContainText(loginData.emptyUsername_ErrorMessage)
       
    })
    test('TC_LOGIN_006 Login with blank password',async({page})=>{
        
        
        await login.login(loginData.validUser.username,loginData.emptyUser.password);
        await expect(login.errorMessage).toBeVisible();
        await expect(login.errorMessage).toContainText(loginData.emptyPassword_ErrorMessage)
       
    })
    test('TC_LOGIN_007 Verify password is masked',async({page})=>{
       
        await expect(login.passwordInputBoxLocator).toHaveAttribute('type',"password")
        
    })
    test('TC_LOGIN_008 Verify locked-out user cannot login',async({page})=>{
        
        await login.login(loginData.lockedUser.username,loginData.lockedUser.password);
        await expect(login.errorMessage).toBeVisible();
        await expect(login.errorMessage).toContainText(loginData.lockedUser_ErrorMessage)
       
    })
    test('TC_LOGIN_009 Verify login button is displayed',async({page})=>{
       
        
        await expect(login.loginButton).toBeVisible()
       
    })
   test('TC_LOGIN_010 Logout after successful login', async ({ page }) => {
        await login.login(loginData.validUser.username, loginData.validUser.password);

        await expect(page).toHaveURL(/inventory/);
        await expect(page).toHaveTitle("Swag Labs")
        await login.logout();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(login.usernameInputBoxLocator).toBeVisible()

    })
})