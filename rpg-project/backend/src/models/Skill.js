import { INTEGER, STRING } from "sequelize";
import db from "../config/db.js";

const Skill = db.define(
    "skill",
    {
        healing: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        meteorite: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    { timestamps: false }
);

export default Skill;
