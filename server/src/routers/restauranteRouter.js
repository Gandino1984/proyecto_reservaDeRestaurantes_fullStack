import {Router} from "express";

import restauranteApiController from "../controllers/restaurante/restauranteApiController.js";

const router  = Router();

router.get("/",restauranteApiController.getAll);
router.get("/tipo/:tipo",restauranteApiController.getRestauranteByTipo);
router.get("/byproperty",restauranteApiController.getByProperty);
router.get("/busqueda/:busquedaData",restauranteApiController.barraDeBusqueda)
router.get("/:id",restauranteApiController.getById);
router.put("/:id",restauranteApiController.updateRestaurante);
router.delete("/:id",restauranteApiController.remove);
router.post("/",restauranteApiController.create);




export default router;