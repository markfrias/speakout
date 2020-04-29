const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');

//Get all the posts: localhost:3000/posts/
router.get('/', (req, res) => {
    Post.find((err, docs) => {
        if (!err){
            res.send(docs);
            console.log("Request successful");
        }else{
            console.log('Error in retrieving Posts: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//retrieve a single post record: localhost:3000/posts/id (replace 'id' with the actual id on the record)
router.get('/:id', (req, res) => {
    //first, check if the post exists in the databse
    Post.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(400).send(`No post record with given id: ${req.params.id}`);
        } else {
            Post.findById(req.params.id, (err, doc) => {
                if (!err)
                    res.send(doc);
                else
                    console.log('Error in retrieving post record:' + JSON.stringify(err, undefined, 2));
            });
        }
    });
});

//insert post into the database
router.post('/',(req, res) => {
    var newPost = new Post({
        title: req.body.title,
        postDescription: req.body.postDescription,
        author: req.body.author,
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

//edit or update post
router.patch('/:id', (req, res) => {
    //first, check if the post exists in the database
    Post.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(400).send(`No post record with given id: ${req.params.id}`);
        } else {
            var updatePost = {
                title: req.body.title,
                postDescription: req.body.postDescription,
                author: req.body.author,
                postBody: req.body.postBody,
                timestamp: req.body.timestamp,
                topic: req.body.topic,
                likes: req.body.likes,
                shares: req.body.shares,
                comments: req.body.comments
            };
            Post.findByIdAndUpdate(req.params.id, { $set: updatePost }, { new: true }, (err, doc) => {
                if (!err)
                    res.send(doc);
                else
                    console.log('Error in post update: ' + JSON.stringify(err, undefined, 2));
            }); 
        }
    });
});

//delete post from the database
router.delete('/:id', (req, res) => {
    //first, check if the post exists in the database
    Post.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(400).send(`No post record with given id: ${req.params.id}`);
        } else {
            Post.findByIdAndRemove(req.params.id, (err, doc) => {
                if (!err) {
                    res.send(doc);
                } else {
                    console.log('Error; could not delete the post: ' + JSON.stringify(err, undefined, 2));
                }
            });
        }
    });
});

module.exports = router;

