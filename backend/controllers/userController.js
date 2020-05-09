const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const jwtHelper = require('./../config/jwtHelper');
const _ = require('lodash'); //lodash variable _ (underscore)

const User = mongoose.model('User');

//add or register new user into the database
router.post('/',(req, res, next) => {
    var newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        email: req.body.email,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        role: req.body.role,
    });
        
    newUser.save((err, doc) => {
        if (!err)  
            res.send(doc);
        else {
            if (err.code === 11000)
                res.status(422).send(['The entered email is alredy registered with an existing account.']);
            else
                return next(err);
        }
    });
});

//authenticate user on login
router.post('/authenticate', (req, res, next) => {
    //call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        //error from passport middleware
        if (err) return res.status(400).json(err);
        //registered user
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        //unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res);
});

//get or retrieve user profile
router.get('/user-profile', jwtHelper.verifyJwtToken, (req, res, next) => {
    User.findOne({ _id: req._id }, (err, user) => {
        if (!user)
            return res.status(404).json({ status: false, message: 'User record not found.' });
        else
            return res.status(200).json({ status: true, user : _.pick(user,['fname', 'lname', 'username', 'email','address','phoneNumber','role']) }); //lodash function '_.pick'
    });
});

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

//edit or update user information
router.put('/:id', (req, res, next) => {
    //check if the user exists in the database
    User.exists({ _id: req.params.id }).then((result) => {
        if (!result) {
            return res.status(400).send(`No user record with given id: ${req.params.id}`);
        } else {
            //fetch user record
            User.findById(req.params.id, (err, post) => {
                if (err) return next(err);

                //update user using lodash
                _.assign(post, req.body);
                post.save((err) => {
                    if (err) return next(err);
                    
                    return res.status(200).json(post);
                })
            });
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