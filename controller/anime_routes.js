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
// const List = require('../models/list')
// const Anime = require('../models/anime')



////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// router.post('/:animeId', (req, res) => {
//     // check mongo shell or db.collections to find animeId or userId
//     const animeId = req.params.animeId
//     req.body.author = req.session.userId

    
// })


router.post('/show', (req, res) => {
    const search = req.body.anime
    const api = `https://api.jikan.moe/v4/anime?q=${search}&sfw`
    fetch(api)
        .then(res => res.json())
        .then(anime => {
            // JSON response is in an array
            // console.log(anime.data[1])
            res.render('anime/show', {anime})
        })
        .catch(err => {
            res.json(err)
        })
})

// show should show only one item
// index should show all the items

// on show page for single anime > need form INPUT with value of: {{anime.data.mal_id}}

// need basic info to display the show in model (anime.js)
// mal_id is KEY
// save mal_id into DB
// model: title, mal_id, image

// https://api.jikan.moe/v4/anime/{id}/full

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
        // console.log(anime)
        res.render('anime/index', {anime})
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