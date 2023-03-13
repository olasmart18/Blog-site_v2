import express from "express";
import {
    register,
    login,
    myLoginPage,
    myRegPage,
    homePage,
    contactPage,
    aboutPage
} from "../controllers/userController.js";

import isAdmin from "../auth/is-Admin.js";
import isUser from "../auth/is-User.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login);
router.get("/login", myLoginPage)
router.get("/register", myRegPage)
router.get("/", isUser, homePage)
router.get("/contact", isUser, contactPage)
router.get("/about", isUser,aboutPage)



export default router