var express = require('express');
var router = express.Router();

router.get('/details', function(req, res) {

    res.render('details');

});

module.exports = router;
