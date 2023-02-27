import { Item, Shop } from "../models/Models.js";

class ShopRepository {
    async findAll() {
        return await Shop.findAll({ attributes: { exclude: ["id"] }, order: [["vnum", "ASC"]], raw: true, nest: true });
    }

    async findByVnum(vnum) {
        return await Shop.findOne({
            where: {
                vnum,
            },
        });
    }
}

const shopRepository = new ShopRepository();
export default shopRepository;
