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
router.post('/uploadSuggestedPlants', async function(req, res, next) {

    console.log("🚀 ~ file: plants.js ~ line 77 ~ router.get ~ req.body", req.body)

    var plotId = req.body.plotId
    console.log("🚀 ~ file: plants.js ~ line 79 ~ router.post ~ plotId", plotId)
    
    var gardenId = req.body.gardenId
    console.log("🚀 ~ file: plants.js ~ line 82 ~ router.post ~ gardenId", gardenId)

    //load the plot features
    var plot = await PlotModel.findById(req.body.plotId)
    console.log("🚀 ~ file: plants.js ~ line 86 ~ router.post ~ plot", plot)

    //load the garden features
    var garden = await GardenModel.findById(req.body.gardenId)    
    console.log("🚀 ~ file: plants.js ~ line 91 ~ router.post ~ garden", garden)

    //load the plot's climate feature
    var climate = await ClimateModel.findOne(garden.gardenClimate)
    console.log("🚀 ~ file: plants.js ~ line 95 ~ router.post ~ climate", climate)

    //load al the DB plants 
    var plants = await PlantModel.find()
    console.log("🚀 ~ file: plants.js ~ line 99 ~ router.post ~ plants", plants.slice(0,1))

    // calculate the ecological scoring of each plant 
    var scoredPlants = []
    
    plants.map((plant)=>{
        //console.log("🚀 ~ file: plants.js ~ line 103 ~ router.post ~ map plant", plant)
        var plantScore = eS.plantEcologicalScoring(plant, plot, climate)
        // add the ecological scoring as a new property of plant
        //create a new object containing a new property score
        const updatedPlant1 = {...plant._doc , score:plantScore }    
        console.log("🚀 ~ file: plants.js ~ line 121 ~ plants.map ~ updatedPlant1", updatedPlant1)
        //console.log("🚀 ~ file: plants.js ~ line 122 ~ plants.map ~ updatedPlant1", updatedPlant1._doc)

        //calculates the global score of the plant
        const initialValue = 0;
        var globalScore = updatedPlant1.score.reduce( (previousValue, currentValue) => previousValue + currentValue,
                                                    initialValue)
       const updatedPlant2 = {...updatedPlant1 , globalScore: globalScore } 
       console.log("🚀 ~ file: plants.js ~ line 130 ~ plants.map ~ updatedPlant2", updatedPlant2)

       scoredPlants.push(updatedPlant2)                                         

    
        //console.log("🚀 ~ file: plants.js ~ line 115 ~ plants.map ~ updatedPlant", updatedPlant)
        //console.log("🚀 ~ file: plants.js ~ line 107 ~ plants.map ~ plant", plant)
        //console.log("🚀 ~ file: plants.js ~ line 108 ~ plants.map ~ plantScore", plantScore)
        
    })
    
    //sort the scoredPlant
    scoredPlants.sort((a, b)=> b.globalScore - a.globalScore)

    console.log("🚀 ~ file: plants.js ~ line 97 ~ router.get ~ plants", scoredPlants.slice(0,5))

    //TODO: comment envoyer par page de 20 max
    
    res.json(scoredPlants);
});


