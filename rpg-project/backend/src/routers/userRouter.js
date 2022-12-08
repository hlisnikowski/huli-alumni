import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/user", userController.getProfile);

export default router;
