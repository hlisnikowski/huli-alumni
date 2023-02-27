import spells from "../data/spells.json";

export type SkillData = {
    healing: number;
    meteorite: number;
};

export const SPELL_TYPE = {
    HEALING: 1,
    METEORITE: 2,
    ICE: 3,
};

export type Spellbook = {
    vnum: number;
    count: number;
};

export type Spell = {
    vnum: number;
    spell_name: string;
    mana_usage: number;
    trigger_chance: number;
    description: string;
    same_card_count: number;
    upgrade_vnum: number;
    upgrade_recipe: number;
    type: number;
};

// Get all spells that are atleast lv 1 (LEARNED)
// So we can use them & upgrade
export const getSpells = (data: SkillData): Spell[] => {
    let my_spells: Spell[] = [];
    Object.values(data).forEach((level, index) => {
        if (level && level != 0) {
            let vnum = 10 * (index + 1) + level;
            let spell = spells.find((s) => s.vnum == vnum);
            if (spell) my_spells.push(spell);
        }
    });
    return my_spells;
};

// If we want to upgrade our spell we have to know how many same spell we have
// in our spellbook
export const getSpellCount = (type: number, spellbook: Spellbook[]): number => {
    let val = 0;
    for (let book of spellbook) {
        let num = Math.floor(book.vnum / 10);
        if (type == num) {
            val = book.count;
            break;
        }
    }
    return val;
};

// Find spell by vnum / used for equiped spell
export const getSpellByVnum = (vnum: number): Spell | undefined => {
    return spells.find((s) => s.vnum == vnum);
};

export const getSpellShadow = (type: number | undefined): string => {
    if (!type) return "inset 1px 0px 28px 4px #000000";
    switch (type) {
        case 1:
            return "rgb(145, 255, 123) 0px 5px 60px 15px";
        case 2:
            return "hsl(0, 100%, 30%) 0px 5px 60px 15px";
        case 3:
            return "hsl(221, 90%, 55%) 0px 5px 60px 15px";
        default:
            return "rgb(145, 255, 123) 0px 5px 60px 15px";
    }
};
