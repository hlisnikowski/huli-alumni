import { BOOLEAN, INTEGER, STRING } from "sequelize";
import db from "../config/db.js";
import { EQUIP_TYPE, ITEM_TYPE } from "../utils/itemType.js";
import Inventory from "./Inventory.js";
import User from "./User.js";

const Item = db.define(
    "item",
    {
        vnum: {
            type: INTEGER,
            unique: true,
            allowNull: false,
        },
        item_name: {
            type: STRING,
            allowNull: false,
        },
        rarity: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        type: {
            type: INTEGER,
            allowNull: false,
            defaultValue: ITEM_TYPE.MATERIAL,
        },
        subtype: {
            type: INTEGER,
            allowNull: false,
            defaultValue: EQUIP_TYPE.NONE,
        },
        price: {
            type: INTEGER(9),
            allowNull: false,
            defaultValue: 0,
        },
    },
    { timestamps: false }
);

export default Item;
