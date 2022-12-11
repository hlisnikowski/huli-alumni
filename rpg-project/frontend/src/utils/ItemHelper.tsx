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
};

// Response from backend
export type ItemData = {
    hash: string;
    vnum: number;
};

const data: Item[] = itemData;

export const getItem = (item: ItemData): Item => {
    if (item.vnum >= MAX_VNUM) {
        let i = getEmpty(item.vnum);
        return i;
    }
    const i = data.find((i) => i.vnum === item.vnum);
    return i ? i : getEmpty();
};

export const getItems = (items: ItemData[]): Item[] => {
    let itemsToReturn = [] as Item[];
    for (let itemInList of items) {
        const foundItem = data.find((itemData) => itemData.vnum === itemInList.vnum);
        itemsToReturn.push(foundItem ? foundItem : getEmpty());
    }
    return itemsToReturn;
};

export const getPrice = (item: Item): number[] => {
    let result = [3];
    let copper = item.price % 100;
    let newPrice = (item.price - copper) / 100;
    let silver = newPrice % 100;
    let gold = (newPrice - silver) / 100;
    result[0] = copper;
    result[1] = silver;
    result[2] = gold;
    return result;
};

export const addEquipmentEmptySlots = (items: ItemData[]): ItemData[] => {
    let data: ItemData[] = [...items];
    let types = Array(9).fill(true);

    for (let i = 1; i <= items.length; i++) {
        let pos = Math.ceil(items[i - 1].vnum / 1000);
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

const getEmpty = (vnum: number = 0) => {
    let e = {
        vnum: vnum,
        item_name: "None",
        price: 0,
        type: 0,
        rarity: 0,
    } as Item;
    return e;
};

const ITEM_VNUM = {
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
