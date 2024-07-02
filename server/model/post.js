const mongoose = require('mongoose')

const {Schema} = mongoose;

const PostSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

const PostModel =  mongoose.model('Post' , PostSchema)

module.exports = PostModel;