export default class Filter {
    get mobileBurger() { return $('#menu-toggle'); }
    get arrayOfcategory() { return $$('ul.menu-list > li.menu-list__item.full:not(.mobile-only)'); }
    get filterBlock() { return $('.catalog-mobile-buttons'); }
    get filterButton() { return $('span[data-id="parameters"]') }
    get costButton() { return $('div.catalog-filter-block.catalog-filter-block__price'); }
    get priceFilterFrom() { return $('input[name="search_price_from"]'); }
    get priceFilterTo() { return $('input[name="search_price_to"]'); }
    get bodyText() { return $('label[for="price-from-to"]'); }



    async filterProduct(numberOfCategory, from, to) {

        const isVisibleBurger = await this.mobileBurger.isDisplayed();
        if (isVisibleBurger) {
            const displayValue = await this.mobileBurger.getCSSProperty('display');
            if (displayValue.value === 'flex') {
                await this.mobileBurger.scrollIntoView();
                await this.mobileBurger.click();
            }
        }

        const categories = await this.arrayOfcategory;
        const chosenCategory = categories[numberOfCategory];
        await chosenCategory.click();
        await browser.pause(2000);

        
        const isFilterBlockVisible = await this.filterBlock.isDisplayed();
        if (isFilterBlockVisible) {
            const displayFilterBlock = await this.filterBlock.getCSSProperty('display');
            if (displayFilterBlock.value === 'flex') {
                await this.filterButton.click();
                await this.costButton.click();
            }
        }


        await this.priceFilterFrom.setValue(from);
        await this.priceFilterTo.setValue(to);
        await this.bodyText.waitForExist({ timeout: 5000 });
        return await this.bodyText.getText();
    };

    async checkPrices() {
        const arrayOfPrices = [];
        for (let i = 6; i < 36; i++) {
            arrayOfPrices.push(await $(`body > div.site-wrap > div.main-wrap > div.content-wrap > div > div:nth-child(1) > div.catalog > div.catalog-content > div > div.catalog-products > ul > li:nth-child(${i})`));
        }

        const prices = await Promise.all(
            arrayOfPrices.map(async item => await item.getAttribute('data-price'))
        );

        const filteredPrices = prices.filter(price => price !== null && price !== undefined && price !== '');

        return filteredPrices;
    }

};


