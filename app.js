// load our app server using express somehow...
const express = require('express')
const app = express()
const morgan = require('morgan')

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

// localhost:3000
app.listen(3000, () => {
    console.log('Server is up on Port 3000...')
})