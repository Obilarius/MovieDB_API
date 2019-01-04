const express = require('express')
const router = express.Router()
require('es6-promise').polyfill();
require('isomorphic-fetch');

const tmdbUrl = "https://api.themoviedb.org/3/"
const apiKey = "api_key=285a3801961b83d5dedcb2b3ec252cdf"
const language = "language=de-de"



router.get('/tmdb/movie/:id', (req, res) => {
    const movieId = req.params.id
    const url = tmdbUrl + "movie/" + movieId + "?" + apiKey +"&"+ language

    fetch(url)
    .then(function(response) {
        if (response.status >= 400) {
            console.log("There is a error in the fetch: " + response.status + " - " + response.statusText)
            res.sendStatus(500)
            return
        }
        return response.json();
    })
    .then(function(movie) {
        res.json(movie)
    });
})





module.exports = router