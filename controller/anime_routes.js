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
// router.delete('/delete/:listId/:animeId', (req, res) => {
//     const animeId = req.params.animeId
//     const listId = req.params.listId
//     console.log("Check me out", animeId)
//     List.findById(listId)
//         .then(list => {
//             List.findByIdAndRemove(animeId)
//                 .then(list => {
//                     list.save()
//                 })
//                 // const animeEntry = list.anime.id(animeId)
//                 // animeEntry.remove()
//                 // res.redirect('/list/mine/:id')
//                 .then(list => {
//                     res.redirect(`/list/mine/:listId`)
//                 })
//                 .catch(err=> {
//                     res.json(err)
//                 })
//         })
//         .catch(err => {
//             res.json(err)
//         })
// })

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


// new create page where you can pick a list and add anime


// done in liquid, 
// do a for loop at index, with ul - li, within {}
// index page - specifically access list
// item in list - item will be index
// might return empty in each card

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

// POST - Takes anime from show page and saves to User's LIST
// router.post('/list', (req, res) => {
//     // lost
// })

////////////////////////////////////////////
// start --> search --> show --> add to list --> from list using mal_id :> reference Jikan API for more info!!

// list
// added to list --> go to user list --> can add/remove items --> GOOD!!


// show should show only one item *DONE
// displays a single anime from SEARCH *DONE

// search --> show *DONE

// index should show all the items (in this case we'll show all the lists) *DONE
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


// todo: add a show route to display a single anime from the search **Done
// add a show route to display user's list(s) *Done

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
    // console.log(req.body)
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
                    // console.log("This is an list", list)
                    // console.log("This is a anime", anime)
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

    // Anime.insertOne(anime) IMPORTANT
    List.find({})
        .then(lists => {
            fetch(api)
                .then(res => res.json())
                
                .then(anime => {
                    // JSON response is in an array
                    // db.animes.insertOne(anime)

                    // if doesn't work, might need to declare a const variable
                    // console.log(anime.data)
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