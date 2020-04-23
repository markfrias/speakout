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

//insert post into the database
router.post('/',(req, res) => {
    var newPost = new Post({
        title: req.body.title,
        postDescription: req.body.postDescription,
        postBody: req.body.postBody,
        timestamp: req.body.timestamp,
        topic: req.body.topic,
        likes: req.body.likes,
        shares: req.body.shares,
        comments: req.body.comments
    });
    newPost.save((err, doc) => {
        if (!err) 
            res.send(doc);
        else
            console.log('Error in adding new post: ' + JSON.stringify(err, undefined, 2));
    })
});

module.exports = router;

