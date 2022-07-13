const express = require('express')

// making a router
const router = express.Router()

router.get('/', (req, res) => {
    res.render('anime/index')
})

module.exports = router