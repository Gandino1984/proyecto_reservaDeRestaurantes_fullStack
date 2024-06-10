import { Router } from "express";

import characterController from "../../controllers/character/characterController.js";

const router = Router();

router.get("/",characterController.getAll);
//router.post("/",characterController.create);
router.get("/create",characterController.create);
router.get("/:id",characterController.getById);
//router.put("/:id",characterController.update);
/* router.get("/:id/update",characterController.update);
router.delete("/:id",characterController.remove);
router.get("/:id/remove",characterController.remove); */
export default router;
