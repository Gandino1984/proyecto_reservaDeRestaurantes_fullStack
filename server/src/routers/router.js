import { Router } from "express";

//import userRouter from "./user/userRouter.js";
import userViewRouter from "./user/userViewRouter.js";
//import characterRouter from "./characterRouter.js";
import characterViewRouter from "./character/characterViewRouter.js";
//import weaponRouter from "./weaponRouter.js";
//import raceRouter from "./raceRouter.js";
//import mapRouter from "./mapRouter.js";
//import loginViewRouter from "./login/loginViewRouter.js"
//import singupViewRouter from "./sing_up/singupViewRouter.js"


const router = Router();

router.get("/", (req, res) => {
    console.log("sessionUser ES:", req.session.user);
    res.render("user/login", {
        sessionUser: req.session.user
    });
});



router.use ("/user", userViewRouter);
router.use("/character", characterViewRouter);
//router.use("/weapon", weaponRouter);
//router.use("/race", raceRouter);
//router.use("/map", mapRouter);
//router.use("/login", loginViewRouter)
//router.use("/singup", singupViewRouter)

export default router; 