import { Inventory } from "../models/Models.js";
import { simpleHash } from "../utils/util.js";

class InventoryRepository {
    async add(data) {
        await Inventory.create({
            hash: simpleHash(),
            vnum: data.vnum,
            userId: data.userId,
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
}

const inventoryRepository = new InventoryRepository();
export default inventoryRepository;
