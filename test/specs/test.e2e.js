import HomePage from "../pageobjects/Homepage.js";
import Filter from "../pageobjects/Filter.js";
import AddingToCart from "../pageobjects/Adding-to-cart.js";
import CheckingCart from "../pageobjects/Cart.js";
import PlacingOrder from "../pageobjects/Placing-order.js";
import Reviews from "../pageobjects/Reviews.js";

const homepage = new HomePage();
const filter = new Filter();
const addingToCart = new AddingToCart();
const checkingCart = new CheckingCart();
const placingOrder = new PlacingOrder();
const reviews = new Reviews();

describe("Search for products", () => {

    it("Product search by name", async () => {
        const resMes = await homepage.searchProduct('туш для вій');
        expect(resMes[1]).toContain('Результати пошуку за запитом «туш для вій».');
        expect(resMes[0].toLowerCase()).toContain('туш');
    });


    it("Search products by brand", async () => {
        const resMes = await homepage.searchProduct('dr. ceuracle');
        expect(resMes[1].toLowerCase()).toContain('результати пошуку за запитом «dr. ceuracle».');
        expect(resMes[0].toLowerCase()).toContain('dr. ceuracle');
    });
});

describe("Filtering products", () => {

    it("Filtering products by category and price", async () => {
       
        const category = {
            0: "Парфумерія",
            1: "Макіяж",
            2: "Обличчя",
            3: "Волосся",
            4: "Тіло", 
            5: "Здоровʼя і догляд",
            6: "Аксесуари і техніка",
            7: "Одяг",
            8: "Чоловікам",
            9: "Подарунки",
            10: "Бренди",
        };

        const from = 1000;
        const to = 5000;
        const categoryKey = Number(Object.keys(category).find(key => category[key] === "Парфумерія"));

        const bodyMes = await filter.filterProduct(categoryKey, from, to);
        await browser.pause(2000);
        await expect(bodyMes).toContain(`від ${from} до ${to} ₴`);

        const arr = await filter.checkPrices();
        const allInRange = arr.every(price => {
            const numPrice = parseInt(price, 10); 
            return numPrice >= from && numPrice <= to;
        });
        await expect(allInRange).toBe(true);
    });
});

describe("Adding items to cart", () => {


    it('Adding a product to the cart', async () => {

        await homepage.searchProduct('Маска для шкіри голови й волосся');
        const countInput = await addingToCart.addingItemToCart();
        const countValue = await countInput.getValue();
        await expect(countValue).toEqual("1");
    });
});

describe("Viewing the shopping cart", () => {

    it('Checking items in the cart', async () => {
        const searchingProduct = 'Маска для шкіри голови й волосся';
        await homepage.searchProduct(searchingProduct);
        await addingToCart.addingItemToCart();

        const info = await checkingCart.checkingCartInformation();
        const total = await checkingCart.checkingCartTotal();

        await expect(checkingCart.productDescription).toHaveText(searchingProduct);
        expect(info).toEqual(total);
    });
});

describe("Placing an order", () => {

    it('Placing an order without authorization', async () => {
        await homepage.searchProduct('Маска для шкіри голови й волосся');
        await addingToCart.addingItemToCart();
        await placingOrder.fillField('Test_firstname', 'Test_lastname', '0501234567', 'test@domail.com');

        await expect(placingOrder.submitButton).toBeDisplayed();
    });

});

describe("View product reviews", () => {

    it('Reading product reviews', async () => {
        await homepage.searchProduct('Yves Saint Laurent All Hours Foundation Luminous Matte');

        const title = await reviews.checkReviews();
        await expect(title).toHaveText(expect.stringContaining('Відгуки'));
    });
});

