export default class CheckingCart {
    get productDescription() { return $('.product__header'); }
    get countInput() { return $('input[name="count\\[\\]"]'); }
    get priceColumn() { return $('.product__price-column'); }
    get totalElement() { return $('div.product-list__sidebar > div > div.total'); }


    async checkingCartInformation() {

        await expect(this.countInput).toBeDisplayed();
        const countValue = parseInt(await this.countInput.getValue(), 10);

        await expect(this.priceColumn).toBeDisplayed();
        const priceText = await this.priceColumn.getText();
        const priceValue = parseInt(priceText.replace(/\D/g, ''), 10);

        return priceValue * countValue;
    }

    async checkingCartTotal() {
        await expect(this.totalElement).toBeDisplayed();
        const totalText = await this.totalElement.getText();
        const totalValue = parseInt(totalText.replace(/\D/g, ''), 10);

        return totalValue;
    }
}
