var express = require('express');
var router = express.Router();
var sensorData = require('../data/sensorsdata.json');

router.get('/api', function(req, res) {

res.json(sensorData);

});

module.exports = router;
