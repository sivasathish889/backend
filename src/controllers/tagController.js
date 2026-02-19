const Tag = require('../models/Tag');

// @desc    Create a tag
// @route   POST /api/tags
// @access  Private (Admin)
const createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const tag = await Tag.create({ name });
        res.status(201).json(tag);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// @desc    Get all tags
// @route   GET /api/tags
// @access  Public
const getTags = async (req, res) => {
    try {
        const tags = await Tag.find({});
        res.json(tags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createTag, getTags };
