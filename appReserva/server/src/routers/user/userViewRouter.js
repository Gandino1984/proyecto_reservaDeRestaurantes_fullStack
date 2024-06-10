import { Router } from "express";

import userViewController from "../../controllers/user/userViewController.js";
import { hasSession } from "../../middleware/authMiddelWare.js";
//añadir hasSEsion en update, updatefrom y remove

const router = Router();

router.get("/",hasSession,userViewController.getAll);
router.get("/singup",userViewController.registerForm);
router.post("/singup",userViewController.register);
router.get("/login",userViewController.loginForm);
router.post("/login",userViewController.login);
router.post("/logout",hasSession,userViewController.logout);
router.get("/:id",hasSession,userViewController.getById);
router.get("/:id/update",hasSession,userViewController.updateForm);
router.post("/:id",hasSession,userViewController.update);
router.post("/:id/remove",hasSession,userViewController.remove);


export default router;

