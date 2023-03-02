import express from "express";
import {
    getAllPost,
    getSinglePost,
    createPost,
    deleteAllPost,
    deleteSinglePost,
    updatePost, 
    postPage
} from "../controllers/postController.js"

const router = express.Router()

router.get("/post", postPage)
// router.get("/post", getAllPost);
router.get("/post/:title", getSinglePost);
router.post("/post", createPost);
router.delete("/post", deleteAllPost);
router.delete("/post/:title", deleteSinglePost);
router.put("/post/:title", updatePost);

export default router