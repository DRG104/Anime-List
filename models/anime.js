const mongoose = require('./connection')
const commentSchema = require('./comment')

const { Schema, model } = mongoose

const animeSchema = new Schema({
    mal_id: String,
    title: String,
    image: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema]
    }, 
    {
    timestamps: true
    }
)


// need to make a model
// model('singular noun Capitalized', schema)
const Anime = model('Anime', animeSchema)

module.exports = Anime