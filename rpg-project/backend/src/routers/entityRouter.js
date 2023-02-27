import { Router } from "express";
import entityController from "../controllers/entityController.js";

const router = Router();
export default router;

router.get("/fight/:vnum", entityController.fight);
