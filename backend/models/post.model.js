const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    },

    timestamp: {
        type: Date,
        default: Date.now
    },

    topics: {
        type: [String]
    },

    likes: {
        type: Number
    },

    shares: {
        type: Number
    },

    comments: {
        type: [String]
    }
});

module.exports = mongoose.model("Posts", PostSchema);