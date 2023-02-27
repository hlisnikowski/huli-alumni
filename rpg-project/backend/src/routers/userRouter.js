import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/", userController.getProfile);
router.get("/inventory", userController.getInventory);
router.get("/skill", userController.getSkill);
router.post("/sell", userController.sell);
router.post("/sell-all", userController.sellAll);
router.post("/equip-spell", userController.equipSpell);
router.post("/equip", userController.equip);
router.post("/unequip", userController.unequip);

export default router;
