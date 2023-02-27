// This router is only for easier db calls. It will be removed.
import { Router } from "express";
import { Item, Shop, Spell } from "../models/Models.js";
import ResponseError from "../utils/ResponseError.js";
import fs from "fs";
import { ITEM_TYPE, ITEM_VNUM } from "../utils/itemType.js";
import Entity from "../models/Entity.js";

const router = Router();
export default router;

// Add new item to DB
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

// Take all items from DB and create json file with those datas for frontend
router.get("/dump-items", async (req, res, next) => {
    try {
        await generateItemProto();
        res.send(`Json file has been generated`);
    } catch (error) {
        next(error);
    }
});

// Take all entities from DB and create json file with those datas for frontend
router.get("/dump-entities", async (req, res, next) => {
    try {
        await generateEntityProto();
        res.send(`Json file has been generated`);
    } catch (error) {
        next(error);
    }
});

// Take all spells from DB and create json file with those datas for frontend
router.get("/dump-spells", async (req, res, next) => {
    try {
        await generateSpellProto();
        res.send(`Json file has been generated`);
    } catch (error) {
        next(error);
    }
});

// Add new item to shop
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

const frontend_item_data = "./../frontend/src/data/items.json";
const frontend_entity_data = "./../frontend/src/data/entities.json";
const frontend_spell_data = "./../frontend/src/data/spells.json";

export const generateItemProto = async () => {
    Item.findAll({ attributes: { exclude: ["id"] }, order: [["vnum", "ASC"]] }).then((data) => {
        // convert the data to a JSON string (2 -> better json format)
        const jsonString = JSON.stringify(data, null, 2);
        // write the JSON string to a file
        fs.writeFile(frontend_item_data, jsonString, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Item data saved to file");
            }
        });
    });
};

export const generateEntityProto = async () => {
    Entity.findAll({ attributes: { exclude: ["id"] }, order: [["vnum", "ASC"]] }).then((data) => {
        // convert the data to a JSON string (2 -> better json format)
        const jsonString = JSON.stringify(data, null, 2);
        // write the JSON string to a file
        fs.writeFile(frontend_entity_data, jsonString, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Entity data saved to file");
            }
        });
    });
};

export const generateSpellProto = async () => {
    Spell.findAll({ attributes: { exclude: ["id"] }, order: [["vnum", "ASC"]] }).then((data) => {
        // convert the data to a JSON string (2 -> better json format)
        const jsonString = JSON.stringify(data, null, 2);
        // write the JSON string to a file
        fs.writeFile(frontend_spell_data, jsonString, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Entity data saved to file");
            }
        });
    });
};
