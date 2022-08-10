var mongoose = require('mongoose');

var plotSchema = mongoose.Schema({
    /* ID */
    name: String,
    size: String,
    sunshine: String,
    scoring: [{
        biodiversityAttractiveness:0,
        sunshine: 0,
        soilAdequation: 0,
        resistanceToDrought: 0,
        coldHardiness: 0,
        climateAdequation: 0
        }],
        
    soil: String,
    groundedPlants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'plants' }],
    favoritePlants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'plants' }],

    /* grounded_plants= [FK_plante]: Array*/
    /* favorite_plants= [FK_plante]: Array*/
});

var PlotModel = mongoose.model('plots', plotSchema);

module.exports = PlotModel;