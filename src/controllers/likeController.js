const Like = require('../models/Like');

// @desc    Like a post
// @route   POST /api/likes
// @access  Private
const toggleLike = async (req, res) => {
    const { postId } = req.body;
    const userId = req.user._id;

    try {
        const existingLike = await Like.findOne({ post: postId, user: userId });

        if (existingLike) {
            await existingLike.deleteOne();
            res.json({ message: 'Post unliked' });
        } else {
            await Like.create({ post: postId, user: userId });
            res.json({ message: 'Post liked' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get like count for a post
// @route   GET /api/likes/:postId
// @access  Public
const getLikes = async (req, res) => {
    try {
        const count = await Like.countDocuments({ post: req.params.postId });
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { toggleLike, getLikes };
