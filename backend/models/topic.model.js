const mongoose = require('mongoose');

var Topic = mongoose.model('Topic', {
    topicName: { type: String },
    description: { type: String},
});

module.exports = { Topic };