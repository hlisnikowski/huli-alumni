import { Inventory, Item } from "../models/Models.js";
import { addModifiers } from "../utils/rules.js";
import { simpleHash } from "../utils/util.js";

class InventoryRepository {
    async add(data) {
        const i = await Item.findOne({
            where: {
                vnum: data.vnum,
            },
            raw: true,
            nest: true,
        });

        let mod = addModifiers(i.subtype, i.level);

        await Inventory.create({
            hash: simpleHash(),
            vnum: data.vnum,
            userId: data.userId,
            subtype: i.subtype,
            atk: mod.atk,
            def: mod.def,
            crit: mod.crit,
            hp: mod.hp,
        });
    }

    async remove(data) {
        await Inventory.destroy({
            where: {
                vnum: data.vnum,
                userId: data.userId,
                hash: data.hash,
            },
        });
    }

    async removeByVnum(data) {
        return await Inventory.destroy({
            where: {
                vnum: data.vnum,
                userId: data.userId,
            },
        });
    }
}

const inventoryRepository = new InventoryRepository();
export default inventoryRepository;
