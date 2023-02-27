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

export const SPELLS = {
    HEALING: {
        msg: "heals for {0}",
        multi: [10, 15],
        // (5 / 100) * 25 [max_health]
        getHeal(level, max_hp) {
            return Math.round((this.multi[level - 1] / 100) * max_hp);
        },
        getMsg(level, current_hp, max_hp) {
            let heal = this.getHeal(level, max_hp);
            return this.msg.replace("{0}", `${heal}\nHP: ${current_hp + heal}`);
        },
    },

    METEORITE: {
        msg: "casts meteorite\nwhich deals {0}",
        multi: [150, 180],
        //(180:100)*20 =
        getDamage(level, atk) {
            return Math.round((this.multi[level - 1] / 100) * atk);
        },
        getMsg(level, attack) {
            return this.msg.replace("{0}", this.getDamage(level, attack));
        },
    },
};

export const getSubtypeVnum = (vnum) => {
    return Math.floor(vnum / 1000);
};
