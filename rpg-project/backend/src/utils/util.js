import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const generateHashedPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

export const generateJWT = (user) => {
    const userPayload = {
        email: user.email,
    };

    return jwt.sign(userPayload, process.env.TKN_SECRET);
};
