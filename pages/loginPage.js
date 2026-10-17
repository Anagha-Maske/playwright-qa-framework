class LoginPage {
    constructor(page){
        this.page=page;
        this.usernameInputBoxLocator=page.locator("#user-name")
        this.passwordInputBoxLocator=page.locator("#password")
        this.loginButton=page.locator("#login-button")
        this.burgerMenu=page.locator("#react-burger-menu-btn")
        this.logoutButton=page.locator("#logout_sidebar_link")
        this.errorMessage=page.locator("//h3[@data-test='error']")

    }
    async goto(){
        await this.page.goto('https://www.saucedemo.com/');
    }
    async login(username,password){
        await this.usernameInputBoxLocator.fill(username);
        await this.passwordInputBoxLocator.fill(password)
        await this.loginButton.click();

    }
    async logout(){
        await this.burgerMenu.click();
        await this.logoutButton.click();
    }
    
}
module.exports ={LoginPage}