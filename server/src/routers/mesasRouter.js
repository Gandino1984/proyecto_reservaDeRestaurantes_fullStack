import {Router} from "express";

import mesasApiController from "../controllers/mesas/mesasApiController.js";

const router  = Router();

router.get("/",mesasApiController.getAll);
router.get("/restaurante/:restauranteId",mesasApiController.getMesasByRestaurante);
router.get("/:id",mesasApiController.getById);
router.put("/:id",mesasApiController.update);
router.delete("/:id",mesasApiController.remove);
router.post("/",mesasApiController.create);


export default router;