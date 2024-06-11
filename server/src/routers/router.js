import {Router} from "express";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js"
import reservasRouter from "./reservasRouter.js";
import mesasRouter from "./mesasRouter.js";

const router  =  Router();

router.use("/users",userRouter);
router.use("/",authRouter);
router.use("/reservas",reservasRouter);
router.use("/mesas",mesasRouter);




export default router;