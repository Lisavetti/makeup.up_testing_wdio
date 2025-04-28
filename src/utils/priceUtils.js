/**
 * @param {string} rawPrice 
 * @returns {number}
 */
export function parsePrice(rawPrice) {
    return Number(rawPrice.replace(/[^\d]/g, ""));
};

/**
 * @param {number[]} prices 
 * @param {number} from 
 * @param {number} to 
 * @returns {boolean}
 */
export function arePricesInRange(prices, from, to) {
    return prices.every(price => price >= from && price <= to);
};

/**
 * @param {number[]} prices 
 * @param {number} from 
 * @param {number} to 
 * @returns {number[]}
 */
export function getInvalidPrices(prices, from, to) {
    return prices.filter(price => price < from || price > to);
};
