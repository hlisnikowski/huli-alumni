import userService from "../services/userService.js";

class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async getProfile(req, res, next) {
        try {
            return res.json({
                inventory: ["Sword", "Shield"],
            });
        } catch (error) {
            next(error);
        }
    }

    async getInventory(req, res, next) {
        try {
            const data = await userService.getInventory(req.user);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getSkill(req, res, next) {
        try {
            const data = await userService.getSkill(req.user);
            return res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async sell(req, res, next) {
        try {
            await userService.sell(req);
            return res.send("ok");
        } catch (error) {
            next(error);
        }
    }

    async sellAll(req, res, next) {
        try {
            await userService.sellAll(req);
            return res.send("ok");
        } catch (error) {
            next(error);
        }
    }

    // Armor, shield etc...
    async equip(req, res, next) {
        try {
            await userService.equip(req);
            return res.send("ok");
        } catch (error) {
            next(error);
        }
    }

    // Armor, shield etc...
    async unequip(req, res, next) {
        try {
            await userService.unequip(req);
            return res.send("ok");
        } catch (error) {
            next(error);
        }
    }

    // Healing, Meteorite etc...
    async equipSpell(req, res, next) {
        try {
            await userService.equipSpell(req);
            return res.send("ok");
        } catch (error) {
            next(error);
        }
    }
}

const userController = new UserController(userService);
export default userController;
