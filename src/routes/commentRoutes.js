const express = require('express');
const router = express.Router();
const { addComment, getCommentsByPost, deleteComment } = require('../controllers/commentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.route('/')
    .post(protect, addComment);

router.route('/:postId')
    .get(getCommentsByPost);

router.route('/:id')
    .delete(protect, deleteComment);

module.exports = router;
