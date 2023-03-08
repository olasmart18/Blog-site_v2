import express from "express";
import {
    getAllPost,
    getSinglePost,
    createPost,
    deleteAllPost,
    deleteSinglePost,
    updatePost, 
    compose
} from "../controllers/postController.js"
// import isAdmin from "../auth/is-Admin.js";
// import isUser from "../auth/is-User.js";

const router = express.Router()

// router.get("/post", isUser, postPage)
router.get("/post", getAllPost);
router.get("/post/:title", getSinglePost);
router.get("/compose", compose)
router.post("/compose", createPost);
router.delete("/post", deleteAllPost);
router.delete("/post/:title",  deleteSinglePost);
router.put("/post/:title", updatePost);

export default router