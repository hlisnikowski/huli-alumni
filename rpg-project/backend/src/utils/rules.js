import { EQUIP_TYPE, ITEM_TYPE } from "./itemType.js";

export const EXP = [0, 10, 25, 75, 180, 390, 880, 2050, 5005, 1105, 2350, 4980, 10250];

// Required equipment
export const calculateMaxHP = (user, items) => {
    let hp = 10;
    for (let item of items) {
        hp += item.hp;
    }
    hp += user.level * 10;
    user.max_hp = hp;
    if (user.hp > user.max_hp) {
        user.hp = user.max_hp;
    }
};

export const calculateMaxMana = (user) => {
    let mana = 5;
    mana += user.level * 5;
    user.max_mana = mana;
};

// Required equipment
export const calculateAtk = (user, items) => {
    let atk = 1;
    for (let item of items) {
        atk += item.atk;
    }
    atk += Math.round(user.level * 1.7);
    user.atk = atk;
};

// Required equipment
export const calculateDef = (user, items) => {
    let def = 1;
    for (let item of items) {
        def += item.def;
    }
    def += user.level * 1;
    user.def = def;
};

// Required equipment
export const calculateCrit = (user, items) => {
    let crit = 1;
    for (let item of items) {
        crit += item.crit;
    }
    user.crit = crit;
};

function rnd(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

export const addModifiers = (subtype, level) => {
    let atk = 0;
    let def = 0;
    let crit = 0;
    let hp = 0;

    // If item is equipment
    if (subtype > 0) {
        let double = level * 2;
        switch (subtype) {
            case EQUIP_TYPE.LEGS:
                hp += double + rnd(0, 2 * level * 2);
                def += double + rnd(0, level * 1.2 + 1);
                break;
            case EQUIP_TYPE.SHIELD:
                hp += level + rnd(0, level * 1.5);
                def += double + rnd(0, level * 2.5);
                break;
            case EQUIP_TYPE.ARMOR:
                hp += double + rnd(0, level * 2);
                def += double + rnd(0, level * 2);
                break;
            case EQUIP_TYPE.GLOVES:
                hp += level + rnd(0, level * 1 + 1);
                def += level + rnd(0, level * 1 + 1);
                atk += rnd(0, level * 1 + 1);
                break;
            case EQUIP_TYPE.ACCESSORIES:
                hp += rnd(0, level * 1 + 1);
                def += rnd(0, level * 1 + 1);
                atk += rnd(0, level * 1 + 1);
                crit += randomCrit();
                break;
            case EQUIP_TYPE.HELMET:
                hp += level + rnd(0, level * 1.8);
                def += level + rnd(0, level * 1.2 + 1);
                break;
            case EQUIP_TYPE.BOOTS:
                hp += level + rnd(0, level * 1.5);
                def += level + rnd(0, level * 1.2 + 1);
                break;
            case EQUIP_TYPE.SWORD:
                atk += double + rnd(0, level * 3);
                crit += randomCrit();
                break;
        }
    }

    return {
        atk,
        def,
        crit,
        hp,
    };
};

const randomCrit = () => {
    let r = rnd(0, 100);
    console.log("Dice was" + r);
    if (r < 10) {
        return 0;
    }
    if (r < 70) {
        return rnd(1, 15);
    }
    if (r < 85) {
        return rnd(1, 30);
    }
    if (r < 90) {
        return rnd(20, 41);
    } else return rnd(30, 51);
};

// OLDER VERSION
/*export const addModifiers = (item) => {
    // Get all default stats from db
    let atk = item.atk;
    let def = item.def;
    let crit = item.crit;
    let hp = item.hp;

    // If item is equipment
    if (subtype > 0) {
        switch (subtype) {
            case EQUIP_TYPE.LEGS:
                hp += randomMultiplier(hp, 10);
                def += randomMultiplier(def, 10);
                break;
            case EQUIP_TYPE.SHIELD:
                hp += randomMultiplier(hp, 15);
                def += randomMultiplier(def, 25);
                break;
            case EQUIP_TYPE.ARMOR:
                hp += randomMultiplier(hp, 20);
                def += randomMultiplier(def, 15);
                break;
            case EQUIP_TYPE.GLOVES:
                hp += randomMultiplier(hp, 10);
                def += randomMultiplier(def, 15);
                atk += randomMultiplier(crit, 15);
                break;
            case EQUIP_TYPE.ACCESSORIES:
                hp += randomMultiplier(hp, 10);
                def += randomMultiplier(def, 10);
                atk += randomMultiplier(crit, 10);
                crit += randomMultiplier(crit, 50);
                break;
            case EQUIP_TYPE.HELMET:
                hp += randomMultiplier(hp, 18);
                def += randomMultiplier(def, 15);
                break;
            case EQUIP_TYPE.BOOTS:
                hp += randomMultiplier(hp, 15);
                def += randomMultiplier(def, 10);
                break;
            case EQUIP_TYPE.SWORD:
                atk += randomMultiplier(atk, 15);
                crit += randomMultiplier(crit, 10);
                break;
        }
    }

    return {
        atk,
        def,
        crit,
        hp,
    };
};

const randomCrit = () => {
    let r = rnd(0, 100);
    console.log("Dice was" + r);
    if (r < 10) {
        return 0;
    }
    if (r < 70) {
        return rnd(1, 15);
    }
    if (r < 85) {
        return rnd(1, 30);
    }
    if (r < 90) {
        return rnd(20, 41);
    } else return rnd(30, 51);
};

const randomMultiplier = (val, per) => {
    // Number that can be added to that value
    // If value is 175 and per (%) is 10, it will be 18
    let n = Math.round((val / 100) * per);
    // Range 0 - 18 can be added
    let r = rnd(0, n);
    return r;
};*/
