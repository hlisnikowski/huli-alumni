import shopService from "../services/shopService.js";

class ShopController {
    constructor(shopService) {
        this.shopService = shopService;
    }

    async buy(res, req, next) {
        try {
            await shopService.buy(res);
            return req.json("ok");
        } catch (error) {
            next(error);
        }
    }

    async sell(res, req, next) {
        try {
            await shopService.sell(res);
            return req.json("ok");
        } catch (error) {
            next(error);
        }
    }
}

const shopController = new ShopController(shopService);
export default shopController;
