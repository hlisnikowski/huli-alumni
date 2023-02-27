import { Item } from "../models/Models.js";

class ItemRepository {
    async findByVnum(vnum) {
        return await Item.findOne({
            where: {
                vnum,
            },
            raw: true,
            nest: true,
        });
    }

    async getItemPrice(vnum) {
        const i = await this.findByVnum(vnum);
        return i.price;
    }
}

const itemRepository = new ItemRepository();
export default itemRepository;
