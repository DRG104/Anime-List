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
const Anime = require('../models/anime')



////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// router.post('/:animeId', (req, res) => {
//     // check mongo shell or db.collections to find animeId or userId
//     const animeId = req.params.animeId
//     req.body.author = req.session.userId

    
// })

// GET route to show new user list form
router.get('/list/new', (req, res) => {
    res.render('anime/newList')
})

// POST - let's CREATE the list **work on this now
router.post('/list', (req, res) => {
    console.log(req.body, "we make the body")
    req.body.owner = req.session.userId
    List.create(req.body)
        .then(list => {
            console.log(list)
            // problem here, keeps redirecting to show.liquid
            res.redirect('/')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET - List index **work on this now
router.get('/list', (req, res) => {
    List.find({})
        .then(list => {
            res.render('anime/index', {list})
        })
        .catch(err => {
            res.json(err)
        })
})

// POST - Takes the User's query and finds anime using the API
router.post('/search', (req, res) => {
    const search = req.body.anime
    const api = `https://api.jikan.moe/v4/anime?q=${search}&sfw`
    fetch(api)
        .then(res => res.json())
        .then(anime => {
            // JSON response is in an array
            // console.log(anime.data[1])
            res.render('anime/search', {anime})
        })
        .catch(err => {
            res.json(err)
        })
})

////////////////////////////////////////////
// start --> search --> show --> add to list --> from list using mal_id :> reference Jikan API for more info!!

// list
// added to list --> go to user list --> can add/remove items --> GOOD!!


// show should show only one item *DONE
// displays a single anime from SEARCH *DONE

// search --> show

// index should show all the items (in this case we'll show all the lists)
// instead of index --> changed to SEARCH *DONE
// displays ALL anime from a query *DONE

// HOW TO SAVE MAL ID!!!!!
// on show page for single anime > need form INPUT with value of: {{anime.data.mal_id}}

// need basic info to display the show in model (anime.js)
// mal_id is KEY
// save mal_id into DB
// model: title, mal_id, image

////////////////////////////////////////////
// anime by ID - we save mal_id and search the API using THIS
// https://api.jikan.moe/v4/anime/{id}/full

// anime by popularity 
// https://api.jikan.moe/v4/top/anime/

// fetch(`https://api.jikan.moe/v4/anime?q=&sfw`)
// .then(res => res.json())
// .then(text => console.log(text))


// todo: add a show route to display a single anime from the search
// add a show route to display user's list(s)

// START PAGE - Might change popular anime into just display user's list by default?
// when user signs in, it should default to their list page, not popular anime
router.get('/', (req, res) => {
    const api = `https://api.jikan.moe/v4/top/anime/`
        fetch(api)
        .then (res => res.json())
        .then(anime => {
            // console.log(anime)
            res.render('anime/start', {anime})
        })
})

// after logging in, goes here
router.get('/start', (req, res) => {
    // const api = `https://api.jikan.moe/v4/top/anime/`
    // fetch(api)
    // .then (res => res.json())
    // .then(anime => {
        // console.log(anime)
        res.render('anime/list')
    // })
    // .catch(err => {
    //     res.json(err)
    // })
})



router.get('/mine', (req, res) => {
    List.find({ owner: req.session.userId })
        .then(anime => {
            console.log(anime, "this is mylist")
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

// GET - SHOW a single anime page from search
router.get('/:id', (req, res) => {
    // search page uses mal_id as the id which is passed to animeId
    const animeId = req.params.id
    const api = `https://api.jikan.moe/v4/anime/${animeId}/full`

    fetch(api)
        .then(res => res.json())
        .then(anime => {
            // JSON response is in an array
            console.log(anime.data)
            res.render('anime/show', {anime})
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router