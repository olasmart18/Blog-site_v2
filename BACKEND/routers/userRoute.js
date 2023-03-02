import express from "express";
import {
    register,
    login,
    myLoginPage,
    myRegPage,
    homePage
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login);
router.get("/login", myLoginPage)
router.get("/register", myRegPage)
router.get("/", homePage)



export default router