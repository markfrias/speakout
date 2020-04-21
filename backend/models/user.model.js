const mongoose = require('mongoose');

var User = mongoose.model('User', {
    fname: { type: String },
    lname: { type: String},
    username: { type: String },
    email: { type: String },
    address: { type: String },
    phoneNumber: {type: Number},
    password: { type: String },
    role: { type: String },
});

module.exports = { User };