export default class HomePage {
    get searchButton() { return $$('.search-button')[0]; }
    get searchArea() { return $('.search-input'); }
    get showResultButton() { return $('.search-result__link'); }
    get searchResult() { return $('.search-results.info-text'); }
    get searchResultItems() { return $('.simple-slider-list__description'); }


    async searchProduct(product) {
        await this.searchButton.click();
        await this.searchArea.waitForClickable(2000);
        await this.searchArea.setValue(product);
        await browser.pause(2000);
        await browser.keys('Enter');
        await browser.pause(2000);

        if (await this.showResultButton.isExisting()) {
            await this.showResultButton.click();
        }

        const textOfItem = await this.searchResultItems.getText();
        const textOfSearchResult = await this.searchResult.getText();
        return [textOfItem, textOfSearchResult];
    };
};

