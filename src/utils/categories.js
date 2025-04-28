export const categories = {
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

/**
 * @param {string} name
 * @returns {number}
 */

export function getCategoryKeyByName(name) {
    return Number(Object.keys(categories).find(key => categories[key] === name));
};
