import { INTEGER, STRING } from "sequelize";
import db from "../config/db.js";

const Shop = db.define("shop", {}, { timestamps: false });

export default Shop;
