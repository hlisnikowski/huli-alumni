import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/", userController.getProfile);
router.get("/inventory", userController.getInventory);
router.post("/sell", userController.sell);

export default router;
