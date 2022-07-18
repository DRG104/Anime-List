/////////////////////////////////
// Import dependencies
/////////////////////////////////
// this allows us to load our env variables
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')


////////////////////////////////////////////
// Create our express application object
////////////////////////////////////////////
const app = require('liquid-express-views')(express())


////////////////////////////////////////////
// Middleware
////////////////////////////////////////////
// this is for request logging
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
// parses urlencoded request bodies
app.use(express.urlencoded({ extended: false }))
// to serve files from public statically
app.use(express.static('public'))
// bring in our session middleware
const session = require('express-session')
const MongoStore = require('connect-mongo')
const animeRoutes = require('./controller/anime_routes')
const userRoutes = require('./controller/user_routes')
const listRoutes = require('./controller/list_routes')

// here's the middle ware that sets up our sessions
app.use(
	session({
		secret: process.env.SECRET,
		store: MongoStore.create({
			mongoUrl: process.env.DATABASE_URI
		}),
		saveUninitialized: true,
		resave: false
	})
)


////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// first parameter is a string where routes are going, second is the name of the variable
app.use('/anime', animeRoutes)
app.use('/users', userRoutes)
app.use('/list', listRoutes)


// localhost:3000/
app.get('/', (req, res) => {
	// res.send('your server is running, better go catch it')
	res.redirect('/anime')
})


////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`We are watching: ${PORT}`)
})