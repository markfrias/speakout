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
        type: String,
        required: true,
        minlength: [4, 'Phone number must have at least 4 digits']
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

// custom validation for phone number regular expression (Regex)
userSchema.path('phoneNumber').validate((val) => {
    phoneNumberRegex = /^[+]?([0-9]*[\.\s\-\(\)]|[0-9]+){3,24}$/;
    return phoneNumberRegex.test(val);
}, 'Invalid phone number.');

// Encrypt password before saving it to the database
userSchema.pre('save', function (next) {
    var user = this;

    //hash the password if only it has been modified or is new
    if (!user.isModified('password'))
        return next();

    // hash the password
    bcrypt.genSalt(12, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            
            user.password = hash;
            user.saltSecret = salt;
            user.verify = hash;
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