const express = require('express');
const router = express.Router();
const { createTag, getTags } = require('../controllers/tagController');
const { protect, authorize } = require('../middlewares/authMiddleware');

router.route('/')
    .get(getTags)
    .post(protect, authorize('admin'), createTag);

module.exports = router;
