const routes = require('express').Router();
// const models = require('./models');
// const cars = require('./cars');

// routes.use('/models', models);
// routes.use('/cars', cars);

routes.use(require('./api/ownDB/movie.js'))
routes.use(require('./api/tmdb/tmdb.js'))

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;