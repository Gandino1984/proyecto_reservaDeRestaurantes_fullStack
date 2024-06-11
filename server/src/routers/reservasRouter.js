import {Router} from "express";

import reservasApiController from "../controllers/reservass/reservasApiController.js";

const router  = Router();

router.get("/",reservasApiController.getAll);
router.get("/byproperty",reservasApiController.getByProperty);
router.get("/:id",reservasApiController.getById);
router.put("/:id",reservasApiController.update);
router.delete("/:id",reservasApiController.remove);
router.post("/",reservasApiController.create);


export default router;