var mongoose = require('mongoose');

var gardensSchema = mongoose.Schema({
    garden_name: String,
    gardenClimate: { type: mongoose.Schema.Types.ObjectId, ref: 'climate' },
    gardenPlots: [{ type: mongoose.Schema.Types.ObjectId, ref: 'plots' }],

});

var GardenModel = mongoose.model('gardens', gardensSchema);

module.exports = GardenModel;