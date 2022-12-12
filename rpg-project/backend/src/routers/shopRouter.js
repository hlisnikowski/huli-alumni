import { Router } from "express";
import shopController from "../controllers/shopController.js";
const router = Router();

router.post("/buy", shopController.buy);

export default router;
