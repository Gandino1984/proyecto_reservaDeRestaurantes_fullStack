import {Router} from "express";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js"
import reservasRouter from "./reservasRouter.js";

const router  =  Router();

router.use("/users",userRouter);
router.use("/",authRouter);
router.use("/reservas",reservasRouter);



export default router;