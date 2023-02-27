import { INTEGER, STRING } from "sequelize";
import db from "../config/db.js";

const Spellbook = db.define(
    "spellbook",
    {
        id: {
            type: INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    { timestamps: false }
);

export default Spellbook;
