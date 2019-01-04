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

const router = require('./routes/movie.js')
app.use(router)



app.get('/', (req, res) => {
    console.log('Responding to root route')
    res.send('Hello from ROOOOT')
})

// localhost:3000
app.listen(3000, () => {
    console.log('Server is up on Port 3000...')
})