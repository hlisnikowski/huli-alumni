// This router is only for easier db calls. It will be removed.
import { Router } from "express";
import { Item, Shop } from "../models/Models.js";
import ResponseError from "../utils/ResponseError.js";
import fs from "fs";
import { ITEM_TYPE, ITEM_VNUM } from "../utils/itemType.js";

const router = Router();
export default router;

router.post("/item", async (req, res, next) => {
    try {
        const data = req.body;
        const i = await Item.findOne({ where: { vnum: data.vnum } });
        if (i) throw new ResponseError(404, "Item with this vnum already exists.");
        await Item.create(data);
        res.send(`Item ${data.item_name} has been created.
            Add ${data.vnum}_${data.rarity}.png to your folder`);
    } catch (error) {
        next(error);
    }
});

router.get("/dump", async (req, res, next) => {
    try {
        await generateItemProto();
        res.send(`Json file has been generated`);
    } catch (error) {
        next(error);
    }
});

router.get("/shop", async (req, res, next) => {
    try {
        await Shop.create({
            vnum: req.body.vnum,
        });
        res.send(`New shop item has been added.`);
    } catch (error) {
        next(error);
    }
});

const frontend_data = "./../frontend/src/data/items.json";
export const generateItemProto = async () => {
    Item.findAll({ attributes: { exclude: ["id"] }, order: [["vnum", "ASC"]] }).then((data) => {
        // convert the data to a JSON string (2 -> better json format)
        const jsonString = JSON.stringify(data, null, 2);
        // write the JSON string to a file
        fs.writeFile(frontend_data, jsonString, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Data saved to file");
            }
        });
    });
};
