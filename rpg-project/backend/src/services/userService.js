import userRepository from "../repositories/userRepository.js";
import ResponseError from "../utils/ResponseError.js";
import bcrypt from "bcrypt";

import { generateHashedPassword, generateJWT } from "../utils/util.js";

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
}

const userService = new UserService(userRepository);
export default userService;
