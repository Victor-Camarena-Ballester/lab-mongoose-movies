var express = require('express');
var router = express.Router();
const Celebrity = require('../models/Celebrity');

/* GET CELEBRITIES LIST */
router.get('/', function (req, res, next) {
    Celebrity.find()
        .then((celebrities) => {
            res.render('celebrities/index', { celebrities });
        })
        .catch(next);
});
router.get('/new', function (req, res) {
    res.render('celebrities/new');
});
router.post('/:id/delete', function (req, res, next) {
    const { id } = req.params;

    Celebrity.findByIdAndRemove(id)
        .then(() => {
            res.redirect("/celebrities");
        })
        .catch(next);
});
router.get('/:id/edit', function (req, res, next) {
    const { id } = req.params;

    Celebrity.findById(id)
        .then((celebrity) => {
            res.render('celebrities/edit', { celebrity });
        })
        .catch(next);
});
router.get('/:id', function (req, res, next) {
    const { id } = req.params;

    Celebrity.findById(id)
        .then((celebrity) => {
            res.render('celebrities/show', { celebrity });
        })
        .catch(next);
});


router.post('/', function (req, res) {
    const celebrity = req.body
    Celebrity.create(celebrity)
        .then(() => res.redirect("/celebrities"))
        .catch(() => res.redirect("/celebities/new")
        )
});
router.post('/:id', function (req, res, next) {
    const celebrity = req.body;
    Celebrity.findByIdAndUpdate(celebrity._id, celebrity)
        .then(() => res.redirect("/celebrities"))
        .catch(next);
});


module.exports = router;