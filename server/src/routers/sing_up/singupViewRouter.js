import { Router } from "express";

import singupViewController from "../../controllers/sing_up/singupViewController.js";

const router = Router();


router.get("/",singupViewController.loginpage);
//router.get("/new",userViewController.createForm);
router.post("/",singupViewController.create);
//router.get("/:id",userViewController.getById);
//router.get("/:id/update",userViewController.updateForm);
//router.post("/:id",userViewController.update);
////router.delete("/:id",userViewController.remove);
//router.post("/:id/remove",userViewController.remove);



export default router;

