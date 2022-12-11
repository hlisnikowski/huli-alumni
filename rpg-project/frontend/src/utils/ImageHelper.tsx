import { Item, MAX_VNUM } from "./ItemHelper";

const path = "src/assets/game/items";

export const ITEMTYPE = ["Material", "Potion", "Equipment"];

export const EQUIPTYPE = ["None", "Accessories", "Swords", "Helmets", "Shields", "Boots", "Gloves", "Armors", "Legs"];

// subtype
export const EQUIP_ID = {
    NONE: 0,
    ACCESSORIES: 1,
    SWORD: 2,
    HELMET: 3,
    SHIELD: 4,
    BOOTS: 5,
    GLOVES: 6,
    ARMOR: 7,
    LEGS: 8,
};

const getIcon = (item: Item): string => {
    // If it is a equipment empty slot
    if (item.vnum >= MAX_VNUM) {
        return path + "/Placeholder/" + item.vnum + ".png";
    }
    // If it is equipment item
    if (item.subtype > 0)
        return path + "/" + ITEMTYPE[item.type] + "/" + EQUIPTYPE[item.subtype] + "/" + getIconName(item);
    return path + "/" + ITEMTYPE[item.type] + "/" + getIconName(item);
};

const getIconName = (item: Item): string => {
    let vnum = item.vnum.toString();
    return vnum + "_" + item.rarity + ".png";
};

export { getIcon };
