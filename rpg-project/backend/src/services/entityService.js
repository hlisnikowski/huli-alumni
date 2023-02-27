import Entity from "../models/Entity.js";
import userService from "./userService.js";
import loots from "../data/loots.json" assert { type: "json" };
import inventoryRepository from "../repositories/inventoryRepository.js";
import userRepository from "../repositories/userRepository.js";
import Inventory from "../models/Inventory.js";
import { SPELL_TYPE } from "../models/Spell.js";
import { Spell } from "../models/Models.js";
import { SPELLS } from "../utils/itemType.js";

class EntityService {
    constructor(userService, inventoryRepository, userRepository) {
        this.userService = userService;
        this.inventoryRepository = inventoryRepository;
        this.userRepository = userRepository;
    }

    async fight(req) {
        const user = await userService.getUser(req.user.email);
        const entity = await Entity.findOne({
            where: {
                vnum: req.params.vnum,
            },
        });

        // DATA
        const res = [];
        let isPlayerFirst = Date.now() % 2 == 0;
        let won;
        let loot = [];
        let money = 0;

        // FIGHT
        if (isPlayerFirst) won = await this.#fightSym(entity, user, false, res);
        else won = await this.#fightSym(user, entity, true, res);

        // If player won give him loot and money
        if (won === "Victory") {
            money = this.#addLoot(entity, loot, money);
            // If no one wons, give him 20% money w/o loot
        } else if (won === "Draw") {
            money = this.#addLoot(entity, loot, money, false);
            // If lose no money / loot
        } else {
            money = 0;
        }
        // TODO : Save user's HP

        // Add loot to user inventory
        if (loot.length > 0) {
            //
            const itemsInBag = await Inventory.count({
                where: {
                    userId: user.id,
                },
            });
            // TODO : Max Bag Slots from user
            const availableSlots = 20 - itemsInBag;
            let i = 0;
            for (let vnum of loot) {
                // If we have no space in bag
                if (i >= availableSlots) {
                    break;
                }

                await inventoryRepository.add({
                    vnum: vnum,
                    userId: user.id,
                });
                i++;
            }
        }

        if (money != 0) {
            // Give him money
            await userRepository.incMoney(req.user.email, money);
        }

        return {
            fight: res,
            won,
            loot,
            money,
        };
    }

    #addLoot(entity, acq_loot, money, won = true) {
        let loot_data = loots.find((l) => l.id == entity.loot);
        if (loot_data) {
            if (won) money = loot_data.money;
            else {
                return Math.round(loot_data.money * 0.2);
            }
            for (let l of loot_data.loot) {
                let r = this.#rnd(0, 1001);
                if (r < l.chance) {
                    acq_loot.push(l.vnum);
                }
            }
        }
        return money;
    }

    async #fightSym(p1, p2, isPlayer, res) {
        const p1_spell = await Spell.findOne({
            where: {
                vnum: p1.spell,
            },
        });

        const p2_spell = await Spell.findOne({
            where: {
                vnum: p2.spell,
            },
        });

        for (let index = 0; index < 10; index++) {
            // --------------- PLAYER 2 --------------/

            // Cast Spell, if not successfull then attack
            this.#castSpell(p2, p1, p2_spell, res, isPlayer);
            let damage = 0;
            // SETUP CRIT
            let crit = this.#critMulti(p2);
            damage = p2.atk * crit;

            // DEF
            damage = this.#defense(p1, damage, res, isPlayer);

            p1.hp -= damage;
            this.#addStatus(
                res,
                `${this.#name(p1)} took ${damage}${crit == 2 ? "' " : " "}damage.\nHP: ${p1.hp}`,
                crit == 2 ? "crit" : "basic",
                isPlayer
            );

            if (p1.hp > 0) {
                // --------------- PLAYER 1 --------------/

                // Cast Spell, if not successfull then attack
                this.#castSpell(p1, p2, p1_spell, res, !isPlayer);
                let damage = 0;
                // SETUP CRIT
                let crit = this.#critMulti(p1);
                damage = p1.atk * crit;
                // DEF
                damage = this.#defense(p2, damage, res, !isPlayer);

                p2.hp -= damage;

                this.#addStatus(
                    res,
                    `${this.#name(p2)} took ${damage}${crit == 2 ? "' " : " "}damage.\nHP: ${p2.hp}`,
                    crit == 2 ? "crit" : "basic",
                    !isPlayer
                );

                //  ------------- WIN / LOSE ------------------
                if (p2.hp <= 0) {
                    return this.#finish(res, p2, isPlayer);
                }
            } else {
                return this.#finish(res, p1, !isPlayer);
            }
            //  ----------------------------------------------
        }
        return "Draw";
    }

    #finish(res, p, isPlayer) {
        this.#addStatus(res, `${this.#name(p)} died.`);
        return isPlayer ? "Victory" : "Defeat";
    }

    #castSpell(p1, p2, spell, res, isPlayer) {
        // If no spell found
        if (!spell) return false;
        // If user has chance to cast spell
        if (spell.trigger_chance >= this.#rnd(1, 101)) {
            let level = spell.vnum % 10;
            // Find which spell he used
            switch (spell.type) {
                // HEALING
                case SPELL_TYPE.HEALING:
                    let healing = SPELLS.HEALING;
                    this.#addStatus(
                        res,
                        `${this.#name(p1)} ${healing.getMsg(level, p1.hp, p1.max_hp)}`,
                        "healing",
                        isPlayer
                    );
                    p1.hp += healing.getHeal(level, p1.hp, p1.max_hp);
                    return true;

                // METEORITE
                case SPELL_TYPE.METEORITE:
                    let meteorite = SPELLS.METEORITE;
                    this.#addStatus(res, `${this.#name(p1)} ${meteorite.getMsg(level, p1.atk)}`, "meteorite", isPlayer);
                    p2.hp -= meteorite.getDamage(level, p1.atk);
                    return true;
                // ICE
                case SPELL_TYPE.ICE:
                    return true;
            }
        }
        return false;
    }

    #critMulti(p) {
        return this.#rnd(1, 101) <= p.crit ? 2 : 1;
    }

    #name(p) {
        const name = p.name;
        return name ? name : p.username;
    }

    #defense(p, damage, res, isPlayer) {
        if (p.def > 0) {
            if (this.#rnd(0, 4) == 0) {
                this.#addStatus(res, `${this.#name(p)} will block:\n${p.def} of damage`, "defense", !isPlayer);
                damage -= p.def;
            }
        }
        // If defense is bigger than actual damage, it may be negative.
        // It would heal enemy.
        return damage < 0 ? 0 : damage;
    }

    #rnd(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    /** Add Status
     * @param status Scenario
     * @param msg What happened
     * @param type Icon that will show up
     * @param isPlayer Will show different collor in result.
     */
    #addStatus(status, msg, type, isPlayer) {
        status.push({
            status: msg,
            type: type,
            player: isPlayer,
        });
    }
}

const entityService = new EntityService(userService, inventoryRepository, userRepository);
export default entityService;
