import { Item, Inventory, User, Equipment } from "../models/Models.js";
import { EQUIP_TYPE, ITEM_TYPE, ITEM_VNUM } from "../utils/itemType.js";
import { simpleHash } from "../utils/util.js";

// Those are data for frontend part

export const initData = async () => {
    const user = await User.create({
        username: "mirek",
        email: "test@seznam.cz",
        password: "$2b$10$z4NoXBcDw97qfW3t8bJRVO64D/r0v6ZrX5Pe11vcv9pi5eeBoULle",
    });

    await Item.bulkCreate([
        {
            vnum: 1,
            item_name: "Red Potion (S)",
            rarity: 0,
            type: ITEM_TYPE.POTION,
            price: 15,
        },
        {
            vnum: 2,
            item_name: "Blue Potion (S)",
            rarity: 0,
            type: ITEM_TYPE.POTION,
            price: 18,
        },
        {
            vnum: ITEM_VNUM.ARMOR,
            item_name: "Wooden Armor",
            rarity: 0,
            type: ITEM_TYPE.EQUIPMENT,
            subtype: EQUIP_TYPE.ARMOR,
            price: 20,
        },
        {
            vnum: ITEM_VNUM.GLOVES,
            item_name: "Wooden Gloves",
            rarity: 0,
            type: ITEM_TYPE.EQUIPMENT,
            subtype: EQUIP_TYPE.GLOVES,
            price: 40,
        },
        {
            vnum: ITEM_VNUM.BOOTS,
            item_name: "Wooden Shoes",
            rarity: 0,
            type: ITEM_TYPE.EQUIPMENT,
            subtype: EQUIP_TYPE.BOOTS,
            price: 30,
        },
    ]);

    await Inventory.bulkCreate([
        {
            userId: 1,
            vnum: 1,
            hash: simpleHash(),
        },
        {
            userId: 1,
            vnum: 2,
            hash: simpleHash(),
        },
        {
            userId: 1,
            vnum: ITEM_VNUM.ARMOR,
            hash: simpleHash(),
        },
        {
            userId: 1,
            vnum: ITEM_VNUM.GLOVES,
            hash: simpleHash(),
        },
    ]);

    await Equipment.bulkCreate([
        {
            userId: 1,
            vnum: ITEM_VNUM.ARMOR,
            hash: simpleHash(),
        },
        {
            userId: 1,
            vnum: ITEM_VNUM.GLOVES,
            hash: simpleHash(),
        },
        {
            userId: 1,
            vnum: ITEM_VNUM.BOOTS,
            hash: simpleHash(),
        },
    ]);
};
