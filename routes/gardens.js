var express = require('express');
var router = express.Router();

/* =================================================
Uploads all the gardens in the DB for this pseudo or user. 
    This route returns an object garden
================================================= */

router.get('/uploadUserGardens', function(req, res, next) {
    var gardens = []

    res.json(gardens);
});

/* =================================================
    Creates a new garden for the user
================================================= */
router.post('/createGarden', function(req, res, next) {
    var availablePlotDimension = [];
    var availableSunshineIntensity = [];
    var availableSoilTypes = [];
    var availableClimates = [];

    res.json(availablePlotDimension, availableSunshineIntensity, availableSoilTypes, availableClimates);

});

/* =================================================
removes a garden from the user's portfolio 
================================================= */
router.delete('/removeGarden', function(req, res, next) {
    res.json(result);

});

/* =================================================
modify a garden from the user's portfolio 
================================================= */
router.put('/modifyGarden', function(req, res, next) {
    res.json(result);

});

module.exports = router;
