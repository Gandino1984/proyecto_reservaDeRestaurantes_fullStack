import {Router} from "express";

import userApiController from "../controllers/users/userApiController.js";

const router  = Router();

router.get("/",userApiController.getAll);
router.get("/:id",userApiController.getById);
router.put("/:id",userApiController.update);
router.delete("/:id",userApiController.remove);

export default router;