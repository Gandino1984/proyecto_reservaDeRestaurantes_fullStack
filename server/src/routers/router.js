import {Router} from "express";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js"
import reservasRouter from "./reservasRouter.js";
import mesasRouter from "./mesasRouter.js";
import restauranteRouter from "./restauranteRouter.js";
import { isAdmin,isAuthenticated } from "../middleware/authMiddelWare.js";

const router  =  Router();

router.use("/users",isAuthenticated,userRouter);
router.use("/",authRouter);
router.use("/reservas",isAuthenticated,reservasRouter);
router.use("/mesas",isAuthenticated,mesasRouter);
router.use("/restaurante",isAuthenticated,restauranteRouter);



export default router;