const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');

// Get all the posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
        console.log("Get posts successful");
    } catch (err) {
        res.json({message: err})
    }
});

module.exports = router;

