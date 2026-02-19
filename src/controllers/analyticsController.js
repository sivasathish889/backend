const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

// @desc    Get analytics data
// @route   GET /api/analytics
// @access  Private (Admin)
const getAnalytics = async (req, res) => {
    try {
        const totalPosts = await Post.countDocuments();
        const totalUsers = await User.countDocuments();
        const totalComments = await Comment.countDocuments();
        const totalLikes = await Like.countDocuments();

        res.json({
            totalPosts,
            totalUsers,
            totalComments,
            totalLikes
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAnalytics };
