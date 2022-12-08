import "dotenv/config";
import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    dialect: "mysql",

    logging: false,
});

export default db;
