import {Router} from "express";

import reservasApiController from "../controllers/reservas/reservasApiController.js";

const router  = Router();

router.get("/",reservasApiController.getAll);
router.get("/byproperty",reservasApiController.getByProperty);
router.get("/:restaurante/:numeroSillas/:dia",reservasApiController.getReservasPorDiaYSillas);
router.get("/restaurante/:restauranteid",reservasApiController.getReservasPorRestaurante);
router.get("/:id",reservasApiController.getById);
router.put("/:id",reservasApiController.update);
router.delete("/:id",reservasApiController.remove);
router.post("/",reservasApiController.create);


export default router;