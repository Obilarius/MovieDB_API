const express = require('express')
const mysql = require('mysql')

const router = express.Router()
router.get('/messages', (req, res) => {
    res.end()
})

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'moviedb',
    password: 'moviedb',
    database: 'moviedb'
})

function getConnection() {
    return pool
}

router.get('/movies', (req, res) => {
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

router.post('/movie_create', (req, res) => {
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

router.get('/movie/:id', (req, res) => {
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



module.exports = router