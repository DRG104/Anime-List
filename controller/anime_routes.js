/////////////////////////////////
// Import dependencies
/////////////////////////////////
const express = require('express')
const { listIndexes } = require('../models/user')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

////////////////////////////////////////////
// Making a router
////////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////////
// Importing models
////////////////////////////////////////////
const List = require('../models/list')



////////////////////////////////////////////
// Routes
////////////////////////////////////////////
router.post('/show', (req, res) => {
    const search = req.body.anime
    const api = `https://api.jikan.moe/v4/anime?q=${search}&sfw`
    fetch(api)
    .then(res => res.json())
    .then(anime => {
        res.render('anime/show', {anime})
        // JSON response is in an array
        // console.log(anime.data[1])
    })
    .catch(err => {
        res.json(err)
    })
})


// anime by popularity 
// https://api.jikan.moe/v4/top/anime/

// fetch(`https://api.jikan.moe/v4/anime?q=&sfw`)
// .then(res => res.text())
// .then(text => console.log(text))

router.get('/', (req, res) => {
    const api = `https://api.jikan.moe/v4/top/anime/`
    fetch(api)
    .then (res => res.json())
    .then(anime => {
        res.render('anime/index', {anime})
        console.log(anime)
    })
})


router.get('/mine', (req, res) => {
    listIndexes.find({ owner: req.session.userId })
    .then(anime => {
        res.render('anime/index', {anime})
    })
    .catch(err => {
        res.json(err)
    })
})

// router.get('/', (req, res) => {
//     // const search = req.body
//     // console.log(search)
//     res.render('anime/index')
// })

module.exports = router