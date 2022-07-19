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

// POST ROUTE
// localhost:3000/comments/:listId
router.post('/:listId', (req, res) => {
    const listId = req.params.listId
    req.body.author = req.session.userId

    List.findById(listId)
        .then(list => {
            list.comments.push(req.body)
            return list.save()
        })
        .then(list => {
            res.redirect(`/list/mine/${list._id}`)
        })
        .catch(err => {
            res.json(err)
        })
})

// DELETE ROUTE
// localhost:3000/comments/delete/:listId/:commId
router.delete('/delete/:listId/:commId', (req, res) => {
    const listId = req.params.listId
    const commId = req.params.commId

    List.findById(listId)
        .then(list => {
            const comment = list.comments.id(commId)

            // remove comment
            comment.remove()
            return list.save()
        })
        .then(list => {
            res.redirect(`/list/mine/${listId}`)
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router