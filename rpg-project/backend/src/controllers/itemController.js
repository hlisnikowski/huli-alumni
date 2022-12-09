import itemService from "../services/itemService";

class ItemController {
    constructor(itemService) {
        this.itemService = itemService;
    }
}

const itemController = new ItemController(itemService);
export default itemController;
