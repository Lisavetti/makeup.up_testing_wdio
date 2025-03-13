export default class Reviews {
    get item() { return $('div.catalog-products > ul > li'); }
    get reviews() { return $('div[itemprop="aggregateRating"]'); }
    get reviewsHeader() { return $('h2.page-header'); }

    async checkReviews() {
        await this.item.click();
        await this.reviews.click();
        return this.reviewsHeader;
    };
};