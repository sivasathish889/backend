const Comment = require('../models/Comment');

// @desc    Add a comment
// @route   POST /api/comments
// @access  Private
const addComment = async (req, res) => {
    try {
        const { postId, content, parentId } = req.body;
        const comment = await Comment.create({
            post: postId,
            user: req.user._id,
            content,
            parentComment: parentId || null
        });
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// @desc    Get comments for a post
// @route   GET /api/comments/:postId
// @access  Public
const getCommentsByPost = async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId }).populate('user', 'name');
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Delete a comment
// @route   DELETE /api/comments/:id
// @access  Private (Admin, Owner)
const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment) {
            if (comment.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized' });
            }
            await comment.deleteOne();
            res.json({ message: 'Comment removed' });
        } else {
            res.status(404).json({ message: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { addComment, getCommentsByPost, deleteComment };
