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

export const simpleHash = () => {
    const s = "abcdefgj123456789";
    return (
        s
            .split("")
            .sort(function () {
                return 0.5 - Math.random();
            })
            .join("") +
        "i" +
        Date.now()
    );
};
