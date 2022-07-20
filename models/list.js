const mongoose = require('./connection')
const commentSchema = require('./comment')

const { Schema, model } = mongoose

const listSchema = new Schema({
    name: String,
    description: String,
    tags: [String],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    anime: [{
        type: Schema.Types.ObjectId,
        ref: 'Anime'
    }],
    comments: [commentSchema]
    },
    {
    timestamps: true
    }
)


const List = model('List', listSchema)

module.exports = List