import { app } from "./index.js";
import chalk from "chalk";
import db from "./config/db.js";
import { initData } from "./config/init.js";
import Entity from "./models/Entity.js";
import { Spell, Spellbook } from "./models/Models.js";
import { SPELL_TYPE } from "./models/Spell.js";
import Skill from "./models/Skill.js";

// Will generate json file so it can read all necessary information.

(async () => {
    try {
        await db.authenticate();
    } catch (error) {
        console.error(chalk.red("Unable to connect to the database:", error));
    }
    await db.sync({ force: false }).then(async () => {
        // INIT MODELS
        // Spell.create({
        //     vnum: 1,
        //     spell_name: "Healing (F)",
        //     mana_usage: 5,
        //     trigger_chance: 10,
        //     description: "Heal yourself {0} health.",
        //     same_card_count: 3,
        //     upgrade_vnum: 0,
        //     upgrade_recipe: 1,
        //     type: SPELL_TYPE.HEALING,
        // });
        // Spellbook.create({
        //     vnum: 1,
        //     userId: 1,
        // });
        // await Skill.create({
        //     userId: 1,
        // });
    });
})();

app.listen(8080, () => {
    console.log("Server started on port : 8080");
});
