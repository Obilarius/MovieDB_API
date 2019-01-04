// load our app server using express somehow...
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

// Use morgan to get debuglogs
app.use(morgan('short'))

app.get('/', (req, res) => {
    console.log('Responding to root route')
    res.send('Hello from ROOOOT')
})

app.get('/users', (req, res) => {
    var user1 = {firstName: "Sascha", lastName: "Walzenbach"}
    var user2 = {firstName: "Peter", lastName: "Laup"}

    res.json([user1, user2])

    // res.send('Nodemon auto updates when I save this file')
})

app.get('/movie/:id', (req, res) => {
    // console.log("Fetching user with id: " + req.params.id)

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'moviedb',
        password: 'moviedb',
        database: 'moviedb'
    })

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