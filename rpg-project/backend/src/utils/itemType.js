export const ITEM_TYPE = {
    MATERIAL: 0,
    POTION: 1,
    EQUIPMENT: 2,
};

export const EQUIP_TYPE = {
    NONE: 0,
    SWORD: 1,
    HELMET: 2,
    ARMOR: 3,
    SHIELD: 4,
    ACCESSORIES: 5,
    GLOVES: 6,
    LEGS: 7,
    BOOTS: 8,
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
    get: (vnum) => {
        let type = "None";
        for (const [key, value] of Object.entries(ITEM_VNUM)) {
            if (vnum < value) {
                break;
            }
            type = key;
        }
        return {
            type,
        };
    },
};
