var express = require('express');
var router = express.Router();

/* =================================================
Uploads the first plant having the given scientific name
input: scientifc name
================================================= */

router.get('/uploadPlant', function(req, res, next) {
    var plant = {}

    res.json(plant);
});


/* =================================================
Uploads all the plants object from a list of plantId given in 
input
================================================= */

router.get('/uploadPlants', function(req, res, next) {
    var plants = []

    res.json(plants);
});


/* =================================================
- Uploads all the known plants 
- calculates the scoring of the plants in regards with 
the plot specifications 
- sorts the list by the ecological (by descending)

input: plotId
================================================= */
router.get('/uploadSuggestions', function(req, res, next) {
    var plants = []

    res.json(plants);
});

/* =================================================
recognizes plant based on a given picture. Calls 
the webAPI PlantId
input: picture data
outputs: - plant scientific name 
        - accuracy
================================================= */    
router.get('/recognizePlant', function(req, res, next) {
    var plants = []

    var plantPicture = req.file.plantPicture

    res.json(scientificPlantName, accuracy);
});

/* =================================================
    Creates a new garden for the user
================================================= */
router.put('/addPlant', function(req, res, next) {
    var availablePlotDimension = [];
    var availableSunshineIntensity = [];
    var availableSoilTypes = [];
    var availableClimates = [];

    res.json(availablePlotDimension, availableSunshineIntensity, availableSoilTypes, availableClimates);

});

/* =================================================
removes a garden from the user's portfolio 
================================================= */
router.delete('/removePlantFromWishlist', function(req, res, next) {
    res.json(result);

});

module.exports = router;
