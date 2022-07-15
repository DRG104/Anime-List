// using an already connected mongoose, not a fresh one from node_modules
const mongoose = require('./connection')

const { Schema, Model } = mongoose

const listSchema = new Schema({
    name: String,
    description: String,
    
})