const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const Post = require('../models/post.model');
var { Topic } = require('../models/topic.model');

// Get list of topics
router.get('/all', (req, res) => {
    Post.find({}, {topic: 1},(err, docs) => {
        if (!err){
            res.send(docs);
            console.log("Topics fetch request successful");
        }else{
            console.log('Error in retrieving topics: ' + JSON.stringify(err, undefined, 2));
        }
    })
});

//list all topics in the database: localhost:3000/topics/
router.get('/', (req, res) => {
    Topic.find((err, docs) => {
        if (!err){
            res.send(docs);
        }else{
            console.log('Error in retrieving Topics: ' + JSON.stringify(err, undefined, 2));
        }
    });
});


//retrieve a single topic record: localhost:3000/topics/id (replace 'id' with the actual id on the record)
router.get('/:id', (req, res) => {
    //first, check if the topic exists in the databse
    Topic.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(400).send(`No topic record with given id: ${req.params.id}`);
        } else {
            Topic.findById(req.params.id, (err, doc) => {
                if (!err)
                    res.send(doc);
                else
                    console.log('Error in retrieving topic record:' + JSON.stringify(err, undefined, 2));
            });
        }
    });
});

//insert topic into the database
router.post('/',(req, res) => {
    var newTopic = new Topic({
        topicName: req.body.topicName,
        description: req.body.description,    
    });
    newTopic.save((err, doc) => {
        if (!err) 
            res.send(doc);
        else
            console.log('Error in adding new topic: ' + JSON.stringify(err, undefined, 2));
    })
});

//edit or update topic
router.patch('/:id', (req, res) => {
    //first, check if the topic exists in the database
    Topic.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(400).send(`No topic record with given id: ${req.params.id}`);
        } else {
            var updateTopic = {
                topicName: req.body.topicName,
                description: req.body.description
            };
            Topic.findByIdAndUpdate(req.params.id, { $set: updateTopic }, { new: true }, (err, doc) => {
                if (!err)
                    res.send(doc);
                else
                    console.log('Error in topic update: ' + JSON.stringify(err, undefined, 2));
            }); 
        }
    });
});

//delete topic from the database
router.delete('/:id', (req, res) => {
    //first, check if the topic exists in the database
    Topic.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(400).send(`No topic record with given id: ${req.params.id}`);
        } else {
            Topic.findByIdAndRemove(req.params.id, (err, doc) => {
                if (!err) {
                    res.send(doc);
                } else {
                    console.log('Error; could not delete the topic: ' + JSON.stringify(err, undefined, 2));
                }
            });
        }
    });
});

module.exports = router;