import { BOOLEAN, INTEGER, STRING } from "sequelize";
import db from "../config/db.js";

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
            defaultValue: 0,
        },
        price: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    { timestamps: false }
);

export default User;
