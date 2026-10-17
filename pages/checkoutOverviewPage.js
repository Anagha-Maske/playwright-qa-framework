export class checkoutOverviewPage {

    constructor(page) {
        this.page = page;

        // Product information
        this.productNameLocator = page.locator(".inventory_item_name");
        this.productPriceLocator = page.locator(".inventory_item_price");

        // Price summary
        this.itemTotalLocator = page.locator(".summary_subtotal_label");
        this.taxLocator = page.locator(".summary_tax_label");
        this.totalLocator = page.locator(".summary_total_label");

        // Buttons
        this.cancelLocator = page.locator("#cancel");
        this.finishLocator = page.locator("#finish");

        
    }

    async clickCancel() {
        await this.cancelLocator.click();
    }

    async clickFinish() {
        await this.finishLocator.click();
    }
}

module.exports = { checkoutOverviewPage };