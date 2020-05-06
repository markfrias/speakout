const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    postDescription: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    postBody: {
        type: String,
        required: true
    },

    timestamp: {
        type: Date,
        default: Date.now
    },

    topic: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Topic'}
    ],

    likes: {
        type: Number
    },

    shares: {
        type: Number
    },

    comments: {
        type: [String]
    },

    bannerImageName: String
});

module.exports = mongoose.model("Posts", PostSchema);