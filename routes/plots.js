var express = require('express');
const PlotModel = require('../models/plots.js');
var router = express.Router();

var eS = require('./ecologicalScoring.js')

/* =================================================
Uploads all the plots of a specific garden based on a plotId
================================================= */

router.get('/uploadPlot', function(req, res, next) {
    var plots = []

    res.json(plots);
});

/* =================================================
    Creates a new plot based on a plotId
    input: 
    - plotName
    - plotDimension, 
    - plotSunshine, 
    - plotSoilType, 
    - plotPlantsId (array)

    output: true/false
================================================= */
router.post('/createPlot', async function(req, res, next) {

    console.log("🚀 ~ file: plots.js ~ line 30 ~ router.post ~ req.body", req.body)

    var plotScores = [{
        biodiversityAttractiveness:0,
        sunshine: 0,
        soilAdequation: 0,
        resistanceToDrought: 0,
        coldHardiness: 0,
        climateAdequation: 0
        }];

    var newPlot = await new PlotModel({
        name: req.body.plotName,
        size: req.body.plotDimension,
        sunshine: req.body.plotSunshine,
        scoring: plotScores,
        soil: req.body.plotSoil
    })

    var plotSaved = await newPlot.save()
    console.log("🚀 ~ file: plots.js ~ line 43 ~ router.post ~ plotSaved", plotSaved)

    res.json(plotSaved);

});

/* =================================================
removes a plot from a specific user's garden 
================================================= */
router.delete('/removePlot', function(req, res, next) {
    res.json(result);

});

/* =================================================
removes a plant form a specific plot
================================================= */
router.delete('/removePlantFromPlot', function(req, res, next) {
    
    res.json(result);

});


/* =================================================
removes a plant form a specific plot
================================================= */
router.put('/modifyPlotData', function(req, res, next) {
    var modifiedPlot = []

    res.json(modifiedPlot);

});



module.exports = router;
