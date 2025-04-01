import HomePage from "../page-object-model/Homepage.js"
import Filter from "../page-object-model/Filter.js";
import AddingToCart from "../page-object-model/Adding-to-cart.js";
import CheckingCart from "../page-object-model/Cart.js";
import PlacingOrder from "../page-object-model/Placing-order.js";
import Reviews from "../page-object-model/Reviews.js";

import { categories, getCategoryKeyByName } from "../utils/categories.js";
import { parsePrice, arePricesInRange, getInvalidPrices } from "../utils/priceUtils.js";
import { productNames } from "../utils/productNames.js";

const homepage = new HomePage();
const filter = new Filter();
const addingToCart = new AddingToCart();
const checkingCart = new CheckingCart();
const placingOrder = new PlacingOrder();
const reviews = new Reviews();

var should = require('chai').should();
var assert = require('chai').assert;
var expect = require('chai').expect;

describe("Search for products", () => {

    it("Product search by name", async () => {
        const resMes = await homepage.searchProduct(productNames.searchbyName);
        assert.include(resMes[1], `Результати пошуку за запитом «${productNames.searchbyName}».`);
        assert.include(resMes[0].toLowerCase(), 'туш');
    });

    it("Search products by brand", async () => {
        const resMes = await homepage.searchProduct(productNames.searchbyBrand);
        resMes[1].toLowerCase().should.include(`результати пошуку за запитом «${productNames.searchbyBrand}».`);
        resMes[0].toLowerCase().should.include(productNames.searchbyBrand);
    });
});

describe("Filtering products", () => {

    it("Filtering products by category and price", async () => {

        const from = 1000;
        const to = 5000;
        const categoryKey = getCategoryKeyByName("Парфумерія");

        const bodyMes = await filter.filterProduct(categoryKey, from, to);
        await browser.pause(2000);
        expect(bodyMes).to.include(`від ${from} до ${to} ₴`);


        const rawPrices = await filter.checkPrices();

        const parsedPrices = rawPrices.map(parsePrice);
        const invalidPrices = getInvalidPrices(parsedPrices, from, to);
        const allInRange = arePricesInRange(parsedPrices, from, to);
        expect(allInRange).to.be.true;
    });
});

describe("Adding items to cart", () => {


    it('Adding a product to the cart', async () => {

        await homepage.searchProduct(productNames.scalpAndHairMask);
        const countInput = await addingToCart.addingItemToCart();
        const countValue = await countInput.getValue();
        assert.equal(countValue, "1");
    });
});

describe("Viewing the shopping cart", () => {

    it('Checking items in the cart', async () => {
        await homepage.searchProduct(productNames.scalpAndHairMask);
        await addingToCart.addingItemToCart();

        const info = await checkingCart.checkingCartInformation();
        const total = await checkingCart.checkingCartTotal();
        const productText = await checkingCart.productDescription.getText();

        productText.should.equal(productNames.scalpAndHairMask);
        info.should.equal(total);
    });
});

describe("Placing an order", () => {

    it('Placing an order without authorization', async () => {
        await homepage.searchProduct(productNames.scalpAndHairMask);
        await addingToCart.addingItemToCart();
        await placingOrder.fillField('Test_firstname', 'Test_lastname', '0501234567', 'test@domail.com');
        await browser.pause(2000);
        expect(await placingOrder.submitButton.isDisplayed());
    });

});

describe("View product reviews", () => {

    it('Reading product reviews', async () => {
        await homepage.searchProduct(productNames.yslFoundation);

        const title = await reviews.checkReviews();
        const text = await title.getText();
        assert.include(text, 'Відгуки');
        // await expect(title).toHaveText(expect.stringContaining('Відгуки'));
    });
});

