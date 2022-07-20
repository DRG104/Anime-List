/////////////////////////////////
// First, import dependencies
/////////////////////////////////
const mongoose = require('./connection')


/////////////////////////////////
// define our user model
/////////////////////////////////
const { Schema, model } = mongoose

// we'll make a user schema
const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = model('User', userSchema)

/////////////////////////////////
// export our user model
/////////////////////////////////
module.exports = User