// using an already connected mongoose, not a fresh one from node_modules
const mongoose = require('./connection')
const commentSchema = require('./comment')
const animeSchema = require('./anime')

const { Schema, model } = mongoose

const listSchema = new Schema({
    name: String,
    description: String,
    tags: [String],
    owner: {
        // ObjectId = unique number when something is aded to database
        // a single User's ._id field
        type: Schema.Types.ObjectId,
        // User references user.js, which follows the userSchema model we made in user.js
        // const User = model('User', userSchema)
        ref: 'User'
    },
    // says a fruit can have many comments.
    // comments are a sub doc of Fruit
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


// need to make a model
// model('singular noun Capitalized', schema)
const List = model('List', listSchema)

module.exports = List