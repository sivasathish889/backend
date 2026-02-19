const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPostById, updatePost, deletePost } = require('../controllers/postController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.route('/')
    .get(getPosts)
    .post(protect, authorize('admin', 'editor'), upload.single('image'), createPost);

router.route('/:id')
    .get(getPostById)
    .put(protect, authorize('admin', 'editor'), upload.single('image'), updatePost)
    .delete(protect, authorize('admin', 'editor'), deletePost);

module.exports = router;
