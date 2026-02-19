const express = require('express');
const router = express.Router();
const { toggleLike, getLikes } = require('../controllers/likeController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, toggleLike);
router.route('/:postId').get(getLikes);

module.exports = router;
