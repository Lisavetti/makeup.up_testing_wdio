export default class HomePage {
    get searchButton() { return $$('.search-button')[0]; }
    get searchArea() { return $('.search-input'); }
    get showResultButton() { return $('.search-result__link'); }
    get searchResult() { return $('.search-results.info-text'); }
    get searchResultItems() { return $('.info-product-wrapper'); }
    

    async searchProduct(product) {
        await this.searchButton.click();
        await this.searchArea.waitForClickable(2000);
        await this.searchArea.setValue(product);
        await browser.keys('Enter');

        if (await this.showResultButton.isExisting()) {
            await this.showResultButton.click();
        }

        const textOfItem = await this.searchResultItems.getText();
        const textOfSearchResult = await this.searchResult.getText();
        return [textOfItem, textOfSearchResult];
        
    };
};

