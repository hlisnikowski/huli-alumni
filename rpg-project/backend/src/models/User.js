import { BOOLEAN, STRING } from "sequelize";
import db from "../config/db.js";

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
});

export default User;
