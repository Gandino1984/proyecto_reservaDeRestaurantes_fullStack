import { Router } from "express";

import characterViewController from "../../controllers/character/characterViewController.js";
import { hasSession } from "../../middleware/authMiddelWare.js"

const router = Router();


router.get("/",hasSession,characterViewController.getAll);
router.get("/enemyList",hasSession,characterViewController.getAllEnemy);
router.get("/juego",hasSession,characterViewController.startGame);
router.get("/raza",hasSession,characterViewController.createFormRace);
router.get("/armas",hasSession,characterViewController.createFormWeapon);
router.get("/mapa",hasSession,characterViewController.createFormMaps);
router.post("/create",hasSession,characterViewController.create);
router.get("/:id",hasSession,characterViewController.getById);
// router.get("/:id/update",characterViewController.updateForm);
// router.post("/:id",characterViewController.update);
//router.delete("/:id",characterViewController.remove);
router.post("/:id/remove",hasSession,characterViewController.remove);





export default router;

