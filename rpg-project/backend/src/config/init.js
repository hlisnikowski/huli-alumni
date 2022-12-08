import User from "../models/User.js";

export const initData = async () => {
    await User.create({
        username: "mirek",
        email: "test@seznam.cz",
        password: "$2b$10$z4NoXBcDw97qfW3t8bJRVO64D/r0v6ZrX5Pe11vcv9pi5eeBoULle",
    });
};
