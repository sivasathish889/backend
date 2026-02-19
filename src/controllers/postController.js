const Post = require('../models/Post');

// @desc    Create a post
// @route   POST /api/posts
// @access  Private (Admin, Editor)
const createPost = async (req, res) => {
    try {
        const { title, content, category, tags, status } = req.body;

        let image = '';
        if (req.file) {
            image = `/uploads/${req.file.filename}`;
        }

        const post = new Post({
            title,
            content,
            category,
            tags,
            status,
            image,
            author: req.user._id
        });

        const createdPost = await post.save();
        res.status(201).json(createdPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.pageNumber) || 1;

        const keyword = req.query.keyword
            ? {
                title: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const categoryFilter = req.query.category
            ? { category: req.query.category }
            : {};

        const filter = { ...keyword, ...categoryFilter };

        const count = await Post.countDocuments(filter);
        const posts = await Post.find(filter)
            .populate('author', 'name')
            .populate('category', 'name')
            .sort({ createdAt: -1 }) // Sort by newest first
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ posts, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
            .populate('author', 'name')
            .populate('category')
            .populate('tags');

        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private (Admin, Editor - own post)
const updatePost = async (req, res) => {
    try {
        const { title, content, category, tags, status } = req.body;
        const post = await Post.findById(req.params.id);

        if (post) {
            // Check ownership or admin
            if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to update this post' });
            }

            post.title = title || post.title;
            post.content = content || post.content;
            post.category = category || post.category;
            post.tags = tags || post.tags;
            post.status = status || post.status;

            if (req.file) {
                post.image = `/uploads/${req.file.filename}`;
            }

            const updatedPost = await post.save();
            res.json(updatedPost);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private (Admin, Editor - own post)
const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post) {
            if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Not authorized to delete this post' });
            }

            await post.deleteOne();
            res.json({ message: 'Post removed' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createPost, getPosts, getPostById, updatePost, deletePost };
