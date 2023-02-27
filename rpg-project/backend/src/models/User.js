import { BOOLEAN, INTEGER, STRING } from "sequelize";
import db from "../config/db.js";
import Inventory from "./Inventory.js";
import Item from "./Item.js";

const User = db.define("user", {
    username: {
        type: STRING,
        unique: true,
        allowNull: false,
    },
    email: {
        type: STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: STRING,
        allowNull: false,
    },
    emailConfirmed: {
        type: BOOLEAN,
        defaultValue: true,
    },
    money: {
        type: INTEGER(10),
        defaultValue: 0,
    },
    level: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    hp: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    max_hp: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    atk: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    def: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    crit: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    spell: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    mana: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    max_mana: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    exp: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
});

export default User;
