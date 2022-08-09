var express = require('express');
var router = express.Router();

var PlantModel = require('../models/plants')
var PlotModel = require('../models/plots')

var GardenModel = require('../models/gardens')
var ClimateModel = require('../models/climates')

var eS = require('./ecologicalScoring.js')

/* =================================================
Uploads the first plant given the scientific name
input: scientifc name - route 9
output: plant object
================================================= */
router.get('/uploadPlant', async function(req, res, next) {
    console.log("🚀 ~ file: plants.js ~ line 17 ~ router.get ~ req.body.plantScientificName", req.body.plantScientificName)
    
    var plant = await UserModel.findOne( { token: req.body.plantScientificName } );
    
    console.log("🚀 ~ file: plants.js ~ line 17 ~ router.get ~ plant", plant)
    
    res.json(plant);
});


/* =================================================
Uploads all the plants object from a list of plantId given in 
input: array of ids
output: array of objects of plants
================================================= */

router.post('/uploadPlantsFromIds', async function(req, res, next) {

console.log("🚀 ~ file: plants.js ~ line 27 ~ router.post ~ req.body.plantsIds", req.body.plantsIds)
    
   var plantsIds = req.body.plantsIds
   console.log("🚀 ~ file: plants.js ~ line 31 ~ router.post ~ plantsIds", plantsIds)

   var plants = []
   
   plantsIds.map(async (currentPlantId)=>{
        console.log("🚀 ~ file: plants.js ~ line 37 ~ router.post ~ plantsIds.map - I'm there")
        var plant = await PlantModel.findById(currentPlantId)
        plants.push(plant)

   })
   console.log("🚀 ~ file: plants.js ~ line 31 ~ router.post ~ plants", plants)

    res.json(plants);
});

/* =================================================
Uploads all the plants objet from a plant id 
input - route 4
================================================= */
router.get('/uploadPlants', async function (req, res, next) {
    
    var plants = await PlantModel.find();
    console.log("🚀 ~ file: plants.js ~ line 38 ~ router.get ~ plants", plants.slice(0, 2))

    res.json(plants);
});

/* =================================================
- Uploads all the known plants 
- calculates the scoring of the plants in regards with 
the plot specifications 
- sorts the list by the ecological (by descending)

input: plotId
================================================= */
router.get('/uploadSuggestedPlants', async function(req, res, next) {

    console.log("🚀 ~ file: plants.js ~ line 77 ~ router.get ~ req.body", req.body)

    var plotId = req.body.plotId
    var gardenId = req.body.gardenId

    //load the plot features
    var plot = await PlotModel.findById(req.body.plotId)

    //load the garden features
    var garden = await GardenModel.findOne(req.body.gardenId)    

    //load the plot climate
    var climate = await ClimateModel.findOne(garden.gardenClimate)

    //load al the DB plants 
    var plants = await PlantModel.find()
    // calculate the ecological scoring of each plant 
    plants.map((plant)=>{
        var plantScore = eS.plantEcoogicalScoring(plant, plot, climate)
        // add the ecological scoring as a new property of plant
        plant["score"] = plantScore
        console.log("🚀 ~ file: plants.js ~ line 99 ~ plants.map ~ plantScore", plantScore)
        
    })

    //sort plants descending by ecological scoring 
    plants.sort("score")
    console.log("🚀 ~ file: plants.js ~ line 97 ~ router.get ~ plants", plants.slice(0,10))

    //TODO: comment envoyer par page de 20 max
    
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
    
    console.log("🚀 ~ file: plants.js ~ line 142 ~ router.post ~ req.body", req.body)

    // upload the plot data
    const plotData = await PlotModel.findOne( { plotId: req.body.plotId } );
    console.log("🚀 ~ file: plants.js ~ line 146 ~ router.post ~ plotData", plotData)

    // add the new plant to those who existing into the plot
    // à laquelle on ajoute cette nouvelle plante
    var plotUpdatedPlants = [...plotData.groundedPlants, req.body.plantId]
    console.log("🚀 ~ file: plants.js ~ line 152 ~ router.post ~ plotUpdatedPlants", plotUpdatedPlants)

    // sauvegarder la nouvelle plante dans la parcelle
    var updatedPlot = await PlotModel.updateOne(
        {token:req.body.plot},
        {groundedPlants: plotUpdatedPlants }
    )
    
    var plot = await PlotModel.findOne( { plotId: updatedPlot._id }).populate('groundedPlants')
    console.log("🚀 ~ file: plants.js ~ line 160 ~ router.post ~ plot", plot)

    //upload the climate
    const climateData = await ClimateModel.findOne( { climate_id: req.body.climateId } );
    console.log("🚀 ~ file: plants.js ~ line 155 ~ router.post ~ climateData", climateData)

    //Perfom the ecological scoring of the plot
    var scores = eS.plotEcologicalScoring(plot, climateData)

    console.log("🚀 ~ file: plants.js ~ line 156 ~ router.post ~ scores", scores)
    


    res.json(true);


});

/* =================================================
    Creates a new garden for the user
================================================= */
router.post('/uploadPicture', async function(req, res, next) {
    console.log("upload Picture, req.body", req.body);


    res.json(true);


});

/* =================================================
removes a plant from plot
================================================= */
router.post('/deletePlant',async function(req, res, next) {

    console.log("plotId Hello", req.body.plotId);


    // à ajouter dés que le plotId sera disponible depuis le store
    const plotData = await PlotModel.findOne( { plotId: req.body.plotId } );
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
