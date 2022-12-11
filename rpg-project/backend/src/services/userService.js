import userRepository from "../repositories/userRepository.js";
import ResponseError from "../utils/ResponseError.js";
import bcrypt from "bcrypt";

import { generateHashedPassword, generateJWT } from "../utils/util.js";
import Inventory from "../models/Inventory.js";
import Equipment from "../models/Equipment.js";

class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async login(data) {
        const user = await userRepository.findByEmail(data.email);

        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            throw new ResponseError(401, "Wrong login or password.");
        }

        return generateJWT(user);
    }

    async getInventory(data) {
        const user = await userRepository.findByEmail(data.email);
        // RAW & NEST bcs we want just json not dataValues
        const inventory = await Inventory.findAll({
            where: {
                userId: user.id,
            },
            raw: true,
            nest: true,
        });

        const equipment = await Equipment.findAll({
            where: {
                userId: user.id,
            },
            raw: true,
            nest: true,
        });

        inventory.forEach((i) => {
            delete i.id;
            delete i.userId;
        });

        equipment.forEach((i) => {
            delete i.id;
            delete i.userId;
        });

        return {
            inventory,
            equipment,
        };
    }
}

const userService = new UserService(userRepository);
export default userService;
