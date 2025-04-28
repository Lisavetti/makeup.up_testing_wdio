import HomePage from "../page-object-model/Homepage.js";
import Filter from "../page-object-model/Filter.js";
import AddingToCart from "../page-object-model/Adding-to-cart.js";
import CheckingCart from "../page-object-model/Cart.js";
import PlacingOrder from "../page-object-model/Placing-order.js";
import Reviews from "../page-object-model/Reviews.js";

import { categories, getCategoryKeyByName } from "../utils/categories.js";
import { parsePrice, arePricesInRange, getInvalidPrices } from "../utils/priceUtils.js";
import { searchTestData } from "../utils/productSearchConstants.js";
import { userData } from "../utils/userCredentials.js";


const homepage = new HomePage();
const filter = new Filter();
const addingToCart = new AddingToCart();
const checkingCart = new CheckingCart();
const placingOrder = new PlacingOrder();
const reviews = new Reviews();

const should = require('chai').should();
const assert = require('chai').assert;
const expect = require('chai').expect;

describe("Search for products", () => {

    it("Product search by name", async () => {
        const responseMessage = await homepage.searchProduct(searchTestData.productNames.searchbyName);
        assert.include(responseMessage[1], `${searchTestData.staticPartOfResponse.serachResult} «${searchTestData.productNames.searchbyName}».`);
        assert.include(responseMessage[0].toLowerCase(), searchTestData.productNames.searchbyName.slice(0, 3));
    });

    it("Search products by brand", async () => {
        const responseMessage = await homepage.searchProduct(searchTestData.productNames.searchbyBrand);
        responseMessage[1].toLowerCase().should.include(`${searchTestData.staticPartOfResponse.serachResult.toLowerCase()} «${searchTestData.productNames.searchbyBrand}».`);
        responseMessage[0].toLowerCase().should.include(searchTestData.productNames.searchbyBrand.toLowerCase());

    });
});

describe("Filtering products", () => {

    it("Filtering products by category and price", async () => {

        const bodyMesagge = await filter.filterProduct(0, searchTestData.searchLimits.lowerSearchLimit, searchTestData.searchLimits.upperSearchLimit);
        expect(bodyMesagge).to.include(`від ${searchTestData.searchLimits.lowerSearchLimit} до ${searchTestData.searchLimits.upperSearchLimit} ₴`);

        const rawPrices = await filter.checkPrices();

        const parsedPrices = rawPrices.map(parsePrice);
        const invalidPrices = getInvalidPrices(parsedPrices, searchTestData.searchLimits.lowerSearchLimit, searchTestData.searchLimits.upperSearchLimit);
        const allInRange = arePricesInRange(parsedPrices, searchTestData.searchLimits.lowerSearchLimit, searchTestData.searchLimits.upperSearchLimit);
        expect(allInRange).to.be.true;
    });
});

describe("Adding items to cart", () => {

    it('Adding a product to the cart', async () => {

        await homepage.searchProduct(searchTestData.productNames.scalpAndHairMask);
        const countInput = await addingToCart.addingItemToCart();
        const countValue = await countInput.getValue();
        assert.equal(countValue, "1");
    });
});

describe("Viewing the shopping cart", () => {

    it('Checking items in the cart', async () => {
        await homepage.searchProduct(searchTestData.productNames.scalpAndHairMask);
        await addingToCart.addingItemToCart();

        const info = await checkingCart.checkingCartInformation();
        const total = await checkingCart.checkingCartTotal();
        const productText = await checkingCart.productDescription.getText();

        productText.should.equal(searchTestData.productNames.scalpAndHairMask);
        info.should.equal(total);
    });
});

describe("Placing an order", () => {

    it('Placing an order without authorization', async () => {
        await homepage.searchProduct(searchTestData.productNames.scalpAndHairMask);
        await addingToCart.addingItemToCart();
        await placingOrder.fillField(userData.fisrtName, userData.lastName, userData.phoneNumber, userData.email);

        expect(await placingOrder.submitButton.isDisplayed()).to.be.true;
    });

});

describe("View product reviews", () => {

    it('Reading product reviews', async () => {
        await homepage.searchProduct(searchTestData.productNames.yslFoundation);

        const title = await reviews.checkReviews();
        const text = await title.getText();
        assert.include(text, searchTestData.staticPartOfResponse.reviews);
    });
});

