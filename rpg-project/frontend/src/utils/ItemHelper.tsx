// Actual information for frontend
import itemData from "../data/items.json";

export const MAX_VNUM = 20000;
export type Item = {
    vnum: number;
    item_name: string;
    rarity: number;
    type: number;
    subtype: number;
    price: number;
    atk?: number;
    hp?: number;
    crit?: number;
    def?: number;
};

// Response from backend
export type ItemData = {
    hash: string;
    vnum: number;
    atk: number;
    hp: number;
    crit: number;
    def: number;
};

const data: Item[] = itemData;

export const getItem = (item: ItemData): Item => {
    // If item is placeholder
    if (item.vnum >= MAX_VNUM) {
        let i = getEmpty(item.vnum);
        return i;
    }
    // Find item from json
    let i = data.find((i) => i.vnum === item.vnum);
    if (i) {
        let it = { ...i };
        it!.atk = item.atk;
        it!.def = item.def;
        it!.crit = item.crit;
        it!.hp = item.hp;
        return it;
    }

    return getEmpty();
};

export const getItems = (items: ItemData[]): Item[] => {
    let itemsToReturn = [] as Item[];
    for (let itemInList of items) {
        const foundItem = data.find((itemData) => itemData.vnum === itemInList.vnum);
        itemsToReturn.push(foundItem ? foundItem : getEmpty());
    }
    return itemsToReturn;
};

export const getPrice = (price: number): number[] => {
    let result = [3];
    let copper = price % 100;
    let newPrice = (price - copper) / 100;
    let silver = newPrice % 100;
    let gold = (newPrice - silver) / 100;
    result[0] = copper;
    result[1] = silver;
    result[2] = gold;
    return result;
};

export const getSellPrice = (item: Item): number[] => {
    let i = { ...item };
    i.price = Math.round(i.price / 5);
    return getPrice(i.price);
};

export const addEquipmentEmptySlots = (items: ItemData[]): ItemData[] => {
    let types = Array(9).fill(true);

    for (let i = 1; i <= items.length; i++) {
        let pos = Math.floor(items[i - 1].vnum / 1000);
        types[pos] = false;
    }
    let result: ItemData[] = [];
    let iIndex = 0;

    for (let i = 1; i <= 8; i++) {
        if (types[i]) {
            result.push({
                vnum: MAX_VNUM + i,
                hash: "0",
            } as ItemData);
        } else {
            result.push(items[iIndex]);
            iIndex++;
        }
    }
    return result;
};

export const getEmpty = (vnum: number = 0, type: number = 1, subtype: number = 0) => {
    let e = {
        vnum: vnum,
        item_name: "None",
        price: 0,
        type: type,
        rarity: 0,
        subtype: subtype,
    } as Item;
    return e;
};

export const ITEM_VNUM = {
    POTIONS: 0,
    SWORD: 1000,
    HELMET: 2000,
    ARMOR: 3000,
    SHIELD: 4000,
    ACCESSORIES: 5000,
    GLOVES: 6000,
    LEGS: 7000,
    BOOTS: 8000,
    OTHER: 10000,
};

export const ITEM_TYPE = {
    MATERIAL: 0,
    POTION: 1,
    EQUIPMENT: 2,
};

const isItemPlaceholder = (i: ItemData) => {
    return i.vnum >= MAX_VNUM;
};

export { isItemPlaceholder };
