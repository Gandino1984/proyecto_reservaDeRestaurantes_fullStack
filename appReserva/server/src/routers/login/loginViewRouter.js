import { Router } from "express";

import loginViewController from "../../controllers/login/loginViewController.js";

const router = Router();


router.get("/",loginViewController.loginpage);
//router.get("/new",userViewController.createForm);
router.post("/",loginViewController.login);
//router.get("/:id",userViewController.getById);
//router.get("/:id/update",userViewController.updateForm);
//router.post("/:id",userViewController.update);
////router.delete("/:id",userViewController.remove);
//router.post("/:id/remove",userViewController.remove);



export default router;

