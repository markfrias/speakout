const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    fname: { 
        type: String, 
        required: true 
    },
    lname: { 
        type: String, 
        required: true
    },
    username: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true,
        unique: true 
    },
    address: { 
        type: String 
    },
    phoneNumber: {
        type: Number
    },
    password: { 
        type: String, 
        required: true,
        minlength: [8, 'Password must be at least 8 characters long'] 
    },
    role: {
         type: String 
        },
    saltSecret: String
});

// custom validation for email regular expression (Regex)
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid email.');

// Encrypt password before saving it to the database
userSchema.pre('save', function (next) {
    bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});

//Methods
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXP
        }
    );
}

mongoose.model('User', userSchema);