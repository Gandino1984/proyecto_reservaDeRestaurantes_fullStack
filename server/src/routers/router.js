import {Router} from "express";
import userRouter from "./userRouter.js";
import authRouter from "./authRouter.js"

const router  =  Router();

router.use("/users",userRouter);
router.use("/",authRouter);


export default router;