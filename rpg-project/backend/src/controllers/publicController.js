import userService from "../services/userService.js";

class PublicController {
    constructor(userService) {
        this.userService = userService;
    }

    async login(req, res, next) {
        try {
            const loginToken = await userService.login(req.body);
            return res.json({
                token: loginToken,
            });
        } catch (error) {
            next(error);
        }
    }
}

const publicController = new PublicController(userService);
export default publicController;
