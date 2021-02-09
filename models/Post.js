var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    imageurl: String,
    content: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    isDraft: {
        type: Boolean,
        default: false
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

PostSchema.pre(['updateOne', 'findOneAndUpdate'], function (next) {
    let post = this;
    post.lastUpdated = new Date();
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;