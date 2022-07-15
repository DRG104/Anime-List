const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

// making a router
const router = express.Router()

// router.post('/show', (req, res) => {
//     res.render('anime/show')
// })


router.post('/show', (req, res) => {
    const search = req.body.anime
    const api = `https://api.jikan.moe/v4/anime?q=${search}&sfw`
    fetch(api)
    .then(res => res.json())
    .then(anime => {
        res.render('anime/show', {anime})
        // JSON response is in an array
        console.log(anime.data[1])
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
    // const search = req.body
    // console.log(search)
    res.render('anime/index')
})

module.exports = router