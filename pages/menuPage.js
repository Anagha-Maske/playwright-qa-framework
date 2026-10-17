class menuPage {

    constructor(page) {
        this.page = page;

        this.menuButton = page.locator('#react-burger-menu-btn');
        this.menuContainer = page.locator('.bm-menu-wrap');
        this.allItems = page.locator('#inventory_sidebar_link');
        this.about = page.locator('#about_sidebar_link');
        this.logout = page.locator('#logout_sidebar_link');
        this.closeMenu = page.locator('#react-burger-cross-btn');
    }

    async openMenu() {
        await this.menuButton.click();
    }

    async clickAllItems() {
        await this.allItems.click();
    }

    async clickAbout() {
        await this.about.click();
    }

    async clickLogout() {
        await this.logout.click();
    }

    async closeMenuPanel() {
        await this.closeMenu.click();
    }
}

module.exports = { menuPage };