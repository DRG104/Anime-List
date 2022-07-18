/////////////////////////////////
// Import dependencies
/////////////////////////////////
const express = require('express')


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

// DELETE - Create a button to delete a user's list **Done
router.delete('/mine/:id', (req, res) => {
    const listId = req.params.id
    List.findByIdAndRemove(listId)
        .then(list => {
            res.redirect('/list/mine')
        })
})

// GET route - display a user's list edit form **Done
router.get('/mine/:id/edit', (req, res) => {
    const listId = req.params.id
    const userInfo = req.session.username
    List.findById(listId)
        .then(list => {
            res.render('list/edit', {list, userInfo})
        })
        .catch(err => {
            res.json(err)
        })
})

// PUT - Update a user's list **Done
router.put('/mine/:id', (req, res) => {
    const listId = req.params.id
    List.findByIdAndUpdate(listId, req.body, { new: true })
        .then(list => {
            res.redirect('/list/mine')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET route to display User's new list form **DONE
router.get('/new', (req, res) => {
    const userInfo = req.session.username
    res.render('list/new', {userInfo})
})

// POST - let's CREATE the list **DONE
router.post('/mine', (req, res) => {
    console.log(req.body, "we make the body")
    req.body.owner = req.session.userId
    List.create(req.body)
        .then(lists => {
            console.log(lists)
            // problem here, keeps redirecting to show.liquid * fixed use ('/anime/list')
            res.redirect('/list/mine')
        })
        .catch(err => {
            res.json(err)
        })
})

// GET - List index - shows all of User's lists **DONE
router.get('/mine', (req, res) => {
    const userInfo = req.session.username
    List.find({ owner: req.session.userId })
    // do Anime.find({})
        .then(lists => {
            console.log(lists, "this is a list list")
            // can pass {list, anime}
            res.render('list/index', { lists, userInfo })
        })
        .catch(err => {
            res.json(err)
        })
})

router.get('/mine/:id', (req, res) => {
    const listId = req.params.id
    const userInfo = req.session.username
    List.findById(listId)
        .populate("anime")
        .then(list => {
            const userId = req.session.userId
            const username = req.session.username
            console.log("This is the list", list)
            res.render('list/show', { list, userId, username, userInfo})
        })
        .catch(err => {
            res.json(err)
        })
})

// req.body needed to find anime

module.exports = router