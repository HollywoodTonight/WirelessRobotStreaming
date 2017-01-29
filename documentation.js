var express = require('express');
var router = express.Router();

router.get('/documentation', function(req, res) {

    res.render('documentation');

});

module.exports = router;
