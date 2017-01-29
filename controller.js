var express = require('express');
var router = express.Router();

router.get('/controller', function(req, res) {

    res.render('controller',{
      pageTitle: 'Controller',
      pageID: 'controller'
    });

});

module.exports = router;
