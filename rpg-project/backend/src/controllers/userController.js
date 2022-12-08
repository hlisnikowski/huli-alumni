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
}

const userController = new UserController(userService);
export default userController;
