const mongoose = require('./connection')

const commentSchema = new mongoose.Schema ({
    note: {
        type: String,
        required: true
    },
    author: {
        // single user
        type: mongoose.Schema.Types.ObjectId,
        // string value from model creation
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = commentSchema