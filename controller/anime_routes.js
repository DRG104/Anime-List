const express = require('express')

// making a router
const router = express.Router()


router.post('/show', (req, res) => {
    const search = req.body.anime
    const api = `https://api.jikan.moe/v4/anime?q=${anime}&sfw`
})


router.get('/', (req, res) => {
    res.render('anime/index')
})

module.exports = router