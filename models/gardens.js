var mongoose = require('mongoose');

var gardenSchema = mongoose.Schema({
    garden_name: String,
    gardenClimate: { type: mongoose.Schema.Types.ObjectId, ref: 'climate' },
    gardenPlots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'plots' }],

});

var GardenModel = mongoose.model('gardens', gardenSchema);

module.exports = GardenModel;