/* =================================================
- Uploads all the known plants for a given plot
input: plotId 
output: arary of plant object - route 12
================================================= */
router.post('/uploadPlotPlants', async function(req, res, next) {
    
    console.log("🚀 ~ file: plants.js ~ line 145 ~ router.get ~ req.body", req.body)

    var plants = []
    //upload the plot and the plaants grounded in it
    //load the plot features
    var plot = await PlotModel.findById(req.body.plotId).populate('groundedPlants')
    console.log("🚀 ~ file: plants.js ~ line 152 ~ router.get ~ plot", plot)

    //load the garden features
    var garden = await GardenModel.findById(req.body.gardenId)    
    console.log("🚀 ~ file: plants.js ~ line 156 ~ router.post ~ garden", garden)

    //load the plot's climate feature
    var climate = await ClimateModel.findOne(garden.gardenClimate)
    console.log("🚀 ~ file: plants.js ~ line 160 ~ router.post ~ climate", climate)

    // calculate the ecological scoring of each plant 
    var scoredPlants = []
    //calculate the plants and the plot scores
    plot.groundedPlants.map((plant)=>{
        //console.log("🚀 ~ file: plants.js ~ line 103 ~ router.post ~ map plant", plant)
        var plantScore = eS.plantEcologicalScoring(plant, plot, climate)
        // add the ecological scoring as a new property of plant
        //create a new object containing a new property score
        const updatedPlant1 = {...plant._doc , score:plantScore }    
        console.log("🚀 ~ file: plants.js ~ line 121 ~ plants.map ~ updatedPlant1", updatedPlant1)
        //console.log("🚀 ~ file: plants.js ~ line 122 ~ plants.map ~ updatedPlant1", updatedPlant1._doc)

        //calculates the global score of the plant
        const initialValue = 0;
        var globalScore = updatedPlant1.score.reduce( (previousValue, currentValue) => previousValue + currentValue,
                                                    initialValue)
       const updatedPlant2 = {...updatedPlant1 , globalScore: globalScore } 
       console.log("🚀 ~ file: plants.js ~ line 130 ~ plants.map ~ updatedPlant2", updatedPlant2)

       scoredPlants.push(updatedPlant2)                                         

    
        //console.log("🚀 ~ file: plants.js ~ line 115 ~ plants.map ~ updatedPlant", updatedPlant)
        //console.log("🚀 ~ file: plants.js ~ line 107 ~ plants.map ~ plant", plant)
        //console.log("🚀 ~ file: plants.js ~ line 108 ~ plants.map ~ plantScore", plantScore)

    })

    // calculate the plot ecoological scoring
    plotScores = eS.plotEcologicalScoring(plot, climate)

    res.json(scoredPlants, plotScores);
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
    //const plotData = await PlotModel.findOne( { plotId: req.body.plotId } );
    const plot = await PlotModel.findById(req.body.plotId);
    console.log("🚀 ~ file: plants.js ~ line 146 ~ router.post ~ plotData", plot)

    // add the new plant to those who existing into the plot
    // à laquelle on ajoute cette nouvelle plante
    var plotUpdatedPlants = [...plot.groundedPlants, req.body.plantId]
    console.log("🚀 ~ file: plants.js ~ line 152 ~ router.post ~ plotUpdatedPlants", plotUpdatedPlants)

    // save the new plant into the plot
    var updatedPlot = await PlotModel.updateOne(
        {_id: req.body.plotId },
        {groundedPlants: plotUpdatedPlants }
    )
    
    //var plot = await PlotModel.findOne( { plotId: updatedPlot._id }).populate('groundedPlants')
    // console.log("🚀 ~ file: plants.js ~ line 160 ~ router.post ~ plot", plot)

    //upload the climate
    const climateData = await ClimateModel.findOne( { climate_id: req.body.climateId } );
    console.log("🚀 ~ file: plants.js ~ line 155 ~ router.post ~ climateData", climateData)

    //Perfom the ecological scoring of the plot
    var scores = eS.plotEcologicalScoring(plot, climateData)
    console.log("🚀 ~ file: plants.js ~ line 156 ~ router.post ~ scores", scores)

    //update the plot score
    var updatedPlotEnd = await PlotModel.updateOne(
        //{token:req.body.plot},
        {_id:req.body.plotId},
        {scoring: [scores] }
    )
    console.log("🚀 ~ file: plants.js ~ line 176 ~ router.post ~ updatedPlotEnd", updatedPlotEnd)

    res.json(scores);


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

    console.log("🚀 ~ file: plants.js ~ line 274 ~ router.post ~ req.body", req.body)

    // upload the plot data
    //const plotData = await PlotModel.findOne( { plotId: req.body.plotId } );
    const plot = await PlotModel.findById(req.body.plotId);
    console.log("🚀 ~ file: plants.js ~ line 280 ~ router.post ~ plot", plot)

    // remove the new plant from the plot's existing plants
    var plotGoundedPlants = plot.groundedPlants
    console.log("🚀 ~ file: plants.js ~ line 285 ~ router.post ~ plotGoundedPlants", plotGoundedPlants)
    
    //get the index of plantId
    let index = plotGoundedPlants.indexOf(req.body.plantId)
    console.log("🚀 ~ file: plants.js ~ line 288 ~ router.post ~ index", index)

    if (index > -1){
        plotGoundedPlants.splice(index, 1)
    }

    // save the new plant into the plot
    var updatedPlot = await PlotModel.updateOne(
        {_id: req.body.plotId },
        {groundedPlants: plotGoundedPlants }
    )
    
    //var plot = await PlotModel.findOne( { plotId: updatedPlot._id }).populate('groundedPlants')
    //console.log("🚀 ~ file: plants.js ~ line 160 ~ router.post ~ plot", plot)

    //upload the climate
    const climateData = await ClimateModel.findOne( { climate_id: req.body.climateId } );
    console.log("🚀 ~ file: plants.js ~ line 155 ~ router.post ~ climateData", climateData)

    //Perfom the ecological scoring of the plot
    var scores = eS.plotEcologicalScoring(plot, climateData)
    console.log("🚀 ~ file: plants.js ~ line 156 ~ router.post ~ scores", scores)

    //update the plot score
    var updatedPlotEnd = await PlotModel.updateOne(
        //{token:req.body.plot},
        {_id:req.body.plotId},
        {scoring: [scores] }
    )
    console.log("🚀 ~ file: plants.js ~ line 176 ~ router.post ~ updatedPlotEnd", updatedPlotEnd)

    res.json(scores);

});


router.delete('/removePlantFromWishlist',async function(req, res, next) {

    



    res.json(result);

});

module.exports = router;
