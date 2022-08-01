import plantsData from './plantsDB.json'

var express = require('express');
var router = express.Router();

var ecologicalScoring = require('./ecologicalScoring.js')

/* =================================================
Uploads all the plots of a specific garden based on a plotId
================================================= */

router.get('/uploadPlot', function(req, res, next) {
    var plots = []

    res.json(plots);
});

/* =================================================
    Creates a new plot based on a plotId
================================================= */
router.post('/createPlot', function(req, res, next) {


    res.json();

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
