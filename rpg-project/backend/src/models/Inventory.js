import { INTEGER, STRING } from "sequelize";
import db from "../config/db.js";

const Inventory = db.define(
    "inventory",
    {
        id: {
            type: INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        hash: {
            type: STRING(50),
            allowNull: false,
        },
        hp: {
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
    },
    { timestamps: false }
);

export default Inventory;
