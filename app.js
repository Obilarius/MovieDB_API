// load our app server using express somehow...
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

// Use static html Site in App
app.use(express.static('./public'))

// Use morgan to get debuglogs
const morgan = require('morgan')
app.use(morgan('short'))

//  Connect all our routes to our application
const routes = require('./routes');
app.use('/', routes);


// localhost:3000
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server is up on Port ' + PORT)
})