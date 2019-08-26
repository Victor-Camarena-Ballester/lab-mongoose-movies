var express = require('express');
var router = express.Router();
const Movie = require('../models/Movie');

router.get('/', function (req, res, next) {
    Movie.find()
        .then((movies) => {
            res.render('movies/index', { movies });
        })
        .catch(next);
});
router.get('/new', function (req, res) {
    res.render('movies/new');
});
router.post('/:id/delete', function (req, res, next) {
    const { id } = req.params;

    Movie.findByIdAndRemove(id)
        .then(() => {
            res.redirect("/movies");
        })
        .catch(next);
});
router.get('/:id/edit', function (req, res, next) {
    const { id } = req.params;

    Movie.findById(id)
        .then((movie) => {
            res.render('movies/edit', { movie });
        })
        .catch(next);
});
router.get('/:id', function (req, res, next) {
    const { id } = req.params;

    Movie.findById(id)
        .then((movie) => {
            res.render('movies/show', { movie });
        })
        .catch(next);
});


router.post('/', function (req, res) {
    const movie = req.body
    Movie.create(movie)
        .then(() => res.redirect("/movies"))
        .catch(() => res.redirect("/movies/new")
        )
});
router.post('/:id', function (req, res, next) {
    const movie = req.body;
    Movie.findByIdAndUpdate(movie._id, movie)
        .then(() => res.redirect("/movies"))
        .catch(next);
});
module.exports = router;