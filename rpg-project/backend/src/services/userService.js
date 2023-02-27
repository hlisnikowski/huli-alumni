import userRepository from "../repositories/userRepository.js";
import ResponseError from "../utils/ResponseError.js";
import bcrypt from "bcrypt";

import { generateJWT } from "../utils/util.js";
import inventoryRepository from "../repositories/inventoryRepository.js";
import itemRepository from "../repositories/itemRepository.js";
import { Skill, Spellbook, Equipment, Inventory } from "../models/Models.js";
import { Sequelize } from "sequelize";
import { calculateAtk, calculateCrit, calculateDef, calculateMaxHP, calculateMaxMana } from "../utils/rules.js";

class UserService {
    constructor(userRepository, inventoryRepository, itemRepository) {
        this.userRepository = userRepository;
        this.inventoryRepository = inventoryRepository;
        this.itemRepository = itemRepository;
    }

    async login(data) {
        const user = await userRepository.findByEmail(data.email);

        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new ResponseError(401, "Wrong login or password.");
        }

        return generateJWT(user);
    }

    async getInventory(data) {
        const user = await userRepository.findByEmail(data.email);
        // RAW & NEST bcs we want just json not dataValues
        const inventory = await Inventory.findAll({
            attributes: {
                exclude: ["id", "userId"],
            },
            where: {
                userId: user.id,
            },
            raw: true,
            nest: true,
        });

        // To calculate all stats we need our equipment
        // also to show our equipment to frontend
        const equipment = await Equipment.findAll({
            attributes: {
                exclude: ["id", "userId"],
            },
            where: {
                userId: user.id,
            },
            order: [["subtype", "ASC"]],
            raw: true,
            nest: true,
        });

        // Take equipment and count all the stats
        await this.#calculateStats(user, equipment);

        let stats = {
            hp: user.hp,
            max_hp: user.max_hp,
            mana: user.mana,
            max_mana: user.max_mana,
            exp: user.exp,
            level: user.level,
            atk: user.atk,
            def: user.def,
            crit: user.crit,
        };

        return {
            inventory,
            equipment,
            money: user.get("money"),
            stats,
        };
    }

    async #calculateStats(user, equipment) {
        calculateAtk(user, equipment);
        calculateCrit(user, equipment);
        calculateDef(user, equipment);
        calculateMaxHP(user, equipment);
        calculateMaxMana(user);
        await user.save();
    }

    async getSkill(data) {
        const user = await this.getUser(data.email);
        const spells = await Skill.findOne({
            attributes: {
                exclude: ["id", "userId"],
            },
            where: {
                userId: user.id,
            },
            raw: true,
            nest: true,
        });

        const spellbook = await Spellbook.findAll({
            attributes: {
                //count(vnum) as count -> count all same vnums
                include: [[Sequelize.fn("COUNT", Sequelize.col("vnum")), "count"]],
                exclude: ["id", "userId"],
            },
            where: {
                userId: user.id,
            },
            raw: true,
            nest: true,
            group: "vnum",
        });

        return {
            spells,
            spellbook,
            spell: user.spell,
        };
    }

    async sell(req) {
        const user = await this.getUser(req.user.email);
        let price = await itemRepository.getItemPrice(req.body.vnum);
        await userRepository.incMoney(req.user.email, Math.round(price / 5));

        await inventoryRepository.remove({
            userId: user.get("id"),
            hash: req.body.hash,
            vnum: req.body.vnum,
        });
    }

    async sellAll(req) {
        const user = await this.getUser(req.user.email);
        let price = await itemRepository.getItemPrice(req.body.vnum);
        let count = await inventoryRepository.removeByVnum({
            userId: user.get("id"),
            vnum: req.body.vnum,
        });
        await userRepository.incMoney(req.user.email, Math.round(price / 5) * count);
    }

    async equip(req) {
        // If item has no subtype or its not equipment
        if (!req.body.subtype && req.body.subtype < 1) return;

        const user = await this.getUser(req.user.email);
        const item_vnum = req.body.vnum;
        const item_hash = req.body.hash;
        const item_subtype = req.body.subtype;
        // Clone of equiped item
        const equipedItem = {
            ...(await Equipment.findOne({
                where: {
                    userId: user.id,
                    subtype: item_subtype,
                },
                raw: true,
                nest: true,
            })),
        };

        // If we already have equiped item we have to swap them
        if (equipedItem.vnum) {
            // Remove it from Equipment
            await Equipment.destroy({
                where: {
                    userId: user.id,
                    subtype: item_subtype,
                },
            });
            // Add it to inventory
            await Inventory.create({ ...equipedItem });
        }

        const itemToEquip = await Inventory.findOne({
            where: {
                vnum: item_vnum,
                hash: item_hash,
                subtype: item_subtype,
                userId: user.id,
            },
            raw: true,
            nest: true,
        });

        // Equip item
        await Equipment.create({
            ...itemToEquip,
        });

        // Remove it from inv.
        await Inventory.destroy({
            where: { ...itemToEquip },
        });
    }

    async unequip(req) {
        if (!req.body.subtype && req.body.subtype < 1) return;

        const user = await this.getUser(req.user.email);
        const item_vnum = req.body.vnum;
        const item_subtype = req.body.subtype;

        // Find equipment we want to remove
        const itemToUnequip = {
            ...(await Equipment.findOne({
                where: {
                    userId: user.id,
                    vnum: item_vnum,
                    subtype: item_subtype,
                },
                raw: true,
                nest: true,
            })),
        };

        if (!itemToUnequip.vnum) return;

        // Remove it from equipment
        await Equipment.destroy({
            where: {
                vnum: itemToUnequip.vnum,
                hash: itemToUnequip.hash,
                subtype: itemToUnequip.subtype,
                userId: user.id,
            },
        });

        // Add to inv from eq.
        await Inventory.create({ ...itemToUnequip });
    }

    async equipSpell(req) {
        const user = await this.getUser(req.user.email);
        const spells = await Skill.findOne({
            where: {
                userId: user.id,
            },
        });

        let type = req.body.type;
        let level = req.body.vnum % 10;
        const canEquip = this.#canChangeSpell(type, spells, level);

        if (canEquip) {
            await user.update({
                spell: req.body.vnum,
            });
        } else {
            throw new ResponseError(404, `Couldn't equip ${req.body.vnum} level ${level} type ${type}`);
        }
    }

    async getUser(email) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new ResponseError(401, "This user doesn't exists.");
        }
        return user;
    }

    #canChangeSpell(type, spells, level) {
        switch (type) {
            case 1:
                return spells.healing == level;
            case 2:
                return spells.meteorite == level;
            case 3:
                return spells.ice == level;
        }
    }
}

const userService = new UserService(userRepository, inventoryRepository, itemRepository);
export default userService;
