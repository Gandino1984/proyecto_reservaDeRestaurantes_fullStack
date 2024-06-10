import { Router } from "express";

import userController from "../../controllers/user/userController.js";

const router = Router();

router.get("/",userController.getAll);
//router.post("/",userController.create);
router.get("/create",userController.create);
router.get("/:id",userController.getById);
//router.put("/:id",userController.update);
router.get("/:id/update",userController.update);
//router.delete("/:id",userController.remove);
router.get("/:id/remove",userController.remove);
export default router;
