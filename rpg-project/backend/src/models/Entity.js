import { INTEGER, STRING } from "sequelize";
import db from "../config/db.js";

const Entity = db.define(
    "entity",
    {
        vnum: {
            type: INTEGER,
            allowNull: false,
            unique: true,
        },
        name: {
            type: STRING(25),
        },
        level: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
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
        map: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        loot: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        energy: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        spell: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    { timestamps: false }
);

export default Entity;
