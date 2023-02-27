import entityService from "../services/entityService.js";

class EntityController {
    constructor(entityService) {
        this.entityService = entityService;
    }

    async fight(req, res, next) {
        try {
            const data = await entityService.fight(req);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

const entityController = new EntityController(entityService);
export default entityController;
