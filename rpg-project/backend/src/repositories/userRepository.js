import User from "../models/User.js";
import { Op } from "sequelize";

class UserRepository {
    async findByEmail(email) {
        return await User.findOne({
            where: {
                email: email,
            },
        });
    }

    async incMoney(email, value) {
        await User.increment("money", {
            by: value,
            where: {
                email: email,
            },
        });
    }
}

const userRepository = new UserRepository();
export default userRepository;
