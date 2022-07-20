/////////////////////////////////
// Import dependencies
/////////////////////////////////
const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

////////////////////////////////////////////
// Making a router
////////////////////////////////////////////
const router = express.Router()

////////////////////////////////////////////
// Importing models
////////////////////////////////////////////
const List = require('../models/list')
const Anime = require('../models/anime')



////////////////////////////////////////////
// Routes
////////////////////////////////////////////

// DELETE - removes anime from a user's list
router.delete('/delete/:listId/:animeId', (req, res) => {
    const animeId = req.params.animeId
    const listId = req.params.listId
    // console.log(listId)
    List.findById(listId)
        .then(list => {
            // console.log(list.anime)
            list.anime.remove(animeId)
            list.save()
            res.redirect(`/list/mine/${listId}`)
            // const animeEntry = list.anime
            // animeEntry.remove(animeId)
            // list.save()
            // res.redirect('/list/mine/:listId')
        })
        .catch(err => {
            res.json(err)
        })
})

// POST - Takes the User's query and finds anime using the API **Done
router.post('/search', (req, res) => {
    const userInfo = req.session.username
    const searchQuery = req.body.anime
    const api = `https://api.jikan.moe/v4/anime?q=${searchQuery}&sfw`
    fetch(api)
        .then(res => res.json())
        .then(anime => {
            // JSON response is in an array
            // console.log(anime.data, "HELP")
            res.render('anime/search', {anime, userInfo})
        })
        .catch(err => {
            res.json(err)
        })
})

////////////////////////////////////////////
// anime by ID - we save mal_id and search the API using THIS
// https://api.jikan.moe/v4/anime/{id}/full

// anime by popularity 
// https://api.jikan.moe/v4/top/anime/

// fetch(`https://api.jikan.moe/v4/anime?q=&sfw`)
// .then(res => res.json())
// .then(text => console.log(text))
////////////////////////////////////////////

// START PAGE - Might change popular anime into just display user's list by default?
// when user signs in, it should default to their list page, not popular anime
router.get('/', (req, res) => {
    const userInfo = req.session.username
    const api = `https://api.jikan.moe/v4/top/anime/`
        fetch(api)
        .then (res => res.json())
        .then(anime => {
            // console.log(anime)
            res.render('anime/start', {anime, userInfo})
        })
})

router.post('/create', (req, res) => {
    const anime = {
        mal_id: req.body.mal_id,
        title:  req.body.title,
        image:  req.body.image
    }
    Anime.create(anime)
        .then(anime => {
            List.findById(req.body.list)
                .then(list => {
                    list.anime.push(anime._id)
                    list.save()
                    res.redirect(`/list/mine/${list._id}`)
                })
                .catch(err => {
                    res.json(err)
                })
        }) 
        .catch(err => {
            res.json(err)
        })
}) 

// GET - SHOW a single anime page from search
router.get('/:id', (req, res) => {
    // search page uses mal_id as the id which is passed to animeId
    const animeId = req.params.id
    const userInfo = req.session.username
    const api = `https://api.jikan.moe/v4/anime/${animeId}/full`

    List.find({})
        .then(lists => {
            fetch(api)
                .then(res => res.json())
                
                .then(anime => {
                    res.render('anime/show', {anime, userInfo, lists})
                })
                .catch(err => {
                    res.json(err)
                })
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router