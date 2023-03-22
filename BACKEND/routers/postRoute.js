import express from 'express';
import {
  getAllPost,
  getSinglePost,
  createPost,
  deleteAllPost,
  deleteSinglePost,
  // updatePost,
  compose,
  comment
} from '../controllers/postController.js';
import isAdmin from '../auth/is-Admin.js';
import isUser from '../auth/is-User.js';

const router = express.Router();

router.get('/posts', isUser, getAllPost);
router.post('/post/:title', comment);
router.get('/post/:title', isUser, getSinglePost);
router.get('/compose', isUser, compose);
router.post('/compose', isUser, createPost);
router.delete('/post', isAdmin, deleteAllPost);
router.post('/posts/delete/:title', deleteSinglePost);

export default router;
