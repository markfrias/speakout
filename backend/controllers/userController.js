const express = require('express');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const saltRounds = 12;

var { User } = require('../models/user.model');

//list all users in the database: localhost:3000/users/
router.get('/', (req, res) => {
    User.find((err, docs) => {
        if (!err){
            res.send(docs);
        }else{
            console.log('Error in retrieving Users: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//retrieve a single user record: localhost:3000/users/id (replace 'id' with the actual id on the record)
router.get('/:id', (req, res) => {
    //check if the user exists in the databse
    User.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(400).send(`No user record with given id: ${req.params.id}`);
        } else {
            User.findById(req.params.id, (err, doc) => {
                if (!err)
                    res.send(doc);
                else
                    console.log('Error in retrieving User record:' + JSON.stringify(err, undefined, 2));
            });
        }
    });
});

//add user into the database
router.post('/',(req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
        if (!error) {
            var newUser = new User({
                fname: req.body.fname,
                lname: req.body.lname,
                username: req.body.username,
                email: req.body.email,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                password: hash,
                role: req.body.role,
            });
        
            newUser.save((err, doc) => {
                if (!err) 
                    res.send(doc);
                else
                    console.log('Error in adding new user: ' + JSON.stringify(err, undefined, 2));
            })
        } else {
            console.log('Error in password encryption: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//edit or update user information
router.put('/:id', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (error, hash) => {
        if (!error) {
            //check if the user exists in the database
            User.exists({ _id: req.params.id }).then((result) => {
                if (!result) {
                    return res.status(400).send(`No user record with given id: ${req.params.id}`);
                } else {
                    var updateUser = {
                        fname: req.body.fname,
                        lname: req.body.lname,
                        username: req.body.username,
                        email: req.body.email,
                        address: req.body.address,
                        phoneNumber: req.body.phoneNumber,
                        password: hash,
                        role: req.body.role,
                    };
                    User.findByIdAndUpdate(req.params.id, { $set: updateUser }, { new: true }, (err, doc) => {
                        if (!err)
                            res.send(doc);
                        else
                            console.log('Error in User update: ' + JSON.stringify(err, undefined, 2));
                    });
                }
            }); 
        } else {
            console.log('Error in password encryption, could not update user information: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//delete user from the database
router.delete('/:id', (req, res) => {
    //check if the user exists in the database
    User.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(400).send(`No user record with given id: ${req.params.id}`);
        } else {
            User.findByIdAndRemove(req.params.id, (err, doc) => {
                if (!err) {
                    res.send(doc);
                } else {
                    console.log('Error; could not delete the user: ' + JSON.stringify(err, undefined, 2));
                }
            });
        }
    });
});

module.exports = router;