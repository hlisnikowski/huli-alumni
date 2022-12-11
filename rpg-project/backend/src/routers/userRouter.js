import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/", userController.getProfile);
router.get("/inventory", userController.getInventory);

export default router;
