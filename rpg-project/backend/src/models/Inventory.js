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
    },
    { timestamps: false }
);

export default Inventory;
