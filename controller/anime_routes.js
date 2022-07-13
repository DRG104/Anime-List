const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))

// making a router
const router = express.Router()


// router.post('/show', (req, res) => {
//     const search = req.body.anime
//     const api = `https://api.jikan.moe/v4/anime?q=${search}&sfw`
//     fetch(api)
//     .then(res => res.json())
//     .then(data => {
//         res.render('anime/index', {data})
//     })
//     .catch(err => {
//         console.log("api")
//         res.json(err)
//     })
// })


// fetch(`https://api.jikan.moe/v4/anime?q=&sfw`)
// .then(res => res.text())
// .then(text => console.log(text))

router.get('/', (req, res) => {
    const search = req.body.anime
    console.log(search)
    res.render('anime/index')
})

module.exports = router