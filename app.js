// load our app server using express somehow...
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

// Use static html Site in App
app.use(express.static('./public'))

// Use morgan to get debuglogs
app.use(morgan('short'))

function getConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'moviedb',
        password: 'moviedb',
        database: 'moviedb'
    })
}

app.post('/movie_create', (req, res) => {
    console.log("ID: " + req.body.create_id + " - Title: " + req.body.create_title)
    const id = req.body.create_id
    const title = req.body.create_title

    const queryString = "INSERT INTO movie (id, title) VALUES (?, ?)"
    getConnection().query(queryString, [id, title], (err, result, fields) => {
        if (err) {
            console.log("Failed to insert new movie: " + err)
            res.sendStatus(500)
            return
        }

        console.log("Inserted an new movie with id: ", id)
        res.end()
    })
})

app.get('/', (req, res) => {
    console.log('Responding to root route')
    res.send('Hello from ROOOOT')
})

app.get('/movies', (req, res) => {
    const connection = getConnection()

    const queryString = 'SELECT * FROM movie'
    connection.query(queryString, (err, rows, fields) => {
        if (err) {
            console.log("Failed to query the Database: " + err)
            res.sendStatus(500)
            res.end()
            return
        }
        res.json(rows)
    })
})

app.get('/movie/:id', (req, res) => {
    // console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()

    const movieId = req.params.id
    const queryString = 'SELECT * FROM movie WHERE id = ?'
    connection.query(queryString, [movieId], (err, rows, fields) => {
        if (err) {
            console.log("Failed to query the Database: " + err)
            res.sendStatus(500)
            res.end()
            return
        }

        console.log("I think we fetched movies successfully")
        res.json(rows)
    })
})

// localhost:3000
app.listen(3000, () => {
    console.log('Server is up on Port 3000...')
})