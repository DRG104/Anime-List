const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

// making a router
const router = express.Router()


router.post('/show', (req, res) => {
    const search = req.body.anime
    const api = `https://api.jikan.moe/v4/anime?q=${search}&sfw`
    fetch(api)
    .then(res => res.json())
    .then(data => {
        res.render('anime/index', {data})
    })
    .catch(err => {
        console.log("api")
        res.json(err)
    })
})


router.get('/', (req, res) => {
    console.log("Getting index")
    res.render('anime/index')
})

module.exports = router