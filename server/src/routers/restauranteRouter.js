import {Router} from "express";
import { isAdmin,isAuthenticated } from "../middleware/authMiddelWare.js";

import restauranteApiController from "../controllers/restaurante/restauranteApiController.js";

const router  = Router();

router.get("/",restauranteApiController.getAll);
router.get("/user",isAuthenticated, restauranteApiController.getRestaurantesByUserId);
router.get("/tipo/:tipo",restauranteApiController.getRestauranteByTipo);
router.get("/byproperty",restauranteApiController.getByProperty);
router.get("/busqueda",restauranteApiController.barraDeBusqueda)
router.get("/:id",restauranteApiController.getById);
router.put("/:id",isAuthenticated, restauranteApiController.updateRestaurante);
router.delete("/:id", isAuthenticated, restauranteApiController.remove);
router.post("/",isAuthenticated, restauranteApiController.create);

export default router;