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

    async sell(req, res, next) {
        try {
            await userService.sell(req);
            return res.send("ok");
        } catch (error) {
            next(error);
        }
    }
}

const userController = new UserController(userService);
export default userController;
