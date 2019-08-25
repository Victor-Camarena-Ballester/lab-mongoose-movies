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

module.exports = router;