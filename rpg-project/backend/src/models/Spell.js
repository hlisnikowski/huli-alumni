import { INTEGER, STRING } from "sequelize";
import db from "../config/db.js";

const Spell = db.define(
    "spell",
    {
        vnum: {
            type: INTEGER,
            unique: true,
            allowNull: false,
        },
        spell_name: {
            type: STRING,
            allowNull: false,
        },
        mana_usage: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        trigger_chance: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        description: {
            type: STRING,
            allowNull: false,
        },
        same_card_count: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        // Reference to better spell
        upgrade_vnum: {
            type: INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        // Required items for upgrade
        upgrade_recipe: {
            type: INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        type: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    { timestamps: false }
);

export const SPELL_TYPE = {
    HEALING: 1,
    METEORITE: 2,
    ICE: 3,
};

export default Spell;
