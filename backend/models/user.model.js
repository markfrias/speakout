const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

var User = mongoose.model('User', {
    fname: { type: String, required: true },
    lname: { type: String, required: true},
    username: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    phoneNumber: {type: Number},
    password: { type: String, required: true },
    role: { type: String },
});

//generating a hash
User.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
}

//cheking if password is valid on login
/* we are not going to use this code for now
User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.localPassword);
}
*/

module.exports = { User };