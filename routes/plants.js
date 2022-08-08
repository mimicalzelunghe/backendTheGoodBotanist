var express = require('express');
var router = express.Router();

var PlantModel = require('../models/plants');
var UserModel = require('../models/users');
var plantModel = require('../models/plants');
var plotsModel = require('../models/plots');





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
    console.log("plotId Hello", req.body.plotId);


    // à ajouter dés que le plotId sera disponible depuis le store
    const plotData = await plotsModel.findOne( { plotId: req.body.plotId } );


    // recup liste des id de plantes déjà existante
        // à laquelle on ajoute à cette liste le nouveau jardin
        var plotUpdatedPlants = [...plot.groundedPlants, req.body.plantId]

    // sauvegarder la nouvelle plante dans le parcelle
    var updatedUser = await UserModel.updateOne(
        {token:req.body.plot},
        {groundedPlants: userUpdatedGardens }
    )

    res.json(true);


});

/* =================================================
removes a plant from plot
================================================= */
router.post('/deletePlant',async function(req, res, next) {

    console.log("plotId Hello", req.body.plotId);


    // à ajouter dés que le plotId sera disponible depuis le store
    const plotData = await plotsModel.findOne( { plotId: req.body.plotId } );
    const plantPlot = plotData.groundedPlants;


    // recup liste des id de plantes déjà existante
        // à laquelle on ajoute à cette liste le nouveau jardin
        var plotUpdatedPlants = plantPlot.splice(req.body.plantId, 1)

    // sauvegarder la nouvelle plante dans le parcelle
    var updatedUser = await UserModel.updateOne(
        {token:req.body.plot},
        {groundedPlants: userUpdatedGardens }
    )



    res.json(true);

});


router.delete('/removePlantFromWishlist',async function(req, res, next) {

    



    res.json(result);

});

module.exports = router;
