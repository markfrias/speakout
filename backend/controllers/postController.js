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

//Get all published posts
router.get('/published', (req, res) => {
    Post.find({published : true}, (err, docs) => {
        if (!err){
            res.send(docs);
            console.log("Request successful");
        }else{
            console.log('Error in retrieving Posts: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// Get likes for a specific post
router.get('/like-data/:id', (req, res) => {
    //first, check if the post exists in the databse
    Post.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(400).send(`No post record with given id: ${req.params.id}`);
        } else {
            Post.find({ _id: req.body.params }, {likes: 1}, (err, doc) => {
                if (!err){
                    res.send(doc);
                    console.log("like sent");
                }
                    
                else
                    console.log('Error in retrieving post record:' + JSON.stringify(err, undefined, 2));
            });
        }
    });
});

// Increment number of likes
// !! Include error handling !!
router.patch('/like/:id', (req, res) => {
   
        Post.findOneAndUpdate({_id: req.params.id}, {$inc : { likes : 1 }}, (err, docs) => {
            res.send(docs);
            console.log("Like incremented on " + req.params.id);
        });
        
});

// Set published property to true
// !! Include error handling !!
router.patch('/publish/:id', (req, res) => {
    Post.findOneAndUpdate({_id: req.params.id}, {$set : { published : true }}, (err, docs) => {
        res.send(docs);
        console.log("Post published with id " + req.params.id);
    });
})

//Get posts that correspond to a certain topic
router.get('/topics/:id', (req, res) => {
    Post.find({topic: req.params.id, published: true}, (err, docs) => {
        if (!err){
            res.send(docs);
            console.log("Request successful");
        }else{
            console.log('Error in retrieving Posts: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

// Get 10 posts sorted by their number of likes and limited to 10 items returned
router.get('/trending', (req, res) => {
    Post.find({published: true}, null, {sort: {likes: -1}}, (err, docs) => {
        if (!err){
            res.send(docs);
            console.log("Request successful");
        }else{
            console.log('Error in retrieving Posts: ' + JSON.stringify(err, undefined, 2));
        }
    }).limit(10);
});

// Get list of topics
router.get('/trending', (req, res) => {
    Post.find({}, null, {sort: {likes: -1}}, (err, docs) => {
        if (!err){
            res.send(docs);
            console.log("Request successful");
        }else{
            console.log('Error in retrieving Posts: ' + JSON.stringify(err, undefined, 2));
        }
    }).limit(10);
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
    });
    newPost.save((err, doc) => {
        if (!err) 
            res.send(doc)
        else{
            console.log('Error in adding new post: ' + JSON.stringify(err, undefined, 2));
            res.json(err);
        }
            
    })
});

// Add a comment to a specific post
router.patch('/comment/:id', (req, res) => {
    // Check if article exists in the database
    Post.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(400).send(`No post record with given id: ${req.params.id}`);
        } else {
            var updatePost = {
                comments: req.body.comments,
            };
            Post.findByIdAndUpdate(req.params.id, { $push: { comments: req.body.comments }}, { new: true }, (err, doc) => {
                if (!err){
                    res.send(doc);
                    console.log("Comment added");

                }
                else
                    console.log('Error in post update: ' + JSON.stringify(err, undefined, 2));
            }); 
        }
    });
});

//edit or update post
router.patch('/:id', (req, res) => {
    //first, check if the post exists in the database
    Post.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(400).send(`No post record with given id: ${req.params.id}`);
        } else {
            
            Post.findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true }, (err, doc) => {
                if (!err)
                    res.send(doc);
                else
                    console.log('Error in post update: ' + JSON.stringify(err, undefined, 2));
            }); 
        }
    });
});

// Update body
router.patch('/body/:id', (req, res) => {
    //first, check if the post exists in the database
    Post.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(400).send(`No post record with given id: ${req.params.id}`);
        } else {
            
            Post.findByIdAndUpdate(req.params.id, {$set: { postBody : req.body}}, { new: true }, (err, doc) => {
                if (!err){
                    res.send(doc);
                    console.log("Body success");
                }
                    
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

