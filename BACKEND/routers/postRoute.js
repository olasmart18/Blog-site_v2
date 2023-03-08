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
import isAdmin from "../auth/is-Admin.js";
import isUser from "../auth/is-User.js";

const router = express.Router()

// router.get("/post", isUser, postPage)
router.get("/posts", isUser, getAllPost);
router.get("/post/:title", isUser, getSinglePost);
router.get("/compose", isUser, compose)
router.post("/compose", isUser, createPost);
router.delete("/post", isAdmin, deleteAllPost);
router.delete("/post/:title", isAdmin, deleteSinglePost);
router.put("/post/:title", isAdmin, updatePost);

export default router