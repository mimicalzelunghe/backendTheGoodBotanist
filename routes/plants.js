var express = require('express');
var router = express.Router();

var PlantModel = require('../models/plants')


var ecologicalScoring = require('./ecologicalScoring.js')
/* =================================================
Uploads the first plant having the given scientific name
input: scientifc name - route 9
================================================= */

router.get('/uploadPlant', function(req, res, next) {
    var plant = {}

    res.json(plant);
});


/* =================================================
Uploads all the plants object from a list of plantId given in 
input - route 11
================================================= */

router.get('/uploadPlantsFromId', function(req, res, next) {
    var plants = []

    res.json(plants);
});

/* =================================================
Uploads a plant objet from a plant id 
input - route 4
================================================= */

router.get('/uploadPlants', async function (req, res, next) {
    console.log("Coucou")
    var plants = await PlantModel.find();
    console.log("🚀 ~ file: plants.js ~ line 38 ~ router.get ~ plants", plants)
    
    res.json(plants);
});

/* =================================================
- Uploads all the known plants 
- calculates the scoring of the plants in regards with 
the plot specifications 
- sorts the list by the ecological (by descending)

input: plotId
================================================= */
router.get('/uploadSuggestedPlants', function(req, res, next) {

    res.json(plants);
});


/* =================================================
- Uploads all the known plants for a given plot
input: plotId 
output: arary of plant object - route 12
================================================= */
router.get('/uploadPlotPlants', function(req, res, next) {
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
router.post('/addPlant', async function(req, res, next) {
    console.log("plantId Hello", req.body.plantId);

    user = await UserModel.findOne( { token: req.body.token } );



    res.json(true);

    // res.json(availablePlotDimension, availableSunshineIntensity, availableSoilTypes, availableClimates);

});

/* =================================================
removes a garden from the user's portfolio 
================================================= */
router.delete('/removePlantFromWishlist', function(req, res, next) {
    res.json(result);

});

module.exports = router;
