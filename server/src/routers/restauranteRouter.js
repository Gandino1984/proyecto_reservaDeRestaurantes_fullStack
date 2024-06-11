import {Router} from "express";

import restauranteApiController from "../controllers/restaurante/restauranteApiController.js";

const router  = Router();

router.get("/",restauranteApiController.getAll);
router.get("/byproperty",restauranteApiController.getByProperty);
router.get("/:id",restauranteApiController.getById);
router.put("/:id",restauranteApiController.update);
router.delete("/:id",restauranteApiController.remove);
router.post("/",restauranteApiController.create);


export default router;