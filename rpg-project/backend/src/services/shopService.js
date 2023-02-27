import shopRepository from "../repositories/shopRepository.js";
import userRepository from "../repositories/userRepository.js";
import inventoryRepository from "../repositories/inventoryRepository.js";
import itemRepository from "../repositories/itemRepository.js";
import ResponseError from "../utils/ResponseError.js";

class ShopService {
    constructor(shopRepository, userRepository, inventoryRepository, itemRepository) {
        this.shopRepository = shopRepository;
        this.userRepository = userRepository;
        this.inventoryRepository = inventoryRepository;
        this.itemRepository = itemRepository;
    }

    async buy(res) {
        const user = await userRepository.findByEmail(res.user.email);
        if (!user) {
            throw new ResponseError(404, "Please, login.");
        }

        if (!res.body.vnum) {
            throw new ResponseError(404, "Missing important information.");
        }

        const shopItem = await shopRepository.findByVnum(res.body.vnum);
        if (!shopItem) {
            throw new ResponseError(404, "This item doesn't exist in the shop.");
        }
        const userMoney = user.get("money");
        const itemPrice = await itemRepository.getItemPrice(shopItem.get("vnum"));
        if (userMoney < itemPrice) throw new ResponseError(404, "Not enough money.");

        user.update({
            money: userMoney - itemPrice,
        });

        await inventoryRepository.add({
            vnum: res.body.vnum,
            userId: user.get("id"),
        });
    }
}

const shopService = new ShopService(shopRepository, userRepository, inventoryRepository, itemRepository);
export default shopService;
