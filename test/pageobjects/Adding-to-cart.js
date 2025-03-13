export default class AddingToCart {
    get itemName() { return $('div.catalog-products > ul > li:nth-child(2)'); }
    get buyButton() { return $('.button.buy'); }
    // get cart() { return $('div.popup-content > div.page-header'); }
    get countInput() { return $('input[name="count\\[\\]"]'); }

    async addingItemToCart() {
        await this.itemName.click();
        await this.buyButton.click();
        return await this.countInput;
    }
}

