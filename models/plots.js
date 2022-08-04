var mongoose = require('mongoose');

var plotsSchema = mongoose.Schema({
    /* ID */
    name: String,
    size: String,
    sunshine: String,
    scoring: Number,
    soil: String,
    groundedPlants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'plants' }],
    favoritePlants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'plants' }],

    /* grounded_plants= [FK_plante]: Array*/
    /* favorite_plants= [FK_plante]: Array*/
});

var plotsModel = mongoose.model('plots', plotsSchema);

module.exports = plotsModel;