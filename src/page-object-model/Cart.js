export default class CheckingCart {
    get productDescription() { return $('.product__header'); }
    get priceColumn() { return $('.product__price-column'); }
    get totalElement() { return $('div.product-list__sidebar > div > div.total'); }


    async checkingCartInformation() {

        await this.priceColumn.waitForDisplayed({ timeout: 5000 });
        const priceText = await this.priceColumn.getText();
        const priceValue = parseInt(priceText.replace(/\D/g, ''), 10);

        return priceValue;
    }

    async checkingCartTotal() {
        await this.totalElement.waitForDisplayed({ timeout: 5000 });
        const totalText = await this.totalElement.getText();
        const totalValue = parseInt(totalText.replace(/\D/g, ''), 10);

        return totalValue;
    }
}
